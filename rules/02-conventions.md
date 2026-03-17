# Conventions - Git, Docs, Project Structure

> **Version:** 2.0.0 | TrigMem Enhanced | Positive Standards
>
> **Changement majeur:** Version basée sur des standards positifs et des
> workflows recommandés, sans interdictions.

---

## 🔄 Git Flow Master Convention

### Standard de Sécurité des Secrets

**Vérifier avant commit :**
- ✅ Le .env utilise des placeholders `$SECRET_NAME` pour les secrets
- ✅ Le .enc.env est crypté et non ouvert

### Format des Commits

```
TYPE: PROJECT NAME - vX.Y.Z

- Change 1
- Change 2
```

### Types de Commits

| Type | SemVer | Usage |
|------|--------|-------|
| **RELEASE** | MAJOR | Breaking changes dans l'API publique |
| **UPDATE** | MINOR | Nouvelles fonctionnalités |
| **PATCH** | PATCH | Corrections de bugs |
| **WIP** | MAJOR | Refactoring en cours |

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

```markdown
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

**Standards de qualité :**
- ✅ One-liner < 15 mots
- ✅ Quick Start = 3 commandes max
- ✅ < 50 lignes total
- ✅ Contenu actuel (pas de "Coming soon")

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

### Standard Structure

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

### Standard de Nommage

```
Components      → PascalCase.tsx           # Button.tsx
Tests           → PascalCase.test.tsx     # Button.test.tsx
Hooks           → camelCase.ts             # useAuth.ts
Utils           → camelCase.ts             # formatCurrency.ts
Config files    → kebab-case.ts            # site-config.ts
Constants       → UPPER_SNAKE_CASE.ts      # API_BASE_URL.ts
```

---

## 🎯 Import Rules - Standards de Dépendances

### Imports Autorisés (Forward Dependencies)

```typescript
// ✅ Feature → UI (coupling autorisé)
import { Button } from '@/ui/atoms/button'

// ✅ Feature → Lib (coupling autorisé)
import { formatCurrency } from '@/lib/utils/format'

// ✅ Feature → Feature (coupling autorisé)
import { useAuth } from '@/features/auth'
```

### Imports à Éviter (Backward Dependencies)

```typescript
// ⚠️ Éviter : UI → Features (crée coupling inverse)
// Utiliser plutôt : Passer les données via props

// ⚠️ Éviter : UI → Lib/DB (infrastructure dans UI)
// Utiliser plutôt : Server Components / Actions

// ⚠️ Éviter : Lib → Features (crée dépendances circulaires)
// Utiliser plutôt : Patterns dependency injection
```

### Alternatives Recommandées

| Au lieu de | Utiliser |
|-----------|---------|
| UI importing features | Props drilling / Context / Server Components |
| UI importing db | Server Components fetching data |
| Lib importing features | Dependency injection / Events |

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

## ✅ Quality Gates

### Git Commit Gates

Un commit est valide quand :
- [ ] Lint passe sans erreurs
- [ ] Typecheck passe sans erreurs
- [ ] Tests passent
- [ ] Pas de secrets exposés
- [ ] Message au format correct

### Documentation Gates

Une documentation est complète quand :
- [ ] README < 50 lignes
- [ ] Quick Start ≤ 3 commandes
- [ ] Commandes exécutables
- [ ] Pas de sections vides

---

*Version: 2.0.0 | Conventions - Positive Standards*
