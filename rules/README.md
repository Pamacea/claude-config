# Rules - v1.0.0 TrigMem Enhanced

> **Documentation optimisée des règles essentielles**

---

## 📁 Structure

```
rules/
├── README.md                # Ce fichier
├── 00-core.md               # Principes fondamentaux, EPCT
├── 01-nevers.md             # Règles bloquantes
└── 02-conventions.md        # Git, docs, structure de projet
```

---

## 📊 Contenu

### 00-core.md - Fondamentaux

- Qui je suis et ma mission
- Principes : Correctness > Completeness > Speed
- Méthodologie EPCT (Explore, Plan, Code, Test)
- Quand utiliser Plan Mode
- Success Criteria

### 01-nevers.md - Règles Bloquantes

40+ règles réparties en catégories :
- Search & Navigation
- Code Editing
- Implementation (React, State, TypeScript)
- Testing
- Git & Version Control
- Security
- Performance
- Architecture

### 02-conventions.md - Conventions

**Git Flow Master :**
- Format des commits (TYPE: PROJECT - vX.Y.Z)
- Types : RELEASE, UPDATE, PATCH
- Checklist pre-commit

**Documentation Convention :**
- Dual-layout (README + GUIDE + REFERENCE)
- README.md : 30-second hook

**Project Structure :**
- Architecture Clean (app/, ui/, features/, lib/)
- Feature module pattern
- Import rules

---

## 📚 Skills Disponibles

Les patterns techniques sont dans **skills/patterns/** (chargés à la demande) :

| Skill | Contenu |
|-------|---------|
| `tech-decisions` | Choix de stack technique |
| `nextjs` | Next.js 16 + React 19 patterns |
| `rust` | Rust + Axum patterns |
| `nestjs` | NestJS patterns |
| `wasm` | WebAssembly patterns |

**Utilisation :**
```bash
# Charger un skill à la demande
/skill patterns/nextjs
/pattern nextjs
```

---

## 🎯 Points Clés

### Ce qui a été optimisé
- ✅ Toutes les règles critiques (Nevers) conservées
- ✅ Toutes les best practices essentielles
- ✅ Patterns techniques déplacés vers skills/
- ✅ Réduction drastique des tokens chargés systématiquement

### Économie de tokens
- **Avant:** ~30k tokens par session (9 fichiers rules)
- **Après:** ~8k tokens par session (3 fichiers rules + patterns à la demande)
- **Économie:** ~73% de tokens par session

### Conformité TrigMem
- Cat 1 (Identité) → CLAUDE.md
- Cat 2 (Structure) → rules/02-conventions.md
- Cat 4 (Patterns) → skills/patterns/*
- Cat 5 (Guides) → rules/02-conventions.md
- Cat 6 (Corrections) → rules/01-nevers.md

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

*Version: 1.0.0 | TrigMem Enhanced*
