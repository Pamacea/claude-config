# GUIDE - Claude Config & TrigMem v2.0

> **Version:** 2.0.0 | **Révolution Positive** | **Dernière mise à jour:** 2025-03-17

---

## 📋 Table des Matières

1. [Introduction](#introduction)
2. [Nouveautés v2.0](#nouveauautés-v200)
3. [Installation](#installation)
4. [Utilisation](#utilisation)
5. [Patterns Techniques](#patterns-techniques)
6. [Personnalisation](#personnalisation)

---

## Introduction

**claude-config** est une configuration optimisée pour Claude Code utilisant la méthodologie **TrigMem** pour gérer intelligemment la mémoire et les tokens.

### Le Problème

Sans TrigMem, Claude Code charge toutes les règles à chaque session :
- ~30k tokens de règles
- Patterns techniques pas toujours utiles
- Pas de séparation universel/spécifique

### La Solution

Avec TrigMem :
- **~9k tokens** de règles essentielles (vs 30k avant)
- **Patterns à la demande** (chargés seulement si nécessaire)
- **73% d'économie** sur les sessions standards
- **Approche 100% positive** (plus de "NEVER/NO")

---

## Nouveautés v2.0

### 🔄 Révolution Positive

**Changement majeur :** Toutes les règles ont été réécrites avec une approche positive.

| ❌ Supprimé | ✅ Nouveau Format |
|-------------|---------------|
| "NEVER do this" | "Standard : Do this instead" |
| "❌ BAD practice" | "Recommended pattern" |
| "PROHIBITED" | "Optimal workflow" |
| 40+ règles "NEVER" | Standards + Checklists |

### 📋 Nouveau Système de Quality Gates

**Nouveau fichier :** `rules/quality-gates.md`

Critères de validation objectifs pour chaque type de tâche :
- **Feature Development** → E1-E5 gates
- **Bug Fix** → B1-B5 gates
- **Refactoring** → R1-R5 gates
- **Performance** → P1-P5 gates
- **Security** → S1-S5 gates

### 📁 Fichiers Mis à Jour

| Ancien | Nouveau | Changement Clé |
|--------|--------|----------------|
| `01-nevers.md` | `01-standards.md` | Standards positifs |
| N/A | `quality-gates.md` | Validation objective |
| `00-core.md` | v2.0 | Principes sans négatifs |
| `02-conventions.md` | v2.0 | Standards d'import positifs |
| `03-delete-first.md` | v2.0 | Patterns de simplification |
| `04-react-hooks-limits.md` | v2.0 | Server Components priority |
| `05-reusability.md` | v2.0 | Patterns de réutilisation |
| `06-mcp-mandatory.md` | v2.0 | Workflows optimaux |

---

## Installation

### Méthode 1 : Clone (Recommandé)

```bash
# Backup votre config actuelle
mv ~/.claude ~/.claude.backup

# Cloner ce repo
git clone https://github.com/Pamace/claude-config.git ~/.claude
```

### Méthode 2 : Copie des Fichiers

```bash
# Copier les skills et rules
cp -r skills/* ~/.claude/skills/
cp -r rules/* ~/.claude/rules/
cp CLAUDE.md ~/.claude/
```

---

## Utilisation

### Chargement Automatique

Les skills TrigMem sont automatiquement activés par Claude Code :

- `trigmem-core` - Concepts fondamentaux
- `trigmem-categories` - Classification automatique
- `trigmem-decision` - Guide de décision
- `trigmem-storage` - Configuration stockage
- `trigmem-examples` - Exemples travaillés
- `trigmem-verification` - Analyse de sessions

### Nouveau : Pattern Autoloader

Le **pattern-autoloader** détecte automatiquement les patterns nécessaires :
- Analyse votre question
- Identifie les triggers pertinents
- Charge les compétences correspondantes

**Exemple :**
```
Vous: "Comment créer un Server Action ?"
↓
Autoloader détecte: "Server Action" → Next.js
↓
Charge: /skills/patterns/nextjs/
↓
Répond avec le pattern spécifique
```

### Chargement à la Demande

Les patterns techniques sont chargés selon les **triggers** :

**Exemple :**
```
Vous: "Comment je crée un Server Action ?"
↓
Claude détecte: Catégorie 4 (Pattern)
↓
Charge: /skills/patterns/nextjs/
↓
Répond avec le pattern spécifique
```

### Commandes Manuelles

```
/trigmem-core       # Affiche les concepts fondamentaux
/trigmem-examples   # Montre des exemples d'utilisation
/pattern nextjs      # Charge les patterns Next.js
/pattern rust        # Charge les patterns Rust
```

---

## Patterns Techniques

### Patterns Disponibles

| Pattern | Description | Triggers |
|---------|-------------|----------|
| `tech-decisions` | Choix de stack technique | "Quel stack", "X ou Y" |
| `nextjs` | Next.js 16 + React 19 | "Server Action", "RSC", "App Router" |
| `rust` | Rust + Axum | "Axum", "sqlx", "Tower" |
| `nestjs` | NestJS | "DTO", "JWT guard", "TypeORM" |
| `wasm` | WebAssembly | "wasm-bindgen", "wasm-pack" |
| `vite` | Vite | "vite config", "build", "HMR" |
| `typescript` | TypeScript | "generic", "utility type" |
| `tanstack` | TanStack Suite | "useQuery", "router", "form" |
| `tailwind` | Tailwind CSS | "responsive", "dark mode" |
| `ux-design` | UX/Design patterns | "component design", "accessibility" |
| `documentation` | Documentation patterns | "write docs", "README" |

### Exemple d'Utilisation

```
Vous: "Je veux créer un Server Action avec Next.js"

Claude:
1. Détecte les triggers: "Server Action", "Next.js"
2. Charge: /skills/patterns/nextjs/
3. Fournit le pattern:

'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
})

export async function createPost(formData: FormData) {
  const data = schema.parse({
    title: formData.get('title'),
  })
  // ...
  revalidateTag('posts')
}
```

---

## Personnalisation

### Ajouter un Pattern

Créez un nouveau fichier dans `skills/patterns/` :

```bash
mkdir skills/patterns/ma-techno
vim skills/patterns/ma-techno/ma-techno-patterns.skill
```

Avec le format :

```markdown
# Ma Techno Patterns

> **Version:** 1.0.0 | **Category:** TrigMem Cat 4
> **Trigger:** "trigger1", "trigger2", "trigger3"

---

## Pattern Exemple

```typescript
// code ici
```
```

### Modifier une Règle

Les règles essentielles sont dans `rules/` :

- `00-core.md` - Principes fondamentaux
- `01-standards.md` - Standards techniques
- `02-conventions.md` - Conventions Git/Docs
- `03-delete-first.md` - Delete First philosophy
- `04-react-hooks-limits.md` - React hooks standards
- `05-reusability.md` - Reusability patterns
- `quality-gates.md` - Quality gates

---

## 🎯 Bonnes Pratiques v2.0

### 1. Utiliser les Standards Positifs

Tous les fichiers utilisent maintenant une approche positive :
- **Standards techniques** au lieu d'interdictions
- **Checklists de validation** pour auto-contrôle
- **Quality Gates** pour validation objective

### 2. Quality Gates pour Tâches

Avant de considérer une tâche comme terminée :
- Vérifier les Quality Gates correspondants
- Valider les critères d'acceptation
- Documenter les résultats

### 3. Triggers Mutuellement Exclusifs

Les patterns utilisent maintenant des triggers exclusifs :
- Un seul pattern se charge à la fois
- Priorité claire en cas de multiples matches
- Références croisées (pas de chargement multiple)

---

## 📞 Support

- **Issues:** https://github.com/Pamace/claude-config/issues
- **Discussions:** https://github.com/Pamace/claude-config/discussions

---

## 📈 Migration v1.x → v2.0

### Ce Qui Change

**Pour les utilisateurs :**
- Plus de messages négatifs ("NEVER/NO")
- Checklists de validation plus claires
- Quality Gates objectifs pour valider le travail

**Pour les développeurs :**
- Standards techniques plus faciles à suivre
- Quality Gates pour validation automatisée
- Templates positifs pour nouveaux skills

### Migration Pas à Pas

1. **Backup** votre config actuelle
2. **Clone** la nouvelle version
3. **Testez** avec quelques tâches
4. **Adaptez** vos patterns personnels si nécessaire

---

*Version: 2.0.0 | Mis à jour: 2025-03-17 | Positive Revolution*
