#!/usr/bin/env node
// pre-compact.cjs — Préserve le contexte critique avant compaction
// Inspiré de claude-craft pre-compact.json

const fs = require('fs');
const path = require('path');

// Chercher context-essentials.md dans le projet courant
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const essentialsPath = path.join(projectDir, 'context-essentials.md');

// Aussi chercher dans ~/.claude/ pour le context global
const homeDir = process.env.HOME || process.env.USERPROFILE || '';
const globalEssentialsPath = path.join(homeDir, '.claude', 'context-essentials.md');

let output = '';

// Priorité : contexte projet > contexte global
const paths = [essentialsPath, globalEssentialsPath];

for (const p of paths) {
  try {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8').substring(0, 8000); // Max 8KB
      output += `\n\n--- CONTEXT FROM: ${p} ---\n${content}\n--- END CONTEXT ---`;
    }
  } catch {
    // Ignorer les erreurs de lecture
  }
}

if (output) {
  const msg = {
    systemMessage: `CRITICAL CONTEXT TO PRESERVE (pre-compaction):\n${output}`
  };
  console.log(JSON.stringify(msg));
} else {
  console.log('{}');
}

process.exit(0);
