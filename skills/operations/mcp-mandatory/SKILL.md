# MCP Mandatory - Strong Suggestions for Tool Usage

> **Version:** 2.0.0 | **Category:** Cat 3 (Commandes Opérationnelles) | **Difficulty:** Beginner
> **Auto-Activation:** "commit", "git", "debug UI", "screenshot", "analyze image", "docs", "search latest"
> **Tags:** [mcp, tools, git, debugging, memory, documentation]
> **Related:** All pattern skills - For implementation details
> **Last Updated:** 2025-03-12

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- User mentions "commit", "git", "version", "release"
- Working with git changes or versioning
- Need to debug/test UI in browser
- Analyzing images, screenshots, or videos
- Need to fetch/read documentation
- Searching for latest information online

**Note:** This is an operational skill (Cat 3) - provides tool usage guidance.

---

## 🚀 Quick Start

```bash
# Before any action, ask:
1. Check memory?  → claude-mem
2. Committing?    → git-flow-master
3. UI debugging?  → chrome-devtools
4. Visual?        → z-ai
```

---

## 🎯 Core Principle

**Before ANY significant action, check:**
1. Should I use memory? → claude-mem
2. Should I commit? → Git Flow Master
3. Should I debug UI? → Chrome DevTools
4. Should I analyze visual? → z-ai

This is a **strong suggestion system** - not blocking, but highly recommended.

---

## 📊 MCP QUICK REFERENCE

| MCP | When to Use | Trigger Keywords |
|-----|-------------|------------------|
| **claude-mem** | Search/save memory | "did we", "how did we", "remember" |
| **git-flow-master** | Versioned commits | "commit", "release", "update", "patch" |
| **chrome-devtools** | UI debugging | "debug UI", "test page", "screenshot" |
| **z-ai** | Image/video analysis | "analyze image", "screenshot error", "video" |
| **web-reader** | Fetch web content | "read URL", "fetch page", "scrape" |
| **web-search-prime** | Search web | "latest docs", "current info", "search" |

---

## 🧠 CLAUDE-MEM

### When to Use claude-mem

**USE IT FOR:**
- ✅ "Did we solve this before?"
- ✅ "How did we implement X?"
- ✅ "What was the solution for Y?"
- ✅ "Remember this for later"

**Workflow:**

```
BEFORE implementing:
├─ Search claude-mem for similar problems
├─ Check if solution already exists
├─ Use existing approach if found
└─ Only create new if nothing exists

AFTER solving:
├─ Save solution to claude-mem
├─ Include context and code snippet
└─ Make it searchable with good title/tags
```

### MCP Tools Available

| Tool | Purpose |
|------|---------|
| `mcp__plugin_claude-mem_mcp-search__search` | Search memory by query |
| `mcp__plugin_claude-mem_mcp-search__timeline` | Get context around result |
| `mcp__plugin_claude-mem_mcp-search__get_observations` | Fetch full details |
| `mcp__plugin_claude-mem_mcp-search__save_memory` | Save to memory |

### Examples

```markdown
User: "How did we handle JWT refresh last time?"
→ Use: mcp__plugin_claude-mem_mcp-search__search with query "JWT refresh token"
→ Get: Previous solution details
→ Apply: Same pattern

User: "Here's a new pattern for debouncing"
→ Use: mcp__plugin_claude-mem_mcp-search__save_memory
→ Title: "Debounce pattern - React hooks"
→ Content: Code + explanation
```

---

## 🔄 GIT FLOW MASTER

### When to Use Git Flow Master

**USE IT FOR:**
- ✅ Creating commits (RELEASE, UPDATE, PATCH)
- ✅ Analyzing changes for SemVer
- ✅ Generating release notes
- ✅ Validating commit messages

**Workflow:**

```
BEFORE committing:
├─ git_get_status - Check what changed
├─ git_get_diff - See actual changes
├─ git_suggest_type - Get commit type
├─ git_generate_message - Format message
├─ Run lint/typecheck/tests
└─ git_versioned_commit - Create commit

AFTER feature complete:
├─ git_analyze_commits - Check SemVer impact
├─ git_suggest_version - Get version number
└─ git_create_release - Create release + changelog
```

