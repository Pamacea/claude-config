#!/usr/bin/env node
/**
 * ARGUS PreToolUse Hook
 * Consults ARGUS memory before Explore/CreateTeam/Agent/Plan/Bash
 *
 * Protocol: stdin JSON → stdout JSON (hookSpecificOutput)
 */

const { spawnSync } = require('child_process');

// Commands to skip for Bash (exploratory/trivial)
const BASH_SKIP = /^(ls|dir|pwd|git status|git log|git diff|cat |head |tail |rtk |echo |which |env |printenv|tree |bat )/;

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
    let data;
    try { data = JSON.parse(input); } catch { process.exit(0); }

    const toolName = data?.tool_name || '';
    const toolInput = data?.tool_input || {};

    // Target tools
    const targetTools = ['Explore', 'CreateTeam', 'Task', 'Agent', 'Plan', 'Bash'];
    if (!targetTools.includes(toolName)) { process.exit(0); }

    let prompt = '';

    if (toolName === 'Bash') {
        const cmd = toolInput?.command || '';
        // Only recall for non-trivial commands
        if (!cmd || BASH_SKIP.test(cmd)) { process.exit(0); }
        prompt = cmd;
    } else {
        prompt = toolInput?.prompt || toolInput?.description || toolInput?.query || '';
    }

    if (!prompt || prompt.length < 5) { process.exit(0); }

    // Search ARGUS memory
    try {
        const argus = spawnSync('argus', ['recall', prompt, '--limit', '2', '--json'], {
            stdio: ['ignore', 'pipe', 'ignore'],
            timeout: 2000,
            shell: false,
            encoding: 'utf-8'
        });

        if (argus.status === 0 && argus.stdout && argus.stdout.trim()) {
            const results = JSON.parse(argus.stdout);
            if (Array.isArray(results) && results.length > 0) {
                // Compact format — minimal tokens
                const memories = results.map(r => {
                    const summary = (r.summary || r.prompt || '').substring(0, 60);
                    const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : '';
                    return '"' + summary + '"' + (date ? ' (' + date + ')' : '');
                }).join(', ');

                const ctx = '[ARGUS] ' + results.length + ' memories: ' + memories;

                const output = {
                    hookSpecificOutput: {
                        hookEventName: 'PreToolUse',
                        permissionDecision: 'allow',
                        additionalContext: ctx
                    }
                };
                process.stdout.write(JSON.stringify(output));
                process.exit(0);
                return;
            }
        }
    } catch {
        // Silent fail
    }

    process.exit(0);
});
