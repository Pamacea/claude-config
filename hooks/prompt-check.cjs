#!/usr/bin/env node
/**
 * UserPromptSubmit Hook - Memory Search Suggestion
 */

const fs = require('fs');

const INPUT = process.stdin.read() || '';

function check() {
  const suggestions = [];

  // Check if question might benefit from memory search
  const keywords = ['did we', 'how did we', 'remember', 'previous', 'last time', 'before'];

  if (keywords.some(kw => INPUT.toLowerCase().includes(kw))) {
    suggestions.push('💡 Tip: Use /mem-search to check if we solved this before');
  }

  // Check for complex tasks
  const taskKeywords = ['build', 'implement', 'create', 'refactor', 'feature'];

  if (taskKeywords.some(kw => INPUT.toLowerCase().includes(kw))) {
    suggestions.push('💡 Tip: Consider /studio build for implementation');
  }

  if (suggestions.length > 0) {
    console.error('\n' + suggestions.join('\n') + '\n');
  }

  return 0;
}

process.exit(check());
