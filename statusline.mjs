#!/usr/bin/env node
/**
 * Claude Code Enhanced Statusline Script v1.0.0
 *
 * Input: payload JSON en stdin (officiel Claude Code) — plus de parsing
 * transcript obligatoire. Le transcript JSONL n'est lu qu'en fallback
 * (coût cumulé estimé, durée, usage) quand un champ stdin est absent.
 *
 * Features:
 * - context_window natif : used_percentage, context_window_size (200k/1M)
 * - current_usage natif : input / output / cache_read / cache_creation
 * - Coût : cost.total_cost_usd (officiel) + fallback estimation cumulée
 *   avec pricing cache (read ×0.1, write ×1.25) si modèle connu
 * - Effort / Thinking / Fast mode (payload effort.level, thinking.enabled,
 *   fast_mode)
 * - Badge "1M" quand context_window_size >= 1_000_000
 * - Vim mode natif (payload.vim.mode) avec fallback env VIM
 * - Git branch + staged/unstaged + insertions/délétions
 * - Statusline.config.json honoré (vim, cache, models overrides)
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// ─── Model tables (fallback si stdin absent / modèle inconnu) ───

const MODEL_CONTEXT_SIZES = {
  "claude-opus-4-6": 1000000,
  "claude-opus-4-5": 200000,
  "claude-sonnet-4-6": 200000,
  "claude-sonnet-4-5": 200000,
  "claude-haiku-4-5": 200000,
  "glm-5": 200000,
  "glm-5-plus": 200000,
  "glm-4": 200000,
  "glm-4-plus": 200000,
  "glm-4-long": 1000000,
  "glm-4.7": 200000,
};

// Pricing USD/M tokens — AUCUN prix fabriqué pour les modèles custom
// (mimo-* etc.) : le fallback coût est alors masqué, sauf coût officiel stdin.
const MODEL_PRICING = {
  "claude-opus-4-6": { input: 15, output: 75 },
  "claude-opus-4-5": { input: 15, output: 75 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-sonnet-4-5": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 0.8, output: 4 },
  "glm-5": { input: 0.5, output: 2 },
  "glm-5-plus": { input: 1, output: 4 },
  "glm-4": { input: 0.4, output: 1.6 },
  "glm-4-plus": { input: 0.5, output: 2 },
  "glm-4-long": { input: 0.4, output: 1.6 },
  "glm-4.7": { input: 0.5, output: 2 },
};

// Multipliers cache vs input price (Anthropic-compatible)
const CACHE_READ_MULT = 0.1;
const CACHE_WRITE_MULT = 1.25;

// ─── Config (statusline.config.json, optionnel) ───

const DEFAULT_CONFIG = {
  progressBarWidth: 15,
  models: {}, // ex: { "mimo-v2.6-flash": { "context": 200000, "pricing": { "input": 0.3, "output": 1.2 } } }
  vim: {
    enabled: true,
    showLabel: true,
    activeText: "vim",
    inactiveText: "normal",
    colorWhenActive: "green",
    colorWhenInactive: "red",
  },
  cache: {
    enabled: true,
    showLabel: true,
    format: "percentage",
    prefix: "C:",
    colorThresholds: { low: 30, medium: 60, high: 90 },
  },
};

function loadConfig() {
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const configPath = join(homeDir, ".claude", "statusline.config.json");
  try {
    if (existsSync(configPath)) {
      const raw = JSON.parse(readFileSync(configPath, "utf-8"));
      return {
        ...DEFAULT_CONFIG,
        ...raw,
        vim: { ...DEFAULT_CONFIG.vim, ...(raw.vim || {}) },
        cache: {
          ...DEFAULT_CONFIG.cache,
          ...(raw.cache || {}),
          colorThresholds: {
            ...DEFAULT_CONFIG.cache.colorThresholds,
            ...(raw.cache?.colorThresholds || {}),
          },
        },
        models: raw.models || {},
      };
    }
  } catch { /* config invalide → défauts */ }
  return DEFAULT_CONFIG;
}

const CONFIG = loadConfig();

// ─── Colors ───
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[91m',
  green: '\x1b[92m',
  yellow: '\x1b[93m',
  blue: '\x1b[94m',
  magenta: '\x1b[95m',
  cyan: '\x1b[96m',
  white: '\x1b[97m',
  gray: '\x1b[90m',
  orange: '\x1b[38;5;208m',
  peach: '\x1b[38;5;213m',
};

