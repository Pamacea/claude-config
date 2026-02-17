# Conventions - Git, Docs, Project Structure

> **Version:** 5.0.0**

---

## 🔄 Git Flow Master Convention

### Format des Commits

```
TYPE: PROJECT NAME - vX.Y.Z

- Change 1
- Change 2
```

### Types de Commits

| Type | SemVer | Usage | Exemple |
|------|--------|-------|---------|
| **RELEASE** | MAJOR | Breaking changes | `RELEASE: MyProject - v2.0.0` |
| **UPDATE** | MINOR | Nouvelles fonctionnalités | `UPDATE: MyProject - v1.1.0` |
| **PATCH** | PATCH | Bug fixes | `PATCH: MyProject - v1.0.1` |

### Règles de Commit

1. **Type** - RELEASE, UPDATE, ou PATCH (uppercase)
2. **Project Name** - 1-50 caractères
3. **Version** - Format vX.Y.Z (ex: v1.0.0)
4. **Body** - Optionnel, lister les changements

### Exemples de Commits

```bash
# Nouvelle fonctionnalité
git commit -m "UPDATE: ShopFlow - v1.2.0

- Added: Product catalog feature
- Improved: API response times
- Fixed: Login redirect issue"

# Correction de bug
git commit -m "PATCH: ShopFlow - v1.1.1

- Fixed: Cart calculation error
- Fixed: Mobile navigation"

# Breaking change
git commit -m "RELEASE: ShopFlow - v2.0.0

- Breaking: Changed API authentication
- Added: OAuth2 support
- Removed: Legacy API endpoints"
```

### Checklist Pre-Commit

```bash
# Avant de committer, toujours :
- [ ] npm run lint          # Linting OK
- [ ] npm run typecheck     # TypeScript OK
- [ ] npm run test          # Tests OK
- [ ] Pas de secrets        # .env, API keys
- [ ] Message au format     # TYPE: Project - vX.Y.Z
```

### Interface Web

**Dashboard:** http://localhost:3747

```bash
# Obtenir la configuration
curl http://localhost:3747/api/config

# Suggestion de version
curl "http://localhost:3747/api/suggest/version?path=$(pwd)"

# Créer un commit via API
curl -X POST http://localhost:3747/api/repo/commit
```

---

## 📚 Documentation Convention

### Dual-Layout Strategy

Chaque techno = 3 documents :

```
project/
├── README.md        # Hook 30 secondes
├── GUIDE.md         # Storytelling 5 minutes
└── REFERENCE.md     # Cheat sheet
```

### README.md - The 30-Second Hook

**Objectif:** Convaincre en 30 secondes.

**Règles:**
- ✅ One-liner < 15 mots
- ✅ Quick Start = 3 commandes max
- ✅ < 50 lignes total
- ✅ Live example copiable
- ❌ Pas de "Coming soon"
- ❌ Pas de badges GitHub stars

**Template:**
```markdown
# Tech Name

One-liner percutant.

**Problem:** Ce que ça résout (1 phrase)
**Solution:** Comment (1 phrase)

## Quick Start
```bash
npm install tech-name
tech-name init
```

## Key Benefits
- ⚡ Benefit 1
- 🎨 Benefit 2
- 🔒 Benefit 3

📖 [Full Guide →](./GUIDE.md) | 📋 [Reference →](./REFERENCE.md)
```

### GUIDE.md - Storytelling Deep Dive

**Règles:**
- ✅ Problem → Solution storytelling
- ✅ ASCII architecture diagram
- ✅ Comparative tables
- ✅ Live examples with explanations
- ✅ Best practices section
- ✅ Migration guide (si applicable)

### REFERENCE.md - Quick Lookup

**Règles:**
- ✅ CLI commands table
- ✅ Common patterns (3-5)
- ✅ Troubleshooting table
- ✅ API reference (si applicable)

---

## 🏗️ Project Structure - Clean Architecture

### Structure Complète

