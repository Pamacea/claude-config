#!/usr/bin/env node
/**
 * ARGUS SessionEnd Hook (v0.9.0)
 * Processes the async queue at session end
 * Calls argus process-queue to flush pending entries to the database
 */

const { spawnSync } = require('child_process');

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

        const sessionId = context?.session_id;

        // Process queue
        try {
            const args = ['process-queue', '--limit', '100'];
            if (sessionId) {
                args.push('--session', sessionId);
            }

            spawnSync('argus', args, {
                stdio: 'ignore',
                shell: false,
                timeout: 15000
            });
        } catch (err) {
            // Silent fail
        }

        process.exit(0);
    });
}

main();
