# CHANGELOG - Claude Config

> **Historique des versions de claude-config**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-02-18

### ✨ Nouveaux Skills Patterns

#### UX Design Patterns
- **Atomic Design** - Atomes → Molécules → Organismes
- **Accessibilité d'abord** - ARIA, keyboard navigation, WCAG AA
- **Animations performantes** - GPU only, prefers-reduced-motion
- **Anti-patterns** - Ne pas copier les tendances aveuglément

#### Documentation Patterns
- **README.md** - 30-second hook template
- **GUIDE.md** - Storytelling 5 minutes
- **REFERENCE.md** - Cheat sheet format
- **JSDoc/TSDoc** - Code documentation patterns
- **Changelog** - Keep a Changelog format

### 🔧 Nouveaux Skills Opérationnels

#### MCP Mandatory
- **Checklist pré-action** - Quand utiliser les MCPs
- **claude-mem** - Mémoire persistante
- **git-flow-master** - Commits versionnés
- **chrome-devtools** - Debugging UI
- **z-ai** - Analyse images/vidéos

### 📏 Nouvelles Règles

#### Delete First (rules/03-delete-first.md)
- YAGNI - You Aren't Gonna Need It
- Variants over duplicates
- Composition > Création
- Abstraction only after 3+ uses

#### React Hooks Limits (rules/04-react-hooks-limits.md)
- **MAX 1 useEffect** par composant
- Data fetching → TanStack Query ou Server Components
- useMemo → Calculs costauds seulement
- useCallback → Children memoized seulement

#### Reusability (rules/05-reusability.md)
- Barrel exports (index.ts)
- Composition over inheritance
- Generic types for flexibility
- DRY - Don't Repeat Yourself

#### MCP Mandatory (rules/06-mcp-mandatory.md)
- Strong suggestions (pas bloquant)
- Pre-action checklist
- MCP selection flowchart

### 🛠️ Scripts

#### analyze-trigmem.sh
- Analyse history.jsonl pour vérifier l'utilisation des skills TrigMem
- Rapport de compliance
- Recommandations d'amélioration

### 📊 Statistiques

| Métrique | v1.0.0 | v1.1.0 |
|----------|-------|-------|
| **Fichiers rules** | 4 | 7 |
| **Skills trigmem** | 5 | 6 |
| **Skills patterns** | 9 | 11 |
| **Skills operations** | 0 | 1 |
| **Scripts** | 0 | 1 |

---

## [1.0.0] - 2026-02-17

### 🎉 Release Initiale - TrigMem Enhanced

Première version publique de **claude-config** avec la méthodologie TrigMem complète.

### ✨ Nouveautés

#### TrigMem Integration
- **Système TrigMem** complet avec 6 catégories
- **Skills trigmem** : core, categories, decisions, storage, examples
- **Économie de tokens : 73%** sur les sessions standards (~8k tokens vs ~30k)

#### Skills Patterns (à la demande)
- `tech-decisions` - Choix de stack technique
- `nextjs` - Next.js 16 + React 19 patterns
- `rust` - Rust + Axum patterns
- `nestjs` - NestJS patterns
- `wasm` - WebAssembly patterns
- `vite` - Vite patterns
- `typescript` - TypeScript patterns
- `tanstack` - TanStack (Query/Router/Form)
- `tailwind` - Tailwind CSS patterns

#### Rules Essentielles
- `00-core.md` - Principes fondamentaux + EPCT
- `01-nevers.md` - 40+ règles bloquantes
- `02-conventions.md` - Git, Docs, Structure

### 📁 Structure

```
.claude/
├── skills/
│   ├── trigmem/           # Système TrigMem
│   └── patterns/          # Patterns à la demande
├── rules/                  # Règles essentielles
└── CLAUDE.md              # Identité projet
```

### 📚 Documentation
- README.md - Quick Start et présentation
- GUIDE.md - Guide complet d'utilisation
- REFERENCE.md - Référence rapide
- CHANGELOG.md - Historique des versions

### 🎯 Triggers de Chargement

Les patterns sont chargés automatiquement selon les mots-clés :
- **Next.js**: "Server Action", "RSC", "App Router", "revalidateTag"
- **Rust**: "Axum", "sqlx", "Tower middleware", "extractor"
- **NestJS**: "DTO validation", "JWT guard", "TypeORM"
- **WASM**: "wasm-bindgen", "wasm-pack", "WASM Next.js"
- **Vite**: "vite config", "build", "dev server"
- **TypeScript**: "generic", "utility type", "type guard"
- **TanStack**: "useQuery", "router", "form", "mutation"
- **Tailwind**: "responsive", "dark mode", "shadcn"

---

## 🔄 Migration depuis v5.0.0

### Changements

| Avant (v5.0.0) | Après (v1.0.0) |
|----------------|----------------|
| 9 fichiers rules | 4 fichiers rules |
| Patterns dans rules/ | Patterns dans skills/patterns/ |
| Tout chargé systématiquement | Patterns à la demande |
| ~30k tokens/session | ~8k tokens/session |

### Patterns Déplacés

- `rules/03-tech-decisions.md` → `skills/patterns/tech-decisions/`
- `rules/10-patterns-nextjs.md` → `skills/patterns/nextjs/`
- `rules/11-patterns-rust-axum.md` → `skills/patterns/rust/`
- `rules/12-patterns-nestjs.md` → `skills/patterns/nestjs/`
- `rules/13-patterns-wasm-rust.md` → `skills/patterns/wasm/`

---

## 📊 Statistiques v1.0.0

| Métrique | Valeur |
|----------|-------|
| **Fichiers rules** | 4 (README inclus) |
| **Skills trigmem** | 5 |
| **Skills patterns** | 9 |
| **Lignes totales rules** | ~546 |
| **Lignes totales patterns** | ~2682 |
| **Économie tokens** | 73% |

---

## 🔮 Roadmap

### v1.1.0 (Planifié)
- [ ] Pattern SolidJS
- [ ] Pattern React Three Fiber
- [ ] Pattern Bevy
- [ ] Pattern React Native
- [ ] Pattern Astro
- [ ] Pattern SOPS
- [ ] Pattern SWC/Ruff
- [ ] Pattern Supabase/MongoDB/PostgreSQL

### v2.0.0 (Planifié)
- [ ] Intégration automatique des nouveaux patterns
- [ ] CLI d'installation interactive
- [ ] Tests des skills
- [ ] Documentation interactive

---

*Version: 1.0.0 | Date: 2026-02-17*
