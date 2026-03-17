# Standards Techniques - Claude Code

> **Version:** 2.0.0 | **Approche:** Standards Positifs & Quality Gates
>
> **Changement majeur:** Ce fichier remplace `01-nevers.md` avec une approche constructive :
> - ✅ Standards techniques explicites au lieu d'interdictions
> - ✅ Checklists de validation pour auto-contrôle
> - ✅ Quality Gates mesurables
> - ✅ Patterns recommandés par catégorie

---

## 🎯 Philosophie du Document

**Principe directeur :** Définir ce qu'il *faut* faire, pas ce qu'il ne faut *pas* faire.

Chaque section contient :
1. **Standard Technique** → La règle à suivre
2. **Checklist de Validation** → Comment vérifier
3. **Quality Gates** → Critères d'acceptation

---

## 🔍 Search & Navigation Standards

### Standard : Recherche Sémantique Prioritaire

**Quoi :** Toujours utiliser les outils de recherche sémantique avant la recherche textuelle.

**Outils recommandés (dans l'ordre) :**
1. **grepai search** - Recherche sémantique principale
2. **/toolkit search** - Recherche contextuelle
3. **Grep tool** - Recherche textuelle (cas particuliers seulement)

**Workflow standard :**
```bash
# Étape 1 : Recherche sémantique
grepai search "concept recherché"

# Étape 2 : Si résultats insuffisants
/toolkit search "pattern plus spécifique"

# Étape 3 : En dernier recours seulement
Grep tool pour expressions exactes
```

### Checklist de Validation

- [ ] J'ai utilisé grepai search en premier
- [ ] J'ai vérifié les résultats sémantiques
- [ ] Je n'utilise Grep que pour des motifs exacts
- [ ] Je ne fais pas d'hypothèses sur les emplacements de fichiers

---

## ✏️ Code Editing Standards

### Standard : Edit-Informed Workflow

**Quoi :** Toujours lire le fichier avant de le modifier.

**Workflow standard :**
```markdown
1. Read tool → Lire le fichier complet
2. Analyser → Comprendre le contexte et les patterns
3. Edit tool → Utiliser old_string exact pour la modification
4. Verify → Vérifier que le résultat compile/fonctionne
```

### Pour les bibliothèques post-2024

**Standard de vérification :**
1. **Web Search** → "TechName latest docs breaking changes"
2. **Web Reader** → Lire la documentation officielle
3. **Verify Examples** → Tester en isolation
4. **Apply Pattern** → Implémenter selon docs actuelles

### Checklist de Validation

- [ ] J'ai lu le fichier avant de le modifier
- [ ] J'ai utilisé l'ancien contenu exact dans old_string
- [ ] Pour libs post-2024 : j'ai vérifié les docs récentes
- [ ] J'ai respecté les patterns existants dans le fichier
- [ ] Le code modifié suit le style du fichier

---

## 🚀 Implementation Standards

### React / Frontend Standards

#### Data Fetching Standard

**Standard :** Server Components优先, puis TanStack Query

**Matrice de décision :**
```
Besoin de données serveur ?
├─ Oui + Interactivité utilisateur → TanStack Query
├─ Oui + Affichage statique → Server Components
└─ Non → Pas de fetching nécessaire
```

**Patterns recommandés :**
```typescript
// ✅ Server Component (par défaut)
export default async function PostsPage() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}

// ✅ TanStack Query (avec interactivité)
const { data: posts } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(r => r.json())
})
```

#### Architecture Frontend Standard

**Standard :** Feature-based organization

**Structure recommandée :**
```
src/
├── app/                    # Next.js routing only
├── features/               # Business logic (NOT app/)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── actions/
├── ui/                     # Presentational components
└── lib/                    # Shared utilities
```

### State Management Standard

**Matrice de décision :**
```
Type de données │ Où stocker
────────────────┼────────────────────────────────────
Server data     │ TanStack Query (cached, refetchable)
UI-only state   │ useState / Zustand (local)
Form state      │ TanStack Form / react-hook-form
Global UI       │ Zustand / Context
```

### TypeScript Standards

**Standard :** Type Safety Prioritaire

**Règles :**
```typescript
// ✅ Utiliser unknown pour les données externes
function parseInput(input: unknown) {
  // validation avec Zod
}

// ✅ Type guards pour les types unions
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// ✅ Types explicites pour les exports publics
export interface UserData {
  id: string
  name: string
}
```

### Checklist de Validation Frontend

- [ ] Pas de useEffect pour le data fetching
- [ ] Server state dans TanStack Query, pas useState
- [ ] Business logic dans features/, pas app/
- [ ] Server Actions pour les mutations, pas API routes
- [ ] Type any remplacé par unknown ou type explicite
- [ ] Validations Zod aux frontières (API, forms)

---

## 🧪 Testing Standards

### Standard : Behavior-Driven Testing

**Quoi :** Tester le comportement, pas l'implémentation.

**Focus sur :**
- ✅ Entrées → Sorties observables
- ✅ États → Transitions d'état
- ✅ Utilisateur → Actions utilisateur

**Éviter de tester :**
- Détails d'implémentation internes
- Noms de fonctions/variables
- Structure du code

### Matrice de Test

| Type de changement | Tests à exécuter |
|-------------------|-----------------|
| Bug fix | Tests liés au bug + tests du module |
| Nouvelle feature | Tests de la feature + tests adjacents |
| Refactoring | Tests du module refactorisé |
| Breaking change | Tests impactés + tests E2E |

### Checklist de Validation

- [ ] Je teste seulement ce que je modifie
- [ ] Les tests vérifient le comportement, pas l'implémentation
- [ ] Les tests sont déterministes (pas de random, dates fixes)
- [ ] Les tests sont indépendants (ordre d'exécution indifferent)
- [ ] Les messages d'erreur sont explicites en cas d'échec

---

## 📦 Git & Version Control Standards

### Standard : Quality Gates First

**Workflow de commit :**
```bash
# Étape 1 : Quality Gates
npm run lint          # Doit passer
npm run typecheck     # Doit passer
npm run test          # Doit passer

# Étape 2 : Status check
git status            # Voir ce qui va être commité
git diff              # Voir les changements

# Étape 3 : Commit avec format
git commit -m "TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Types de Commits

| Type | SemVer | Quand utiliser |
|------|--------|---------------|
| **RELEASE** | MAJOR | Breaking changes dans l'API publique |
| **UPDATE** | MINOR | Nouvelles fonctionnalités |
| **PATCH** | PATCH | Corrections de bugs |
| **WIP** | - | Travail en cours (refactoring) |

### Checklist de Validation Git

- [ ] Lint et typecheck passent
- [ ] Tests passent
- [ ] Pas de secrets/keys dans les changements
- [ ] Message au format TYPE: PROJECT - vX.Y.Z
- [ ] Description du QUOI et du POURQUOI
- [ ] Pas de --amend si déjà pushé
- [ ] Pas de force push sur main/master

---

## 🔒 Security Standards

### Standard : Defense in Depth

** couches de validation :**
```
┌─────────────────────────────────────┐
│ 1. Client (UX)                     │ → Validation pour UX
│ 2. Client (sanitization)           │ → Nettoyage des entrées
│ 3. Server (validation)             │ → Validation stricte (Zod)
│ 4. Server (authorization)          │ → Vérification des permissions
│ 5. Database (parameterized)        │ → Requêtes paramétrées
└─────────────────────────────────────┘
```

### Patterns de Sécurité

```typescript
// ✅ Validation aux frontières avec Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
})

