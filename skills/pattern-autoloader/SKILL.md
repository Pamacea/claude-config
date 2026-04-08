# Pattern Autoloader - Auto-Detection

**Type:** meta
**Summary:** Meta-skill that auto-detects tech-specific questions and loads the appropriate pattern skill on demand.
**Tags:** #autoloader #patterns
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 0 (Meta-Skill)

---

##  Auto-Activation

**This skill auto-activates when:**
- Tech-specific question asked (React, Next.js, Rust, etc.)
- Framework/implementation pattern needed
- "How to implement X in [tech]?"
- "Best practices for [framework]"

**Progressive Disclosure:**
1. **Metadata** → Pattern mapping table
2. **Instructions** → Auto-detection logic
3. **Resources** → Pattern suggestions

---

##  TECH PATTERN MAPPING

### Quick Reference Table

| Technology | Pattern Skill | Trigger Keywords |
|------------|---------------|------------------|
| **Next.js** | `/pattern nextjs` | "next", "ssr", "server components", "app router", "nextjs" |
| **React** | `/pattern react` | "react", "component", "hook", "useState", "useEffect" |
| **Rust** | `/pattern rust` | "rust", "cargo", "axum", "tokio", "rustc" |
| **NestJS** | `/pattern nestjs` | "nest", "nestjs", "controller", "service", "module" |
| **Prisma** | `/pattern prisma` | "prisma", "schema", "migration", "database" |
| **TanStack** | `/pattern tanstack` | "tanstack", "react query", "table", "form", "router" |
| **Tailwind** | `/pattern tailwind` | "tailwind", "css", "styling", "classes" |
| **TypeScript** | `/pattern typescript` | "typescript", "ts", "interface", "type", "generic" |
| **Vite** | `/pattern vite` | "vite", "build", "dev server", "hmr" |
| **WASM** | `/pattern wasm` | "wasm", "webassembly", "rust wasm" |

---

## � AUTO-DETECTION LOGIC

### Phase 1: Identify Technology

```markdown
User Question: "How do I implement Server Components in Next.js?"

Analysis:
1. Detect: "Server Components" + "Next.js"
2. Match: Next.js pattern skill
3. Suggest: /pattern nextjs
4. Locate: Server Components section
5. Apply: User's project context
```

### Phase 2: Pattern Type Detection

```markdown
Question Types → Pattern Categories:

"How do I..." → Implementation Pattern
"Best practices for..." → Best Practices Pattern
"Architecture of..." → Architecture Pattern
"Error with..." → Debugging Pattern
"Optimize..." → Performance Pattern
```

---

##  AUTO-ACTIVATION RULES

### Rule 1: Explicit Tech Mention

**Trigger:** User mentions specific technology

**Examples:**
```markdown
"How do I use TanStack Query with Next.js?"
→ Detect: Next.js + TanStack
→ Suggest: /pattern nextjs OR /pattern tanstack
→ Priority: Next.js (mentioned second, more specific)
```

### Rule 2: Framework-Specific Concepts

**Trigger:** User uses framework-specific terms

**Examples:**
```markdown
"How do I use Server Components?"
→ Detect: "Server Components" (Next.js specific)
→ Suggest: /pattern nextjs
→ Context: User likely in Next.js project
```

### Rule 3: Build Tool Mention

**Trigger:** User mentions build tool/bundler

**Examples:**
```markdown
"How to configure Vite for React?"
→ Detect: Vite + React
→ Suggest: /pattern vite (primary)
→ Secondary: /pattern react (if needed)
```

### Rule 4: Language-Specific

**Trigger:** User asks about language features

**Examples:**
```markdown
"How to use generics in TypeScript?"
→ Detect: TypeScript + generics
→ Suggest: /pattern typescript
→ Locate: Generics section
```

---

##  IMPLEMENTATION PATTERN

### Pattern Detection Flow

```
┌─────────────────────────────────────────┐
│  User asks question                    │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Extract keywords from question        │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Match keywords to technology          │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Identify pattern skill                │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Suggest: /pattern [tech]               │
│  OR auto-load if appropriate            │
└─────────────────────────────────────────┘
```

---

##  KEYWORD MAPPINGS

### Next.js Keywords

```markdown
Primary Keywords:
- next, nextjs, next.js
- app router, pages router
- server component, client component
- server actions, streaming
- ssr, ssg, isr

Auto-Activate When:
- "server component" mentioned
- "app router" mentioned
- "next.js" or "nextjs" used
- "ssr" or "ssg" in context
```

### Rust Keywords

```markdown
Primary Keywords:
- rust, cargo, rustc
- axum, tokio, async
- ownership, borrowing, lifetime
- trait, generic, macro

Auto-Activate When:
- "axum" mentioned (web framework)
- "tokio" mentioned (async runtime)
- "ownership" or "borrowing" (concepts)
```

### TanStack Keywords

