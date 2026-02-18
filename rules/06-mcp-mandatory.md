# MCP Mandatory - Strong Suggestions for Tool Usage

> **Version:** 1.0.0 | **Approach:** Strong Suggestions (Not Blocking)
>
> **Available MCPs:** claude-mem, git-flow-master, chrome-devtools, z-ai, web-reader, web-search-prime

---

## 🎯 CORE PRINCIPLE

**Before ANY significant action, check:**
1. Should I use memory? → claude-mem
2. Should I commit? → Git Flow Master
3. Should I debug UI? → Chrome DevTools
4. Should I analyze visual? → z-ai

---

## 📊 MCP REFERENCE

| MCP | When to Use | Trigger Keywords |
|-----|-------------|------------------|
| **claude-mem** | Search/save memory | "did we", "how did we", "remember" |
| **git-flow-master** | Versioned commits | "commit", "release", "update", "patch" |
| **chrome-devtools** | UI debugging | "debug UI", "test page", "screenshot" |
| **z-ai** | Image/video analysis | "analyze image", "screenshot error", "video" |
| **web-reader** | Fetch web content | "read URL", "fetch page", "scrape" |
| **web-search-prime** | Search web | "latest docs", "current info", "search" |

---

## 🧠 CLAUDE-MEM (Memory)

### When to Use claude-mem

**USE IT:**
- ✅ "Did we solve this before?"
- ✅ "How did we implement X?"
- ✅ "What was the solution for Y?"
- ✅ "Remember this for later"

**Search First:**
```markdown
Before implementing:
1. Search claude-mem for similar problems
2. Check if solution already exists
3. Use existing approach

After solving:
1. Save solution to claude-mem
2. Include context and code snippet
3. Make it searchable
```

### Examples

```typescript
// ❌ BAD - Implementing without checking
// Just implementing from scratch

// ✅ GOOD - Check memory first
// 1. Search: "auth pattern JWT refresh token"
// 2. Find existing solution
// 3. Apply same pattern
// 4. Save variations if improved
```

### Memory Categories

| Category | What to Store |
|----------|---------------|
| **Solutions** | Working code patterns |
| **Mistakes** | What NOT to do |
| **Decisions** | Tech choices + rationale |
| **Workflows** | Repeatable processes |

---

## 🔄 GIT FLOW MASTER

### When to Use Git Flow Master

**USE IT:**
- ✅ Creating commits (RELEASE, UPDATE, PATCH)
- ✅ Analyzing changes for SemVer
- ✅ Generating release notes
- ✅ Validating commit messages

### Commit Workflow

```markdown
Before committing:
1. git_get_status - Check what changed
2. git_suggest_type - Get commit type
3. git_generate_message - Generate proper message
4. Run lint/typecheck/tests
5. git_versioned_commit - Create commit

After feature complete:
1. git_analyze_commits - Check SemVer impact
2. git_create_release - Create release with changelog
```

### Commit Format

```
TYPE: PROJECT_NAME - vX.Y.Z

- Change 1
- Change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Types

| Type | SemVer | When |
|------|--------|------|
| **RELEASE** | MAJOR | Breaking changes |
| **UPDATE** | MINOR | New features |
| **PATCH** | PATCH | Bug fixes |

---

## 🌐 CHROME DEVTOOLS

### When to Use Chrome DevTools

**USE IT:**
- ✅ "Debug this UI issue"
- ✅ "Test this page"
- ✅ "Take screenshot"
- ✅ "Check console errors"
- ✅ "Analyze network requests"

### Workflow

```markdown
UI Debugging:
1. list_pages - See open pages
2. navigate_page - Go to URL
3. take_snapshot - Get page structure
4. list_console_messages - Check errors
5. take_screenshot - Visual verification

Interactive testing:
1. click / fill / hover - Test interactions
2. list_network_requests - Check API calls
3. evaluate_script - Run custom JS
```

### Examples

```typescript
// Debugging layout issue
// 1. Take snapshot to see structure
// 2. Check computed styles
// 3. Verify responsive behavior

