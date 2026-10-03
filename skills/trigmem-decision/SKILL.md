---
name: trigmem-decision
description: "TrigMem Decision - 2-Phase Decision Guide — triggers: which approach"
---

# TrigMem Decision - 2-Phase Decision Guide

> **Version:** 2.0.0 | **Category:** Cat 0 (Meta-Memory) | **Difficulty:** Beginner
> **Auto-Activation:** "which approach", "how to decide", "should I use", "choose between", "how should I"
> **Tags:** [decision, methodology, triage, planning, routing]
> **Related:** trigmem-core, trigmem-categories, trigmem-storage
> **Last Updated:** 2025-02-24

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- Complex decision required
- Multiple valid approaches exist
- User asks "How should I...?"
- Unclear implementation path

**Progressive Disclosure:**
1. **Metadata** → Decision triggers
2. **Instructions** → 2-phase framework
3. **Resources** → Decision flows and examples

---

## 🎯 THE 2-PHASE DECISION FRAMEWORK

### Phase 1: Triage (Quick Classification)

**Goal:** Route to appropriate handling

```
┌─────────────────────────────────────────┐
│  What type of request is this?          │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
Simple         Complex        Knowledge
Request        Workflow        Gap?
    │               │               │
    ▼               ▼               ▼
Direct Action  Sub-agent      Skill Load
```

### Decision Triggers

| Request Type | Signal | Action |
|--------------|--------|--------|
| **Direct Action** | Single file, obvious fix | Implement directly |
| **Complex Workflow** | 3+ files, architecture | Use sub-agent |
| **Knowledge Gap** | "How do I...?", patterns | Load skill |
| **Memory Query** | "Did we...?", "How did we..." | Search claude-mem |

---

## 📊 PHASE 1: TRIAGE QUESTIONS

### Question 1: Is This Actionable Now?

**YES** → Can be implemented directly
- Clear requirements
- Known patterns
- Single file or simple change

**Example:**
```typescript
// ✅ Direct Action
User: "Fix the button color"
→ Change button className from blue to red
→ 1 file, 1 line, obvious
```

**NO** → Needs planning or research
- Complex requirements
- Multiple files
- Unknown patterns

**Example:**
```typescript
// ❌ Needs More Than Direct Action
User: "Add authentication system"
→ 5+ files, security considerations, multiple approaches
→ Needs planning or sub-agent
```

---

### Question 2: Is This Complex Workflow?

**YES** → Use sub-agent (isolated context)
- Multi-file implementation
- Architectural decisions
- Independent feature

**Examples:**
- "Build user management system"
- "Refactor the API layer"
- "Add real-time notifications"

**NO** → Can be handled in main context

---

### Question 3: Is This Universal Knowledge?

**YES** → Load skill (portable patterns)
- Tech-specific patterns (Next.js, Rust, etc.)
- Best practices
- Implementation guides

**Examples:**
- "How do I implement Server Components in Next.js 16?"
- "What's the pattern for Rust error handling?"
- "Best practices for TanStack Query?"

**NO** → Project-specific, handle directly

---

## 🎯 PHASE 2: DECISION ROUTING

### Decision Tree

```
┌─────────────────────────────────────────┐
│  START: User Request                    │
└─────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │ Clear, simple task?   │
        └───────────────────────┘
           │ YES          │ NO
           ▼              ▼
      Direct Act    ┌──────────────────┐
                    │ Complex workflow?│
                    └──────────────────┘
                       │ YES      │ NO
                       ▼          ▼
                  Sub-agent  ┌──────────────┐
                            │ Universal    │
                            │ knowledge?   │
                            └──────────────┘
                               │ YES    │ NO
                               ▼        ▼
                           Skill    Project
                                    Specific
                                       │
                                       ▼
                                  Direct Action
```

---

## 🤖 SUB-AGENT DECISION

### When to Use Sub-Agent

