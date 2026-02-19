# TrigMem Storage - Optimization Strategy

> **Version:** 1.0.0 | **Category:** Cat 0 (Meta-Memory)

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- Deciding where to store information
- Optimizing token usage
- Organizing project knowledge
- Reducing context overhead

**Progressive Disclosure:**
1. **Metadata** → Storage locations
2. **Instructions** → Storage strategy
3. **Resources** → Token optimization techniques

---

## 📊 STORAGE LOCATIONS

### Quick Reference

| Location | Purpose | Size | When to Use |
|----------|---------|------|-------------|
| **CLAUDE.md** | Project identity | < 100 lines | Core project info |
| **rules/** | Blocking rules | < 10 files | Critical corrections |
| **skills/patterns/** | Technical patterns | On-demand | Reusable knowledge |
| **skills/operations/** | Workflows | On-demand | Operational guides |
| **Session context** | Temporary info | Ephemeral | Context-specific |

---

## 🎯 STORAGE HIERARCHY

### Level 1: Always Loaded (Minimal)

**CLAUDE.md** - Project Identity
```
✅ Project name, stack, purpose
✅ Directory structure
✅ Key conventions
❌ Detailed implementation
❌ Code examples
❌ Extensive documentation
```

**Target:** < 100 lines, ~2k tokens

---

### Level 2: Rules (Critical Only)

**rules/** - Blocking Rules
```
00-core.md       # Core methodology (EPCT)
01-nevers.md     # Blocking rules (❌ NEVER)
02-conventions.md # Git, docs, structure
```

**Target:** < 10 files, ~8k tokens total

**What to Include:**
- ✅ Blocking rules (things never to do)
- ✅ Critical conventions
- ✅ Decision tables

**What to Exclude:**
- ❌ Detailed code examples
- ❌ Extensive explanations
- ❌ Repeated information

---

### Level 3: Skills (On-Demand)

**skills/patterns/** - Technical Knowledge
```
nextjs/     # Next.js 16 patterns
rust/       # Rust + Axum patterns
tanstack/   # TanStack Suite patterns
```

**Load:** When needed with `/pattern [name]` or `Skill` tool

**Progressive Disclosure:**
1. **Metadata** → Quick reference tables
2. **Instructions** → Full patterns
3. **Resources** → Code examples

**Target:** 0 tokens until loaded

---

**skills/operations/** - Workflows
```
tdd/         # Test-driven development
debugging/   # Systematic debugging
refactoring/ # Refactoring workflows
```

**Load:** When workflow is needed

**Target:** 0 tokens until loaded

---

### Level 4: Session Context (Ephemeral)

**Session Memory** - Temporary
```
✅ Current work context
✅ Temporary decisions
✅ "It depends" scenarios
❌ Persistent knowledge
```

**Storage:** DO NOT persist

**Target:** Cleared between sessions

---

## 🔄 STORAGE DECISION TREE

```
┌─────────────────────────────────────────┐
│  What needs to be stored?               │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
Project        Reusable       Correction
Identity?      Pattern?       Anti-pattern?
    │               │               │
    ▼               ▼               ▼
CLAUDE.md      patterns/       rules/
(Cat 1-2)      (Cat 4)         (Cat 6)
    │
    ├─────────────┘
    │
Operation?   Context?
    │           │
    ▼           ▼
operations/  Session
(Cat 5)     (Cat 3)
```

---

## 📏 TOKEN OPTIMIZATION

### Principles

**1. Minimal Base Context**
```
Base: CLAUDE.md (~2k tokens)
    + Critical rules (~8k tokens)
    = ~10k tokens per session
```

**2. Progressive Disclosure**
```
Skill Not Loaded: 0 tokens
Metadata Only: ~500 tokens
+ Instructions: ~2k tokens
+ Resources: ~5k tokens
```

**3. Delete-First Philosophy**
```
Before Adding:
├─ Search existing
├─ Can I delete instead?
├─ Can I reuse?
└─ Is this truly necessary?
```

### Token Budget

| Component | Target | Current | Status |
|-----------|--------|---------|--------|
| CLAUDE.md | < 2k | ~2k | ✅ |
| Rules | < 8k | ~8k | ✅ |
| Skills (base) | 0 | 0 | ✅ |
| **Total** | **< 10k** | **~10k** | ✅ |

---

## 🎯 STORAGE GUIDELINES

### CLAUDE.md Guidelines

**Include:**
- ✅ Project name and one-liner
- ✅ Tech stack (max 5 items)
- ✅ Directory structure (simplified)
- ✅ Key conventions (summary)

**Exclude:**
- ❌ Extensive documentation
- ❌ Code examples
- ❌ Detailed explanations
- ❌ Repeated info from rules

**Target:** < 100 lines

---

### Rules Guidelines

**Include:**
- ✅ Blocking rules (❌ NEVER)
- ✅ Critical conventions
- ✅ Decision tables

**Exclude:**
- ❌ Extensive examples
- ❌ Long explanations
- ❌ Repeated patterns

**Target:** < 10 files, < 8k tokens

---

### Skills Guidelines

**Structure:**
```markdown
# SKILL NAME

> Metadata (quick reference)

## Auto-Activation
When this skill loads

## Progressive Disclosure
1. Metadata → Quick tables
2. Instructions → Full content
3. Resources → Examples
```

**Target:** 0 tokens until needed

---

## 📋 STORAGE CHECKLIST

Before storing information:

```markdown
Location:
☐ Project identity? → CLAUDE.md
☐ Blocking rule? → rules/01-nevers.md
☐ Convention? → rules/02-conventions.md
☐ Reusable pattern? → skills/patterns/
☐ Workflow? → skills/operations/
☐ Context-specific? → Don't persist

Token Check:
☐ Will this increase base context?
☐ Can it be on-demand instead?
☐ Is it duplicated elsewhere?
☐ Can I delete something instead?

Quality Check:
☐ Clear and concise?
☐ Necessary for future sessions?
☐ Properly categorized?
☐ Quick to reference?
```

---

## 💡 KEY INSIGHTS

### Storage Philosophy

**Persist (Storage):**
- Project identity (CLAUDE.md)
- Blocking rules (rules/)
- Portable patterns (skills/patterns/)
- Workflows (skills/operations/)

**Don't Persist:**
- Session context
- Temporary decisions
- "It depends" scenarios

### Why This Works

1. **Minimal Base Context** → Fast session starts
2. **Progressive Disclosure** → Load only what's needed
3. **Categorized Storage** → Easy to find
4. **Token Budget** → Predictable costs

---

## 🎯 QUICK REFERENCE

```
Storage Locations:
├─ CLAUDE.md → Project identity (< 100 lines)
├─ rules/ → Blocking rules (< 10 files)
├─ skills/patterns/ → Technical knowledge (on-demand)
├─ skills/operations/ → Workflows (on-demand)
└─ Session → Context only (don't persist)

Token Budget:
├─ Base: ~10k tokens (CLAUDE.md + rules)
├─ Skills: 0 tokens (until loaded)
└─ Progressive: Load as needed

Before Storing:
├─ Is it persistent or ephemeral?
├─ Can it be on-demand?
├─ Will it increase base context?
└─ Is it truly necessary?
```

---

*Version: 1.0.0 | TrigMem Storage Skill*