// Testing form
// 1. Fill form fields
// 2. Submit form
// 3. Check network request
// 4. Verify response
```

---

## 🖼️ Z-AI (Visual Analysis)

### When to Use z-ai

**USE IT:**
- ✅ "Analyze this screenshot"
- ✅ "What's this error message?"
- ✅ "Convert this UI to code"
- ✅ "Compare two designs"
- ✅ "Extract text from image"

### Tools Available

| Tool | Purpose |
|------|---------|
| `ui_to_artifact` | UI → Code/prompt/spec |
| `extract_text_from_screenshot` | OCR for code/text |
| `diagnose_error_screenshot` | Debug error messages |
| `ui_diff_check` | Compare two UIs |
| `analyze_data_visualization` | Charts/graphs analysis |
| `analyze_video` | Video content analysis |

### Examples

```markdown
// Converting UI design to code
analyze_image(prompt="Describe layout, colors, components for code generation")

// Debugging error
diagnose_error_screenshot(
  image_source="error.png",
  prompt="Getting TypeError when clicking submit"
)

// Comparing designs
ui_diff_check(
  expected_image="design.png",
  actual_image="implementation.png",
  prompt="Check spacing, colors, alignment"
)
```

---

## 📖 WEB READER & SEARCH

### When to Use

**web-reader:**
- ✅ "Read this documentation page"
- ✅ "Fetch content from URL"
- ✅ "Get article content as markdown"

**web-search-prime:**
- ✅ "Latest docs for [library]"
- ✅ "Current best practices for [topic]"
- ✅ "What's new in [framework]"

### Workflow

```markdown
Before implementing (post-2024 libraries):
1. web-search-prime - Find latest docs
2. web-reader - Read full documentation
3. Check breaking changes
4. Verify examples work
```

---

## ✅ PRE-ACTION CHECKLIST

### Before Implementing Feature

```markdown
Memory Check:
☐ Search claude-mem for similar implementations
☐ Check if solution exists in project memory
☐ Look for past mistakes to avoid

Code Quality:
☐ Check for existing reusable components
☐ Verify patterns in project
☐ Consider delete-first approach

After Implementation:
☐ Save successful pattern to claude-mem
☐ Document any new decisions
☐ Update project memory if needed
```

### Before Committing

```markdown
Git Workflow:
☐ git_get_status - Check changes
☐ git_suggest_type - Get commit type
☐ git_generate_message - Format message
☐ Run quality gates (lint, typecheck, test)
☐ git_versioned_commit - Create commit
```

### Before UI Work

```markdown
UI Debugging:
☐ Navigate to page with chrome-devtools
☐ Take snapshot for structure
☐ Check console for errors
☐ Take screenshot for visual check
☐ Test interactions if needed
```

---

## 🎯 MCP SELECTION GUIDE

```
┌─────────────────────────────────────────┐
│ What do you need to do?                 │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Check memory / reuse past work?         │ → claude-mem
├─────────────────────────────────────────┤
│ Commit changes with versioning?         │ → git-flow-master
├─────────────────────────────────────────┤
│ Debug/test UI in browser?               │ → chrome-devtools
├─────────────────────────────────────────┤
│ Analyze image/screenshot/video?         │ → z-ai
├─────────────────────────────────────────┤
│ Read docs from URL?                     │ → web-reader
├─────────────────────────────────────────┤
│ Search latest info online?              │ → web-search-prime
└─────────────────────────────────────────┘
```

---

## 📋 SUGGESTION PROMPTS

### For Claude (Self-Reminder)

```
When working on a task:
→ "Let me check claude-mem for similar solutions first"
→ "I should use git-flow-master for this commit"
→ "Let me debug this with chrome-devtools"
→ "I can analyze this screenshot with z-ai"

Before committing:
→ "Let me use git-flow-master to format this properly"

After solving:
→ "Let me save this to claude-mem for future reference"
```

---

## 🔧 MCP CONFIGURATION

Ensure these MCPs are installed:

```json
{
  "mcpServers": {
    "claude-mem": { /* ... */ },
    "git-flow-master": { /* ... */ },
    "chrome-devtools": { /* ... */ },
    "z-ai": { /* ... */ },
    "web-reader": { /* ... */ },
    "web-search-prime": { /* ... */ }
  }
}
```

---

*Version: 1.0.0 | MCP Mandatory - Strong Suggestions*