**Use Sub-Agent:**
- ✅ Complex feature implementation
- ✅ Multi-file changes
- ✅ Architectural refactoring
- ✅ Independent domain work
- ✅ Requires specialized knowledge

**Don't Use Sub-Agent:**
- ❌ Simple fixes
- ❌ Single-file changes
- ❌ Quick questions
- ❌ Context from main session needed

### Sub-Agent Workflow

```markdown
1. Spawn sub-agent with clear task
2. Provide necessary context
3. Let agent work independently
4. Review and integrate results
5. Update memory if applicable
```

**Example:**
```typescript
// ✅ Good Sub-Agent Use
User: "Build complete payment system"

→ Spawn sub-agent
→ Task: "Implement Stripe payment flow"
→ Context: "Use Prisma, Supabase, existing user schema"
→ Agent returns: Working implementation
→ Integrate and test
```

---

## 📚 SKILL DECISION

### When to Load Skill

**Load Skill:**
- ✅ Tech-specific patterns (Next.js, Rust, etc.)
- ✅ Best practices for library/framework
- ✅ Implementation guides
- ✅ Universal knowledge (portable)

**Don't Load Skill:**
- ❌ Project-specific info (in CLAUDE.md)
- ❌ Simple questions
- ❌ Session context

### Skill Loading Workflow

```markdown
1. Identify skill needed
2. Load skill with Skill tool
3. Apply knowledge from skill
4. Unload if no longer needed
```

**Example:**
```typescript
// ✅ Good Skill Use
User: "How do I implement Server Actions in Next.js 16?"

→ Load skill: /nextjs
→ Find Server Actions section
→ Apply pattern to project
→ Implement feature
```

---

## 🧠 MEMORY DECISION

### When to Search Memory

**Search claude-mem:**
- ✅ "Did we solve this before?"
- ✅ "How did we implement X?"
- ✅ "What was the solution for Y?"
- ✅ Looking for past decisions

**Don't Search Memory:**
- ❌ New feature (no past history)
- ❌ Quick obvious answer
- ❌ External knowledge needed

### Memory Workflow

```markdown
1. Search claude-mem for similar solutions
2. Find past implementation
3. Apply same pattern
4. Save variations if improved
```

---

## 📋 DECISION CHECKLIST

When handling request:

```markdown
Phase 1: Triage
☐ Simple, actionable? → Direct Action
☐ Complex workflow? → Sub-agent
☐ Universal knowledge? → Load Skill
☐ Past solution? → Search Memory

Phase 2: Execute
☐ For Direct Action: Implement directly
☐ For Sub-agent: Spawn and review
☐ For Skill: Load and apply
☐ For Memory: Search and reuse
```

---

## 💡 KEY INSIGHTS

### Why 2-Phase Decision Works

1. **Phase 1 (Triage)**: Quick classification
2. **Phase 2 (Decision)**: Appropriate action

### Token Efficiency

**Direct Action** (0 extra tokens)
- Simple tasks in main context

**Sub-Agent** (isolated context)
- Complex work without bloating main

**Skill** (on-demand)
- Progressive disclosure: metadata → instructions → resources

**Memory** (persistent)
- Reuse past solutions, don't repeat work

---

## 🎯 QUICK REFERENCE

```
Triage Questions:
├─ Simple/obvious? → Direct Action
├─ Complex workflow? → Sub-agent
├─ Universal knowledge? → Load Skill
└─ Past solution? → Search Memory

Direct Action:
├─ Single file
├─ Clear requirements
└─ Known patterns

Sub-Agent:
├─ Multi-file implementation
├─ Architectural decisions
└─ Independent feature

Skill:
├─ Tech-specific patterns
├─ Best practices
└─ Portable knowledge

Memory:
├─ "Did we...?"
├─ "How did we...?"
└─ Past implementations
```

---

*Version: 1.0.0 | TrigMem Decision Skill*
