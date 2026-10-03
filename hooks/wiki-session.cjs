#!/usr/bin/env node
/**
 * wiki-session.cjs — SessionStart Hook
 * Injecte le protocole wiki Obsidian (_wiki/_meta/instructions/general.md)
 * pour que le "second cerveau" soit réellement chargé à chaque démarrage.
 *
 * Output: hookSpecificOutput.additionalContext
 */

const fs = require('fs');
const path = require('path');

const MAX_CHARS = 4000;

function main() {
    let inputData = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { inputData += chunk; });
    process.stdin.on('end', () => {
        try {
            const home = process.env.HOME || process.env.USERPROFILE || '';
            const generalPath = path.join(home, '.claude', '_wiki', '_meta', 'instructions', 'general.md');

            if (!fs.existsSync(generalPath)) {
                process.exit(0);
            }

            const content = fs.readFileSync(generalPath, 'utf8').substring(0, MAX_CHARS);
            const output = JSON.stringify({
                hookSpecificOutput: {
                    hookEventName: 'SessionStart',
                    additionalContext: `--- WIKI PROTOCOL (Obsidian second brain) ---\n${content}\n--- END WIKI PROTOCOL ---`
                }
            });
            process.stdout.write(output + '\n');
        } catch {
            // Échec silencieux — non bloquant
        }
        process.exit(0);
    });
}

main();
