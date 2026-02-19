# TrigMem Core - EPCT Methodology

> **Version:** 1.0.0 | **Category:** Cat 0 (Meta-Memory)

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- User asks about methodology or workflow
- Complex implementation tasks require planning
- "How do you work?" or "What's your approach?"
- Multi-step problem solving needed

**Progressive Disclosure:**
1. **Metadata** → Quick reference tables
2. **Instructions** → Full EPCT methodology
3. **Resources** → Decision trees and examples

---

## 🎯 CORE PRINCIPLE

### Engineering Excellence via Best Practices

**I build code that is:**
1. **Correct** → Works as intended
2. **Clean** → Maintainable, readable
3. **Performant** → Efficient execution
4. **Sécurisé** → Security-first

### Hierarchy of Values

```
Correctness > Completeness > Speed
```

**Implications:**
- ✅ Never guess - Always verify
- ✅ Verify before implementing (libs post-2024)
- ✅ Follow existing patterns
- ✅ Test thoroughly

---

## 📊 EPCT METHODOLOGY

### The 4 Phases

```
E - EXPLORE │ Semantic search, read patterns, parallel research
P - PLAN    │ Strategy, files to modify, tests, edge cases
C - CODE    │ Follow patterns exactly, barrel exports, self-documenting
T - TEST    │ Lint, typecheck, tests related only
```

### Decision Table: When to Use EPCT

| Task Type | Approach | Example |
|-----------|----------|---------|
| **Tiny Fix** | CODE only | Fix typo, change color |
| **Small Feature** | EXPLORE → CODE | Add button, simple form |
| **Medium Feature** | EPCT complete | Auth flow, data table |
| **Complex Feature** | EPCT + Plan Mode | Payment system, real-time |
| **Architecture** | Plan Mode → EPCT | System redesign, new module |

---

## 🔍 EXPLORE PHASE

### Goal: Understand Before Acting

**Actions:**
1. **Search semantic codebase**
   ```bash
   /toolkit search "relevant keywords"
   grepai search "pattern"
   ```

2. **Read existing patterns**
   - Find similar implementations
   - Check established conventions
   - Identify reusable components

3. **Verify libraries (post-2024)**
   - Web search: "LibName latest docs breaking changes"
   - Read official documentation
   - Test in isolation

**Time:** 5-15 minutes

**Deliverable:** Understanding of codebase patterns and requirements

---

## 📋 PLAN PHASE

### Goal: Strategy Before Implementation

**Actions:**
1. **Define approach**
   - Which files to modify/create?
   - Which patterns to follow?
   - What are the edge cases?

2. **Design structure**
   - Component hierarchy
   - Type definitions
   - Data flow

3. **Plan tests**
   - Unit tests
   - Integration tests
   - E2E tests

**Time:** 10-20 minutes

**Deliverable:** Clear implementation strategy

---

## 💻 CODE PHASE

### Goal: Implementation Following Patterns

**Actions:**
1. **Follow existing patterns exactly**
   - Match code style
   - Use established abstractions
   - Respect conventions

2. **Apply best practices**
   - Barrel exports (index.ts)
   - Type-safe (Zod, TypeScript)
   - Self-documenting code

3. **Delete-first philosophy**
   - Remove before adding
   - Compose over create
   - Reuse over duplicate

**Time:** Variable (task-dependent)

**Deliverable:** Working implementation

---

## 🧪 TEST PHASE

### Goal: Validation Before Completion

**Actions:**
1. **Quality gates**
   ```bash
   npm run lint          # Linting
   npm run typecheck     # TypeScript
   npm run test          # Related tests only
   ```

2. **Test what you change**
   - Behavior, not implementation
   - Related tests only
   - Fix errors found

3. **Manual verification**
   - Test user flows
   - Check edge cases
   - Verify no regressions

**Time:** 5-15 minutes

**Deliverable:** Validated, working code

---

## 🎯 WHEN TO USE PLAN MODE

**EnterPlanMode BEFORE coding when:**
- ✅ Affecting 3+ files
- ✅ Making architectural decisions
- ✅ User didn't specify implementation approach
- ✅ Refactoring large modules
- ✅ Multiple valid approaches exist

**Code directly when:**
- ✅ Small fixes (< 3 files)
- ✅ Obvious bugs
- ✅ User specified exact implementation

---

## 📋 SUCCESS CRITERIA

Implementation is complete when:
- [ ] User's question answered directly
- [ ] Code follows existing patterns
- [ ] No obvious errors
- [ ] File references included (`file:line`)
- [ ] Tests passing (if applicable)
- [ ] Next steps clear (if needed)

---

## 🔄 QUICK REFERENCE

```
Before Any Code:
├─ Search: /toolkit search or grepai search
├─ Read: Read tool before Edit tool
├─ Verify: Check docs (post-2024 libs)
└─ Plan: Use EPCT for anything beyond tiny fix

EPCT Workflow:
├─ EXPLORE: Semantic search, read patterns
├─ PLAN: Strategy, files, tests
├─ CODE: Follow patterns, barrel exports
└─ TEST: Lint, typecheck, related tests

Decision Tree:
├─ Tiny fix (< 3 files) → CODE only
├─ Small feature → EXPLORE → CODE
├─ Medium feature → Full EPCT
├─ Complex/architectural → Plan Mode → EPCT
└─ Not sure? → Start EXPLORE
```

---

## 💡 KEY INSIGHTS

**Why EPCT Works:**
1. **EXPLORE** prevents reinventing the wheel
2. **PLAN** prevents wrong approaches
3. **CODE** with patterns ensures consistency
4. **TEST** ensures quality before completion

**Common Mistakes:**
1. ❌ Skipping EXPLORE → Duplicated code
2. ❌ Skipping PLAN → Wrong architecture
3. ❌ Not following patterns → Inconsistent codebase
4. ❌ Skipping TEST → Bugs in production

**Best Practices:**
1. ✅ Search before creating
2. ✅ Plan before coding
3. ✅ Follow patterns exactly
4. ✅ Test before completing
5. ✅ Delete before adding

---

*Version: 1.0.0 | TrigMem Core Skill*
