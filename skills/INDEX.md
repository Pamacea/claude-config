# Skills Index - Master Auto-Activation Map

> **Version:** 1.0.0 | **Last Updated:** 2025-02-24
> **Purpose:** Universal skill auto-activation and cross-reference system

---

## 🎯 Usage Guide

When a user asks a question:
1. Extract keywords from the question
2. Match to trigger keywords in the table below
3. Auto-activate corresponding skill(s)
4. Apply progressive disclosure (Metadata → Instructions → Resources)
5. Follow priority order if multiple matches

---

## 📊 Master Quick Reference

| Skill | Trigger Keywords | Category | Priority | Auto-Load |
|-------|-----------------|----------|----------|-----------|
| **Meta Skills** | | | | |
| `trigmem-core` | methodology, epct, workflow, how do you work, approach | Cat 0 | 1 | Yes |
| `trigmem-categories` | classify, where to store, category, where should this go | Cat 0 | 2 | Yes |
| `trigmem-decision` | decision, choose between, which approach, should i use | Cat 0 | 3 | Context |
| `trigmem-storage` | storage, save, persist, memory, config | Cat 0 | 4 | Context |
| `trigmem-examples` | examples, show me, like this, similar to | Cat 0 | 5 | Request |
| `trigmem-verification` | verify, check, validate, is this correct | Cat 0 | 6 | Request |
| `pattern-autoloader` | [any tech name], [concept], how to implement | Cat 0 | Auto | Auto |
| **Frontend Patterns** | | | | |
| `nextjs-patterns` | nextjs, next, server component, app router, ssr, ssg, isr, use cache | Cat 4 | 10 | Yes |
| `tanstack-patterns` | tanstack, react query, usequery, table, form, router, devtool | Cat 4 | 11 | Yes |
| `tailwind-patterns` | tailwind, css, styling, utility, classes, design system | Cat 4 | 12 | Yes |
| `vite-patterns` | vite, build, dev server, hmr, bundler, plugin | Cat 4 | 13 | Yes |
| `typescript-patterns` | typescript, ts, interface, type, generic, union, intersection | Cat 4 | 14 | Yes |
| `ux-design-patterns` | ux, design, user experience, interface, usability | Cat 4 | 15 | Request |
| `documentation-patterns` | docs, documentation, readme, guide, api docs | Cat 4 | 16 | Request |
| **Backend Patterns** | | | | |
| `rust-axum` | rust, cargo, axum, tokio, ownership, borrowing, trait, lifetime | Cat 4 | 20 | Yes |
| `nestjs-patterns` | nestjs, nest, controller, service, module, decorator, injection | Cat 4 | 21 | Yes |
| `wasm-rust` | wasm, webassembly, rust wasm, performance, memory | Cat 4 | 22 | Yes |
| **Tech Decisions** | | | | |
| `tech-decisions` | which tech, tech stack, choose, database, framework, library | Cat 4 | 30 | Request |
| **Operations** | | | | |
| `mcp-mandatory` | mcp, memory, git, commit, debug, screenshot, web search | Cat 5 | 40 | Suggest |

---

## 🎯 Decision Tree

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
│                   Check trigger keywords                    │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Methodology?  │     │  Tech-specific?│    │  Operations?  │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
  trigmem-core        pattern-autoloader       mcp-mandatory
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Load skill(s)   │
                    │ Apply priority  │
                    │ Progressive    │
                    │ disclosure     │
                    └─────────────────┘