// ✅ Variables d'environnement pour secrets
const API_KEY = process.env.API_KEY  // Jamais hardcoded

// ✅ Hash des passwords
const hashed = await bcrypt.hash(password, 12)

// ✅ Logs sanitizés
logger.info({ user: user.id })  // Pas user.email
```

### Checklist de Validation Sécurité

- [ ] Toute entrée utilisateur est validée (Zod)
- [ ] Les secrets sont dans des variables d'environnement
- [ ] Validation serveur pour toutes les API
- [ ] Requêtes DB paramétrées (pas de concatenation)
- [ ] Logs ne contiennent pas de données sensibles
- [ ] Passwords hashés (bcrypt/argon2)
- [ ] CORS configuré correctement

---

## ⚡ Performance Standards

### Standard : Measure Before Optimizing

**Workflow d'optimisation :**
```
1. Measure → Profiler pour identifier le goulot
2. Analyze → Comprendre la cause racine
3. Optimize → Corriger le goulot identifié
4. Verify → Mesurer l'amélioration
5. Document → Enregistrer le pattern
```

### Outils de Mesure

| Type de mesure | Outil |
|----------------|-------|
| CPU | React DevTools Profiler |
| Rendering | chrome-devtools performance |
| Bundle | webpack-bundle-analyzer |
| Network | chrome-devtools network |

### Checklist de Validation Performance

- [ ] Performance mesurée avant optimisation
- [ ] Goulot d'étranglement identifié
- [ ] Optimisation ciblée sur le goulot
- [ ] Amélioration mesurée après
- [ ] Impact bundle vérifié
- [ ] Lazy loading utilisé si applicable

---

## 🏗️ Architecture Standards

### Standard : Clean Dependency Graph

**Principes :**
```
┌─────────────────────────────────────┐
│         UI Layer                    │ ← Ne connaît pas Features
├─────────────────────────────────────┤
│      Features Layer                 │ ← Ne connaît pas Data
├─────────────────────────────────────┤
│       Data Layer                    │ ← Ne connaît pas UI
└─────────────────────────────────────┘
```

**Règles de dépendances :**
```
UI → Features → Data : ✅ Autorisé
Data → Features → UI : ❌ Interdit (circular)
UI → Data direct : ❌ Interdit (bypass)
```

### Patterns Structurels

```typescript
// ✅ Single Responsibility
function validateEmail(email: string): boolean {
  // Une seule chose : valider email
}

