# Analyse TrigMem - Gaps & Optimisation Tokens

> **Date:** 2026-02-17 | **Version:** 1.0.0

---

##  ÉTAT ACTUEL

### Skills TrigMem Existant (5 fichiers)

| Skill | Tokens | Catégorie | Statut |
|-------|--------|-----------|--------|
| `trigmem-core.skill` | ~1.2k | Concepts fondamentaux |  Complet |
| `trigmem-categories.skill` | ~1.0k | 6 catégories |  Complet |
| `trigmem-decision.skill` | ~1.3k | Guide de décision |  Complet |
| `trigmem-storage.skill` | ~1.0k | Options de stockage |  Complet |
| `trigmem-examples-skill` | ~0.8k | Exemples travaillés |  Incomplet |

**Total Skills:** ~5.3k tokens

### Rules Existant (9 fichiers)

| Rule | Tokens | Type | Catégorie TrigMem |
|------|--------|------|-------------------|
| `00-core.md` | ~1.6k | Fondamentaux | Cat 1 (Identité) |
| `01-nevers.md` | ~1.8k | Corrections | Cat 6 (Corrections) |
| `02-conventions.md` | ~2.3k | Conventions | Cat 5 (Guides) |
| `03-tech-decisions.md` | ~3.0k | Patterns tech | Cat 4 (Patterns) |
| `10-patterns-nextjs.md` | ~2.8k | Patterns Next.js | Cat 4 (Patterns) |
| `11-patterns-rust-axum.md` | ~3.8k | Patterns Rust | Cat 4 (Patterns) |
| `12-patterns-nestjs.md` | ~3.9k | Patterns NestJS | Cat 4 (Patterns) |
| `13-patterns-wasm-rust.md` | ~3.7k | Patterns WASM | Cat 4 (Patterns) |
| `README.md` | ~1.8k | Documentation | Cat 1 (Identité) |

**Total Rules:** ~24.7k tokens

**Total Config:** ~30k tokens par session

---

##  MAPPING TRIGMEM

### Catégorie 1 : Identité Projet
**Destination:** CLAUDE.md
**Actuel:**
- `00-core.md` (mission, principes) → Devrait être dans CLAUDE.md
- `README.md` (structure) → Devrait être dans CLAUDE.md

**Problème:** L'identité est éparpillée entre CLAUDE.md et rules.

### Catégorie 2 : Structure Codebase
**Destination:** CLAUDE.md + Rules (pattern-match)
**Actuel:**
- `02-conventions.md` (structure de projet)

**Statut:**  Bien placé

### Catégorie 3 : Commandes Opérationnelles
**Destination:** Commands
**Actuel:** Aucun
**Manquant:**
- Commandes pour build, test, deploy
- Workflows opérationnels

### Catégorie 4 : Patterns Réutilisables
**Destination:** Skills (portables)
**Actuel:**
- `03-tech-decisions.md` → Devrait être un Skill
- `10-patterns-nextjs.md` → Devrait être un Skill
- `11-patterns-rust-axum.md` → Devrait être un Skill
- `12-patterns-nestjs.md` → Devrait être un Skill
- `13-patterns-wasm-rust.md` → Devrait être un Skill

**Problème majeur:** Tous les patterns techniques sont dans `rules/` au lieu de `skills/`. Ils sont chargés à chaque session alors qu'ils pourraient être chargés à la demande.

### Catégorie 5 : Guides Architecturales
**Destination:** Rules (liées)
**Actuel:**
- `02-conventions.md` (Git, docs)

**Statut:**  Bien placé

### Catégorie 6 : Corrections Itératives
**Destination:** Rules (project-specific)
**Actuel:**
- `01-nevers.md`

**Statut:**  Bien placé

---

## � PROBLÈMES IDENTIFIÉS

### 1. Violation du principe de séparation Universel/Spécifique

Les patterns techniques (`03-tech-decisions.md`, `10-13-*.md`) sont **universels** et réutilisables entre projets, mais ils sont dans `rules/` qui est chargé à chaque session.

### 2. Coût token inutile

~17k tokens (`03`, `10-13`) sont chargés systématiquement alors qu'ils ne sont nécessaires que quand on travaille avec la techno correspondante.

### 3. Manque de structure dans skills/

Les skills TrigMem existent mais les patterns techniques ne sont pas organisés en skills.

---

##  SOLUTIONS PROPOSÉES

### Solution 1 : Déplacer les patterns vers skills/