```

---

## 🔗 Cross-Reference Matrix

### Prerequisites Map

| Skill | Requires | Enables |
|-------|----------|---------|
| `nextjs-patterns` | `typescript-patterns`, `tailwind-patterns` | Server Components, App Router |
| `tanstack-patterns` | `typescript-patterns` | Data fetching, forms |
| `rust-axum` | - | High-performance APIs |
| `nestjs-patterns` | `typescript-patterns` | Scalable backends |
| `wasm-rust` | `rust-axum` | Performance optimization |
| `trigmem/categories` | `trigmem/core` | Proper knowledge storage |
| `pattern-autoloader` | `trigmem/categories` | Auto-skill loading |

### Related Skills Grouping

**Frontend Stack:**
- `nextjs-patterns` (Framework)
- `tanstack-patterns` (Data/State)
- `tailwind-patterns` (Styling)
- `typescript-patterns` (Language)
- `vite-patterns` (Build)

**Backend Stack:**
- `nestjs-patterns` (Framework)
- `rust-axum` (Alternative framework)
- `wasm-rust` (Performance)

**Meta System:**
- `trigmem/core` (Methodology - trigmem-core.skill)
- `trigmem/categories` (Classification - trigmem-categories.skill)
- `trigmem/decisions` (Decision making - trigmem-decision.skill)
- `trigmem/storage` (Persistence - trigmem-storage.skill)
- `trigmem/verification` (Quality gates - trigmem-verification.skill)
- `pattern-autoloader` (Auto-loading)

---

## 📁 Skill Organization

```
~/.claude/skills/
├── TEMPLATE.md              # This template
├── INDEX.md                 # This file
│
├── trigmem/                 # TrigMem System (NEW structure)
│   ├── core/               # EPCT methodology (trigmem-core.skill)
│   ├── categories/         # 6-category classification (trigmem-categories.skill)
│   ├── decisions/          # Decision guide (trigmem-decision.skill)
│   ├── storage/            # Storage configuration (trigmem-storage.skill)
│   └── verification/       # Verification system (trigmem-verification.skill)
│
├── pattern-autoloader/      # Auto-detection
│
├── patterns/
│   ├── nextjs/             # Next.js 16 patterns
│   ├── rust/               # Rust + Axum patterns
│   ├── nestjs/             # NestJS patterns
│   ├── tanstack/           # TanStack Suite patterns
│   ├── tailwind/           # Tailwind CSS patterns
│   ├── typescript/         # TypeScript patterns
│   ├── vite/               # Vite patterns
│   ├── wasm/               # WebAssembly patterns
│   ├── tech-decisions/     # Tech stack decisions
│   ├── ux-design/          # UX design patterns
│   └── documentation/      # Documentation patterns
│
└── operations/
    └── mcp-mandatory/      # MCP tool usage
```

---

## 🎯 Priority Rules

### When Multiple Skills Match

**Priority Order:**
1. **Cat 0 (Meta)** > Cat 4 (Patterns) > Cat 5 (Operations)
2. **Explicit** > Implicit
3. **Specific** > General
4. **Higher priority number** = Lower priority

**Examples:**

```markdown
Question: "How do I implement Server Components in Next.js?"

Matches:
- trigmem-core (methodology)
- nextjs-patterns (specific tech)
- pattern-autoloader (tech detection)

Resolution:
→ nextjs-patterns (Priority 10, specific tech)
→ pattern-autoloader used to load it
→ trigmem-core provides EPCT framework
```

```markdown
Question: "Where should I store this pattern?"

Matches:
- trigmem-categories (classification)
- trigmem-storage (storage)

