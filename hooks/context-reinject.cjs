#!/usr/bin/env node
// context-reinject.cjs — Re-injecte le contexte critique après compaction
// Inspiré de claude-craft context-reinject.json

const fs = require('fs');
const path = require('path');

// Chercher context-essentials.md dans le projet courant
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const essentialsPath = path.join(projectDir, 'context-essentials.md');

// Aussi chercher dans ~/.claude/ pour le context global
const homeDir = process.env.HOME || process.env.USERPROFILE || '';
const globalEssentialsPath = path.join(homeDir, '.claude', 'context-essentials.md');

let output = '';

const paths = [essentialsPath, globalEssentialsPath];

for (const p of paths) {
  try {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8').substring(0, 6000); // Max 6KB pour reinject
      output += `\n\n--- CONTEXT RESTORED FROM: ${p} ---\n${content}\n--- END CONTEXT ---`;
    }
  } catch {
    // Ignorer les erreurs de lecture
  }
}

if (output) {
  const msg = {
    systemMessage: `CONTEXT RESTORED AFTER COMPACTION:${output}\n\nReminder: You have access to critical project context above. Use it to maintain continuity.`
  };
  console.log(JSON.stringify(msg));
} else {
  // Message par défaut si aucun context-essentials.md trouvé
  const msg = {
    systemMessage: 'No context-essentials.md found. Create one in your project root or ~/.claude/ with critical architectural decisions, conventions, and current tasks. This context will survive compaction.'
  };
  console.log(JSON.stringify(msg));
}

process.exit(0);
