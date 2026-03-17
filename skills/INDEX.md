# Skills Index - Optimized Auto-Activation Map

> **Version:** 2.0.0 | **Last Updated:** 2025-03-17
> **Purpose:** Universal skill auto-activation with mutually exclusive triggers

---

## 🎯 Usage Guide

When a user asks a question:
1. Extract keywords from the question
2. Match to **exclusive** trigger keywords in the table below
3. Auto-load **highest priority** matching skill only
4. Apply progressive disclosure (Metadata → Instructions → Resources)

**Key Change:** Triggers are now **mutually exclusive** - load only one primary skill.

---

## 📊 Master Activation Matrix

### Priority Rule

**Load order:**
1. **Cat 0 (Meta)** → Foundation skills first
2. **Cat 4 (Patterns)** → Tech-specific skills
3. **Cat 3 (Operations)** → Tool usage skills

**Within same category:** Lower priority number = Higher precedence

---

### Exclusive Trigger Table

| Skill | Primary Trigger | Excludes | Priority | Auto-Load |
|-------|-----------------|----------|----------|-----------|
| **Meta Skills (Cat 0)** | | | | |
| `trigmem-core` | "epct", "methodology", "workflow", "how do you work" | All pattern skills | 1 | Yes |
| `trigmem-categories` | "where to store", "which category", "trigmem" | Decision/Storage | 2 | Yes |
| `trigmem-decision` | "choose between", "which approach", "decision" | - | 3 | Context |
| `trigmem-storage` | "memory config", "storage strategy" | - | 4 | Context |
| `trigmem-examples` | "show me example", "worked example" | - | 5 | Request |
| `trigmem-verification` | "verify session", "check quality" | - | 6 | Request |
| `pattern-autoloader` | [tech names] - See below | - | Auto | Auto |
| **Frontend Patterns (Cat 4)** | | | | |
| `nextjs-patterns` | "server component", "app router", "ssr", "nextjs", "next.js" | Other frontend frameworks | 10 | Yes |
| `tanstack-patterns` | "usequery", "usemutation", "tanstack query", "react query" | - | 11 | Yes |
| `tailwind-patterns` | "tailwind class", "tailwind config", "@tailwind" | Other CSS frameworks | 12 | Yes |
| `vite-patterns` | "vite config", "vite plugin", "hmr vite" | Other build tools | 13 | Yes |
| `typescript-patterns` | "generic type", "utility type", "interface ts" | Other languages | 14 | Yes |
| `ux-design-patterns` | "ux design", "user experience", "usability test" | - | 15 | Request |
| `documentation-patterns` | "api documentation", "readme format", "docs pattern" | - | 16 | Request |
| **Backend Patterns (Cat 4)** | | | | |
| `rust-axum` | "axum handler", "tokio spawn", "rust ownership" | Other backend frameworks | 20 | Yes |
| `nestjs-patterns` | "nest controller", "nest service", "nest module" | Other backend frameworks | 21 | Yes |
| `wasm-rust` | "wasm-bindgen", "rust wasm", "wasm memory" | - | 22 | Yes |
| **Tech Decisions (Cat 4)** | | | | |
| `tech-decisions` | "which framework", "which database", "tech stack choice" | - | 30 | Request |
| **Operations (Cat 3)** | | | | |
| `mcp-mandatory` | "git commit", "version control", "screenshot analysis" | - | 40 | Suggest |

---

## 🎯 Mutual Exclusivity Rules

### Rule 1: Framework Exclusivity

**Only ONE framework pattern loads at a time:**

| If Detected | Load | Exclude |
|-------------|------|---------|
| `nextjs`, `server component`, `app router` | `nextjs-patterns` | All other frontend frameworks |
| `react`, `useeffect`, `usestate` | Generic React (if no Next.js) | All other frameworks |
| `vue`, `nuxt`, `composition api` | Vue patterns (if created) | All other frameworks |
| `svelte`, `sveltekit` | Svelte patterns (if created) | All other frameworks |

### Rule 2: Language Exclusivity

**Only ONE language pattern loads at a time:**

