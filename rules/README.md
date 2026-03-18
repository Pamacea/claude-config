# Rules - Système de Standards Techniques Positifs

> **Version:** 2.0.0 | TrigMem Enhanced | Positive Standards
> **Dernière mise à jour:** 2025-03-17

---

## 📁 Structure

```
rules/
├── README.md                # Ce fichier
├── 00-core.md               # Principes fondamentaux, EPCT
├── 01-standards.md          # Standards techniques positifs
├── 02-conventions.md        # Git, docs, structure de projet
├── 03-delete-first.md       # Philosophie de simplification
├── 04-react-hooks-limits.md  # Standards Server Components
├── 05-reusability.md        # Patterns de réutilisation
├── 06-mcp-mandatory.md      # Workflows MCP optimaux
├── 07-pre-commit-gates.md   # Pipeline de validation avant commit
├── quality-gates.md         # Critères de validation
└── legacy/                  # Anciennes règles (référence)
    ├── 01-nevers.md.bak      # Version historique
    └── ...

../hooks/
├── pre-commit.cjs           # Git hook cross-platform (Node.js)
└── README.md                # Documentation des hooks
```

---

## 📊 Contenu

### 00-core.md - Fondamentaux

- Qui je suis et ma mission
- Principes : Correctness > Completeness > Speed
- Méthodologie EPCT (Explore, Plan, Code, Test)
- Quand utiliser Plan Mode
- Success Criteria

### 01-standards.md - Standards Techniques (NOUVEAU)

**Remplace :** `01-nevers.md` (approche négative)

Standards techniques pour :
- Search & Navigation (grepai search prioritaire)
- Code Editing (Edit-Informed Workflow)
- Implementation (React, State, TypeScript)
- Testing (Behavior-driven)
- Git & Version Control
- Security (Defense in depth)
- Performance (Measure before optimize)
- Architecture (Clean dependency graph)

**Changement clé :** Tableaux "NEVER/ALWAYS" transformés en standards positifs et checklists de validation.

### 02-conventions.md - Conventions

- Git Flow Master (format TYPE: PROJECT - vX.Y.Z)
- Documentation Convention (README + GUIDE + REFERENCE)
- Project Structure (Clean Architecture)
- File Naming Conventions
- Import Rules (forward/backward dependencies)

### 03-delete-first.md - Delete First Philosophy

- Search Before Create workflow
- Variant Props over Duplicate Components
- Composition over Creation
- Abstraction Standards (YAGNI)
- Refactoring Workflow

### 04-react-hooks-limits.md - React Hooks Standards

- Server Components Priority
- useEffect Guidelines (Browser APIs, Third-party SDKs)
- useMemo Standards (Measure first)
- useCallback Standards (Memoized components)
- Hook Alternatives (Derived State, Server Actions)
- Custom Hooks Standards

### 05-reusability.md - Reusability Standards

- Barrel Exports (index.ts pattern)
- Component Reusability (Variants, Slots, Polymorphic)
- Utility Reusability (Pure functions, Generics)
- Composition over Inheritance
- Type Reusability (Shared types, Generic components)
- DRY Patterns

### 06-mcp-mandatory.md - MCP Workflows

- claude-mem (Memory Reuse)
- git-flow-master (Versioned Commits)
- chrome-devtools (UI Testing)
- z-ai (Visual Analysis)
- web-reader & web-search-prime (Documentation)

### 07-pre-commit-gates.md - Pipeline de Validation (NOUVEAU)

**Règle bloquante :** Aucun commit sans validation complète

Pipeline obligatoire avant `git commit` :
- Rust: `cargo check` → `cargo clippy -- -D warnings` → `cargo fmt --check` → `cargo test`
- TypeScript: `npm run typecheck` → `npm run lint`
- E2E: `npx playwright test` (si UI modifiée)

Commit format avec Verification footer :
```
Verification:
- cargo check: ✅
- cargo clippy: ✅
- cargo test: ✅
```

### quality-gates.md - Système de Validation

Critères de validation pour :
- Feature Development
- Bug Fix
- Refactoring
- Performance Optimization
- Security Fix
- Documentation
- Testing
- Dependencies Update

---

## 🎯 Points Clés

### Ce qui a Changé (v2.0.0)

**Approche Positive :**
- ✅ Plus de "NEVER", "NO", "PROHIBITED", "INTERDIT"
- ✅ Standards techniques positifs à la place
- ✅ Checklists de validation pour auto-contrôle
- ✅ Quality Gates objectifs pour chaque type de tâche

**Nouveaux Fichiers :**
- ✅ `01-standards.md` (remplace 01-nevers.md)
- ✅ `quality-gates.md` (nouveau système)

**Fichiers Mis à Jour :**
- ✅ `00-core.md` - Principes sans négatifs
- ✅ `02-conventions.md` - Standards d'import
- ✅ `03-delete-first.md` - Patterns de simplification
- ✅ `04-react-hooks-limits.md` - Server Components priority
- ✅ `05-reusability.md` - Patterns de réutilisation
- ✅ `06-mcp-mandatory.md` - Workflows optimaux

### Économie de Tokens (maintenu)

- **Base Rules:** ~8k tokens par session
- **Quality Gates:** ~1k tokens supplémentaires
- **Total:** ~9k tokens (vs ~30k avant TrigMem)

---

## 📚 Skills Disponibles

Les patterns techniques sont maintenant dans **skills/** (chargés à la demande) :

```
/skills/patterns/tech-decisions/    → Choix de stack
/skills/patterns/nextjs/             → Next.js 16 patterns
/skills/patterns/rust/               → Rust + Axum patterns
/skills/patterns/nestjs/             → NestJS patterns
/skills/patterns/wasm/               → WebAssembly patterns
```

**Utilisation :** Demandez `/pattern nextjs` ou `/skill nextjs` pour charger.

---

## 🔄 Migration depuis v1.0

### Ancien → Nouveau

| Ancien Fichier | Nouveau Fichier | Changement |
|---------------|----------------|------------|
| `01-nevers.md` | `01-standards.md` | Positif |
| N/A | `quality-gates.md` | Nouveau |
| `00-core.md` | `00-core.md` | Mis à jour |
| `02-conventions.md` | `02-conventions.md` | Mis à jour |
| `03-delete-first.md` | `03-delete-first.md` | Mis à jour |
| `04-react-hooks-limits.md` | `04-react-hooks-limits.md` | Mis à jour |
| `05-reusability.md` | `05-reusability.md` | Mis à jour |
| `06-mcp-mandatory.md` | `06-mcp-mandatory.md` | Mis à jour |

### Pour les Plugins/Users

**Si vous utilisez l'ancien système :**

```bash
# Les anciens fichiers sont déplacés dans rules/legacy/
mv rules/01-nevers.md rules/legacy/
```

**Pour vous mettre à jour :**

1. Remplacer les imports de `01-nevers.md` par `01-standards.md`
2. Mettre à jour les références aux "NEVER/ALWAYS"
3. Utiliser les nouvelles Quality Gates dans vos workflows

---

## 📚 Ressources Externes

**Documentation officielle (toujours vérifier) :**
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TanStack: https://tanstack.com
- Rust: https://doc.rust-lang.org/
- Axum: https://docs.rs/axum/
- NestJS: https://docs.nestjs.com/

---

*Version: 2.0.0 | Rules - Positive Standards System*
