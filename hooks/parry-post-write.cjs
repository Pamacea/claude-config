#!/usr/bin/env node
/**
 * Parry Post-Write Hook for Claude Code
 * Validates and auto-corrects code after Write/Edit operations.
 *
 * Protocol: stdin JSON → exit 0 (PostToolUse)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PARRY_BIN = process.env.PARRY_BIN || 'parry';
const PARRY_AUTO_FIX = process.env.PARRY_AUTO_FIX !== 'false';
const PARRY_DEBUG = process.env.PARRY_DEBUG === 'true';
const PARRY_CONFIG = process.env.PARRY_CONFIG;

const VALID_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.rs', '.mjs', '.cjs'];

const EXCLUDE_PATHS = [
    'node_modules',
    '.git',
    'target',
    'dist',
    'build',
    '.next',
    '.claude',
];

function shouldValidate(filePath) {
    const ext = path.extname(filePath);
    if (!VALID_EXTENSIONS.includes(ext)) return false;
    for (const exclude of EXCLUDE_PATHS) {
        if (filePath.includes(exclude)) return false;
    }
    return true;
}

function validateFile(filePath) {
    const cmd = [PARRY_BIN, 'check', filePath, '--fix'];
    if (PARRY_CONFIG) cmd.push('--config', PARRY_CONFIG);

    if (PARRY_DEBUG) console.error('[Parry] Running: ' + cmd.join(' '));

    try {
        const output = execSync(cmd.join(' '), {
            encoding: 'utf-8',
            stdio: PARRY_DEBUG ? 'inherit' : 'pipe',
            timeout: 10000,
        });
        if (PARRY_DEBUG && output) console.error('[Parry] Output:', output);
        return { success: true, output };
    } catch (error) {
        const stdout = error.stdout || '';
        const stderr = error.stderr || '';
        if (PARRY_DEBUG) {
            console.error('[Parry] Validation failed:', error.status);
            console.error('[Parry] Stdout:', stdout);
            console.error('[Parry] Stderr:', stderr);
        }
        return { success: false, output: stdout || stderr, exitCode: error.status || 1 };
    }
}

// ─── Main: read from stdin ───
let inputData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { inputData += chunk; });
process.stdin.on('end', () => {
    let context;
    try { context = JSON.parse(inputData); } catch { process.exit(0); }

    if (PARRY_DEBUG) {
        console.error('[Parry] Post-write hook started');
        console.error('[Parry] Context:', JSON.stringify(context).substring(0, 200));
    }

    // Extract file path from tool_input or tool_response
    const filePath = context?.tool_input?.file_path || context?.tool_response?.filePath;

    if (!filePath || !shouldValidate(filePath)) {
        if (PARRY_DEBUG) console.error('[Parry] No valid file to validate');
        process.exit(0);
    }

    if (PARRY_DEBUG) console.error('[Parry] Validating: ' + filePath);

    const result = validateFile(filePath);

    if (!result.success) {
        const output = result.output || '';
        if (output.includes('Fixed')) {
            console.error('[Parry] Auto-fixed issues in ' + path.basename(filePath));
        } else if (output) {
            console.error('[Parry] Issues in ' + path.basename(filePath) + ': ' + output.substring(0, 500));
        }
    }

    if (PARRY_DEBUG) console.error('[Parry] Hook completed');
    process.exit(0);
});
