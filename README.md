# claude-config

> **Configuration optimisée pour Claude Code** | Version 2.0.0
> **Methodologie:** TrigMem Enhanced + Positive Standards + Quality Gates
>
> **NOUVEAU v2.0 :** Approche 100% positive - Zero "NEVER/NO/PROHIBITED"

---

## Quick Start

Installation de la configuration optimisee pour Claude Code :

```bash
# Cloner ce repo
git clone https://github.com/Pamace/claude-config.git ~/.claude

# Les skills et rules sont automatiquement chargés par Claude Code
```

---

## Nouveautés v2.0.0 - Revolution Positive

### Approche 100% Positive

**Changement majeur :** Tous les fichiers ont été réécrits pour éliminer les négations :

| Supprimé | Remplacé par |
|----------|--------------|
| "NEVER do this" | "Standard : Do this instead" |
| "BAD practice" | "Recommended pattern" |
| "PROHIBITED" | "Optimal workflow" |
| "INTERDIT" | "Guideline" |
| 40+ règles "NEVER" | Standards techniques + Checklists |

### Nouveau Système de Quality Gates

**Nouveau fichier :** `rules/quality-gates.md`

Critères de validation objectifs pour chaque type de tâche :
- Feature Development → E1-E5 gates
- Bug Fix → B1-B5 gates
- Refactoring → R1-R5 gates
- Performance → P1-P5 gates
- Security → S1-S5 gates

### Fichiers Mis a Jour

| Ancien | Nouveau | Description |
|--------|---------|-------------|
| `01-nevers.md` | `01-standards.md` | Standards positifs (40+ règles transformées) |
| N/A | `quality-gates.md` | Système de validation objectif |
| `00-core.md` | `00-core.md` (v2.0) | Principes sans négatifs |
| `02-conventions.md` | (v2.0) | Standards d'import positifs |
| `03-delete-first.md` | (v2.0) | Patterns de simplification |
| `04-react-hooks-limits.md` | (v2.0) | Server Components priority |
| `05-reusability.md` | (v2.0) | Patterns de réutilisation |
| `06-mcp-mandatory.md` | (v2.0) | Workflows MCP optimaux |
| `rules/README.md` | (v2.0) | Documentation du système |

---

## Economie de Tokens

| Metrique | Valeur |
|----------|--------|
| Rules essentielles | ~8k tokens |
| Quality Gates | ~1k tokens |
| **Total Base** | **~9k tokens** |
| Economie vs v1.x | ~73% (30k → 9k) |

---

## Organisation TrigMem v2.0

Les règles sont organisées selon les 6 catégories TrigMem :

| Categorie | Fichier | Chargement |
|-----------|---------|------------|
| **Cat 1** | `CLAUDE.md` | Systematique |
| **Cat 2** | `rules/02-conventions.md` | Systematique |
| **Cat 3** | `CLAUDE.md` | Systematique |
| **Cat 4** | `skills/patterns/*` | **A la demande** |
| **Cat 5** | `rules/01-standards.md` | Systematique |
| **Cat 6** | `rules/quality-gates.md` | Systematique |

---

## Patterns Disponibles

Les patterns techniques sont chargés **a la demande** selon les triggers :

| Pattern | Trigger | Commande |
|---------|---------|----------|
| **tech-decisions** | "Quel stack ?", "X ou Y ?" | `/pattern tech-decisions` |
| **nextjs** | "Server Component", "RSC", "App Router" | `/pattern nextjs` |
| **rust** | "Axum", "sqlx", "Tower middleware" | `/pattern rust` |
| **nestjs** | "DTO", "JWT guard", "TypeORM" | `/pattern nestjs` |
| **wasm** | "wasm-bindgen", "wasm-pack" | `/pattern wasm` |
| **typescript** | "generic", "utility type" | `/pattern typescript` |
| **tanstack** | "useQuery", "router", "form" | `/pattern tanstack` |
| **tailwind** | "responsive", "dark mode" | `/pattern tailwind` |
| **ux-design** | "component design", "accessibility" | `/pattern ux-design` |
| **documentation** | "write docs", "README", "changelog" | `/pattern documentation` |

