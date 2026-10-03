---
name: trigmem-categories
description: "TrigMem Categories - 6-Category Classification"
---

# TrigMem Categories - 6-Category Classification

> **Version:** 1.0.0 | **Category:** Cat 0 (Meta-Memory)

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- New information needs to be stored
- User asks "Where should this go?"
- Organizing project knowledge
- Creating documentation or rules

**Progressive Disclosure:**
1. **Metadata** → Category quick reference
2. **Instructions** → Full classification system
3. **Resources** → Decision tree and examples

---

## 📊 THE 6 CATEGORIES

### Quick Reference Table

| Category | Name | Storage Location | Trigger Keywords |
|----------|------|------------------|------------------|
| **Cat 1** | Project Identity | `CLAUDE.md` | "What is", "project name", "stack" |
| **Cat 2** | Structure & Architecture | `CLAUDE.md` + Rules | "Where are", "how organized", "structure" |
| **Cat 3** | Context & Nuance | Session context | "Depends on", "context-specific" |
| **Cat 4** | Reusable Patterns | `skills/` | "Best practice", "pattern", "how to X" |
| **Cat 5** | Operational Guides | `skills/` | "How to", "workflow", "commands" |
| **Cat 6** | Corrections & Anti-Patterns | Rules (Nevers) | "Never", "don't", "avoid" |

---

## 🎯 CATEGORY 1: PROJECT IDENTITY

### What: Core Project Information

**Storage:** `CLAUDE.md` (top section)

**Contents:**
- Project name and purpose
- Tech stack
- Author/maintainer
- One-line description

**Examples:**
```markdown
# ShopFlow - E-commerce Platform

**Stack:** Next.js 16, React 19, Prisma, Supabase
**Purpose:** Headless e-commerce with real-time inventory
**Author:** @pamacea
```

**Trigger Questions:**
- "What is this project?"
- "What's the tech stack?"
- "What does [project] do?"

**Action:** Store in CLAUDE.md

---

## 🎯 CATEGORY 2: STRUCTURE & ARCHITECTURE

### What: Codebase Organization

**Storage:** `CLAUDE.md` (structure section) + Rules

**Contents:**
- Directory structure
- Import conventions
- Module organization
- Architecture patterns (Clean, Hexagonal, etc.)

**Examples:**
```markdown
## Structure

```
src/
├── app/           # Next.js routing
├── features/      # Business logic
├── ui/           # Presentational components
└── lib/          # Utilities and configs
```

**Import Rules:**
- ✅ Features → UI
- ❌ UI → Features (coupling)
```

**Trigger Questions:**
- "Where are the components?"
- "How is this organized?"
- "Where should I put X?"

**Action:** Store in CLAUDE.md + Create rule if repeated

---

## 🎯 CATEGORY 3: CONTEXT & NUANCE

### What: Session-Specific Decisions

**Storage:** Session context only

**Contents:**
- Temporary decisions
- "It depends" scenarios
- User preferences for this session
- Experimental approaches

**Examples:**
```markdown
# Session Context

- Using Rust for performance-critical path
- User prefers functional over OOP today
- Testing with Vitest (not Jest)
```

**Trigger Questions:**
- "Should I use X or Y?"
- "It depends on..."
- "What did we decide earlier?"

**Action:** Keep in context, DO NOT persist

---

## 🎯 CATEGORY 4: REUSABLE PATTERNS

### What: Portable Technical Knowledge

**Storage:** `skills/[pattern-name]/`

**Contents:**
- Architecture patterns
- Tech-specific best practices
- Implementation guides
- Code templates

**Examples:**
```
skills/
├── nextjs/          # Next.js 16 patterns
├── rust/            # Rust + Axum patterns
├── tanstack/        # TanStack Suite patterns
└── tailwind/        # Tailwind CSS patterns
```

**Trigger Questions:**
- "How do I implement X in [tech]?"
- "What's the pattern for Y?"
- "Best practices for [library]?"

**Action:** Create skill in `skills/`

---

## 🎯 CATEGORY 5: OPERATIONAL GUIDES

### What: Workflows and Commands

