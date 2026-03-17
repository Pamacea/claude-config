# MCP Tools - Optimal Usage Guide

> **Version:** 3.0.0 | **Category:** Cat 3 (Operational Workflows)
> **Auto-Activation:** "commit", "git", "debug UI", "screenshot", "analyze image", "docs", "search latest"
> **Tags:** [mcp, tools, git, debugging, memory, documentation]
> **Related:** All pattern skills - For implementation details
> **Last Updated:** 2025-03-17

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
# Before any significant action, use:
1. Check memory?  → claude-mem (search past solutions)
2. Committing?    → git-flow-master (versioned commits)
3. UI debugging?  → chrome-devtools (browser tools)
4. Visual?        → z-ai (image/video analysis)
```

---

## 📊 MCP Selection Guide

### Quick Reference Table

| MCP | Optimal For | Trigger Keywords | Priority |
|-----|-------------|------------------|----------|
| **claude-mem** | Reusing past solutions | "did we", "how did we", "remember" | 1 (Memory first) |
| **git-flow-master** | Versioned commits | "commit", "release", "update", "patch" | 2 (After quality gates) |
| **chrome-devtools** | UI debugging/testing | "debug UI", "test page", "screenshot" | 3 (When working on UI) |
| **z-ai** | Visual analysis | "analyze image", "screenshot error", "video" | 4 (Visual content) |
| **web-reader** | Fetching docs | "read URL", "fetch page", "scrape" | 5 (Before implementing) |
| **web-search-prime** | Latest info | "latest docs", "current info", "search" | 5 (Before implementing) |

---

## 🧠 CLAUDE-MEM - Memory Reuse

### Optimal Usage

**Use claude-mem when:**
- ✅ Looking for similar past solutions
- ✅ Need to recall how something was implemented
- ✅ Want to avoid repeating mistakes
- ✅ Saving successful patterns for future

### Recommended Workflow

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

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `mcp__plugin_claude-mem_mcp-search__search` | Search memory by query | Starting any task |
| `mcp__plugin_claude-mem_mcp-search__timeline` | Get context around result | Understanding solution context |
| `mcp__plugin_claude-mem_mcp-search__get_observations` | Fetch full details | Getting complete solution |
| `mcp__plugin_claude-mem_mcp-search__save_memory` | Save to memory | After solving problem |

### Usage Examples

```markdown
User: "How did we handle JWT refresh last time?"
→ Use: mcp__plugin_claude-mem_mcp-search__search
→ Query: "JWT refresh token"
→ Get: Previous solution details
→ Apply: Same pattern to current problem

User: "Here's a new pattern for debouncing"
→ Use: mcp__plugin_claude-mem_mcp-search__save_memory
→ Title: "Debounce pattern - React hooks"
→ Content: Code + explanation
→ Tags: react, hooks, debounce, performance
```

---

## 🔄 GIT FLOW MASTER - Versioned Commits

### Optimal Usage

**Use git-flow-master when:**
- ✅ Creating commits (RELEASE, UPDATE, PATCH)
- ✅ Analyzing changes for SemVer impact
- ✅ Generating release notes
- ✅ Validating commit message format

### Recommended Workflow

```
BEFORE committing:
├─ git_get_status → Check what changed
├─ git_get_diff → See actual changes
├─ git_suggest_type → Get commit type
├─ git_generate_message → Format message
├─ Run quality gates (lint, typecheck, test)
└─ git_versioned_commit → Create commit

AFTER feature complete:
├─ git_analyze_commits → Check SemVer impact
├─ git_suggest_version → Get version number
└─ git_create_release → Create release + changelog
```

### MCP Tools Available

| Tool | Purpose | Output |
|------|---------|--------|
| `git_get_status` | Get branch, staged, unstaged files | File list + status |
| `git_get_diff` | Get diff of changes | Exact changes |
| `git_get_log` | Get recent commit history | Commit messages |
| `git_suggest_type` | Suggest commit type | RELEASE/UPDATE/PATCH |
| `git_generate_message` | Generate versioned message | Formatted commit |
| `git_versioned_commit` | Create formatted commit | Commit created |
| `git_analyze_commits` | Analyze for SemVer bump | Version impact |
| `git_suggest_version` | Suggest next version | X.Y.Z |
| `git_create_release` | Create release with CHANGELOG | Release notes |

### Commit Format Standard

```
TYPE: PROJECT_NAME - vX.Y.Z

- Change 1
- Change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Commit Type Decision Matrix

| Type | SemVer | When to Use | Examples |
|------|--------|-------------|----------|
| **RELEASE** | MAJOR | Breaking changes | Removing API, changing signature |
| **UPDATE** | MINOR | New features | Adding function, new capability |
| **PATCH** | PATCH | Bug fixes | Fixing bug, correcting behavior |

---

## 🌐 CHROME DEVTOOLS - UI Testing

### Optimal Usage

**Use chrome-devtools when:**
- ✅ Debugging layout issues
- ✅ Testing interactive elements
- ✅ Taking screenshots for verification
- ✅ Checking console errors
- ✅ Analyzing network requests

### Recommended Workflows

