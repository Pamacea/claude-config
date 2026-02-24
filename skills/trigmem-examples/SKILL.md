# TrigMem Examples - Worked Demonstrations

> **Version:** 2.0.0 | **Category:** Cat 0 (Meta-Memory) | **Difficulty:** Beginner
> **Auto-Activation:** "examples", "show me", "like this", "how to apply", "demonstrate"
> **Tags:** [examples, demonstration, learning, tutorial]
> **Related:** trigmem-core, trigmem-categories, trigmem-decision
> **Last Updated:** 2025-02-24

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- User asks for examples
- Demonstrating TrigMem methodology
- Learning how to apply categories
- Understanding decision framework

**Progressive Disclosure:**
1. **Metadata** → Example types
2. **Instructions** → Full examples
3. **Resources** → Real applications

---

## 📊 EXAMPLE TYPES

| Type | Purpose | Category |
|------|---------|----------|
| **Identity** | Project info | Cat 1 |
| **Structure** | Architecture | Cat 2 |
| **Pattern** | Reusable knowledge | Cat 4 |
| **Operation** | Workflow | Cat 5 |
| **Correction** | Anti-patterns | Cat 6 |

---

## 🎯 EXAMPLE 1: PROJECT IDENTITY (Cat 1)

### User Question
"What is ShopFlow?"

### Classification & Storage

**Category:** Cat 1 - Project Identity

**Storage:** `CLAUDE.md`

**Implementation:**
```markdown
# ShopFlow - E-commerce Platform

**Stack:** Next.js 16, React 19, Prisma, Supabase
**Purpose:** Headless e-commerce with real-time inventory
**Author:** @pamacea

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`
```

**Why CLAUDE.md?**
- ✅ Core project information
- ✅ Always available
- ✅ Quick reference

---

## 🎯 EXAMPLE 2: STRUCTURE (Cat 2)

### User Question
"Where are the components?"

### Classification & Storage

**Category:** Cat 2 - Structure & Architecture

**Storage:** `CLAUDE.md` + rule reference

**Implementation:**
```markdown
## Structure

\`\`\`
src/
├── app/           # Next.js App Router
├── features/      # Business logic
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── actions/
├── ui/           # Presentational components
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
└── lib/          # Utilities
\`\`\`

**Import Rules:**
- ✅ Features → UI
- ❌ UI → Features (coupling)
```

**Why CLAUDE.md + rule?**
- ✅ Structure in CLAUDE.md (quick access)
- ✅ Detailed rules in 02-conventions.md
- ✅ Reference to maintain minimal CLAUDE.md

---

## 🎯 EXAMPLE 3: REUSABLE PATTERN (Cat 4)

### User Question
"How do I implement TanStack Query in Next.js 16?"

### Classification & Storage

**Category:** Cat 4 - Reusable Pattern

**Storage:** `skills/patterns/tanstack/SKILL.md`

**Implementation:**
```markdown
# TanStack Query Pattern

## Auto-Activation
Loads for: "data fetching", "server state", "caching"

## Pattern

### Server Component with Client Query
\`\`\`typescript
// app/products/page.tsx (Server)
import { ProductsClient } from './ProductsClient'

export default async function ProductsPage() {
  const products = await db.product.findMany()
  return <ProductsClient initialProducts={products} />
}

// app/products/ProductsClient.tsx (Client)
'use client'

import { useQuery } from '@tanstack/react-query'

export function ProductsClient({ initialProducts }) {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
    initialData: initialProducts
  })

  return <ProductList products={products} />
}
\`\`\`

## Never
❌ useEffect for data fetching
❌ useState for server data

## Always
✅ TanStack Query for server state
✅ Server Components for initial data
\`\`\``

**Why skills/patterns/?**
- ✅ Portable across projects
- ✅ On-demand loading
- ✅ Progressive disclosure

---

## 🎯 EXAMPLE 4: WORKFLOW (Cat 5)

### User Question
"How do I debug effectively?"

### Classification & Storage

**Category:** Cat 5 - Operational Guide

**Storage:** `skills/operations/debugging/SKILL.md`

**Implementation:**
```markdown
# Systematic Debugging Workflow

## Auto-Activation
Loads for: "debug", "error", "not working", "bug"

## DEBUG Framework

**D - Describe**
- What did you try?
- What did you expect?
- What happened instead?

**E - Extract**
- Error messages
- Stack traces
- Reproduction steps

**B - Binary Search**
- Comment out half the code
- When does it fail?
- Isolate the issue

**U - Understand**
- Read the error
- Check similar issues
- Understand the context

**G - Get Help**
- Search documentation
- Ask specific questions
- Provide minimal repro

## Example

\`\`\`typescript
// ❌ Before: Vague
"It's not working"

// ✅ After: DEBUG framework
"D: I tried fetching user data, expected {id, name}, got undefined
E: TypeError: Cannot read 'name' of undefined at UserCard.tsx:15
B: Works when I hardcode user, fails with fetch
U: Fetch returns before user data is ready
G: How do I handle async data in React 19?"
\`\`\`
\`\`\``

