# Tech Decisions

**Type:** knowledge
**Summary:** Framework for evaluating and choosing technology stacks, databases, and architecture approaches with tradeoff analysis.
**Tags:** #decisions #architecture
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Advanced
> **Auto-Activation:** "which framework", "which database", "tech stack choice", "x or y"
> **Tags:** [architecture, tech-stack, decision-framework, tradeoffs]
> **Related:** [All pattern skills]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Choosing between frameworks/libraries
- Designing system architecture
- Evaluating technology trade-offs
- Planning migration strategies
- Making build vs buy decisions

**Progressive Disclosure:**
1. **Metadata** → Decision criteria
2. **Instructions** → Framework comparison matrix
3. **Resources** → Migration guides

---

##  Quick Start

```bash
# Decision Framework
1. Requirements → Constraints → Options → Decision
2. Always consider: Team skills, Project timeline, Maintenance cost
3. Prototype risky choices before committing
```

---

##  Quick Reference

| Category | Recommended | Alternative | When to Switch |
|----------|-------------|-------------|----------------|
| **Frontend** | Next.js 16 | Remix, SvelteKit | Need SSR + Edge |
| **State** | TanStack Query | Zustand, Jotai | Server data heavy |
| **Styling** | Tailwind CSS | CSS Modules | Design system exists |
| **Backend** | NestJS / Axum | Express, Fastify | Need structure |
| **DB** | PostgreSQL | MySQL, MongoDB | Need reliability |
| **ORM** | Prisma | Drizzle, TypeORM | TypeScript-first |
| **Testing** | Vitest + Playwright | Jest, Cypress | Vite monorepo |

---

##  Core Concepts

### Decision Framework

**TR3: Team • Requirements • Risk**

```
         Team Skills
             │
    Requirements ───┼── Risk
             │    │
          Options ──┴── Timeline
             │
          Decision
```

**Questions to ask:**
1. **Team:** Who will maintain this? What are their skills?
2. **Requirements:** What problems does this solve?
3. **Risk:** What happens if this choice is wrong?
4. **Timeline:** How fast do we need this?

### The "Rule of Least Power"

**Choose the simplest tool that solves the problem:**

```
Can it be static? → Static HTML/SSG
Need state? → React/Vue
Need routing? → Next.js/Remix
Need backend? → Next.js API / Separate backend
Need realtime? → Add WebSockets/SSE
```

---

##  Decision Matrices

### Frontend Framework Selection

| Framework | Best For | Avoid When | Team Size |
|-----------|----------|-------------|-----------|
| **Next.js** | Marketing sites, Dashboards, E-commerce | Simple static sites | Any |
| **Remix** | Complex forms, Progressive enhancement | Heavy SSR caching | Small+ |
| **SvelteKit** | Performance-critical apps | Large ecosystem needed | Small |
| **Vue/Nuxt** | Rapid prototyping, Team prefers Vue | React-heavy ecosystem | Any |

### State Management Selection

| Need | Solution | Complexity |
|------|----------|------------|
| **Server data** | TanStack Query | Low |
| **Simple UI state** | useState, Zustand | Low |
| **Complex forms** | TanStack Form | Medium |
| **Global state** | Zustand, Jotai | Medium |
| **URL state** | TanStack Router | Medium |
| **Realtime** | Ably, Supabase RT | High |

### Backend Framework Selection

| Language | Framework | Best For | Avoid When |
|----------|-----------|----------|-------------|
| **Node.js** | NestJS, Fastify | Fullstack JS teams | High CPU tasks |
| **Rust** | Axum, Actix | Performance-critical | Rapid prototyping |
| **Python** | FastAPI | ML/Data teams | High concurrency |
| **Go** | Chi, Gin | Microservices | Complex business logic |

---

##  Quality Gates

### Validation Checklist

- [ ] Team has skills to maintain choice
- [ ] Community support is active
- [ ] Migration path exists if needed
- [ ] Performance tested with realistic data
- [ ] Security implications understood

### Acceptance Criteria

- **Sustainability:** Team can maintain for 2+ years
- **Scalability:** Handles 10x growth plan
- **Flexibility:** Can pivot without rewrite
- **Support:** Active community, regular updates

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| Analysis paralysis | Too many options | Use TR3 framework, set deadline |
| Framework fatigue | Constant rewrites | Commit for 6+ months |
| Skill gap | Wrong tech for team | Training or different choice |
| Performance issues | Wrong abstraction level | Profile before optimizing |

---

##  Best Practices

### Prototype Before Committing

```
1. Identify riskiest part of stack
2. Build minimal prototype (1-2 days)
3. Test with realistic data
4. Get team feedback
5. THEN commit to full implementation
```

### The "Buy vs Build" Decision

**Buy when:**
- It's not core business logic
- Team < 10 people
- Maintenance cost > build cost
- Need quick time-to-market

**Build when:**
- Core differentiator
- Need deep customization
- Have team capacity
- Long-term investment makes sense

### Migration Strategy

```
Current System → Strangler Fig Pattern
                    ↓
       New System (parallel)
                    ↓
       Gradual Migration
                    ↓
       Decommission Old
```

---

##  Common Decision Scenarios

### Scenario 1: Startup MVP

**Recommendation:** Next.js + Supabase + Tailwind + Prisma

**Why:**
- Fast development
- Free tier friendly
- TypeScript everywhere
- Easy hiring

### Scenario 2: High-Performance API

**Recommendation:** Rust + Axum + PostgreSQL + sqlx

**Why:**
- Maximum performance
- Memory efficiency
- Type safety with compile-time checks
- Lower cloud costs

### Scenario 3: Enterprise Dashboard

**Recommendation:** Next.js + TanStack + NestJS + PostgreSQL

**Why:**
- Established patterns
- Large talent pool
- Good documentation
- Scalable architecture

---

##  Related Skills

- **Related:** All pattern skills for specific tech
- **Complementary:** `rust-workspace-structure`

---

##  Further Reading

- [Technology Radar (ThoughtWorks)](https://www.thoughtworks.com/radar)
- [StackShare](https://stackshare.io/)
- [LibHunt](https://www.libhunt.com/)

---

##  Success Criteria

Decision is complete when:
- [ ] Documented rationale (why this choice)
- [ ] Migration plan exists
- [ ] Team trained/onboarded
- [ ] Proof-of-concept tested
- [ ] Exit strategy defined

---

*Version: 1.0.0 | Tech Decisions*
