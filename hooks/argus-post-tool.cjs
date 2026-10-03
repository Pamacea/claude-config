#!/usr/bin/env node
/**
 * ARGUS PostToolUse Hook (v0.9.0)
 * Writes actions to async queue instead of synchronous CLI calls
 * Queue is processed at SessionEnd via argus process-queue
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
    let inputData = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { inputData += chunk; });
    process.stdin.on('end', () => {
        let context = {};
        try {
            context = JSON.parse(inputData);
        } catch (e) {
            process.exit(0);
            return;
        }

        const toolName = context?.tool_name || '';
        const toolInput = context?.tool_input || {};
        const sessionId = context?.session_id || 'unknown';

        // Build description based on tool
        let description = '';
        let category = 'action';
        let tags = [];
        let type = 'action';

        switch (toolName) {
            case 'Edit':
                description = `Modified ${toolInput?.file_path || 'unknown file'}`;
                category = 'edit';
                break;
            case 'Write':
                description = `Created ${toolInput?.file_path || 'unknown file'}`;
                category = 'create';
                tags.push('new-file');
                break;
            case 'Explore':
                description = `Explored: ${toolInput?.prompt || toolInput?.query || 'unknown'}`;
                category = 'explore';
                break;
            case 'CreateTeam':
                description = `Created team: ${toolInput?.team_name || 'unknown'}`;
                category = 'team';
                tags.push('collaboration');
                break;
            case 'Bash': {
                const cmd = toolInput?.command || '';
                // Skip noisy/read-only/trivial commands
                if (/^(git status|git log|git diff|ls|dir|pwd|rtk |cat |head |tail |argus |echo |which |env |printenv|find |grep |rg |tree |bat )/.test(cmd)) {
                    process.exit(0);
                    return;
                }
                description = `Executed: ${cmd.substring(0, 80)}${cmd.length > 80 ? '...' : ''}`;
                category = 'command';
                break;
            }
            default:
                process.exit(0);
                return;
        }

        if (!description || description.length < 20) {
            process.exit(0);
            return;
        }

        // Auto-detect observation type from description
        const descLower = description.toLowerCase();
        if (descLower.includes('fix') || descLower.includes('bug') || descLower.includes('error')) {
            type = 'problem-solution';
            tags.push('bugfix');
        } else if (descLower.includes('decide') || descLower.includes('chose') || descLower.includes('selected')) {
            type = 'decision';
        } else if (descLower.includes('discover') || descLower.includes('found') || descLower.includes('learned')) {
            type = 'discovery';
        }
        if (descLower.includes('test')) tags.push('test');

        // Write to queue file (async JSONL)
        try {
            const queueDir = path.join(os.homedir(), '.argus', 'queue');
            fs.mkdirSync(queueDir, { recursive: true });

            const queueFile = path.join(queueDir, `${sessionId}.jsonl`);
            const queueEntry = {
                description,
                category,
                type,
                tags,
                timestamp: Date.now(),
                sessionId
            };

            fs.appendFileSync(queueFile, JSON.stringify(queueEntry) + '\n');
        } catch (err) {
            // Silent fail — queue write failed
        }

        process.exit(0);
    });
}

main();