// ─── Stdin payload ───

function readStdin() {
  return new Promise(resolve => {
    if (process.stdin.isTTY) return resolve({});
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', c => { data += c; });
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
    // Sécurité : ne jamais bloquer indéfiniment
    setTimeout(() => resolve(data ? (() => { try { return JSON.parse(data); } catch { return {}; } })() : {}), 2000).unref?.();
  });
}

// ─── Model resolution ───

function getContextSize(modelId, contextWindowSize) {
  // 1. Override config (l'utilisateur prime sur le payload)
  const override = modelId && CONFIG.models[modelId]?.context;
  if (override) return override;

  // 2. Source autoritative : payload context_window
  if (contextWindowSize && contextWindowSize > 0) return contextWindowSize;

  if (!modelId) return 200000;

  // 3. Suffix [1m]
  if (modelId.includes('[1m]')) return 1000000;

  // 4. Tables
  if (MODEL_CONTEXT_SIZES[modelId] !== undefined) return MODEL_CONTEXT_SIZES[modelId];
  for (const [key, size] of Object.entries(MODEL_CONTEXT_SIZES)) {
    if (modelId.startsWith(key)) return size;
  }

  // 5. Patterns
  if (modelId.includes('opus-4-6') || modelId.includes('opus-4.6')) return 1000000;
  if (modelId.includes('glm-4-long')) return 1000000;
  if (modelId.includes('opus') || modelId.includes('sonnet') ||
      modelId.includes('haiku') || modelId.includes('glm')) return 200000;

  return 200000;
}

function getPricing(modelId) {
  if (!modelId) return null;

  // Override config (modèles custom : mimo, proxies…)
  const override = CONFIG.models[modelId]?.pricing;
  if (override?.input !== undefined && override?.output !== undefined) return override;

  const cleanId = modelId.replace(/\[1m\]/, '');
  if (MODEL_PRICING[cleanId]) return MODEL_PRICING[cleanId];
  for (const [key, pricing] of Object.entries(MODEL_PRICING)) {
    if (modelId.startsWith(key)) return pricing;
  }
  if (modelId.includes('opus')) return { input: 15, output: 75 };
  if (modelId.includes('haiku')) return { input: 0.8, output: 4 };
  if (modelId.includes('sonnet')) return { input: 3, output: 15 };
  if (modelId.includes('glm-5-plus')) return { input: 1, output: 4 };
  if (modelId.includes('glm')) return { input: 0.5, output: 2 };

  // Modèle custom inconnu → aucun prix fabricé
  return null;
}

// ─── Transcript fallback ───

function getCurrentSessionFile(payloadTranscriptPath) {
  if (payloadTranscriptPath && existsSync(payloadTranscriptPath)) {
    return payloadTranscriptPath;
  }
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const projectsDir = join(homeDir, '.claude', 'projects');
  try {
    const projectHash = process.cwd().replace(/:/g, '-').replace(/[\/\\]/g, '-');
    const projectDir = join(projectsDir, projectHash);
    if (!existsSync(projectDir)) return null;
    const files = readdirSync(projectDir)
      .filter(f => f.endsWith('.jsonl'))
      .map(f => ({ path: join(projectDir, f), mtime: statSync(join(projectDir, f)).mtime.getTime() }))
      .sort((a, b) => b.mtime - a.mtime);
    return files.length > 0 ? files[0].path : null;
  } catch { return null; }
}

/**
 * Analyse le transcript : coût cumulé (avec pricing cache), durée,
 * dernier usage (fallback contexte).
 */
