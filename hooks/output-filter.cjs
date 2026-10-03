#!/usr/bin/env node
// output-filter.cjs — Alerte si output Bash/Grep/Glob > 10KB
// Protocole hooks Claude Code: stdin = { session_id, tool_name, tool_input, tool_output, working_directory }

const fs = require('fs');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  if (!input.trim()) { process.exit(0); return; }

  let data;
  try { data = JSON.parse(input); } catch { process.exit(0); return; }

  const toolName = data.tool_name || '';
  const toolOutput = data.tool_output || '';

  if (!toolOutput || typeof toolOutput !== 'string') { process.exit(0); return; }

  const resultLen = toolOutput.length;

  // Output > 50KB : alerte agressive
  if (resultLen > 50000) {
    process.stdout.write(JSON.stringify({
      systemMessage: `Output very large (${resultLen} chars). Summarize key findings in under 20 lines. Do NOT repeat the full output.`
    }));
    process.exit(0);
    return;
  }

  // Output > 10KB (Bash uniquement) : alerte modérée
  if (toolName === 'Bash' && resultLen > 10000) {
    const lines = toolOutput.split('\n').length;
    process.stdout.write(JSON.stringify({
      systemMessage: `Bash output: ${lines} lines, ${resultLen} chars. Extract only relevant information. Do NOT repeat the full output.`
    }));
    process.exit(0);
    return;
  }

  // Grep/Glob avec beaucoup de résultats
  if ((toolName === 'Grep' || toolName === 'Glob') && resultLen > 20000) {
    process.stdout.write(JSON.stringify({
      systemMessage: `Large search results (${resultLen} chars). Focus on the most relevant matches. Summarize patterns found.`
    }));
    process.exit(0);
    return;
  }

  // Pas d'alerte — sortie silencieuse
  process.exit(0);
});