---

## Structure v2.0

```
.claude/
├── skills/
│   ├── TEMPLATE.md           # Template positif v2.0
│   ├── INDEX.md              # Index avec triggers exclusifs
│   ├── README.md             # Documentation skills
│   ├── pattern-autoloader/  # Autoloading intelligent
│   ├── patterns/             # Patterns a la demande
│   └── operations/           # MCP workflows
│       └── mcp-mandatory/
├── rules/                     # Regles essentielles
│   ├── 00-core.md           # Principes fondamentaux
│   ├── 01-standards.md       # Standards techniques (v2.0)
│   ├── 02-conventions.md     # Git, docs, structure
│   ├── 03-delete-first.md    # Delete First philosophy
│   ├── 04-react-hooks-limits.md # Server Components priority
│   ├── 05-reusability.md     # Reusability patterns
│   ├── 06-mcp-mandatory.md   # MCP workflows
│   ├── quality-gates.md      # Quality gates (NOUVEAU)
│   └── README.md             # Documentation rules
├── legacy/                    # Anciennes règles (backup)
│   └── 01-nevers.md.bak      # Version historique
└── CLAUDE.md                 # Identité projet
```

---

## Documentation

- **[GUIDE.md](./GUIDE.md)** - Guide complet d'utilisation
- **[REFERENCE.md](./REFERENCE.md)** - Reference rapide
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique des versions

---

## Utilisation

### Commandes Disponibles

```bash
# Dans Claude Code :

# Patterns techniques (charges a la demande)
/pattern nextjs     # Charge les patterns Next.js
/pattern rust        # Charge les patterns Rust
/pattern typescript  # Charge les patterns TypeScript

# TrigMem (methodologie)
/trigmem-core       # Concepts fondamentaux
/trigmem-categories # Classification
/trigmem-decision   # Guide de décision
/trigmem-storage    # Configuration stockage
/trigmem-examples   # Exemples travaillés
/trigmem-verification # Analyse sessions

# Operations MCP
/mcp-mandatory      # Checklists pour utiliser les MCPs
```

### Standards Techniques Positifs

Toutes les règles suivent maintenant une approche positive :
- Standards techniques explicites
- Checklists de validation
- Quality Gates objectifs
- Workflows recommandés
- Alternatives constructives

**Exemple de transformation :**

```
AVANT (negatif) :
NEVER use grep for searching
ALWAYS use grepai search first

APRES (positif) :
Standard : Utiliser grepai search en premier
Outils recommandés : grepai search → /toolkit search → Grep
Checklist : [ ] J'ai utilise grepai search en premier
```

---

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas a ouvrir une issue ou un PR.

Pour contribuer :
1. Suivre le TEMPLATE.md pour les nouveaux skills
2. Utiliser l'approche positive (pas de "NEVER/NO")
3. Ajouter des Quality Gates pour vos workflows

---

**Licence:** MIT | **Auteur:** Pamace | **Version:** 2.0.0 (Positive Revolution)

---

## Changelog v2.0.0

### Added
- `01-standards.md` - Standards techniques positifs
- `quality-gates.md` - Système de validation objectif
- Approche 100% positive dans tous les fichiers
- Triggers mutuellement exclusifs dans INDEX.md

### Changed
- `00-core.md` - Refactorisé sans négatifs
- `02-conventions.md` - Standards d'import positifs
- `03-delete-first.md` - Patterns de simplification
- `04-react-hooks-limits.md` - Server Components priority
- `05-reusability.md` - Patterns de réutilisation
- `06-mcp-mandatory.md` - Workflows optimaux
- `rules/README.md` - Documentation du système mis a jour

### Removed
- Approche négative ("NEVER/NO/PROHIBITED")
- Tableaux "NEVER / ALWAYS"
- Section "Anti-Patterns" dans TEMPLATE.md

### Migration Notes
- Les fichiers `01-nevers.md` → déplacés dans `legacy/`
- Mettre a jour les imports si vous utilisez l'ancien système
- Les Quality Gates remplacent les anciennes "Anti-Patterns"
