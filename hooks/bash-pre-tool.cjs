#!/usr/bin/env node
/**
 * Bash PreToolUse Hook — Aureus commit rewrite
 * Réécrit `git commit` → `aureus commit`.
 * La réécriture RTK est gérée par le hook officiel `rtk hook claude`.
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

    // Aureus rewrite: git commit → aureus commit
    if (/^git\s+commit\b/.test(firstCmd) && checkAureus()) {
        const rewritten = command.replace(/^git\s+commit\b/, 'aureus commit');
        outputResult(rewritten, 'Aureus: git commit → aureus commit');
        return;
    }

    // No rewrite — RTK hook handles the rest
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
