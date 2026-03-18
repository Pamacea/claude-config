# CHANGELOG - Claude Config

> **Historique des versions de claude-config**

---

## [1.4.1] - 2026-03-18

### 🔧 Rust Full Stack Workspace Structure

#### Nouveau Skill rust-workspace-structure
- **Structure Gold Standard** pour monorepo Rust (Axum + Dioxus/Leptos)
- **Workspace complet** avec common/server/client
- **Cargo.toml racine** avec workspace dependencies
- **Docker Compose** pour PostgreSQL + Adminer + Redis
- **Documentation complète** avec liens vers docs officielles
- **~400 lignes** de contenu exhaustif

#### Nouvelle Règle Minimale
- **rules/08-rust-workspace.md** (~25 lignes)
- Quick structure visuelle
- Checklist de validation
- Référence au skill complet

#### CLAUDE.md v5.0.0 - Prompting Avancé
- **Section Prompting** : Spécificité, Structure efficace, Vérification
- **Section EPCT** : Workflow complet avec matrice de décision
- **Section Communication** : Questions efficaces + Pattern d'interview
- **Section Patterns d'Évitement** : 5 anti-patterns identifiés
- **Section Gestion du Contexte** : Commandes utiles + Variables d'environnement

#### INDEX.md Mis à jour
- **25 skills total** (+1 rust-workspace-structure)
- **Nouvelle Rule 5** : Project Structure Exclusivity
- **Cross-references** mises à jour

### 📊 Statistiques v1.4.1

| Métrique | v1.4.0 | v1.4.1 | Δ |
|----------|--------|--------|---|
| **Skills total** | 24 | 25 | +1 |
| **Rules** | 8 | 9 | +1 |
| **CLAUDE.md** | v4.1.0 | v5.0.0 | Major update |

---

## [1.4.0] - 2026-03-17

### 🔄 Refactorisation Systémique - Positive Standards

#### Philosophie "Actions Positives"
- **Éradication du négatif** : Remplacement de tous "NE PAS", "INTERDIT", "NO", "SANS" par des instructions positives
- **Standards techniques** : Chaque interdiction remplacée par un "Standard" avec checklist de validation
- **Quality Gates** : Nouveau système de validation objective avec critères chiffrés

#### Nouveaux Fichiers Rules
- **rules/01-standards.md** (remplace 01-nevers.md)
  - 40+ règles "NEVER/ALWAYS" transformées en standards + checklists
  - Approche positive : "Utiliser X" au lieu de "Ne pas utiliser Y"
  - Validation par checklist pour chaque standard

- **rules/quality-gates.md** (nouveau)
  - Critères de validation objectifs pour tous les types de tâches
  - Gates E1-E5 pour Feature Development
  - Gates B1-B5 pour Bug Fixes
  - Gates R1-R5 pour Refactoring

#### Skills Patterns v2.0 - Qualité Gates
Tous les 11 skills patterns maintenant avec sections "Quality Gates" :

| Skill | Transformation | Quality Gates Ajoutés |
|-------|----------------|----------------------|
| **nextjs-patterns** | ❌ NEVER → ✅ Standards | SC1-SC5, AC1-AC3, SR1-SR3 |
| **rust-axum** | Anti-Patterns → Quality Gates | QM1-QM5, E1-E4, AS1-AS4 |
| **nestjs-patterns** | Anti-Patterns → Quality Gates | AR1-AR4, CQ1-CQ5, BP1-BP4 |
| **tanstack-patterns** | Anti-Patterns → Quality Gates | DF1-DF4, SM1-SM4, CQ1-CQ4 |
| **wasm-rust** | Anti-Patterns → Quality Gates | PF1-PF4, MM1-MM4, BP1-BP5 |
| **vite-patterns** | Anti-Patterns → Quality Gates | CF1-CF5, DV1-DV4, BP1-BP4 |
| **typescript-patterns** | Anti-Patterns → Quality Gates | TS1-TS5, TG1-TG4, CP1-CP4 |
| **tailwind-patterns** | Anti-Patterns → Quality Gates | CU1-CU3, DT1-DT3, RD1-RD3 |
| **ux-design-patterns** | 2 sections Anti-Patterns → Quality Gates | DP1-DP4, VA1-VA3, IE1-IE3 |
| **documentation-patterns** | Anti-Patterns → Quality Gates | CQ1-CQ4, SF1-SF3, CC1-CC3 |
| **tech-decisions** | Anti-Patterns → Quality Gates | RG1-RG4, SC1-SC3, PR1-PR4 |