**UI Debugging:**
```
├─ list_pages → See open pages
├─ select_page → Choose page to work with
├─ navigate_page → Go to URL
├─ take_snapshot → Get page structure (a11y tree)
├─ list_console_messages → Check errors
├─ take_screenshot → Visual verification
└─ click/fill/hover → Test interactions
```

**Interactive Testing:**
```
├─ fill_form → Fill multiple fields
├─ evaluate_script → Run custom JS
└─ list_network_requests → Check API calls
```

### MCP Tools Available

| Tool | Purpose | Use Case |
|------|---------|----------|
| `list_pages` | Get all open pages | Starting UI work |
| `select_page` | Select page for operations | Focusing on specific tab |
| `navigate_page` | Navigate to URL | Loading test page |
| `take_snapshot` | Get page structure (a11y) | Understanding DOM |
| `take_screenshot` | Capture page visually | Before/after verification |
| `click` | Click element | Testing buttons/links |
| `fill` | Fill input field | Form testing |
| `hover` | Hover over element | Hover states |
| `list_console_messages` | Get console output | Error checking |
| `list_network_requests` | Get network activity | API verification |
| `evaluate_script` | Run JavaScript | Custom testing |

### Usage Examples

```markdown
Debugging layout issue:
→ take_snapshot → See page structure
→ Check computed styles in snapshot
→ take_screenshot → Verify visual appearance
→ resize_page → Test responsive behavior

Testing form:
→ fill_form with test data
→ click submit button
→ list_network_requests → Verify API call
→ list_console_messages → Check for errors
```

---

## 🖼️ Z-AI - Visual Analysis

### Optimal Usage

**Use z-ai when:**
- ✅ Converting UI designs to code
- ✅ Debugging error screenshots
- ✅ Comparing two designs/implementations
- ✅ Extracting text from images
- ✅ Analyzing charts/graphs
- ✅ Understanding video content

### Recommended Workflow

```
Visual Analysis:
├─ ui_to_artifact → UI → code/prompt/spec
├─ extract_text_from_screenshot → OCR extraction
├─ diagnose_error_screenshot → Debug errors
├─ ui_diff_check → Compare designs
├─ analyze_data_visualization → Charts/graphs
└─ analyze_video → Video content
```

### MCP Tools Available

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `mcp__zai-mcp-server__ui_to_artifact` | UI → code/prompt/spec/description | Converting designs |
| `mcp__zai-mcp-server__extract_text_from_screenshot` | OCR extraction | Error messages, code |
| `mcp__zai-mcp-server__diagnose_error_screenshot` | Debug error messages | Debugging crashes |
| `mcp__zai-mcp-server__ui_diff_check` | Compare two UIs | Design vs implementation |
| `mcp__zai-mcp-server__analyze_data_visualization` | Charts analysis | Dashboard debugging |
| `mcp__zai-mcp-server__analyze_video` | Video content | Tutorial/feature analysis |
| `mcp__zai-mcp-server__understand_technical_diagram` | Architecture diagrams | System documentation |

### Usage Examples

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

## 📖 WEB READER & SEARCH - Documentation

### Optimal Usage

**web-reader:**
- ✅ Reading documentation pages
- ✅ Fetching content from URLs
- ✅ Getting article content as markdown

**web-search-prime:**
- ✅ Finding latest documentation
- ✅ Current best practices research
- ✅ What's new in frameworks

### Recommended Workflow (Post-2024 Libraries)

```
Before implementing:
├─ web-search-prime → Find latest docs
├─ web-reader → Read full documentation
├─ Check → Breaking changes section
└─ Verify → Examples work with current version
```

---

## ✅ Pre-Action Checklists

### Before Implementing Feature

```
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

```
Git Workflow:
☐ git_get_status → Check changes
☐ git_get_diff → Review actual changes
☐ git_suggest_type → Get commit type
☐ git_generate_message → Format message
☐ Run quality gates (lint, typecheck, test)
☐ git_versioned_commit → Create commit
```

### Before UI Work

```
UI Debugging:
☐ Navigate to page with chrome-devtools
☐ Take snapshot for structure
☐ Check console for errors
☐ Take screenshot for visual check
☐ Test interactions if needed
```

---

## 🎯 MCP Selection Flowchart

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

## 💡 Self-Reminder Prompts

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

## ✅ Best Practices Summary

| Practice | Tool | Benefit |
|----------|------|---------|
| Search memory first | claude-mem | Reuse past solutions |
| Versioned commits | git-flow-master | Consistent history |
| Test in browser | chrome-devtools | Catch visual bugs |
| Analyze visuals | z-ai | Faster debugging |
| Check latest docs | web-search-prime | Avoid breaking changes |
| Save patterns | claude-mem | Continuous improvement |

---

## 🔧 Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
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

### Optimization Tips

**Tip 1:** Always search memory before implementing
→ Fix: Make claude-mem search the first step

**Tip 2:** Use git-flow-master for versioning
→ Fix: Always use proper commit types and messages

**Tip 3:** Leverage available MCPs
→ Fix: Check MCP reference before any action

---

*Version: 3.0.0 | MCP Tools - Optimal Usage Guide*
