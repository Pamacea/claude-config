# Conventions - Git, Docs, Project Structure

> **Version:** 1.0.0 | TrigMem Enhanced

---

## 🔄 Git Flow Master Convention

### Format des Commits

```
TYPE: PROJECT NAME - vX.Y.Z

- Change 1
- Change 2
```

### Types de Commits

| Type | SemVer | Usage |
|------|--------|-------|
| **RELEASE** | MAJOR | Breaking changes |
| **UPDATE** | MINOR | Nouvelles fonctionnalités |
| **PATCH** | PATCH | Bug fixes |
| **WIP** | MAJOR | Refactoring |

### Exemples

```bash
# Nouvelle fonctionnalité
git commit -m "UPDATE: MyProject - v1.2.0

- Added: Product catalog feature
- Improved: API response times"

# Correction de bug
git commit -m "PATCH: MyProject - v1.1.1

- Fixed: Cart calculation error"
```

### Checklist Pre-Commit

```bash
- [ ] npm run lint          # Linting OK
- [ ] npm run typecheck     # TypeScript OK
- [ ] npm run test          # Tests OK
- [ ] Pas de secrets        # .env, API keys
- [ ] Message au format     # TYPE: Project - vX.Y.Z
```

---

## 📚 Documentation Convention

### Dual-Layout Strategy

```
project/
├── README.md        # Hook 30 secondes
├── GUIDE.md         # Storytelling 5 minutes
└── REFERENCE.md     # Cheat sheet
```

### README.md - The 30-Second Hook

**Règles:**
- ✅ One-liner < 15 mots
- ✅ Quick Start = 3 commandes max
- ✅ < 50 lignes total
- ❌ Pas de "Coming soon"

**Template:**
```markdown
# Tech Name

One-liner percutant.

**Problem:** Ce que ça résout
**Solution:** Comment

## Quick Start
```bash
npm install tech-name
tech-name init
```
```

---

## 🏗️ Project Structure - Clean Architecture

```
src/
├── app/                      # Next.js App Router (routing only)
│   ├── (auth)/              # Route groups
│   ├── (dashboard)/
│   └── api/                 # API routes (webhooks only)
│
├── features/                # Business logic
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── actions/         # Server actions
│       └── types.ts
│
├── ui/                      # Presentational components
│   ├── atoms/               # Smallest building blocks
│   ├── molecules/           # Combinations of atoms
│   ├── organisms/           # Complex UI components
│   └── templates/           # Page layouts
│
├── lib/                     # Library code & configs
│   ├── db/                  # Database
│   ├── api/                 # API client
│   └── utils/               # Pure functions
│
└── config/                  # App configuration
```

### Feature Module Pattern

```
features/[feature]/
├── components/    # Feature UI
├── hooks/         # Feature client logic
├── actions/       # Server actions
├── services/      # Business logic
└── types.ts       # Feature types
```

---

## 📝 File Naming Conventions

```
Components      → PascalCase.tsx           # Button.tsx
Tests           → PascalCase.test.tsx     # Button.test.tsx
Hooks           → camelCase.ts             # useAuth.ts
Utils           → camelCase.ts             # formatCurrency.ts
Config files    → kebab-case.ts            # site-config.ts
Constants       → UPPER_SNAKE_CASE.ts      # API_BASE_URL.ts
```

---

## 🎯 Import Rules

**✅ Allowed:**
```typescript
// Feature → UI
import { Button } from '@/ui/atoms/button'

// Feature → Lib
import { formatCurrency } from '@/lib/utils/format'

// Feature → Feature
import { useAuth } from '@/features/auth'
```

**❌ Forbidden:**
```typescript
// UI → Features (coupling)
import { useTodos } from '@/features/todos'

// UI → Lib/DB (infrastructure in UI)
import { db } from '@/lib/db'

// Lib → Features (circular)
import { useAuth } from '@/features/auth'
```

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

*Version: 5.0.0 | TrigMem Enhanced*