// ✅ Named Constants
const MAX_RETRY_ATTEMPTS = 3

// ✅ Early Returns / Guard Clauses
function process(data: Data | null): Result {
  if (!data) return { error: 'No data' }
  if (!data.isValid) return { error: 'Invalid' }
  // Continuer traitement
}

// ✅ Barrel Exports
export * from './user'
export * from './post'
export * from './comment'
```

### Checklist de Validation Architecture

- [ ] Pas de dépendances circulaires
- [ ] Chaque classe/fonction a une seule responsabilité
- [ ] Constantes nommées (pas de magic numbers)
- [ ] Early returns/guard clauses utilisés
- [ ] Barrel exports pour les modules
- [ ] UI ne dépend pas directement de Data
- [ ] Features ne connaissent pas d'autres features

---

## 📋 Quick Reference Card

```
Search        → grepai search (sémantique d'abord)
Edit          → Read first (toujours lire avant modifier)
Server data   → TanStack Query (cache + refetch)
Data fetching → Server Components (par défaut)
Business log  → features/ (pas app/)
Validation    → Zod aux frontières
Testing       → Behavior, not implementation
Git           → Quality gates, puis commit
Performance   → Measure, then optimize
Security      → Defense in depth
Architecture  → Clean dependency graph
```

---

## 🎯 Quality Gates Globaux

Tout code doit respecter :

- [ ] **Correctness** : Fonctionne comme spécifié
- [ ] **Cleanliness** : Lisible et maintenable
- [ ] **Type Safety** : Types explicites, pas de `any`
- [ ] **Testability** : Testable, testé
- [ ] **Security** : Pas de vulnérabilités évidentes
- [ ] **Performance** : Pas de problèmes majeurs

---

*Version: 2.0.0 | Standards Techniques Positifs*