**Structure proposée:**

```
skills/
├── trigmem/
│   ├── core/
│   ├── categories/
│   ├── decisions/
│   ├── storage/
│   └── examples/
│
├── patterns/                    # NOUVEAU
│   ├── tech-decisions/          # Déplacé depuis rules/03
│   │   └── tech-decisions.skill
│   ├── nextjs/                  # Déplacé depuis rules/10
│   │   └── nextjs-patterns.skill
│   ├── rust/                    # Déplacé depuis rules/11
│   │   ├── rust-axum.skill
│   │   └── rust-patterns.skill
│   ├── nestjs/                  # Déplacé depuis rules/12
│   │   └── nestjs-patterns.skill
│   └── wasm/                    # Déplacé depuis rules/13
│       └── wasm-rust.skill
│
└── commands/                    # NOUVEAU - Catégorie 3
    ├── build.command
    ├── test.command
    └── deploy.command
```

**Impact tokens:**
- Avant: ~30k tokens chargés systématiquement
- Après: ~13k tokens chargés systématiquement
- **Économie: ~17k tokens (~57%)**

### Solution 2 : Condenser les rules

**Rules à garder (chargé systématiquement):**
1. `00-core.md` → Fusionner avec CLAUDE.md (Cat 1)
2. `01-nevers.md` → Garder (Cat 6 - Corrections)
3. `02-conventions.md` → Réduire (Cat 5 - Guides)
4. `README.md` → Garder minimal

**Nouvelle structure rules/:**
```
rules/
├── README.md                   # Minimal (~500 tokens)
├── 00-nevers.md                # Corrections itératives (~1.8k)
└── 01-conventions.md           # Conventions essentielles (~1k)
```

**Nouveau total rules:** ~3.3k tokens (au lieu de ~24.7k)

### Solution 3 : Créer des Commands

**Créer commands pour les workflows opérationnels:**

```
commands/
├── build/                      # Workflows de build
│   ├── nextjs.command
│   ├── rust.command
│   └── nestjs.command
├── test/                       # Workflows de test
│   ├── unit.command
│   └── e2e.command
└── deploy/                     # Workflows de deploy
    ├── vercel.command
    └── docker.command
```

---

##  RÉSUMÉ DE LA MIGRATION

| De | Vers | Économie tokens |
|----|------|-----------------|
| `rules/03-tech-decisions.md` | `skills/patterns/tech-decisions/` | ~3k |
| `rules/10-patterns-nextjs.md` | `skills/patterns/nextjs/` | ~2.8k |
| `rules/11-patterns-rust-axum.md` | `skills/patterns/rust/` | ~3.8k |
| `rules/12-patterns-nestjs.md` | `skills/patterns/nestjs/` | ~3.9k |
| `rules/13-patterns-wasm-rust.md` | `skills/patterns/wasm/` | ~3.7k |
| `rules/00-core.md` | `CLAUDE.md` | ~1.6k |
| **TOTAL** | | **~17k tokens (~57%)** |

---

##  PLAN D'ACTION

### Phase 1 : Créer la structure skills/patterns
1. Créer le dossier `skills/patterns/`
2. Créer les sous-dossiers pour chaque techno
3. Déplacer et adapter le contenu

### Phase 2 : Créer les Commands
1. Créer le dossier `commands/`
2. Créer les commandes pour build, test, deploy

### Phase 3 : Optimiser les Rules
1. Condenser `00-core.md` dans CLAUDE.md
2. Réduire `02-conventions.md` à l'essentiel
3. Mettre à jour `README.md`

### Phase 4 : Mettre à jour les Skills TrigMem
1. Compléter `trigmem-examples-skill`
2. Ajouter des exemples pour les catégories 4-6

---

##  BÉNÉFICES ATTENDUS

### 1. Économie de tokens
- **Session type**: 30k → 13k tokens (~57% d'économie)
- **Session avec Next.js**: 13k + 2.8k = 15.8k (au lieu de 30k)
- **Session avec Rust**: 13k + 3.8k = 16.8k (au lieu de 30k)

### 2. Meilleure organisation
- Séparation claire universel/spécifique
- Patterns portables entre projets
- Chargement à la demande des patterns

### 3. Conformité TrigMem
- Respect des 6 catégories
- Utilisation optimale des 5 mécanismes
- Équilibre Économie/Précision/Réutilisabilité

---

*Document d'analyse - TrigMem v1.0*