#### Rules Core mises à jour
- **00-core.md v2.0** : Sections "❌ NEVER / ✅ ALWAYS" remplacées par workflows positifs
- **02-conventions.md** : Préservé (déjà positif)
- **03-delete-first.md** : Préservé (philosophie positive)
- **04-react-hooks-limits.md** : Transformé en standards positifs
- **05-reusability.md** : Préservé (déjà positif)
- **06-mcp-mandatory.md** : Suggestions fortes (pas négatives)

#### Format Quality Gates Uniforme
```markdown
## ✅ Quality Gates

### Validation Checklist
- [ ] **XX1** - Standard positif avec critère mesurable
- [ ] **XX2** - Standard positif avec critère mesurable

### Acceptance Criteria
L'implémentation est conforme quand :
- **Critère 1** measurable
- **Critère 2** measurable
```

### 📊 Statistiques v1.4.0

| Métrique | v1.3.0 | v1.4.0 | Δ |
|----------|--------|--------|---|
| **Sections négatives** | 15 | 0 | **-100%** |
| **Quality Gates** | 0 | 44 | **+∞** |
| **Checklists validation** | 8 | 52 | **+550%** |
| **Skills avec QG** | 0/11 | 11/11 | **100%** |
| **Approche positive** | 60% | 100% | **+40%** |

### 🔧 Méthode de Travail

**Principe Delete-First Apply :**
1. Lire le fichier existant
2. Identifier sections négatives
3. Remplacer par standards positifs
4. Ajouter Quality Gates avec checklists
5. Préserver toute information utile

**Exemple de transformation :**
```markdown
# AVANT (❌ négatif)
## ⚠️ Anti-Patterns
| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| `@apply` everywhere | Inline utility classes |

# APRÈS (✅ positif)
## ✅ Quality Gates
### CSS Usage
- [ ] **CU1** - Classes utilitaires en ligne (priorité sur `@apply`)
- [ ] **CU2** - `@apply` limité aux composants réutilisables uniquement
```

### 📚 Documentation

- **README.md** : Mis à jour pour refléter l'approche positive
- **GUIDE.md** : Section Quality Gates ajoutée
- **REFERENCE.md** : Tableau des Quality Gates

### 🎯 Bénéfices

1. **Clarté** : Standards positifs plus faciles à suivre
2. **Validation** : Checklists objectives pour compliance
3. **Maintenabilité** : Quality Gates mesurables
4. **Onboarding** : Meilleure compréhension des attentes
5. **Esprit** : Focus sur "quoi faire" pas "quoi éviter"

---

## [1.3.0] - 2025-03-12

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2025-03-12

### 🚀 Optimisation Majeure - Team Mode

#### CLAUDE.md Réduction de 54%
- **Avant** : 153 lignes (~3,000 tokens)
- **Après** : 71 lignes (~1,400 tokens)
- **Économie** : -53% de tokens
- **Structure** : Identité projet + Stack TrigMem v1.0 + Key Workflows
- **Supprimé** : Contenu détaillé TrigMem déplacé vers skills/trigmem/core/

#### Portabilité settings.json
- **Chemins absoluts** → **Chemins relatifs** pour hooks
- `C:/Users/NOM/.claude/hooks/X.cjs` → `hooks/X.cjs`
- **Bénéfice** : Configuration portable entre machines
- **statusLine** conservé en chemin absolu (externe au projet)

#### Nettoyage Skills TrigMem
- **Suppression** des anciens dossiers trigmem-*/SKILL.md (structure v1)
- **Préservation** de la nouvelle structure trigmem/{categories,core,decisions,examples,storage,verification}/.skill
- **INDEX.md** mis à jour pour référencer uniquement la nouvelle structure

#### Skills 100% Conformes au TEMPLATE.md
Tous les 12 skills patterns sont maintenant entièrement conformes :

| Skill | Conformité | Sections Ajoutées |
|-------|------------|-------------------|
| **nextjs-patterns** | 54% → 100% | +6 sections (Auto-Activation, Quick Reference, Anti-Patterns, Troubleshooting, Related Skills, Key Insights) |
| **rust-axum** | 46% → 100% | +7 sections (Quick Reference, Core Concepts, Anti-Patterns, Troubleshooting, Advanced Topics, Related Skills, Success Criteria, Key Insights) |
| **nestjs-patterns** | 100% | Déjà conforme (skill de référence) |
| **tanstack-patterns** | 100% | Déjà conforme |
| **vite-patterns** | 100% | Déjà conforme |
| **typescript-patterns** | 100% | Déjà conforme |
| **wasm-rust** | 100% | Déjà conforme |
| **tailwind-patterns** | 85% → 100% | Quick Reference déjà présent |
| **documentation-patterns** | 92% → 100% | Quick Start déjà présent |
| **ux-design-patterns** | 100% | Pas de doublon (rapport erroné) |
| **tech-decisions** | 92% → 100% | Quick Start déjà présent |
| **mcp-mandatory** | 69% → 100% | Auto-Activation et Quick Start ajoutés |