function analyzeTranscript(sessionFile) {
  const result = {
    cost: null,
    duration: 0,
    lastUsage: null,
    lastModel: null,
  };
  if (!sessionFile || !existsSync(sessionFile)) return result;

  try {
    const lines = readFileSync(sessionFile, 'utf-8').trim().split('\n');
    let firstTs = null, lastTs = null;
    let cumCost = null;

    for (let i = 0; i < lines.length; i++) {
      let parsed;
      try { parsed = JSON.parse(lines[i]); } catch { continue; }

      if (parsed.timestamp) {
        const ts = new Date(parsed.timestamp).getTime();
        if (!firstTs) firstTs = ts;
        lastTs = ts;
      }

      if (parsed.isSidechain === true || parsed.isApiErrorMessage === true) continue;
      const usage = parsed.message?.usage;
      if (!usage) continue;

      result.lastUsage = usage;
      result.lastModel = parsed.message?.model || result.lastModel;

      // Cumul du coût avec multiplicateurs cache (si pricing connu)
      if (cumCost !== null || getPricing(parsed.message?.model)) {
        const pricing = getPricing(parsed.message?.model) || getPricing(result.lastModel);
        if (pricing) {
          if (cumCost === null) cumCost = 0;
          cumCost +=
            ((usage.input_tokens || 0) * pricing.input +
             (usage.cache_read_input_tokens || 0) * pricing.input * CACHE_READ_MULT +
             (usage.cache_creation_input_tokens || 0) * pricing.input * CACHE_WRITE_MULT +
             (usage.output_tokens || 0) * pricing.output) / 1000000;
        }
      }
    }

    result.cost = cumCost;
    if (firstTs && lastTs) result.duration = lastTs - firstTs;
  } catch { /* ignore */ }

  return result;
}

// ─── Data assembly ───

function gatherData(payload) {
  const modelId = payload.model?.id || '';
  const modelDisplay = payload.model?.display_name || modelId || 'Claude';
  const cw = payload.context_window || null;

  let maxTokens = getContextSize(modelId, cw?.context_window_size);

  // Usage courant : stdin d'abord, transcript ensuite
  let usage = cw?.current_usage || null;
  let source = cw ? 'stdin' : 'transcript';
  let transcript = null;

  const needTranscript =
    !usage ||
    !(payload.cost?.total_cost_usd > 0) ||
    !(payload.cost?.total_duration_ms > 0);

  if (needTranscript) {
    transcript = analyzeTranscript(getCurrentSessionFile(payload.transcript_path));
    if (!usage) usage = transcript.lastUsage;
  }

  // Contexte utilisé. Le % officiel fait foi ; les tokens affichés en sont
  // dérivés (total_input_tokens du proxy est cumulé, pas le contexte réel).
  let current = 0;
  let usedPct = null;
  if (cw && cw.used_percentage !== undefined && cw.used_percentage !== null) {
    usedPct = cw.used_percentage;
    current = Math.round((usedPct / 100) * maxTokens);
  } else if (usage) {
    current = (usage.input_tokens || 0) +
              (usage.cache_read_input_tokens || 0) +
              (usage.cache_creation_input_tokens || 0);
    // Plafond réel des modèles : 200K ou 1M (jamais plus)
    if (current > maxTokens) maxTokens = 1000000;
  }

  const percentage = usedPct !== null
    ? Math.min(100, Math.round(usedPct))
    : Math.min(100, Math.round((current / maxTokens) * 100));

  // Coût : officiel d'abord, estimation ensuite
  let cost = null;
  let costSource = null;
  if (payload.cost?.total_cost_usd > 0) {
    cost = payload.cost.total_cost_usd;
    costSource = 'official';
  } else if (transcript?.cost !== null && transcript?.cost !== undefined) {
    cost = transcript.cost;
    costSource = 'estimated';
  }

  // Durée : officiel d'abord, transcript ensuite
  const duration = payload.cost?.total_duration_ms > 0
    ? payload.cost.total_duration_ms
    : (transcript?.duration || 0);

  return {
    modelId,
    modelDisplay,
    maxTokens,
    current,
    percentage,
    usage: usage || {},
    cost,
    costSource,
    duration,
    source,
    fastMode: payload.fast_mode === true,
    effort: payload.effort?.level || null,
    thinking: payload.thinking?.enabled === true,
    vimMode: payload.vim?.mode || null,
  };
}

// ─── Git ───

function getGitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD 2>nul || echo ""', {
      cwd: process.cwd(), encoding: 'utf-8', shell: true, windowsHide: true
    }).trim();

    const root = execSync('git rev-parse --show-toplevel 2>nul || echo .', {
      cwd: process.cwd(), encoding: 'utf-8', shell: true, windowsHide: true
    }).trim();

    const relative = execSync('git rev-parse --show-prefix 2>nul || echo .', {
      cwd: process.cwd(), encoding: 'utf-8', shell: true, windowsHide: true
    }).trim().replace(/\\$/, '').replace(/\/$/, '') || '.';

    const status = execSync('git status --porcelain 2>nul', {
      cwd: process.cwd(), encoding: 'utf-8', shell: true, windowsHide: true
    }).trim();

    const dirty = status.length > 0;
    const lines = status.split('\n').filter(Boolean);

    const stagedFiles = lines.filter(l => 'MADR'.includes(l[0])).length;
    const unstagedFiles = lines.filter(l => l[1] === 'M' || l[1] === 'D' || l.startsWith('??')).length;

    const readStat = (cmd) => {
      try {
        const stat = execSync(cmd, { cwd: process.cwd(), encoding: 'utf-8', shell: true, windowsHide: true }).trim();
        return {
          ins: parseInt(stat.match(/(\d+) insertion/)?.[1] || 0, 10),
          del: parseInt(stat.match(/(\d+) deletion/)?.[1] || 0, 10),
        };
      } catch { return { ins: 0, del: 0 }; }
    };

    const stagedStat = readStat('git diff --staged --shortstat 2>nul');
    const unstagedStat = readStat('git diff --shortstat 2>nul');

    return {
      branch, root, relative, dirty, stagedFiles, unstagedFiles,
      stagedInsertions: stagedStat.ins, stagedDeletions: stagedStat.del,
      unstagedInsertions: unstagedStat.ins, unstagedDeletions: unstagedStat.del,
    };
  } catch {
    return {
      branch: '', root: '.', relative: '.', dirty: false,
      stagedFiles: 0, unstagedFiles: 0,
      stagedInsertions: 0, stagedDeletions: 0,
      unstagedInsertions: 0, unstagedDeletions: 0,
    };
  }
}

// ─── Formatters ───

function formatTokenCount(count) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return String(count);
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
  return `${mins}m`;
}

function createProgressBar(percentage, width = CONFIG.progressBarWidth) {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  const bar = '━'.repeat(filled) + (empty > 0 ? '╸' : '') + '─'.repeat(Math.max(0, empty - 1));

  let colorCode = '\x1b[92m';
  if (percentage >= 90) colorCode = '\x1b[91m';
  else if (percentage >= 70) colorCode = '\x1b[38;5;208m';
  else if (percentage >= 40) colorCode = '\x1b[93m';

  return `\x1b[1m${colorCode}[${bar}]\x1b[0m`;
}

function formatCachePercentage(usage) {
  if (!CONFIG.cache.enabled) return '';

  const cacheRead = usage.cache_read_input_tokens || 0;
  const cacheCreation = usage.cache_creation_input_tokens || 0;
  const input = usage.input_tokens || 0;
  const total = input + cacheRead + cacheCreation;
  if (total === 0) return '';

  const pct = (cacheRead / total) * 100;

  const parts = [];
  if (CONFIG.cache.showLabel) {
    parts.push(`\x1b[1m\x1b[90m${CONFIG.cache.prefix}\x1b[0m`);
  }

  const t = CONFIG.cache.colorThresholds;
  const colorCode = pct >= t.high ? '\x1b[92m' : pct >= t.medium ? '\x1b[93m' : '\x1b[91m';
  parts.push(`\x1b[1m${colorCode}${pct.toFixed(1)}%\x1b[0m`);
  return parts.join(' ');
}

function formatGitChanges(gitInfo) {
  const parts = [];

  if (gitInfo.stagedInsertions || gitInfo.stagedDeletions || gitInfo.stagedFiles) {
    const p = [];
    if (gitInfo.stagedInsertions) p.push(`\x1b[96m+${gitInfo.stagedInsertions}\x1b[0m`);
    if (gitInfo.stagedDeletions) p.push(`\x1b[96m-${gitInfo.stagedDeletions}\x1b[0m`);
    if (gitInfo.stagedFiles) p.push(`\x1b[96m[${gitInfo.stagedFiles}]\x1b[0m`);
    if (p.length) parts.push(p.join(' '));
  }

  if (gitInfo.unstagedInsertions || gitInfo.unstagedDeletions || gitInfo.unstagedFiles) {
    const p = [];
    if (gitInfo.unstagedInsertions) p.push(`\x1b[92m+${gitInfo.unstagedInsertions}\x1b[0m`);
    if (gitInfo.unstagedDeletions) p.push(`\x1b[91m-${gitInfo.unstagedDeletions}\x1b[0m`);
    if (gitInfo.unstagedFiles) p.push(`\x1b[93m[${gitInfo.unstagedFiles}]\x1b[0m`);
    if (p.length) parts.push(p.join(' '));
  }

  return parts.length ? ` \x1b[90m▸\x1b[0m ${parts.join(' ')}` : '';
}