**Why skills/operations/?**
- ✅ Workflow, not code pattern
- ✅ Portable methodology
- ✅ On-demand loading

---

## 🎯 EXAMPLE 5: CORRECTION (Cat 6)

### User Question
"Should I use useEffect for data fetching?"

### Classification & Storage

**Category:** Cat 6 - Correction / Anti-Pattern

**Storage:** `rules/01-nevers.md`

**Implementation:**
```markdown
## React / Frontend

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| useEffect for data fetching | TanStack Query or Server Components |
| useState for server data | TanStack Query |
| Business logic in app/ | Use features/ |

\`\`\`typescript
// ❌ BAD - useEffect for data fetching
useEffect(() => {
  fetch('/api/posts').then(res => res.json()).then(setPosts)
}, [])

// ✅ GOOD - Server Component
export default async function PostsPage() {
  const posts = await fetch('/api/posts').then(r => r.json())
  return <PostList posts={posts} />
}

// ✅ GOOD - TanStack Query
const { data: posts } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(r => r.json())
})
\`\`\`
\`\`\``

**Why rules/?**
- ✅ Blocking rule (never do this)
- ✅ Always loaded (critical)
- ✅ Quick reference format

---

## 🎯 EXAMPLE 6: DECISION ROUTING

### User Question
"How should I implement user authentication?"

### Applying Decision Framework

**Phase 1: Tiage**

```
Simple? ❌ Complex (multi-file)
Workflow? ✅ Authentication system
Knowledge? ✅ NextAuth pattern
```

**Phase 2: Decision**

```
→ Load skill: /pattern nextjs
→ Find authentication section
→ Spawn sub-agent for implementation
→ Task: "Implement NextAuth v5 with Prisma adapter"
```

**Execution:**

1. **Load Pattern** → `/pattern nextjs`
2. **Spawn Sub-Agent** → Implementation
3. **Integrate** → Add to project
4. **Save to Memory** → For future reference

---

## 🎯 EXAMPLE 7: TOKEN OPTIMIZATION

### Before (Bloated Context)

```markdown
# CLAUDE.md (500 lines, 10k tokens)

## Project Info
## Structure
## All Conventions
## All Patterns
## All Workflows
## Extensive Examples
...
```

**Problem:** Everything loaded, slow sessions

---

### After (Optimized)

```markdown
# CLAUDE.md (50 lines, 1k tokens)

## Project Info
## Structure
## Quick Reference
→ See rules/ for details
→ Load skills for patterns
```

**rules/01-nevers.md** (2k tokens)
**rules/02-conventions.md** (2k tokens)

**Skills:** 0 tokens until loaded

**Result:** ~5k tokens base context (50% reduction)

---

## 📋 EXAMPLE SUMMARY

| Example | Category | Storage | Tokens |
|---------|----------|---------|--------|
| Project identity | Cat 1 | CLAUDE.md | ~1k |
| Architecture | Cat 2 | CLAUDE.md + rules | ~3k |
| Pattern | Cat 4 | skills/patterns/ | 0 (on-demand) |
| Workflow | Cat 5 | skills/operations/ | 0 (on-demand) |
| Correction | Cat 6 | rules/ | ~2k |

**Total Base:** ~6k tokens (vs 15k+ without optimization)

---

## 💡 KEY INSIGHTS

### How TrigMem Works in Practice

1. **User asks question**
2. **Classify using categories** (Cat 1-6)
3. **Route to appropriate storage**
4. **Load on-demand** (skills)
5. **Apply decision framework** (complex tasks)

### Examples Show

- ✅ Where to store what
- ✅ When to use sub-agents
- ✅ How to optimize tokens
- ✅ Progressive disclosure

---

## 🎯 QUICK REFERENCE

```
Example Types:
├─ Cat 1: Project Identity → CLAUDE.md
├─ Cat 2: Structure → CLAUDE.md + rules
├─ Cat 4: Patterns → skills/patterns/
├─ Cat 5: Operations → skills/operations/
└─ Cat 6: Corrections → rules/

Decision Framework:
├─ Phase 1: Triage (Simple/Complex/Knowledge)
└─ Phase 2: Route (Direct/Sub-agent/Skill)

Token Optimization:
├─ Minimal CLAUDE.md (< 100 lines)
├─ Critical rules only
├─ Skills on-demand
└─ Progressive disclosure
```

---

*Version: 1.0.0 | TrigMem Examples Skill*
