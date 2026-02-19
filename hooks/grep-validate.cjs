#!/usr/bin/env node
/**
 * PreToolUse Hook - Grep Validation
 */

const fs = require('fs');

const INPUT = process.stdin.read() || '';

function check() {
  console.error('⚠️  Consider using /toolkit search instead of Grep tool');
  console.error('   /toolkit search provides semantic search with better results.\n');

  return 0;
}

process.exit(check());
