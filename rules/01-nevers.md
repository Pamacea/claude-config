# Nevers - 50+ Règles Bloquantes

> **NEVER do these things, ever.**

---

## 🔍 Search & Navigation

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| `grep`/`glob` first | `/toolkit search` or `grepai search` | 75% token waste, 40% precision |
| Assume file locations | Search before reading | Codebases change |
| Search without semantic tools | Use semantic search first | Traditional tools don't understand semantics |
| Use `find` for files | Use `Glob` tool | Specialized tool is faster |

---

## ✏️ Code Editing

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Edit without reading | Read tool first, understand context | Breaks existing patterns |
| Skip verification (post-2024 libs) | Verify docs via web search | Tech landscape moves fast |
| Ignore existing patterns | Match code style exactly | Inconsistent code = unmaintainable |
| Mix styles in same file | Follow existing conventions | Confusing, error-prone |
| Add premature abstractions | Build for actual requirements | YAGNI - You Aren't Gonna Need It |
| Over-engineer simple features | Simple solution for simple problem | Waste of time, harder to maintain |
| Edit without exact match | Use exact old_string for Edit | Fuzzy edits break files |

---

## 🚀 Implementation

### React / Frontend

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| `useEffect` for data fetching | TanStack Query or Server Components | Better caching, invalidation |
| `useState` for server data | TanStack Query | Handles caching, loading, errors |
| Business logic in `app/` | Use `features/` | `app/` is for routing ONLY |
| API Routes for data | Server Actions | Simpler, type-safe |
| Direct DOM manipulation | React state + refs | Breaks React rendering |
| Inline functions in JSX | `useCallback` or stable refs | Recreates on every render |
| Anonymous functions in deps | Named functions or `useCallback` | ESLint warnings, bugs |

### State Management

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Zustand for server data | TanStack Query | Zustand doesn't cache/invalidate |
| TanStack Query for UI state | Zustand or useState | Overkill for simple UI state |
| Redux for simple apps | Zustand or Context | Too much boilerplate |
| Context for frequent updates | Zustand or signal library | Re-renders all consumers |

### TypeScript

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| `any` type | `unknown` or proper type | Loses type safety |
| `as` casting without validation | Zod or type guards | Unsafe runtime |
| Optional chaining everywhere | Null checks where meaningful | Hides real null issues |
| Index signatures (`[key: string]`) | `Record` or mapped types | Too permissive |

---

## 🧪 Testing

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Skip tests | Test what you change | Bugs in production cost more |
| Test implementation details | Test behavior | Brittle tests, false positives |
| Skip error case testing | Test failure paths | Edge cases are where bugs hide |
| Run entire suite for one fix | Run related tests only | Waste of time |
| Mock everything | Mock only external deps | False confidence |
| Test private methods | Test public interface | Implementation details |

---

## 📦 Git & Version Control

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Commit without lint/typecheck | Run quality gates first | Broken code breaks CI for everyone |
| `git commit --amend` on pushed | Create new commit if pushed | Rewrites public history |
| Skip code review | Get review before merging | Fresh eyes catch mistakes |
| Commit secrets | Use environment variables | Security breach |
| Force push on main/main | Use merge/rebase | Breaks collaborators |
| Ignore merge conflicts | Resolve carefully | Data loss possible |
| Commit with "fix stuff" | Describe WHAT and WHY | Useless git history |

---

## 🔒 Security

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Commit secrets/keys | Environment variables | Credentials exposed |
| Trust client-side validation | Validate at server boundaries | Can be bypassed easily |
| Log sensitive data | Sanitize logs | GDPR violation, security risk |
| Expose error details to client | Generic error messages | Information leakage |
| Store passwords in plain text | Hash with bcrypt/password_hash | Security breach |
| Use eval() or Function() | Safe alternatives | Code injection |
| Disable CORS arbitrarily | Specific origins | Security vulnerability |

---

## ⚡ Performance

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Optimize without measuring | Profile first, optimize bottleneck | Premature optimization |
| Ignore bundle size | Check bundle impact | Slow load times |
| Fetch everything on page load | Lazy load, code splitting | Waste of bandwidth |
| Re-render entire lists | Virtualization for large lists | Performance kill |
| String concatenation in loops | Array join or template strings | Memory allocation |
| Synchronous operations in hot path | Async/await | Blocks event loop |

---

## 📝 Documentation

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Skip documenting complex logic | Add comments for non-obvious code | Future you won't understand |
| Write obvious comments | Let code speak for itself | Noise, not signal |
| Document outdated info | Keep docs in sync with code | Misleading |
| Assume code is self-documenting | Document WHY, not WHAT | Intent matters |

---

## 🗣️ Communication

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Give time estimates | Focus on what needs doing | Always wrong, false expectations |
| Be vague in commit messages | Describe WHAT and WHY | Useless git history |
| Say "it's complicated" | Explain clearly or ask | Unhelpful |
| Hide mistakes | Admit and fix | Trust is essential |

---

## 🏗️ Architecture

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Circular dependencies | Clean dependency graph | Nightmare to maintain |
| God objects/classes | Single responsibility | Hard to test/modify |
| Deeply nested conditionals | Early returns/guard clauses | Cognitive load |
| Magic numbers | Named constants | No context |
| Tight coupling | Dependency injection | Hard to test/evolve |

---

## 🎨 Styling

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Inline styles (except dynamic) | CSS modules or Tailwind | Maintenance nightmare |
| !important (rare exceptions) | Specificity hierarchy | Overrides cascade |
| Hard-coded colors | Design tokens | Inconsistent |
| Pixel values for spacing | Tailwind spacing scale | No rhythm |

---

## 🔧 Tooling

| ❌ NEVER | ✅ ALWAYS | Why |
|---------|-----------|-----|
| Ignore TypeScript errors | Fix root cause | Broken type system |
| Disable ESLint rules | Fix code or configure properly | Technical debt |
| Skip CI/CD | Test before merge | Broken main branch |
| Use outdated dependencies | Regular updates | Security vulnerabilities |

---

## Quick Reference Card

```
Search        → /toolkit search (NEVER grep/glob)
Edit          → Read first (NEVER edit blind)
Server data   → TanStack Query (NEVER useState)
Data fetching → Server Components/Actions (NEVER useEffect)
Business log  → features/ (NEVER app/)
Validation    → Zod at boundaries (NEVER trust client)
Testing       → Behavior, not implementation
Git           → Quality gates first, then commit
Performance   → Measure before optimize
Security      → Validate at server, never trust client
```

---

**Total:** 50+ blocking rules
**Version:** 5.0.0
