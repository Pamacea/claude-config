# CLAUDE CODE - CONFIG

> **Version:** 5.0.0 | **Méthodologie:** TrigMem v1.0 + EPCT + Prompting Avancé
> **Dernière mise à jour:** 2025-03-18

---

## 🎯 PROJECT IDENTITY

**claude-config** : Configuration optimisée pour Claude Code utilisant **TrigMem** v1.0 pour une gestion optimale des tokens (73% d'économie).

### Stack Technique
- **Frontend:** Next.js 16, React 19.2, TypeScript (strict)
- **State:** TanStack Suite (Router, Query, Form, Start)
- **Backend:** Prisma, Supabase, NestJS (occasionnel)
- **Backend:** Rust (Axum + Dioxus/Leptos, occasions spécifiques)
- **Testing:** Vitest, Playwright
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel

---

## 🚀 TRIGMEM v1.0

| Catégorie | Stockage | Contenu |
|-----------|----------|---------|
| Cat 1 | CLAUDE.md | Identité projet |
| Cat 2 | rules/02-conventions.md | Structure codebase |
| Cat 3 | CLAUDE.md | Workflows opérationnels |
| Cat 4 | skills/patterns/* | Patterns réutilisables |
| Cat 5 | rules/02-conventions.md | Guides architecturaux |
| Cat 6 | rules/quality-gates.md | Corrections itératives |

**Skills auto-activés :** `trigmem-core`, `trigmem-decision`, `trigmem-categories`, `trigmem-storage`, `trigmem-examples`

---

## 📖 QUICK START

```bash
npm install    # Dependencies
npm run dev    # Development
npm run test   # Tests
npm run build  # Production build
```

---

## 🎯 PRINCIPES DE PROMPTING

### Spécificité > Vague

| ❌ Mauvais | ✅ Bon |
|-----------|-------|
| "Fix the code" | "Fix the type error in src/auth/login.ts at line 45" |
| "Write a function" | "Write validateEmail with tests: [email protected]=true" |
| "Clean up" | "Remove unused imports from src/components/*.tsx" |

### Structure d'un Prompt Efficace

```markdown
## Context
[Background information]

## Task
[Specific action to take]

## Constraints
- Constraint 1
- Constraint 2

## Verification
[How to verify the solution is correct]
```

### Toujours Fournir Vérification

Claude performe mieux quand il peut vérifier son travail :

| ❌ Avant | ✅ Après |
|---------|---------|
| "implement user auth" | "implement auth. verify with: valid login works, invalid fails" |
| "make the dashboard better" | "[screenshot] implement this design. compare after" |
| "the build is failing" | "build fails with [error]. fix root cause, verify" |

---

## 🔄 WORKFLOW EPCT

```
EXPLORE → PLAN → CODE → TEST
   ↑                    ↓
   └────────────────────┘
```

| Phase | Description | Durée |
|-------|-------------|-------|
| **EXPLORE** | Recherche sémantique, lecture de patterns | ~5-10 min |
| **PLAN** | Stratégie, fichiers à modifier, tests | ~3-5 min |
| **CODE** | Suivre patterns existants, barrel exports | ~15-30 min |
| **TEST** | Lint, typecheck, tests liés uniquement | ~5 min |

### Matrice de Décision EPCT

| Type de Tâche | Approche |
|---------------|----------|
| Tiny fix (typo) | CODE only |
| Small feature | EXPLORE → CODE |
| Medium feature | EPCT complet |
| Complex feature | EPCT + Plan Mode |
| Architecture | Plan Mode → EPCT |

---

## 🔧 KEY WORKFLOWS

### Git Flow Master
```
TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2

Verification:
- cargo check: ✅
- cargo test: ✅
```

Types: RELEASE (MAJOR), UPDATE (MINOR), PATCH (FIX)

### Testing
- `npm run test` → Vitest (unit)
- `npm run test:e2e` → Playwright (E2E)
- Cible: ≥80% coverage (≥95% critique)

### Quality Gates
- [ ] Lint passe
- [ ] Typecheck passe
- [ ] Tests passent
- [ ] Pas de secrets exposés
- [ ] Message au format correct

---

## 💬 COMMUNICATION EFFICACE

### Poser des questions sur le codebase

- "How does logging work?"
- "How do I make a new API endpoint?"
- "What does `async move { ... }` do?"
- "Why does this code call `foo()` instead of `bar()`?"

### Laisser Claude interviewer

```
I want to build [brief description]. Interview me in detail.

Ask about: technical implementation, UI/UX, edge cases, concerns.
Don't ask obvious questions, dig into the hard parts.

Then write complete spec to SPEC.md.
```

---

## 🚫 PATTERNS D'ÉVITEMENT

| Pattern | Problème | Solution |
|---------|----------|----------|
| **Kitchen sink session** | Context plein d'infos non pertinentes | `/clear` entre tâches non liées |
| **Correcting over and over** | Context pollué par approches échouées | Après 2 échecs, `/clear` + meilleur prompt |
| **Over-specified CLAUDE.md** | Claude ignore la moitié | Rester < 200 lignes |
| **Trust-then-verify gap** | Implémentation plausible mais cassée | Toujours fournir vérification |
| **Infinite exploration** | Claude lit des centaines de fichiers | Scope narrow ou subagents |

---

## 📊 GESTION DU CONTEXTE

| Commande | Action |
|----------|--------|
| `/clear` | Réinitialise le contexte entre tâches non liées |
| `/compact <instructions>` | Compacte avec instructions spécifiques |
| `/context` | Voir l'utilisation actuelle du contexte |
| `/memory` | Gérer la mémoire auto |

### Variables d'environnement utiles

```bash
# Limite output MCP
export MAX_MCP_OUTPUT_TOKENS=25000

# Désactiver auto memory
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=1

# Tool search threshold
export ENABLE_TOOL_SEARCH=auto:5
```

---

## 📚 DOCUMENTATION

### Skills TrigMem
- `/trigmem-core` - Concepts fondamentaux EPCT
- `/trigmem-decision` - Guide de décision 2 phases
- `/trigmem-categories` - Classification automatique (6 types)
- `/trigmem-storage` - Configuration stockage
- `/trigmem-examples` - Exemples travaillés

### Patterns Techniques
- `/pattern [name]` - Charger un pattern technique
- `skills/patterns/rust/` - Rust Full Stack (Axum + Dioxus/Leptos)
- `skills/patterns/nextjs/` - Next.js 16 patterns
- `skills/standards/` - Standards techniques

### Références Externes
- @docs/claude-code-optimization-masterclass.md
- @docs/claude-code-workflow-developers-guide.md

---

@RTK.md
@AUREUS.md
@ARGUS.md
@PARRY.md

*Version: 5.0.0 | TrigMem + EPCT + Prompting Avancé*
