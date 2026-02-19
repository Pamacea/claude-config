#!/usr/bin/env node
/**
 * PostToolUse Hook - Task Progress Tracker
 */

const fs = require('fs');
const path = require('path');

const HOOKS_DIR = path.dirname(__filename);
const STATE_FILE = path.join(HOOKS_DIR, 'state.json');

const INPUT = process.stdin.read() || '';

function check() {
  try {
    const data = JSON.parse(INPUT);

    // Track task operations
    let state = {};
    if (fs.existsSync(STATE_FILE)) {
      try {
        state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      } catch (e) {
        // Ignore
      }
    }

    if (data.tool_name === 'TaskCreate') {
      if (!state.taskCount) state.taskCount = 0;
      state.taskCount++;
      state.lastTask = Date.now();

      console.error(`📋 Task created (total: ${state.taskCount})`);
      console.error('   Use /tasks to see progress\n');
    } else if (data.tool_name === 'TaskUpdate') {
      console.error('📋 Task updated');
      console.error('   Use /tasks to see progress\n');
    }

    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    // Ignore JSON errors
  }

  return 0;
}

process.exit(check());
