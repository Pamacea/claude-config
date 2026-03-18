#!/usr/bin/env node
/**
 * Claude Code Enhanced Statusline Script v0.9.0
 *
 * Features:
 * - Dynamic context window (200k/1M) based on model detection
 * - Support for Claude 4.5/4.6 (Opus, Sonnet, Haiku) + GLM models
 * - Real-time token tracking from current session
 * - Git branch with staged/unstaged changes
 * - Model version display
 * - Cost tracking
 * - Enhanced progress bar
 * - Vim mode indicator
 * - Cache percentage display
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Model context window sizes
const MODEL_CONTEXT_SIZES = {
  // Claude Opus 4.6 — always 1M
  "claude-opus-4-6": 1000000,
  // Claude Opus 4.5 — 200k default
  "claude-opus-4-5": 200000,
  // Claude Sonnet 4.6 — 200k default
  "claude-sonnet-4-6": 200000,
  // Claude Sonnet 4.5 — 200k
  "claude-sonnet-4-5": 200000,
  // Claude Haiku 4.5 — 200k
  "claude-haiku-4-5": 200000,
  // GLM models
  "glm-5": 200000,
  "glm-5-plus": 200000,
  "glm-4": 200000,
  "glm-4-plus": 200000,
  "glm-4-long": 1000000,
  "glm-4.7": 200000,
};

/**
 * Resolve context window size from model string
 */
function getContextSizeForModel(modelId) {
  if (!modelId) return 200000;

  // [1m] suffix always means 1M context
  if (modelId.includes('[1m]')) return 1000000;

  // Exact match
  if (MODEL_CONTEXT_SIZES[modelId] !== undefined) return MODEL_CONTEXT_SIZES[modelId];

  // Prefix match (handles date-suffixed IDs like "claude-opus-4-6-20260301")
  for (const [key, size] of Object.entries(MODEL_CONTEXT_SIZES)) {
    if (modelId.startsWith(key)) return size;
  }

  // Pattern-based fallback
  if (modelId.includes('opus-4-6') || modelId.includes('opus-4.6')) return 1000000;
  if (modelId.includes('opus-4-5') || modelId.includes('opus-4.5')) return 200000;
  if (modelId.includes('sonnet')) return 200000;
  if (modelId.includes('haiku')) return 200000;
  if (modelId.includes('glm-4-long')) return 1000000;
  if (modelId.includes('glm')) return 200000;

  return 200000;
}

// Model pricing (USD per million tokens)
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

function getPricingForModel(modelId) {
  if (!modelId) return { input: 3, output: 15 };
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
  return { input: 3, output: 15 };
}

// Configuration
const CONFIG = {
  maxTokens: 200000, // default, overridden dynamically per model
  progressBarWidth: 15,
  showModel: true,
  showVimMode: true,
  showCache: true,
  colors: {
    low: 'green',
    medium: 'yellow',
    high: 'red'
  },
  vim: {
    enabled: true,
    showLabel: true,
    activeText: 'vim',
    inactiveText: 'normal',
    colorWhenActive: 'green',
    colorWhenInactive: 'red'
  },
  cache: {
    enabled: true,
    showLabel: true,
    format: 'percentage',
    prefix: 'C:',
    progressBar: {
      enabled: false,
      length: 10,
      style: 'filled',
      color: 'progressive',
      background: 'none'
    },
    colorThresholds: {
      low: 30,
      medium: 60,
      high: 90
    }
  }
};

// ANSI Color codes
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
  peach: '\x1b[38;5;213m'
};

/**
 * Get current session ID and file
 */
function getCurrentSessionFile() {
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const projectsDir = join(homeDir, '.claude', 'projects');

  try {
    const cwd = process.cwd();
    const projectHash = cwd
      .replace(/:/g, '-')
      .replace(/[\/\\]/g, '-');

    const projectDir = join(projectsDir, projectHash);
    if (!existsSync(projectDir)) {
      return null;
    }

    const files = readdirSync(projectDir)
      .filter(f => f.endsWith('.jsonl'))
      .map(f => ({
        path: join(projectDir, f),
        mtime: statSync(join(projectDir, f)).mtime.getTime()
      }))
      .sort((a, b) => b.mtime - a.mtime);

    return files.length > 0 ? files[0].path : null;
  } catch (error) {
    return null;
  }
}

/**
 * Read session duration from current session file
 */