```markdown
Primary Keywords:
- tanstack, react query
- useQuery, useMutation
- @tanstack/* packages
- table, form, router, query

Auto-Activate When:
- "useQuery" or "useMutation"
- "@tanstack/" imports
- "tanstack query" or "tanstack table"
```

---

##  WORKFLOW EXAMPLES

### Example 1: React Hooks Question

```markdown
User: "How to use useEffect with dependencies?"

Detection:
├─ Keyword: "useEffect" → React
├─ Category: Hooks usage
├─ Pattern: /pattern react
└─ Section: useEffect best practices

Auto-Response:
"I detect you're asking about React hooks.
Let me load the React pattern skill for accurate guidance."

→ Loads /pattern react
→ Finds useEffect section
→ Provides best practices
→ Shows dependency array rules
```

### Example 2: Next.js Feature

```markdown
User: "How to implement Server Actions?"

Detection:
├─ Keyword: "Server Actions" → Next.js
├─ Category: Feature implementation
├─ Pattern: /pattern nextjs
└─ Section: Server Actions

Auto-Response:
"Server Actions are a Next.js feature.
Loading Next.js pattern skill..."

→ Loads /pattern nextjs
→ Finds Server Actions section
→ Shows implementation pattern
→ Provides code examples
```

### Example 3: Multi-Tech Question

```markdown
User: "How to use TanStack Query in Next.js?"

Detection:
├─ Keywords: "TanStack Query" + "Next.js"
├─ Priority: Next.js (framework) + TanStack (library)
├─ Patterns: /pattern nextjs (primary)
└─ Secondary: /pattern tanstack

Auto-Response:
"I detect this involves both Next.js and TanStack Query.
Let me load the relevant patterns..."

→ Loads /pattern nextjs
→ Cross-references TanStack Query usage
→ Shows integration pattern
→ Best practices for both
```

---

##  PRIORITY RULES

### When Multiple Technologies Detected

```markdown
Priority Order:
1. Framework (Next.js, NestJS, etc.)
2. Language (TypeScript, Rust, etc.)
3. Library (TanStack, Prisma, etc.)
4. Tool (Vite, etc.)

Example:
"How to use TanStack Query with TypeScript in Next.js?"

Priority:
1. Next.js (framework) → /pattern nextjs
2. TypeScript (language) → /pattern typescript (if needed)
3. TanStack (library) → /pattern tanstack (if needed)

Strategy:
- Load Next.js pattern first
- Check if it covers TanStack Query
- Load TypeScript if generics/types needed
- Load TanStack for specific Query patterns
```

---

##  PATTERN SUGGESTION TEMPLATES

### Template 1: Framework Question

```markdown
"I detect you're asking about {FRAMEWORK}.

Loading {PATTERN} skill for accurate guidance...

{PATTERN_CONTENT}

Would you like more details on {SPECIFIC_TOPIC}?"
```

### Template 2: Implementation Question

```markdown
"For {TECH} implementation, let me load the {PATTERN} pattern.

{PATTERN_GUIDANCE}

Key points:
{BULLET_POINTS}

Should I show code examples?"
```

### Template 3: Best Practices Question

```markdown
"Best practices for {TECH}:

{BEST_PRACTICES}

Common pitfalls to avoid:
{PITFALLS}

See {PATTERN} for complete guidance."
```

---

##  KEY INSIGHTS

### Why Auto-Activation Works

1. **Contextual** → Pattern matches user's question
2. **Progressive** → Load only relevant patterns
3. **Efficient** → Don't load all patterns upfront
4. **Accurate** → Tech-specific, not generic

### Auto-Activation Strategy

```markdown
Always Auto-Load:
├─ Explicit framework mention ("How in Next.js")
├─ Framework-specific concepts ("Server Components")
└─ Build tool + framework combo ("Vite + React")

Suggest Pattern:
├─ General tech question ("How to use TypeScript")
├─ Best practices ("Best practices for Rust")
└─ Multi-tech scenarios ("Next.js + TanStack")

User Choice:
├─ Ambiguous context ("How to implement X")
├─ Multiple valid patterns
└─ Exploratory questions
```

---

##  QUICK REFERENCE

```
Auto-Activation Flow:
├─ Detect tech keywords
├─ Match to pattern skill
├─ Load appropriate pattern
└─ Apply to user's context

Priority:
├─ Framework > Language > Library > Tool
├─ Specific > General
└─ Explicit > Implicit

Pattern Skills:
├─ /pattern nextjs      → Server Components, App Router
├─ /pattern rust        → Ownership, Traits, Axum
├─ /pattern tanstack    → Query, Table, Form, Router
├─ /pattern typescript  → Generics, Types, Interfaces
└─ /pattern [tech]      → Tech-specific patterns

Auto-Load When:
├─ Explicit tech mentioned
├─ Framework-specific concept
├─ Build tool + framework
└─ Clear tech context

Suggest When:
├─ General tech question
├─ Best practices inquiry
└─ Multi-tech scenarios
```

---

*Version: 1.0.0 | Pattern Autoloader Skill*
