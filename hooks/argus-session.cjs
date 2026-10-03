#!/usr/bin/env node
/**
 * ARGUS SessionStart Hook (v0.9.0)
 * Injects context from past sessions + auto-indexes project
 *
 * Outputs hookSpecificOutput.additionalContext for Claude Code
 */

const { spawnSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function main() {
    let inputData = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { inputData += chunk; });
    process.stdin.on('end', () => {
        let context = {};
        try {
            context = JSON.parse(inputData);
        } catch (e) {
            // No context provided
        }

        const workingDir = context?.working_directory || process.cwd();

        // Verify ARGUS CLI is available
        try {
            const check = spawnSync('argus', ['--version'], {
                stdio: 'pipe',
                timeout: 5000,
                shell: false
            });

            if (check.status !== 0) {
                process.stderr.write('[ARGUS] CLI not found\n');
                process.exit(0);
                return;
            }
        } catch (err) {
            process.exit(0);
            return;
        }

        // Auto-index current project if needed (background)
        const argusDir = path.join(require('os').homedir(), '.argus');
        const indexFile = path.join(argusDir, 'index.json');

        let shouldIndex = true;
        try {
            if (fs.existsSync(indexFile)) {
                const stats = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
                const lastIndexed = stats.lastIndexed || 0;
                const hoursSince = (Date.now() - lastIndexed) / (1000 * 60 * 60);
                shouldIndex = hoursSince > 3;
            }

            if (shouldIndex) {
                const index = spawn('argus', ['index'], {
                    stdio: 'ignore',
                    shell: false,
                    detached: true,
                    cwd: workingDir
                });
                index.unref();
            }
        } catch (err) {
            // Silent fail
        }

        // Context injection — get compact index of recent observations
        try {
            const contextResult = spawnSync('argus', [
                'context',
                '--project', workingDir,
                '--limit', '20'
            ], {
                encoding: 'utf8',
                timeout: 10000,
                shell: false
            });

            if (contextResult.status === 0 && contextResult.stdout && contextResult.stdout.trim().length > 20) {
                const output = JSON.stringify({
                    hookSpecificOutput: {
                        hookEventName: 'SessionStart',
                        additionalContext: contextResult.stdout.trim()
                    }
                });
                process.stdout.write(output + '\n');
            }
        } catch (err) {
            // Context injection failed silently — not critical
        }

        process.exit(0);
    });
}

main();