```
src/
├── app/                      # Next.js App Router (routing only)
│   ├── (auth)/              # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/         # Dashboard routes
│   ├── api/                 # API endpoints (webhooks only)
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── loading.tsx          # Global loading
│   └── error.tsx            # Global error
│
├── ui/                       # UI components (presentational only)
│   ├── atoms/               # Smallest building blocks
│   │   ├── button/
│   │   ├── input/
│   │   ├── badge/
│   │   └── ...
│   ├── molecules/           # Combinations of atoms
│   │   ├── form-field/      # Input + Label + Error
│   │   ├── search-bar/      # Input + Icon + Button
│   │   └── ...
│   ├── organisms/           # Complex UI components
│   │   ├── header/          # Logo + Nav + UserMenu
│   │   ├── sidebar/
│   │   ├── data-table/      # Table + Pagination
│   │   └── ...
│   └── templates/           # Page layouts
│       ├── auth-layout/
│       └── dashboard-layout/
│
├── features/                # Feature-based modules
│   ├── auth/
│   │   ├── components/      # Feature-specific UI
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── index.ts
│   │   ├── hooks/           # Feature hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── actions/         # Server actions
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── logout.ts
│   │   ├── services/        # Business logic
│   │   │   └── auth.service.ts
│   │   ├── types.ts         # Feature types
│   │   └── index.ts
│   └── todos/
│
├── lib/                      # Library code & configs
│   ├── db/                  # Database
│   │   ├── prisma.ts
│   │   └── migrations/
│   ├── api/                 # API client (if needed)
│   ├── auth/                # Auth utilities
│   │   ├── session.ts
│   │   └── password.ts
│   └── utils/               # Pure functions
│       ├── string.ts
│       ├── date.ts
│       └── format.ts
│
├── config/                   # App configuration
│   ├── site.ts              # Site metadata
│   └── env.ts               # Environment variables
│
└── styles/                   # Global styles
    └── globals.css
```

### Responsibilities des Dossiers

| Dossier | Responsabilité | ✅ Allowed | ❌ Forbidden |
|---------|---------------|-----------|-------------|
| **/app** | Routing ONLY | Import from features, UI (layouts) | Business logic |
| **/ui** | Presentation ONLY | Import from ui | Import from features, business logic |
| **/features** | Business Logic | Import from ui, lib, other features | - |
| **/lib** | Infrastructure | Pure functions, external integrations | Import from features |

### Feature Module Pattern

```
features/[feature]/
├── components/    # Feature UI
├── hooks/         # Feature client logic
├── actions/       # Server actions
├── queries/       # Server queries
├── services/      # Business logic
└── types.ts       # Feature types
```

### Import Rules

**✅ Allowed:**
```typescript
// Feature → UI
import { Button } from '@/ui/atoms/button'

// Feature → Lib
import { formatCurrency } from '@/lib/utils/format'

// Feature → Feature
import { useAuth } from '@/features/auth'

// App → Features
import { TodoList } from '@/features/todos'
```

**❌ Forbidden:**
```typescript
// UI → Features (coupling)
import { useTodos } from '@/features/todos'

// UI → Lib/DB (infrastructure in UI)
import { db } from '@/lib/db'

// Feature → App (circular)
import { SomePage } from '@/app/page'

// Lib → Features (circular)
import { useAuth } from '@/features/auth'
```

---

## 📝 File Naming Conventions

```
Components      → PascalCase.tsx           # Button.tsx
Tests           → PascalCase.test.tsx     # Button.test.tsx
Stories         → PascalCase.stories.tsx   # Button.stories.tsx
Hooks           → camelCase.ts             # useAuth.ts
Utils           → camelCase.ts             # formatCurrency.ts
Config files    → kebab-case.ts            # site-config.ts
Constants       → UPPER_SNAKE_CASE.ts      # API_BASE_URL.ts
```

---

## 🔄 Data Flow

```
User Interaction
     ↓
[features/*].components/    # UI
     ↓
[features/*].hooks/         # Client logic
     ↓
[features/*].actions/       # Server actions
     ↓
[lib]/                      # Database/API
     ↓
Data back to component
```

---

## 🚀 Quick Start

```bash
# Create new feature
mkdir -p src/features/my-feature/{components,hooks,actions,services}

# Create new UI component
mkdir -p src/ui/atoms/my-component
```

---

*Version: 5.0.0*
