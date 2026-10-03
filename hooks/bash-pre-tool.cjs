#!/usr/bin/env node
/**
 * Bash PreToolUse Hook — Fusion Aureus + RTK
 * Lit stdin, réécrit les commandes Bash, écrit stdout JSON.
 *
 * Remplace: rtk-rewrite.cjs + aureus-rewrite.cjs
 * Protocole: Claude Code command hook (stdin → stdout)
 */

const { spawnSync } = require('child_process');

// ─── Aureus availability cache ───
let aureusChecked = false;
let hasAureus = false;

function checkAureus() {
    if (aureusChecked) return hasAureus;
    try {
        const r = spawnSync('aureus', ['--version'], { stdio: 'ignore', timeout: 1000, shell: false });
        hasAureus = r.status === 0;
    } catch { hasAureus = false; }
    aureusChecked = true;
    return hasAureus;
}

// ─── RTK rewrite rules (120+) ───
const REWRITES = [
    // ── Git (core) ──
    [/^git\s+status/,       'rtk git status'],
    [/^git\s+diff/,         'rtk git diff'],
    [/^git\s+log/,          'rtk git log'],
    [/^git\s+add/,          'rtk git add'],
    [/^git\s+commit/,       'rtk git commit'],
    [/^git\s+push/,         'rtk git push'],
    [/^git\s+pull/,         'rtk git pull'],
    [/^git\s+branch/,       'rtk git branch'],
    [/^git\s+fetch/,        'rtk git fetch'],
    [/^git\s+stash/,        'rtk git stash'],
    [/^git\s+show/,         'rtk git show'],
    // ── Git (avancé) ──
    [/^git\s+checkout/,     'rtk git checkout'],
    [/^git\s+switch/,       'rtk git switch'],
    [/^git\s+merge/,        'rtk git merge'],
    [/^git\s+rebase/,       'rtk git rebase'],
    [/^git\s+reset/,        'rtk git reset'],
    [/^git\s+remote/,       'rtk git remote'],
    [/^git\s+tag/,          'rtk git tag'],
    [/^git\s+blame/,        'rtk git blame'],
    [/^git\s+config/,       'rtk git config'],
    [/^git\s+reflog/,       'rtk git reflog'],
    [/^git\s+cherry-pick/,  'rtk git cherry-pick'],
    [/^git\s+clean/,        'rtk git clean'],
    [/^git\s+bisect/,       'rtk git bisect'],

    // ── GitHub CLI ──
    [/^gh\s/,               'rtk gh '],

    // ── File reading ──
    [/^cat\s/,              'rtk read '],
    [/^(head|tail)\s/,      'rtk read '],
    [/^bat\s/,              'rtk read '],

    // ── File searching ──
    [/^(rg|grep)\s/,        'rtk grep '],
    [/^grepai\s/,           'rtk grep '],
    [/^(ag|ack)\s/,         'rtk grep '],

    // ── File listing ──
    [/^ls/,                 'rtk ls'],
    [/^find\s/,             'rtk find '],
    [/^fd\s/,               'rtk find '],
    [/^tree\s/,             'rtk tree '],
    [/^dir(\s.*)?$/,        'rtk ls'],

    // ── Cargo / Rust ──
    [/^cargo\s+test/,       'rtk cargo test'],
    [/^cargo\s+build/,      'rtk cargo build'],
    [/^cargo\s+check/,      'rtk cargo check'],
    [/^cargo\s+clippy/,     'rtk cargo clippy'],
    [/^cargo\s+publish/,    'rtk cargo publish'],
    [/^cargo\s+install/,    'rtk cargo install'],
    [/^cargo\s+update/,     'rtk cargo update'],
    [/^cargo\s+clean/,      'rtk cargo clean'],
    [/^cargo\s+run/,        'rtk cargo run'],
    [/^cargo\s+fmt/,        'rtk cargo fmt'],
    [/^cargo\s+doc/,        'rtk cargo doc'],
    [/^cargo\s+bench/,      'rtk cargo bench'],
    [/^rustfmt\s/,          'rtk rustfmt '],
    [/^rustup\s/,           'rtk rustup '],

    // ── TypeScript / JS tools ──
    [/^vitest\s/,           'rtk vitest run'],
    [/^(npx\s+)?tsc\s/,     'rtk tsc'],
    [/^(npx\s+)?eslint\s/,  'rtk lint'],
    [/^(npx\s+)?oxfmt\s/,   'rtk oxfmt'],
    [/^(npx\s+)?playwright\s/, 'rtk playwright'],
    [/^npx\s+/,             'rtk npx '],
    [/^jest\s/,             'rtk jest '],
    [/^cypress\s/,          'rtk cypress '],

    // ── Package managers ──
    [/^pnpm\s+(list|ls|outdated)/,  'rtk pnpm '],
    [/^pnpm\s+test/,                'rtk vitest run'],
    [/^pnpm\s+lint/,                'rtk lint'],
    [/^pnpm\s+install/,             'rtk pnpm install'],
    [/^npm\s+(run|test|build|start|lint)/, 'rtk npm '],
    [/^npm\s+(install|i)\s/,        'rtk npm install '],
    [/^npm\s+(list|ls|outdated)/,   'rtk npm '],
    [/^npm\s+audit/,                'rtk npm '],
    [/^npm\s+ci/,                   'rtk npm ci '],
    [/^yarn\s+/,                    'rtk yarn '],
    [/^bun\s+/,                     'rtk bun '],

    // ── Python ecosystem ──
    [/^pytest/,             'rtk pytest'],
    [/^ruff\s/,             'rtk ruff '],
    [/^python3?\s/,         'rtk python '],
    [/^pip\s+install/,      'rtk pip install '],
    [/^pip\s+(list|freeze)/,'rtk pip '],
    [/^mypy\s/,             'rtk mypy '],
    [/^black\s/,            'rtk black '],
    [/^uv\s+/,              'rtk uv '],
    [/^poetry\s+/,          'rtk poetry '],

    // ── Go ──
    [/^go\s+test/,          'rtk go test'],
    [/^go\s+build/,         'rtk go build'],
    [/^go\s+vet/,           'rtk go vet'],
    [/^go\s+run/,           'rtk go run'],
    [/^go\s+mod/,           'rtk go mod'],
    [/^go\s+fmt/,           'rtk go fmt'],
    [/^go\s+get/,           'rtk go get'],
    [/^go\s+list/,          'rtk go list'],
    [/^golangci-lint/,      'rtk golangci-lint'],

    // ── Oparry / Pamacea ──
    [/^oparry\s+(check|init|watch|config)/, 'rtk oparry '],

    // ── Docker / K8s ──
    [/^docker\s+(ps|images|logs|run|exec|compose|build)/, 'rtk docker '],
    [/^docker-compose\s+/, 'rtk docker compose '],
    [/^kubectl\s+(get|logs|describe|apply|delete|exec)/, 'rtk kubectl '],
    [/^helm\s+/,            'rtk helm '],

    // ── Build tools ──
    [/^make(\s.*)?$/,       'rtk make '],
    [/^cmake\s/,            'rtk cmake '],
    [/^terraform\s/,        'rtk terraform '],
    [/^ansible-playbook\s/, 'rtk ansible-playbook '],

    // ── Network ──
    [/^curl\s/,             'rtk curl '],
    [/^wget\s/,             'rtk wget '],
    [/^http\s/,             'rtk http '],

    // ── System / env ──
    [/^(env|printenv)\b/,   'rtk env '],
    [/^which\b/,            'rtk which '],
    [/^ps\s+/,              'rtk ps '],
    [/^df\s+/,              'rtk df '],
    [/^du\s+/,              'rtk du '],
];