function getSessionDuration(sessionFile) {
  if (!sessionFile || !existsSync(sessionFile)) {
    return 0;
  }

  try {
    const content = readFileSync(sessionFile, 'utf-8');
    const lines = content.trim().split('\n');

    let firstTimestamp = null;
    let lastTimestamp = null;

    for (let i = 0; i < lines.length; i++) {
      try {
        const parsed = JSON.parse(lines[i]);
        if (parsed.timestamp) {
          if (!firstTimestamp) {
            firstTimestamp = new Date(parsed.timestamp).getTime();
          }
          lastTimestamp = new Date(parsed.timestamp).getTime();
        }
      } catch {
        continue;
      }
    }

    if (firstTimestamp && lastTimestamp) {
      return lastTimestamp - firstTimestamp;
    }
  } catch {
    // Ignore
  }

  return 0;
}

/**
 * OPTIMIZED: Get latest token usage from transcript
 * Reads from end to find most recent entry faster
 */
function getSessionTokens() {
  const sessionFile = getCurrentSessionFile();

  if (!sessionFile || !existsSync(sessionFile)) {
    return { current: 0, max: CONFIG.maxTokens, cost: 0, model: 'Claude', duration: 0, inputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };
  }

  try {
    const content = readFileSync(sessionFile, 'utf-8');
    const lines = content.trim().split('\n');

    // OPTIMIZATION: Read from end to find most recent entry with usage
    let lastData = null;
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const parsed = JSON.parse(lines[i]);

        // Skip sidechain and error messages
        if (parsed.isSidechain === true || parsed.isApiErrorMessage === true) {
          continue;
        }

        if (parsed.message?.usage) {
          lastData = parsed;
          break; // Found most recent, stop searching
        }
      } catch {
        continue;
      }
    }

    if (!lastData || !lastData.message?.usage) {
      return { current: 0, max: CONFIG.maxTokens, cost: 0, model: 'Claude', duration: getSessionDuration(sessionFile), inputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };
    }

    const usage = lastData.message.usage;

    const inputTokens = usage.input_tokens || 0;
    const cacheReadTokens = usage.cache_read_input_tokens || 0;
    const cacheCreationTokens = usage.cache_creation_input_tokens || 0;
    const outputTokens = usage.output_tokens || 0;
    const totalTokens = inputTokens + cacheReadTokens + cacheCreationTokens; // Input only for context %

    const model = lastData.message.model || 'Claude';

    // Dynamic max tokens based on detected model
    const maxTokens = getContextSizeForModel(model);

    // Dynamic cost calculation based on model
    const pricing = getPricingForModel(model);
    const cost = ((inputTokens * pricing.input) / 1000000) + ((outputTokens * pricing.output) / 1000000);

    return {
      current: totalTokens,
      max: maxTokens,
      cost: cost,
      model: model,
      duration: getSessionDuration(sessionFile),
      inputTokens: inputTokens,
      cacheReadTokens: cacheReadTokens,
      cacheCreationTokens: cacheCreationTokens
    };
  } catch (error) {
    return { current: 0, max: CONFIG.maxTokens, cost: 0, model: 'Claude', duration: 0, inputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };
  }
}

/**
 * Get git information for current directory
 */
function getGitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD 2>nul || echo ""', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      shell: true,
      windowsHide: true
    }).trim();

    const root = execSync('git rev-parse --show-toplevel 2>nul || echo .', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      shell: true,
      windowsHide: true
    }).trim();

    const relative = execSync('git rev-parse --show-prefix 2>nul || echo .', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      shell: true,
      windowsHide: true
    }).trim().replace(/\\$/, '').replace(/\/$/, '') || '.';

    const status = execSync('git status --porcelain 2>nul', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      shell: true,
      windowsHide: true
    }).trim();

    const dirty = status.length > 0;

    const stagedFiles = status.split('\n').filter(line =>
      line && (line.startsWith('M') || line.startsWith('A') || line.startsWith('D') || line.startsWith('R'))
    ).length;

    const unstagedFiles = status.split('\n').filter(line =>
      line && (line[1] === 'M' || line[1] === 'D' || line.startsWith('??'))
    ).length;

    let stagedInsertions = 0;
    let stagedDeletions = 0;
    try {
      const stagedStat = execSync('git diff --staged --shortstat 2>nul', {
        cwd: process.cwd(),
        encoding: 'utf-8',
        shell: true,
        windowsHide: true
      }).trim();

      const stagedInsertMatch = stagedStat.match(/(\d+) insertion/);
      const stagedDeleteMatch = stagedStat.match(/(\d+) deletion/);

      if (stagedInsertMatch) stagedInsertions = parseInt(stagedInsertMatch[1], 10);
      if (stagedDeleteMatch) stagedDeletions = parseInt(stagedDeleteMatch[1], 10);
    } catch {
      // Ignore
    }

    let unstagedInsertions = 0;
    let unstagedDeletions = 0;
    try {
      const unstagedStat = execSync('git diff --shortstat 2>nul', {
        cwd: process.cwd(),
        encoding: 'utf-8',
        shell: true,
        windowsHide: true
      }).trim();

      const unstagedInsertMatch = unstagedStat.match(/(\d+) insertion/);
      const unstagedDeleteMatch = unstagedStat.match(/(\d+) deletion/);

      if (unstagedInsertMatch) unstagedInsertions = parseInt(unstagedInsertMatch[1], 10);
      if (unstagedDeleteMatch) unstagedDeletions = parseInt(unstagedDeleteMatch[1], 10);
    } catch {
      // Ignore
    }

    return {
      branch,
      root,
      relative,
      dirty,
      stagedFiles,
      unstagedFiles,
      stagedInsertions,
      stagedDeletions,
      unstagedInsertions,
      unstagedDeletions
    };
  } catch {
    return {
      branch: '',
      root: '.',
      relative: '.',
      dirty: false,
      stagedFiles: 0,
      unstagedFiles: 0,
      stagedInsertions: 0,
      stagedDeletions: 0,
      unstagedInsertions: 0,
      unstagedDeletions: 0
    };
  }
}