### MCP Tools Available

| Tool | Purpose |
|------|---------|
| `git_get_status` | Get branch, staged, unstaged files |
| `git_get_diff` | Get diff of changes |
| `git_get_log` | Get recent commit history |
| `git_suggest_type` | Suggest commit type based on files |
| `git_generate_message` | Generate versioned commit message |
| `git_versioned_commit` | Create formatted commit |
| `git_analyze_commits` | Analyze for SemVer bump |
| `git_suggest_version` | Suggest next version |
| `git_create_release` | Create release with CHANGELOG |

### Commit Format

```
TYPE: PROJECT_NAME - vX.Y.Z

- Change 1
- Change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Types

| Type | SemVer | When to Use |
|------|--------|-------------|
| **RELEASE** | MAJOR | Breaking changes |
| **UPDATE** | MINOR | New features |
| **PATCH** | PATCH | Bug fixes |

---

## 🌐 CHROME DEVTOOLS

### When to Use Chrome DevTools

**USE IT FOR:**
- ✅ "Debug this UI issue"
- ✅ "Test this page"
- ✅ "Take screenshot"
- ✅ "Check console errors"
- ✅ "Analyze network requests"

**Workflow:**

```
UI Debugging:
├─ list_pages - See open pages
├─ select_page - Choose page to work with
├─ navigate_page - Go to URL
├─ take_snapshot - Get page structure
├─ list_console_messages - Check errors
├─ take_screenshot - Visual verification
└─ click/fill/hover - Test interactions

Interactive testing:
├─ fill_form - Fill multiple fields
├─ evaluate_script - Run custom JS
└─ list_network_requests - Check API calls
```

### MCP Tools Available

| Tool | Purpose |
|------|---------|
| `list_pages` | Get all open pages |
| `select_page` | Select page for operations |
| `navigate_page` | Navigate to URL |
| `take_snapshot` | Get page structure (a11y tree) |
| `take_screenshot` | Capture page visually |
| `click` | Click element |
| `fill` | Fill input field |
| `hover` | Hover over element |
| `list_console_messages` | Get console output |
| `list_network_requests` | Get network activity |
| `evaluate_script` | Run JavaScript in page |

### Examples

```markdown
Debugging layout issue:
→ take_snapshot - See page structure
→ Check computed styles in snapshot
→ take_screenshot - Verify visual appearance
→ test with different viewports (resize_page)

Testing form:
→ fill_form with test data
→ click submit button
→ list_network_requests - Verify API call
→ check console for errors
```

---

## 🖼️ Z-AI (Visual Analysis)

### When to Use z-ai

**USE IT FOR:**
- ✅ "Analyze this screenshot"
- ✅ "What's this error message?"
- ✅ "Convert this UI to code"
- ✅ "Compare two designs"
- ✅ "Extract text from image"
- ✅ "Analyze video"

**Workflow:**

```
Visual Analysis:
├─ ui_to_artifact - UI → code/prompt/spec
├─ extract_text_from_screenshot - OCR
├─ diagnose_error_screenshot - Debug errors
├─ ui_diff_check - Compare designs
├─ analyze_data_visualization - Charts/graphs
└─ analyze_video - Video content
```

### MCP Tools Available

| Tool | Purpose |
|------|---------|
| `mcp__zai-mcp-server__ui_to_artifact` | UI → code/prompt/spec/description |
| `mcp__zai-mcp-server__extract_text_from_screenshot` | OCR extraction |
| `mcp__zai-mcp-server__diagnose_error_screenshot` | Debug error messages |
| `mcp__zai-mcp-server__ui_diff_check` | Compare two UIs |
| `mcp__zai-mcp-server__analyze_data_visualization` | Charts analysis |
| `mcp__zai-mcp-server__analyze_video` | Video content |
| `mcp__zai-mcp-server__understand_technical_diagram` | Architecture diagrams |

### Examples

```markdown
Converting UI design to code:
→ ui_to_artifact
  prompt="Generate React component code for this UI"
  output_type="code"

