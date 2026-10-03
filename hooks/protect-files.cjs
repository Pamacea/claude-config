#!/usr/bin/env node
// protect-files.cjs — Bloque edit/write sur fichiers sensibles
// Protocole hooks Claude Code: stdin = { session_id, tool_name, tool_input: { file_path, ... }, tool_output, working_directory }

const fs = require('fs');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  if (!input.trim()) { process.exit(0); return; }

  let data;
  try { data = JSON.parse(input); } catch { process.exit(0); return; }

  const toolInput = data.tool_input || {};
  const filePath = toolInput.file_path || '';

  if (!filePath) { process.exit(0); return; }

  // Patterns de fichiers sensibles
  const sensitivePatterns = [
    /\.env$/,
    /\.env\./,
    /credentials/i,
    /secrets/i,
    /private.*key/i,
    /id_rsa/,
    /id_ed25519/,
    /\.pem$/,
    /\.p12$/,
    /\.pfx$/,
    /wallet\.json/i,
    /keystore/i,
    /\.key$/,
    /token.*\.json$/i,
    /password/i,
    /master\.key/,
    /database\.yml$/,
    /docker-compose\.override\.yml$/
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(filePath)) {
      process.stderr.write(`BLOCKED: Cannot edit sensitive file: ${filePath}\n`);
      process.stderr.write(`Pattern matched: ${pattern}\n`);
      process.exit(1);
      return;
    }
  }

  process.exit(0);
});