function formatTokenCount(count) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
  }
  return `${mins}m`;
}

function extractModelVersion(modelName) {
  const match = modelName.match(/(\d+\.\d+(?:\.\d+)?)/);
  return match ? match[1] : null;
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

function isVimModeActive() {
  return !!(process.env.VIM || process.env.VIMRUNTIME);
}

function getCachePercentage(sessionData) {
  if (!sessionData) {
    return null;
  }

  const cacheRead = sessionData.cacheReadTokens || 0;
  const cacheCreation = sessionData.cacheCreationTokens || 0;
  const inputTokens = sessionData.inputTokens || 0;

  if (inputTokens === 0 && cacheRead === 0 && cacheCreation === 0) {
    return 0;
  }

  const totalTokens = inputTokens + cacheRead + cacheCreation;

  if (totalTokens === 0) {
    return 0;
  }

  const percentage = (cacheRead / totalTokens) * 100;

  return percentage;
}

function formatVimMode(isActive) {
  if (!CONFIG.vim.enabled) {
    return '';
  }

  const activeText = CONFIG.vim.activeText;
  const inactiveText = CONFIG.vim.inactiveText;

  if (!CONFIG.vim.showLabel && !isActive) {
    return '';
  }

  const bold = '\x1b[1m';

  if (isActive) {
    const colorCode = CONFIG.vim.colorWhenActive === 'green' ? '\x1b[92m' :
                      CONFIG.vim.colorWhenActive === 'red' ? '\x1b[91m' :
                      CONFIG.vim.colorWhenActive === 'yellow' ? '\x1b[93m' :
                      CONFIG.vim.colorWhenActive === 'gray' ? '\x1b[90m' :
                      '\x1b[92m';
    return `${bold}${colorCode}${activeText}\x1b[0m`;
  }

  const colorCode = CONFIG.vim.colorWhenInactive === 'green' ? '\x1b[92m' :
                    CONFIG.vim.colorWhenInactive === 'red' ? '\x1b[91m' :
                    CONFIG.vim.colorWhenInactive === 'yellow' ? '\x1b[93m' :
                    CONFIG.vim.colorWhenInactive === 'gray' ? '\x1b[90m' :
                    '\x1b[90m';
  return `${bold}${colorCode}${inactiveText}\x1b[0m`;
}

function formatCachePercentage(cachePercentage) {
  if (!CONFIG.cache.enabled || cachePercentage === null || cachePercentage === undefined) {
    return '';
  }

  const parts = [];

  if (CONFIG.cache.showLabel) {
    parts.push(`\x1b[1m\x1b[90m${CONFIG.cache.prefix}\x1b[0m`);
  }

  if (CONFIG.cache.format === 'percentage' || CONFIG.cache.format === 'both') {
    const displayValue = cachePercentage.toFixed(1);

    let colorCode;
    const thresholds = CONFIG.cache.colorThresholds;

    if (cachePercentage >= thresholds.high) {
      colorCode = '\x1b[92m';
    } else if (cachePercentage >= thresholds.medium) {
      colorCode = '\x1b[93m';
    } else {
      colorCode = '\x1b[91m';
    }

    parts.push(`\x1b[1m${colorCode}${displayValue}%\x1b[0m`);
  }

  return parts.join(' ');
}

function formatGitChanges(gitInfo) {
  const parts = [];

  if (gitInfo.stagedInsertions > 0 || gitInfo.stagedDeletions > 0 || gitInfo.stagedFiles > 0) {
    const stagedParts = [];
    if (gitInfo.stagedInsertions > 0) stagedParts.push(`\x1b[96m+${gitInfo.stagedInsertions}\x1b[0m`);
    if (gitInfo.stagedDeletions > 0) stagedParts.push(`\x1b[96m-${gitInfo.stagedDeletions}\x1b[0m`);
    if (gitInfo.stagedFiles > 0) stagedParts.push(`\x1b[96m[${gitInfo.stagedFiles}]\x1b[0m`);

    if (stagedParts.length > 0) {
      parts.push(stagedParts.join(' '));
    }
  }

  if (gitInfo.unstagedInsertions > 0 || gitInfo.unstagedDeletions > 0 || gitInfo.unstagedFiles > 0) {
    const unstagedParts = [];
    if (gitInfo.unstagedInsertions > 0) unstagedParts.push(`\x1b[92m+${gitInfo.unstagedInsertions}\x1b[0m`);
    if (gitInfo.unstagedDeletions > 0) unstagedParts.push(`\x1b[91m-${gitInfo.unstagedDeletions}\x1b[0m`);
    if (gitInfo.unstagedFiles > 0) unstagedParts.push(`\x1b[93m[${gitInfo.unstagedFiles}]\x1b[0m`);

    if (unstagedParts.length > 0) {
      parts.push(unstagedParts.join(' '));
    }
  }

  return parts.length > 0 ? ` \x1b[90m▸\x1b[0m ${parts.join(' ')}` : '';
}

function getProjectPath(gitInfo) {
  if (!gitInfo.branch) {
    return process.cwd().split(/[/\\]/).pop() || '.';
  }

  if (gitInfo.relative === '.' || gitInfo.relative === '') {
    return gitInfo.root.split(/[/\\]/).pop() || '.';
  }

  const projectName = gitInfo.root.split(/[/\\]/).pop() || '.';
  return `${projectName}/${gitInfo.relative}`;
}

function main() {
  const gitInfo = getGitInfo();
  const sessionData = getSessionTokens();
  const { current, max, cost, model, duration, inputTokens, cacheReadTokens, cacheCreationTokens } = sessionData;
  const percentage = Math.min(100, Math.round((current / max) * 100));

  const branch = gitInfo.branch || 'no-git';
  const dirtyMarker = gitInfo.dirty ? `\x1b[95m*\x1b[0m` : '';
  const projectPath = getProjectPath(gitInfo);
  const progressBar = createProgressBar(percentage);
  const currentDisplay = formatTokenCount(current);
  const maxDisplay = formatTokenCount(max);
  const gitChanges = formatGitChanges(gitInfo);

  const modelVersion = extractModelVersion(model);
  const modelDisplay = modelVersion
    ? `\x1b[38;5;213m${modelVersion}\x1b[0m`
    : '';

  let costDisplay = '';
  if (cost > 0) {
    if (cost < 0.01) {
      costDisplay = `\x1b[92m$${cost.toFixed(4)}\x1b[0m`;
    } else {
      costDisplay = `\x1b[92m$${cost.toFixed(2)}\x1b[0m`;
    }
  }

  const durationDisplay = duration > 0
    ? `\x1b[90m${formatDuration(duration)}\x1b[0m`
    : '';

  const vimModeActive = isVimModeActive();
  const vimDisplay = formatVimMode(vimModeActive);

  const cacheData = {
    inputTokens: inputTokens,
    cacheReadTokens: cacheReadTokens,
    cacheCreationTokens: cacheCreationTokens
  };
  const cachePercentage = getCachePercentage(cacheData);
  const cacheDisplay = formatCachePercentage(cachePercentage);

  let statusline =
    `\x1b[1m\x1b[97m${branch}${dirtyMarker}\x1b[0m` +
    ` \x1b[90m▸\x1b[0m ` +
    `\x1b[90m${projectPath}\x1b[0m` +
    gitChanges +
    (modelDisplay ? ` \x1b[90m▸\x1b[0m ${modelDisplay}` : '') +
    (costDisplay ? ` \x1b[90m▸\x1b[0m ${costDisplay}` : '') +
    ` \x1b[90m▸\x1b[0m ` +
    progressBar +
    ` \x1b[90m▸\x1b[0m ` +
    `\x1b[1m${percentage}% (${currentDisplay}/${maxDisplay})\x1b[0m`;

  if (vimDisplay) {
    statusline += ` \x1b[90m▸\x1b[0m ${vimDisplay}`;
  }

  if (cacheDisplay) {
    statusline += ` \x1b[90m▸\x1b[0m ${cacheDisplay}`;
  }

  if (durationDisplay) {
    statusline += ` \x1b[90m▸\x1b[0m ${durationDisplay}`;
  }

  console.log(statusline);
}

main();