| If Detected | Load | Exclude |
|-------------|------|---------|
| `typescript`, `interface`, `generic` | `typescript-patterns` | Other language patterns |
| `rust`, `cargo`, `lifetime` | `rust-axum` | Other language patterns |
| `python`, `django`, `fastapi` | Python patterns (if created) | Other language patterns |
| `go`, `golang`, `goroutine` | Go patterns (if created) | Other language patterns |

### Rule 3: Backend Framework Exclusivity

**Only ONE backend framework pattern loads:**

| If Detected | Load | Exclude |
|-------------|------|---------|
| `nest`, `nestjs`, `decorator` | `nestjs-patterns` | Other backend frameworks |
| `axum`, `tokio`, `actix` | `rust-axum` | Other backend frameworks |
| `django`, `flask`, `fastapi` | Python patterns (if created) | Other backend frameworks |

### Rule 4: Build Tool Exclusivity

**Only ONE build tool pattern loads:**

| If Detected | Load | Exclude |
|-------------|------|---------|
| `vite`, `vite.config`, `hmr` | `vite-patterns` | Other build tools |
| `webpack`, `webpack.config` | Webpack patterns (if created) | Other build tools |
| `rollup`, `rollup.config` | Rollup patterns (if created) | Other build tools |

---

## 🔗 Cross-Reference Matrix

### Primary → Secondary Relationships

When a primary skill is loaded, it may **reference** (not load) these skills:

| Primary Skill | May Reference | Relationship |
|---------------|--------------|--------------|
| `nextjs-patterns` | `typescript-patterns`, `tailwind-patterns` | Tech stack |
| `nestjs-patterns` | `typescript-patterns` | Language foundation |
| `tanstack-patterns` | `typescript-patterns`, `react patterns` | Dependencies |
| `vite-patterns` | Framework-specific pattern | Build target |

**Reference only** - Provide links/mentions, don't auto-load secondary skills.

---

## 🎯 Enhanced Decision Tree

```
┌─────────────────────────────────────────────────────────────┐
│                    User asks question                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Extract keywords from question                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Check Meta triggers first                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ "epct", "methodology" → trigmem-core                  │  │
│  │ "where to store" → trigmem-categories                 │  │
│  │ "choose between" → trigmem-decision                   │  │
│  └───────────────────────────────────────────────────────┘  │
│         │ No meta trigger?                                  │
│         ▼                                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Check Framework triggers            │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ "nextjs", "server component" → nextjs-patterns  │  │  │
│  │  │ "nestjs", "decorator" → nestjs-patterns         │  │  │
│  │  │ "axum", "tokio" → rust-axum                     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │         │ No framework trigger?                        │  │
│  │         ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              Check Library triggers             │  │  │
│  │  │  ┌───────────────────────────────────────────┐ │  │  │
│  │  │  │ "usequery", "tanstack" → tanstack-patterns│ │  │  │
│  │  │  │ "tailwind", "@tailwind" → tailwind-patterns│ │  │  │
│  │  │  │ "vite", "hmr" → vite-patterns             │ │  │  │
│  │  │  └───────────────────────────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│         │ No library trigger?                              │
│         ▼                                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Check Language triggers                 │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ "typescript", "generic" → typescript-patterns  │  │  │
│  │  │ "rust", "cargo" → rust-axum                    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Load ONE skill   │
                    │ (highest priority)│
                    └─────────────────┘
```

---

## 📋 Trigger Keyword Optimization

### Next.js Patterns - Refined Triggers

**Primary Keywords (mutually exclusive):**
```
"server component"     → Next.js exclusive
"app router"           → Next.js exclusive
"server actions"       → Next.js exclusive
"use cache"            → Next.js exclusive
"next.config"          → Next.js exclusive
```

**NOT triggering (ambiguous):**
```
"component"            → Too generic
"router"               → Could be any router
"cache"                → Too generic
"config"               → Too generic
```

### TypeScript Patterns - Refined Triggers

