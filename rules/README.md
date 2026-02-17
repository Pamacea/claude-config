# Rules - v5.0 Complete

> **Documentation complète des règles, patterns et décisions techniques**

---

## 📁 Structure

```
rules-new/
├── README.md                # Ce fichier
├── 00-core.md               # Principes fondamentaux, EPCT, mission
├── 01-nevers.md             # 50+ règles bloquantes
├── 02-conventions.md        # Git, docs, structure de projet
├── 03-tech-decisions.md     # Décisions de stack technique
│
├── 10-patterns-nextjs.md    # Patterns Next.js 16 + React 19
├── 11-patterns-rust-axum.md # Patterns Rust + Axum
└── 12-patterns-nestjs.md    # Patterns NestJS
```

---

## 🎯 Utilisation

### Pour Claude Code

Ces fichiers sont chargés au démarrage de chaque session. Ils contiennent :

1. **Règles fondamentales** - Ce qu'on doit/ne doit pas faire
2. **Conventions** - Git, documentation, structure de projet
3. **Décisions techniques** - Quel stack choisir et quand
4. **Patterns** - Exemples de code concrets pour chaque techno

### Pour les développeurs

**Quick Reference :**

| Besoin | Fichier | Section |
|--------|---------|---------|
| Mission, principes, EPCT | `00-core.md` | Tous |
| Règles bloquantes | `01-nevers.md` | Toutes les catégories |
| Git Flow | `02-conventions.md` | Git Flow Master |
| Structure de projet | `02-conventions.md` | Project Structure |
| Choix de stack | `03-tech-decisions.md` | Decision Matrix |
| Patterns Next.js | `10-patterns-nextjs.md` | Tous les patterns |
| Patterns Rust/Axum | `11-patterns-rust-axum.md` | Tous les patterns |
| Patterns NestJS | `12-patterns-nestjs.md` | Tous les patterns |

---

## 📊 Contenu Détaillé

### 00-core.md - Fondamentaux

- Qui je suis et ma mission
- Principes : Correctness > Completeness > Speed
- Méthodologie EPCT (Explore, Plan, Code, Test)
- Quand utiliser Plan Mode
- Style de communication
- Critères de succès

### 01-nevers.md - Règles Bloquantes

50+ règles réparties en catégories :
- Search & Navigation
- Code Editing
- Implementation (React, State, TypeScript)
- Testing
- Git & Version Control
- Security
- Performance
- Documentation
- Communication
- Architecture
- Styling
- Tooling

### 02-conventions.md - Conventions

**Git Flow Master :**
- Format des commits (TYPE: PROJECT - vX.Y.Z)
- Types : RELEASE, UPDATE, PATCH
- Checklist pre-commit
- Interface web (localhost:3747)

**Documentation Convention :**
- Dual-layout (README + GUIDE + REFERENCE)
- README.md : 30-second hook
- GUIDE.md : Storytelling deep dive
- REFERENCE.md : Quick lookup

**Project Structure :**
- Architecture Clean (app/, ui/, features/, lib/)
- Feature module pattern
- Import rules
- Data flow

### 03-tech-decisions.md - Décisions Techniques

**Decision Matrix :**
- Full-stack SSR → Next.js + Prisma
- Type-safe SPA → TanStack Start
- High-performance API → Rust + Axum
- SaaS → Next.js + Stripe
- Real-time → NestJS + Socket.io

**Frontend :**
- Next.js 16 vs TanStack Start vs Vite
- State management (TanStack Query, Zustand)
- Styling (Tailwind, shadcn/ui)

**Backend :**
- Node.js + NestJS (structured, enterprise)
- Rust + Axum (performance, type safety)
- Go (concurrency)

**Database :**
- PostgreSQL (relations, ACID)
- MongoDB (flexible schema)
- SQLite (embedded)

**Testing :**
- Vitest (unit/integration)
- Playwright (E2E)

### 10-patterns-nextjs.md - Next.js 16

**Patterns couverts :**
- Server vs Client Components
- Server Actions avec Zod
- Cache Components (`use cache`)
- TanStack Query integration
- Route handlers (webhooks only)
- Layouts & Templates
- Performance (dynamic imports, images)
- Security (env vars, validation)
- Testing

### 11-patterns-rust-axum.md - Rust + Axum

**Patterns couverts :**
- Project structure (DDD)
- Router setup
- Handlers & Extractors
- Authentication (JWT middleware)
- Database with SQLx
- Repository pattern
- Error handling (anyhow, thiserror)
- WebSockets
- Testing (axum-test)
- Async patterns

### 12-patterns-nestjs.md - NestJS

**Patterns couverts :**
- Project structure (modules/)
- Modules & Controllers
- Services & DTOs
- Guards & Strategies (JWT)
- Roles & Permissions
- TypeORM integration
- WebSockets (Socket.io)
- Scheduling tasks
- Testing (unit + e2e)
- Interceptors & Filters

---

## 🔄 Migration depuis Ancienne Structure

| Ancien (181 fichiers) | Nouveau (12 fichiers) |
|----------------------|----------------------|
| `00-foundations/identity.md` | `00-core.md` |
| `00-foundations/workflow.md` | `00-core.md` (EPCT) |
| `00-foundations/nevers.md` | `01-nevers.md` (étendu) |
| `00-foundations/git-convention.md` | `02-conventions.md` (Git) |
| `00-foundations/doc-convention.md` | `02-conventions.md` (Docs) |
| `00-foundations/structure.md` | `02-conventions.md` (Structure) |
| `00-foundations/tech-selection.md` | `03-tech-decisions.md` |
| `01-tech-stacks/nextjs-16/*` | `10-patterns-nextjs.md` |
| `01-tech-stacks/rust-ddd/*` | `11-patterns-rust-axum.md` |
| `01-tech-stacks/nestjs/*` | `12-patterns-nestjs.md` |

---

## 🎯 Points Clés

### Ce qui a été gardé
- ✅ Toutes les règles critiques (Nevers)
- ✅ Toutes les best practices
- ✅ Toutes les conventions custom (Git Flow, Docs)
- ✅ Les décisions de stack technique
- ✅ Les patterns de code pour chaque techno
- ✅ Les exemples concrets et exploitables

### Ce qui a été supprimé
- ❌ La répétition entre techno similaires
- ❌ Les templates trop détaillés
- ❌ Les exemples triviaux
- ❌ La redondance avec la documentation officielle

### Ce qui a été amélioré
- ✨ Plus de patterns concrets et copiables
- ✨ Meilleure organisation par techno
- ✨ Exemples de code complets
- ✨ Checklists pratiques
- ✨ Comparatifs de décision

---

## 📚 Ressources Externes

**Documentation officielle (toujours vérifier) :**
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TanStack: https://tanstack.com
- Rust: https://doc.rust-lang.org/
- Axum: https://docs.rs/axum/
- NestJS: https://docs.nestjs.com/

**Outils :**
- grepai: https://github.com/yoanbernabeu/grepai
- SMITE: https://github.com/Pamacea/smite

---

*Version: 5.0.0 | Dernière mise à jour: 2025-02-17*