Resolution:
→ trigmem-categories (Priority 2) - classification first
→ trigmem-storage (Priority 4) - storage after classification
```

---

## 🔍 Auto-Activation Rules

### Rule 1: Exact Keyword Match

**Condition:** Skill primary keyword present

**Behavior:** Auto-load skill immediately

**Examples:**
- "Server Component" → `nextjs-patterns`
- "Axum handler" → `rust-axum`
- "UseQuery" → `tanstack-patterns`

### Rule 2: Framework-Specific Concept

**Condition:** Framework-specific term used

**Behavior:** Auto-load framework pattern skill

**Examples:**
- "App Router" → `nextjs-patterns`
- "Decorator" → `nestjs-patterns`
- "Ownership" → `rust-axum`

### Rule 3: Build Tool + Framework

**Condition:** Build tool mentioned with framework

**Behavior:** Load framework skill first, build tool if needed

**Examples:**
- "Vite with React" → `vite-patterns` → then generic React patterns
- "Next.js build" → `nextjs-patterns`

### Rule 4: Multi-Technology Question

**Condition:** Multiple technologies mentioned

**Behavior:** Load by priority, reference others

**Examples:**
- "TanStack Query in Next.js" → `nextjs-patterns` (primary) → reference `tanstack-patterns`
- "TypeScript generics in Rust" → `rust-axum` (primary) → reference `typescript-patterns`

---

## 🚀 Progressive Disclosure Strategy

### Level 1: Metadata (Always Loaded)

- Version info
- Quick reference tables
- Auto-activation rules
- Related skills

**Token Cost:** ~200-300 tokens

### Level 2: Instructions (On Demand)

- Core concepts
- Common patterns
- Best practices
- Anti-patterns

**Token Cost:** ~1000-1500 tokens

### Level 3: Resources (When Needed)

- Advanced topics
- Troubleshooting
- Code examples
- Edge cases

**Token Cost:** ~500-1000 tokens

**Total Range:** 200-3000 tokens depending on depth needed

---

## 📊 Skill Statistics

### Current Inventory

- **Total Skills:** 20
- **Meta Skills:** 6 (TrigMem unified)
- **Pattern Skills:** 11
- **Operation Skills:** 1
- **Auto-loader:** 1 (pattern-autoloader)
- **Template Coverage:** 6/20 (30%)

### Target Coverage

- [x] Template created
- [ ] All skills standardized
- [ ] All cross-references added
- [ ] All auto-activation rules defined
- [ ] Index complete

---

## 🔧 Maintenance

### Adding New Skills

1. Create skill using `TEMPLATE.md`
2. Add entry to Master Quick Reference
3. Update Cross-Reference Matrix
4. Add to Skill Organization tree
5. Update statistics

### Updating Existing Skills

1. Check template compliance
2. Update version number
3. Update Last Updated date
4. Verify cross-references
5. Test auto-activation

### Deprecating Skills

1. Mark as deprecated in metadata
2. Add replacement skill reference
3. Update from related skills
4. Move to `archive/` directory

---

## 💡 Usage Examples

### Example 1: Next.js Question

```markdown
User: "How do I use Server Actions in Next.js?"

Process:
1. Keywords: "Server Actions", "Next.js"
2. Match: nextjs-patterns (primary keywords)
3. Auto-load: nextjs-patterns skill
4. Locate: Server Actions section
5. Progressive disclosure:
   - Show Server Actions overview table
   - Show implementation patterns
   - Show code examples
   - Show best practices

Response: Direct guidance with code examples
```

### Example 2: Storage Question

```markdown
User: "Where should I store this validation pattern?"

Process:
1. Keywords: "store", "pattern"
2. Match: trigmem-categories (classification), trigmem-storage (storage)
3. Priority: trigmem-categories (2) > trigmem-storage (4)
4. Auto-load: trigmem-categories
5. Decision: Cat 4 (Reusable Pattern)
6. Follow-up: trigmem-storage for file location

Response: "This is a Cat 4 (Reusable Pattern). Store in skills/patterns/validation/"
```

### Example 3: Multi-Tech Question

```markdown
User: "How to use TanStack Query with TypeScript in Next.js?"

Process:
1. Keywords: "TanStack Query", "TypeScript", "Next.js"
2. Priority: Next.js (framework) > TypeScript (language) > TanStack (library)
3. Auto-load: nextjs-patterns (primary)
4. Cross-reference: tanstack-patterns, typescript-patterns
5. Show: Integration pattern in Next.js context

Response: Next.js-focused with TanStack Query + TypeScript patterns
```

---

## 🎯 Success Metrics

- [ ] 100% of skills follow template structure
- [ ] 100% of skills have auto-activation rules
- [ ] 100% of skills have cross-references
- [ ] Auto-activation works for 95%+ of queries
- [ ] Average token cost < 1500 per skill load
- [ ] All skills documented in index
- [ ] All cross-references verified

---

*Version: 1.0.0 | Skills Index | Last Updated: 2025-02-24*
