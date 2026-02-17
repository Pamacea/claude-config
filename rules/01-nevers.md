# Nevers - Règles Bloquantes

> **Version:** 1.0.0 | **NEVER do these things, ever.**

---

## 🔍 Search & Navigation

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| `grep`/`glob` first | `grepai search` |
| Assume file locations | Search before reading |
| Search without semantic tools | Use semantic search first |

---

## ✏️ Code Editing

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Edit without reading | Read tool first |
| Skip verification (post-2024) | Verify docs via web search |
| Ignore existing patterns | Match code style exactly |
| Edit without exact match | Use exact old_string for Edit |

---

## 🚀 Implementation

### React / Frontend

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| `useEffect` for data fetching | TanStack Query or Server Components |
| `useState` for server data | TanStack Query |
| Business logic in `app/` | Use `features/` |
| API Routes for data | Server Actions |

### State Management

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Zustand for server data | TanStack Query |
| TanStack Query for UI state | Zustand or useState |
| Redux for simple apps | Zustand or Context |

### TypeScript

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| `any` type | `unknown` or proper type |
| `as` casting without validation | Zod or type guards |

---

## 🧪 Testing

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Skip tests | Test what you change |
| Test implementation details | Test behavior |
| Run entire suite for one fix | Run related tests only |

---

## 📦 Git & Version Control

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Commit without lint/typecheck | Run quality gates first |
| `git commit --amend` on pushed | Create new commit if pushed |
| Force push on main/master | Use merge/rebase |
| Commit with "fix stuff" | Describe WHAT and WHY |

---

## 🔒 Security

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Commit secrets/keys | Environment variables |
| Trust client-side validation | Validate at server boundaries |
| Log sensitive data | Sanitize logs |
| Store passwords in plain text | Hash with bcrypt |

---

## ⚡ Performance

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Optimize without measuring | Profile first, optimize bottleneck |
| Ignore bundle size | Check bundle impact |
| Fetch everything on page load | Lazy load, code splitting |

---

## 🏗️ Architecture

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Circular dependencies | Clean dependency graph |
| God objects/classes | Single responsibility |
| Deeply nested conditionals | Early returns/guard clauses |
| Magic numbers | Named constants |

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

**Total:** 40+ blocking rules
**Version:** 5.0.0
