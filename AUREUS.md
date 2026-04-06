# Aureus VRC Integration

> **Note**: Add this to your project's CLAUDE.md:
> ```markdown
> See \`~/.claude/AUREUS.md\` for Versioned Release Convention (VRC) details.
> ```

Aureus VRC provides **Versioned Release Convention** for Git workflows.

## Quick Start

```bash
# Create a versioned commit
git commit -m "feat: new feature"
# → Automatically rewritten to: aureus commit

# Suggest versions
aureus suggest

# Create a release
aureus release --auto
```

## Convention Configuration

### Commit Format

```
TYPE: PROJECT - vX.Y.Z

- Change description
```

### Commit Types

| Type | SemVer | Trigger Keywords | Usage |
|------|--------|------------------|-------|
| **RELEASE** | MAJOR (X.0.0) | `!`, `BREAKING`, `breaking` | Breaking changes |
| **UPDATE** | MINOR (0.X.0) | `feat`, `refactor`, `add` | New features |
| **PATCH** | PATCH (0.0.X) | `fix`, `bug`, `patch` | Bug fixes |

### Auto-Detection Rules

When you run `git commit -m "..."`, Aureus auto-detects the type:

```bash
git commit -m "feat: add authentication"
# → UPDATE: MyProject - v1.1.0

git commit -m "fix: login bug"
# → PATCH: MyProject - v1.1.1

git commit -m "BREAKING: change API"
# → RELEASE: MyProject - v2.0.0
```

### Customizing Convention

Edit this file to customize keywords:

```markdown
## Aureus Custom Convention

### Release Keywords
! BREAKING breaking major refactor API-change

### Update Keywords
feat feature added new refactor enhance improve

### Patch Keywords
fix bugfix patch corrected hotfix typo
```

### Project Name Detection

1. **Config**: Set in `~/.aureus/config.toml`:
   ```toml
   [project]
   name = "MyProject"
   ```

2. **Auto**: Falls back to directory name

3. **Override**: Use `aureus commit --project CustomName`

## Commands Reference

| Command | Description |
|---------|-------------|
| `aureus commit -m "msg"` | Create versioned commit |
| `aureus amend -m "more info"` | Amend last commit (same version) |
| `aureus release --auto` | Create release with tag |
| `aureus suggest` | Show version suggestions |
| `aureus config set project.name X` | Set project name |
| `aureus hooks status` | Check hooks status |

## Hook Behavior

The `PreToolUse` hook (Node.js module) intercepts:
- `git commit -m "message"` → `aureus commit -m "message"`
- `git commit` (no message) → `aureus commit` (prompts for message)
- `git commit --amend` → `aureus commit --amend`

To bypass: `git commit --no-verify` or use `aureus commit` directly.

## Hook File

Hook location: `~/.claude/hooks/aureus-rewrite.cjs`

This Node.js module integrates with Claude Code's hook system to transparently
rewrite git commands to aureus commands.

## Token Savings

Using Aureus saves tokens by:
- ✅ No MCP server overhead (native CLI)
- ✅ Auto-formatting commit messages
- ✅ Version auto-detection from keywords
- ✅ Single binary (~3MB RAM vs ~50MB for Node.js)
- ✅ Lightweight Node.js hook (minimal overhead)
