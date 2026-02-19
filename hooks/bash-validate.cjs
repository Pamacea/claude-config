#!/usr/bin/env node
/**
 * PreToolUse Hook - Bash Command Validation
 */

const fs = require('fs');

const INPUT = process.stdin.read() || '';

function check() {
  try {
    const data = JSON.parse(INPUT);

    if (data.tool_input?.command) {
      const cmd = data.tool_input.command;

      // Check for dangerous grep/glob usage
      if (cmd.includes('grep ') || cmd.includes('glob ') || cmd.includes('find ')) {
        console.error('⚠️  Consider using /toolkit search instead of grep/glob');
        console.error('   Example: /toolkit search "your query"\n');
      }

      // Check for dangerous patterns
      if (cmd.includes('--force') || cmd.includes('rm -rf')) {
        console.error('⚠️  DANGEROUS COMMAND detected!');
        console.error('   Please verify this is intended.\n');
      }
    }
  } catch (e) {
    // Ignore JSON errors
  }

  return 0;
}

process.exit(check());