**Storage:** `skills/[workflow-name]/`

**Contents:**
- Development workflows
- Build/deploy procedures
- Testing strategies
- Debugging processes

**Examples:**
```
skills/
├── tdd/             # Test-driven development
├── debugging/       # Systematic debugging
└── refactoring/     # Refactoring workflows
```

**Trigger Questions:**
- "How do I debug X?"
- "What's the workflow for Y?"
- "Commands for Z?"

**Action:** Create skill in `skills/`

---

## 🎯 CATEGORY 6: CORRECTIONS & ANTI-PATTERNS

### What: Rules and Blocking Behaviors

**Storage:** `rules/01-nevers.md` and other rule files

**Contents:**
- ❌ Things NEVER to do
- ✅ Things ALWAYS to do
- Blocking rules
- Anti-patterns to avoid

**Examples:**
```markdown
# 01-nevers.md

## React / Frontend
| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| useEffect for data fetching | TanStack Query or Server Components |
| useState for server data | TanStack Query |
```

**Trigger Questions:**
- "What should I avoid?"
- "Is this anti-pattern?"
- "Never use X for Y"

**Action:** Add to `rules/01-nevers.md`

---

## 🔄 DECISION TREE

```
┌─────────────────────────────────────────┐
│  What type of information is this?      │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
Project ID?    Structure?    Reusable
    │               │               │
    ▼               ▼               ▼
Cat 1           Cat 2           Cat 4
CLAUDE.md       CLAUDE.md      patterns/
+Rules                          │
    │               │               │
    └───────────────┴───────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    Context/            Operation/
    Nuance?             Workflow?
         │                     │
         ▼                     ▼
      Cat 3                 Cat 5
   Session only        operations/
         │                     │
         └──────────┬──────────┘
                    │
            Correction?
            Anti-pattern?
                    │
                    ▼
                 Cat 6
              rules/
```

---

## 📋 CLASSIFICATION CHECKLIST

When storing information:

```markdown
- [ ] Is it project identity? → Cat 1 (CLAUDE.md)
- [ ] Is it structure/architecture? → Cat 2 (CLAUDE.md + rules)
- [ ] Is it context-specific? → Cat 3 (Session only)
- [ ] Is it reusable pattern? → Cat 4 (skills/)
- [ ] Is it operational guide? → Cat 5 (skills/)
- [ ] Is it correction/anti-pattern? → Cat 6 (rules/)
```

---

## 💡 KEY INSIGHTS

### Storage Strategy

**Persist (Storage):**
- ✅ Cat 1: Project identity (CLAUDE.md)
- ✅ Cat 2: Structure (CLAUDE.md + rules)
- ✅ Cat 4: Patterns (skills/)
- ✅ Cat 5: Operations (skills/)
- ✅ Cat 6: Corrections (rules/)

**Don't Persist:**
- ❌ Cat 3: Context and nuance (session only)

### Why This Works

1. **Cat 1-2**: Quick access in CLAUDE.md
2. **Cat 4-5**: Progressive disclosure (skills)
3. **Cat 6**: Blocking rules prevent mistakes
4. **Cat 3**: Avoids cluttering storage

### Token Optimization

**Minimal Base Context:**
- CLAUDE.md: Project identity + structure
- Rules: Blocking rules only (nevers)
- Skills: Loaded on-demand

**Progressive Disclosure:**
- Metadata → Quick reference
- Instructions → Full details
- Resources → Examples

---

## 🎯 QUICK REFERENCE

```
Cat 1: Project Identity → CLAUDE.md
Cat 2: Structure → CLAUDE.md + rules
Cat 3: Context → Session only (don't persist)
Cat 4: Patterns → skills/
Cat 5: Operations → skills/
Cat 6: Corrections → rules/

Before Storing:
├─ Project info? → Cat 1
├─ Structure? → Cat 2
├─ Context-specific? → Cat 3 (or don't store)
├─ Reusable pattern? → Cat 4
├─ Workflow/commands? → Cat 5
└─ Anti-pattern/correction? → Cat 6
```

---

*Version: 1.0.0 | TrigMem Categories Skill*