**Primary Keywords (mutually exclusive):**
```
"generic type"         → TypeScript exclusive
"utility type"         → TypeScript exclusive
"interface ts"         → TypeScript exclusive
"type inference"       → TypeScript exclusive
"typescript"           → Explicit mention
```

**NOT triggering (ambiguous):**
```
"type"                 → Too generic
"interface"            → Could be any language
"generic"              → Too generic alone
```

### TanStack Patterns - Refined Triggers

**Primary Keywords (mutually exclusive):**
```
"usequery"             → TanStack Query exclusive
"usemutation"          → TanStack Query exclusive
"tanstack query"       → Explicit mention
"tanstack table"       → Explicit mention
"tanstack form"        → Explicit mention
```

**NOT triggering (ambiguous):**
```
"query"                → Too generic
"mutation"             → Too generic
"table"                → Too generic
"form"                 → Too generic
```

---

## 🔧 Maintenance Guidelines

### Adding New Skills

1. **Define exclusive triggers** - Keywords that only match your skill
2. **Set priority** - Assign appropriate priority number
3. **Define exclusions** - What should NOT trigger when this loads
4. **Update matrix** - Add to cross-reference matrix
5. **Test triggers** - Verify no conflicts with existing skills

### Updating Existing Skills

1. **Review trigger keywords** - Ensure exclusivity
2. **Check for conflicts** - No overlapping triggers with other skills
3. **Update exclusions** - Add/remove as needed
4. **Test activation** - Verify correct skill loads

---

## ✅ Validation Checklist

Before committing trigger changes:

- [ ] Triggers are mutually exclusive (no overlap)
- [ ] Priority numbers are consistent
- [ ] Exclusions are defined
- [ ] Cross-references updated
- [ ] Tested with sample queries

---

## 🎯 Examples

### Example 1: Clear Next.js Question

```
User: "How do I implement Server Components in Next.js?"

Analysis:
├─ "Server Components" → Next.js exclusive trigger
├─ "Next.js" → Framework explicit mention
└─ Result: Load nextjs-patterns (Priority 10)

Not loaded:
├─ typescript-patterns (referenced only)
├─ tailwind-patterns (referenced only)
└─ All other patterns (excluded)
```

### Example 2: Ambiguous Query (Default)

```
User: "How do I create a component?"

Analysis:
├─ "component" → Too generic, no exclusive match
├─ No framework specified
└─ Result: Ask for clarification

Clarification needed:
├─ "Which framework? (React, Vue, Svelte, Next.js)"
└─ "What type of component?"
```

### Example 3: Multiple Technologies

```
User: "How to use TanStack Query with TypeScript in Next.js?"

Analysis:
├─ Keywords: "TanStack Query" + "TypeScript" + "Next.js"
├─ Priority: Framework (Next.js: 10) > Library (TanStack: 11) > Language (TS: 14)
└─ Result: Load nextjs-patterns (primary)

References (not loaded):
├─ "See tanstack-patterns for Query specifics"
└─ "See typescript-patterns for generic usage"
```

---

## 📊 Statistics

### Current Inventory

- **Total Skills:** 20
- **Meta Skills:** 6 (TrigMem unified)
- **Pattern Skills:** 11
- **Operation Skills:** 1
- **Auto-loader:** 1 (pattern-autoloader)
- **Template Coverage:** 6/20 (30%)

### Trigger Coverage

| Category | Skills with Exclusive Triggers | Coverage |
|----------|-------------------------------|----------|
| Meta Skills | 6/6 (100%) | ✅ Complete |
| Frontend Patterns | 3/6 (50%) | ⚠️ Needs work |
| Backend Patterns | 2/3 (67%) | ⚠️ Needs work |
| Tech Decisions | 0/1 (0%) | ⚠️ Needs work |
| Operations | 1/1 (100%) | ✅ Complete |

---

## 🎯 Success Metrics

- [ ] 100% of skills have exclusive triggers
- [ ] No trigger conflicts between skills
- [ ] Priority order consistently applied
- [ ] Cross-references defined for all relationships
- [ ] Auto-activation works for 95%+ of queries

---

*Version: 2.0.0 | Optimized Auto-Activation with Exclusive Triggers*