#### Nouveau Format Sections Uniformes
Tous les skills incluent maintenant :
- 🎯 **Auto-Activation** - Conditions de déclenchement
- 🚀 **Quick Start** - 3 commandes maximum
- 📊 **Quick Reference** - Tableau de référence rapide
- 💻 **Core Concepts** - Concepts fondamentaux
- 🎯 **Common Patterns** - Patterns courants
- ⚠️ **Anti-Patterns** - Tableau ❌ NEVER vs ✅ ALWAYS
- 🔧 **Troubleshooting** - Tableau Problème/Cause/Solution
- 🎯 **Best Practices** - Checklist + guidelines
- 🔗 **Related Skills** - Prérequis, reliés, complémentaires
- 📖 **Further Reading** - Liens documentation officielle
- 🎯 **Success Criteria** - Checklist de completion
- 💡 **Key Insights** - Why it matters + Common Pitfalls

### 📊 Statistiques v1.3.0

| Métrique | v1.2.0 | v1.3.0 | Δ |
|----------|--------|--------|---|
| **CLAUDE.md (lignes)** | 153 | 71 | **-54%** |
| **CLAUDE.md (tokens)** | ~3,000 | ~1,400 | **-53%** |
| **Skills 100% conformes** | 5/12 | 12/12 | **+140%** |
| **Chemins portables** | Non | Oui | ✅ |
| **Doublons TrigMem** | 6 dossiers | 0 | **-100%** |

### 🔧 Méthode de Travail

Cette version a été développée en **Team Mode** avec 3 agents travaillant en parallèle :
- **Agent claude-md-optimizer** : Optimisation CLAUDE.md
- **Agent settings-fixer** : Correction chemins settings.json
- **Agent trigmem-cleanup** : Suppression doublons TrigMem
- **Agent skill-validator** : Validation conformité skills
- **Agents nextjs/rust/finalizer** : Complétion skills à 100%

---

## [1.2.0] - 2026-02-24

### Améliorations
- **Nouveau type** : `WIP` (Work In Progress) pour les commits de refactoring
- **SemVer** : Marqué comme MAJOR (breaking changes potentiels)
- **Usage** : Pour les refactors en cours, réorganisations majeures
- **Documentation** : Mise à jour des docs pour refléter les changements
- **Skills** : Mise à jour des skills pour refléter les changements

## [1.1.5] - 2026-02-19

### 🔧 Améliorations Git Flow Master

#### Type de Commit WIP
- **Nouveau type** : `WIP` (Work In Progress) pour les commits de refactoring
- **SemVer** : Marqué comme MAJOR (breaking changes potentiels)
- **Usage** : Pour les refactors en cours, réorganisations majeures

### 🚀 Refonte Skills TrigMem

#### Structure en Dossiers
- **Ancien** : Fichiers `.skill` uniques (trigmem-core.skill, etc.)
- **Nouveau** : Structure en dossiers avec compétences séparées
- **Avantages** :
  - Meilleure organisation des compétences
  - Chargement plus ciblé
  - Évolutivité accrue

#### Skills TrigMem v2
- `trigmem-core/` - Concepts fondamentaux et 5 mécanismes
- `trigmem-categories/` - Classification des 6 catégories
- `trigmem-decision/` - Guide de décision en 2 phases
- `trigmem-storage/` - Options de stockage
- `trigmem-examples/` - Exemples travaillés
- `trigmem-verification/` - Analyse de sessions

### 🪝 Nouveau Système de Hooks

#### Hooks Git Flow Master
- **Installation automatique** des hooks Git Flow Master
- **Validation des messages** de commit (format Versioned Release)
- **Suggestion automatique** du type de commit (RELEASE/UPDATE/PATCH/WIP)
- **Génération de tags** et releases

### 🔌 Pattern Autoloader

#### Chargement Intelligent
- **Détection automatique** des patterns nécessaires
- **Autoloading** basé sur les triggers
- **Économie de tokens** supplémentaire

### 📊 Statistiques

| Métrique | v1.1.0 | v1.1.5 |
|----------|-------|-------|
| **Skills trigmem** | 6 fichiers | 6 dossiers |
| **Type de commits** | 3 | 4 (+WIP) |
| **Système hooks** | Non | Oui |

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