function getProjectPath(gitInfo) {
  if (!gitInfo.branch) return process.cwd().split(/[/\\]/).pop() || '.';
  if (gitInfo.relative === '.' || gitInfo.relative === '') {
    return gitInfo.root.split(/[/\\]/).pop() || '.';
  }
  return `${gitInfo.root.split(/[/\\]/).pop() || '.'}/${gitInfo.relative}`;
}

function formatVim(vimMode) {
  if (!CONFIG.vim.enabled) return '';

  // Fallback : env VIM (payload absent)
  const mode = vimMode || ((process.env.VIM || process.env.VIMRUNTIME) ? 'vim' : null);
  if (!mode && !CONFIG.vim.showLabel) return '';

  const isActive = !!mode;
  const text = isActive
    ? (mode !== 'vim' ? mode : CONFIG.vim.activeText)
    : CONFIG.vim.inactiveText;
  const colorName = isActive ? CONFIG.vim.colorWhenActive : CONFIG.vim.colorWhenInactive;
  const colorCode = colorName === 'green' ? '\x1b[92m'
    : colorName === 'red' ? '\x1b[91m'
    : colorName === 'yellow' ? '\x1b[93m'
    : colorName === 'gray' ? '\x1b[90m'
    : (isActive ? '\x1b[92m' : '\x1b[90m');

  return `\x1b[1m${colorCode}${text}\x1b[0m`;
}

/** Badges modèles : fast / effort / thinking / 1M */
function formatModelBadges(data) {
  const badges = [];
  if (data.fastMode) badges.push(`\x1b[1m\x1b[96mfast\x1b[0m`);
  if (data.effort) {
    const short = data.effort.length > 3 ? data.effort.slice(0, 3) : data.effort;
    badges.push(`\x1b[1m\x1b[94meff:${short}\x1b[0m`);
  }
  if (data.thinking) badges.push(`\x1b[1m\x1b[95mthink\x1b[0m`);
  return badges;
}

function formatCost(cost, source) {
  if (cost === null || cost === undefined || cost <= 0) return '';
  const value = cost < 0.01 ? cost.toFixed(4) : cost.toFixed(2);
  // Estimation locale → orange pour distinguer du coût officiel
  const color = source === 'estimated' ? '\x1b[38;5;208m' : '\x1b[92m';
  const suffix = source === 'estimated' ? '~' : '';
  return `\x1b[1m${color}${suffix}$${value}\x1b[0m`;
}

// ─── Main ───

async function main() {
  const payload = await readStdin();
  const data = gatherData(payload);
  const gitInfo = getGitInfo();

  const branch = gitInfo.branch || 'no-git';
  const dirtyMarker = gitInfo.dirty ? `\x1b[95m*\x1b[0m` : '';
  const projectPath = getProjectPath(gitInfo);
  const progressBar = createProgressBar(data.percentage);
  const gitChanges = formatGitChanges(gitInfo);

  const modelDisplay = `\x1b[38;5;213m${data.modelDisplay}\x1b[0m`;
  const costDisplay = formatCost(data.cost, data.costSource);

  // Badge 1M uniquement si fenêtre ≥ 1M
  const contextBadge = data.maxTokens >= 1000000
    ? ` \x1b[1m\x1b[95m1M\x1b[0m`
    : '';

  const badges = formatModelBadges(data);
  const cacheDisplay = formatCachePercentage(data.usage);
  const durationDisplay = data.duration > 0
    ? `\x1b[90m${formatDuration(data.duration)}\x1b[0m`
    : '';
  const vimDisplay = formatVim(data.vimMode);

  const sep = ` \x1b[90m▸\x1b[0m `;

  let statusline =
    `\x1b[1m\x1b[97m${branch}${dirtyMarker}\x1b[0m` + sep +
    `\x1b[90m${projectPath}\x1b[0m` +
    gitChanges + sep +
    modelDisplay +
    (costDisplay ? sep + costDisplay : '') +
    sep + progressBar +
    sep + `\x1b[1m${data.percentage}% (${formatTokenCount(data.current)}/${formatTokenCount(data.maxTokens)})\x1b[0m${contextBadge}`;

  if (badges.length) statusline += sep + badges.join(' ');
  if (cacheDisplay) statusline += sep + cacheDisplay;
  if (vimDisplay) statusline += sep + vimDisplay;
  if (durationDisplay) statusline += sep + durationDisplay;

  console.log(statusline);
  process.exit(0);
}

main();