// ─── Main ───
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
    let data;
    try { data = JSON.parse(input); } catch { process.exit(0); }

    const toolInput = data?.tool_input || {};
    const command = toolInput?.command;
    if (!command || typeof command !== 'string') { process.exit(0); }

    // Skip already-rewritten commands
    if (/^(rtk|aureus)\s/.test(command)) { process.exit(0); }

    // Skip heredocs (<<WORD) and subshell/variable expansions
    if (/<<[-~]?\w/.test(command)) { process.exit(0); }
    if (/\$\(/.test(command) || /\$\{/.test(command)) { process.exit(0); }

    // Extract first command (before &&, ||, |)
    const firstCmd = command.split(/&&|\|\||\|/)[0].trim();

    // ── 1. Aureus rewrite (git commit → aureus commit) ──
    if (/^git\s+commit\b/.test(firstCmd) && checkAureus()) {
        const rewritten = command.replace(/^git\s+commit\b/, 'aureus commit');
        outputResult(rewritten, 'Aureus: git commit → aureus commit');
        return;
    }

    // ── 2. RTK rewrites ──
    for (const [pattern, replacement] of REWRITES) {
        if (pattern.test(firstCmd)) {
            const rewritten = command.replace(pattern, replacement);
            outputResult(rewritten, 'RTK auto-rewrite');
            return;
        }
    }

    // No rewrite — exit silently
    process.exit(0);
});

function outputResult(rewritten, reason) {
    const result = {
        hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'allow',
            permissionDecisionReason: reason,
            updatedInput: {
                ...JSON.parse(input).tool_input,
                command: rewritten
            }
        }
    };
    process.stdout.write(JSON.stringify(result));
    process.exit(0);
}