Debugging error:
→ diagnose_error_screenshot
  image_source="error.png"
  prompt="Getting TypeError when clicking submit button"

Comparing designs:
→ ui_diff_check
  expected_image="design.png"
  actual_image="implementation.png"
  prompt="Check spacing, colors, alignment differences"
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

**Workflow:**

```
Before implementing (post-2024 libraries):
├─ web-search-prime - Find latest docs
├─ web-reader - Read full documentation
├─ Check breaking changes
└─ Verify examples work
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
☐ git_get_diff - Review actual changes
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

## 🎯 MCP SELECTION FLOWCHART

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

## 💡 SUGGESTION PROMPTS FOR CLAUDE

When working on tasks, Claude should think:

```
Memory First:
→ "Let me check claude-mem for similar solutions first"
→ "Have we solved this before? Let me search..."
→ "I should save this solution to memory for reuse"

Git Discipline:
→ "Let me use git-flow-master for this commit"
→ "What type of commit is this? RELEASE, UPDATE, or PATCH?"
→ "Let me generate a proper versioned commit message"

UI Testing:
→ "Let me debug this with chrome-devtools"
→ "I should take a screenshot to verify the fix"
→ "Let me check console for errors"

Visual Analysis:
→ "I can analyze this screenshot with z-ai"
→ "Let me compare design vs implementation"
→ "I should extract text from this error screenshot"
```

---

## ⚠️ Anti-Patterns

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Committing without lint/typecheck | Run quality gates first | Prevent broken code in repo |
| Guessing at solutions | Search claude-mem first | Reuse existing patterns |
| Manual commit messages | Use git-flow-master | Consistent versioning |
| Not verifying UI after changes | Use chrome-devtools | Catch visual regressions |
| Ignoring screenshots from users | Use z-ai for analysis | Faster debugging |
| Implementing without latest docs | Use web-search-prime | Avoid breaking changes |

---

## 🔧 Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **"MCP tool not found"** | MCP not installed/configured | Check Claude settings for MCP server |
| **"Git commit fails"** | Hook failed or lint error | Run lint/typecheck manually first |
| **"Chrome page not found"** | Browser not open or wrong page | Use list_pages to check available pages |
| **"Memory search empty"** | Nothing saved yet | Save patterns as you solve problems |
| **"Web search fails"** | Network issue or API limit | Try again or use web-reader directly |

---

## 🔗 Related Skills

- **Used by:** All pattern skills - For implementation guidance
- **Related:** `trigmem-categories` - For categorizing decisions
- **Related:** `documentation-patterns` - For documenting decisions

---

## 📖 Further Reading

- [Claude MCP Documentation](https://github.com/modelcontextprotocol/servers)
- [Git Flow Master Repository](https://github.com/aureus-linux/git-flow-master)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

## 🎯 Success Criteria

MCP usage is effective when:
- [ ] Searching claude-mem before implementing
- [ ] Using git-flow-master for all commits
- [ ] Using chrome-devtools for UI debugging
- [ ] Using z-ai for visual analysis
- [ ] Verifying latest docs with web-search-prime
- [ ] Saving successful patterns to memory
- [ ] Consistent commit messages across project
- [ ] Fewer repeated questions/issues

---

## 💡 Key Insights

### Why MCP System Matters

1. **Consistency** - Standardized workflows across projects
2. **Memory** - Reuse solutions instead of relearning
3. **Quality** - Automated checks before commits
4. **Speed** - Faster debugging with proper tools
5. **Knowledge** - Latest documentation at fingertips

### Common Pitfalls

- ❌ **Pitfall:** Forgetting to search memory first
  → **Fix:** Make claude-mem search the first step

- ❌ **Pitfall:** Manual commit messages
  → **Fix:** Always use git-flow-master for versioning

- ❌ **Pitfall:** Not using available MCPs
  → **Fix:** Check MCP reference before any action

---

*Version: 2.0.0 | MCP Mandatory - Strong Suggestions*
