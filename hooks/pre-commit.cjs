#!/usr/bin/env node
/**
 * Pre-commit hook - Mandatory validation pipeline
 * Cross-platform Git hook (Node.js)
 *
 * Installation:
 *   cp hooks/pre-commit.cjs .git/hooks/pre-commit
 *   chmod +x .git/hooks/pre-commit
 *
 * Or use Husky: npm install -D husky && npx husky set .husky/pre-commit 'node hooks/pre-commit.cjs'
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
};

function run(cmd, quiet = true) {
  try {
    const stdio = quiet ? 'pipe' : 'inherit';
    execSync(cmd, { stdio });
    return true;
  } catch (err) {
    return false;
  }
}

function checkRust() {
  if (!fs.existsSync('Cargo.toml')) return null;

  log.info('📦 Rust project detected');

  const checks = [
    { name: 'cargo check', cmd: 'cargo check --quiet' },
    { name: 'cargo clippy', cmd: 'cargo clippy --quiet -- -D warnings' },
    { name: 'cargo fmt check', cmd: 'cargo fmt --check --quiet' },
    { name: 'cargo test', cmd: 'cargo test --quiet' },
  ];

  for (const check of checks) {
    process.stdout.write(`  ▶ ${check.name}... `);
    if (run(check.cmd, true)) {
      log.success('✅');
    } else {
      log.error('❌');
      log.error(`  Fix: Run '${check.cmd.replace('--quiet', '')}' to see errors`);
      return false;
    }
  }

  return true;
}

function checkTypeScript() {
  if (!fs.existsSync('package.json')) return null;

  // Check if it's a TS project
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const isTS = fs.existsSync('tsconfig.json') || pkg.dependencies?.typescript;

  if (!isTS) return null;

  log.info('📦 TypeScript project detected');

  const checks = [];

  // typecheck
  if (pkg.scripts?.typecheck) {
    checks.push({ name: 'typecheck', cmd: 'npm run typecheck --silent' });
  } else if (fs.existsSync('tsconfig.json')) {
    checks.push({ name: 'tsc', cmd: 'npx tsc --noEmit' });
  }

  // lint
  if (pkg.scripts?.lint) {
    checks.push({ name: 'lint', cmd: 'npm run lint --silent' });
  } else if (pkg.devDependencies?.eslint || pkg.devDependencies?.['@biomejs/biome']) {
    checks.push({ name: 'lint', cmd: 'npx eslint .' });
  }

  for (const check of checks) {
    process.stdout.write(`  ▶ ${check.name}... `);
    if (run(check.cmd, true)) {
      log.success('✅');
    } else {
      log.error('❌');
      log.error(`  Fix: Run '${check.cmd.replace('--silent', '')}' to see errors`);
      return false;
    }
  }

  return true;
}

function checkE2E() {
  const playwrightConfigs = [
    'playwright.config.ts',
    'playwright.config.js',
    'playwright.config.mjs',
  ];

  const hasPlaywright = playwrightConfigs.some((f) => fs.existsSync(f));
  if (!hasPlaywright) return null;

  log.info('📦 E2E tests detected (Playwright)');

  process.stdout.write('  ▶ playwright test... ');
  if (run('npx playwright test --quiet', true)) {
    log.success('✅');
    return true;
  } else {
    log.error('❌');
    log.error("  Fix: Run 'npx playwright test' to see failures");
    return false;
  }
}

function main() {
  console.log('');
  log.info('🔍 Pre-commit validation pipeline...');
  console.log('==================================');

  const results = [];

  // Run all checks
  const rustResult = checkRust();
  if (rustResult !== null) results.push(rustResult);

  const tsResult = checkTypeScript();
  if (tsResult !== null) results.push(tsResult);

  const e2eResult = checkE2E();
  if (e2eResult !== null) results.push(e2eResult);

  // If no checks ran, allow commit (not a recognized project type)
  if (results.length === 0) {
    log.warn('⚠️  No validation gates found for this project');
    console.log('');
    return 0;
  }

  // Check if all passed
  if (results.every((r) => r === true)) {
    console.log('');
    log.success('✅ All validation gates passed!');
    console.log('==================================');
    console.log('');
    return 0;
  }

  console.log('');
  log.error('❌ Validation failed. Commit aborted.');
  console.log('');
  return 1;
}

process.exit(main());
