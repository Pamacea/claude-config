# GUIDE - Claude Config & TrigMem

> **Version:** 1.1.5 | Guide complet d'utilisation

---

## 📖 Table des Matières

1. [Introduction](#introduction)
2. [TrigMem](#trigmem)
3. [Installation](#installation)
4. [Utilisation](#utilisation)
5. [Patterns](#patterns)
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
- **~8k tokens** de règles essentielles
- **Patterns à la demande** (chargés seulement si nécessaire)
- **73% d'économie** sur les sessions standards

---

## TrigMem

### Les 6 Catégories

TrigMem classe l'information en 6 catégories avec un stockage optimal :

| Catégorie | Description | Stockage | Exemple |
|-----------|-------------|----------|---------|
| **Cat 1** | Identité Projet | CLAUDE.md | "Qu'est-ce que ce projet ?" |
| **Cat 2** | Structure Codebase | rules/02-conventions.md | "Où sont les composants ?" |
| **Cat 3** | Workflows Opérationnels | CLAUDE.md | "Comment je déploie ?" |
| **Cat 4** | Patterns Réutilisables | skills/patterns/* | "Comment créer un Server Action ?" |
| **Cat 5** | Guides Architecturales | rules/02-conventions.md | "Conventions Git ?" |
| **Cat 6** | Corrections Itératives | rules/01-nevers.md | "Ne fais plus jamais X" |

### Flow de Décision

```
User Question
     ↓
[trigmem-categories] Classification
     ↓
┌────┴────┐
│         │
Cat 1-3   Cat 4 (Patterns)
│         │
↓         ↓
Rules/   Skills/ (à la demande)
CLAUDE.md
```

---

## Installation

### Méthode 1 : Clone (Recommandé)

```bash
# Backup votre config actuelle
mv ~/.claude ~/.claude.backup

# Cloner ce repo
git clone https://github.com/yanisdev/claude-config.git ~/.claude
```

### Méthode 2 : Copie des fichiers

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

- `trigmem-core` - Concepts fondamentaux (structure en dossier)
- `trigmem-decision` - Guide de décision (structure en dossier)
- `trigmem-categories` - Classification automatique (structure en dossier)
- `trigmem-storage` - Configuration stockage (structure en dossier)
- `trigmem-examples` - Exemples travaillés (structure en dossier)
- `trigmem-verification` - Analyse de sessions (structure en dossier)

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
/skill patterns/rust
```

---

## Patterns

### Patterns Disponibles

| Pattern | Description | Triggers |
|---------|-------------|----------|
| `tech-decisions` | Choix de stack technique | "Quel stack", "X ou Y" |
| `nextjs` | Next.js 16 + React 19 | "Server Action", "RSC" |
| `rust` | Rust + Axum | "Axum handler", "sqlx" |
| `nestjs` | NestJS | "DTO", "JWT guard" |
| `wasm` | WebAssembly | "wasm-bindgen" |
| `vite` | Vite | "vite config", "build" |
| `typescript` | TypeScript | "generic", "utility type" |
| `tanstack` | TanStack (Query/Router/Form) | "useQuery", "router" |
| `tailwind` | Tailwind CSS | "responsive", "dark mode" |

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
mkdir skills/patterns/ma-tecno
vim skills/patterns/ma-tecno/ma-tecno-patterns.skill
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
- `01-nevers.md` - Règles bloquantes
- `02-conventions.md` - Conventions Git/Docs

---

## 🎯 Bonnes Pratiques

1. **Utiliser les triggers** : Les mots-clés déclenchent le chargement des patterns
2. **Être spécifique** : "Comment créer un Server Action ?" charge le pattern Next.js
3. **Laisser Claude décider** : trigmem-categories route vers la bonne ressource

---

## 📞 Support

- **Issues:** https://github.com/yanisdev/claude-config/issues
- **Discussions:** https://github.com/yanisdev/claude-config/discussions

---

### Git Flow Master : Nouveau Type WIP

Le type **WIP** (Work In Progress) a été ajouté pour les commits de refactoring :

```
WIP: PROJECT_NAME - vX.Y.Z

- Refactor: Restructuring X
- Work in progress: Y
```

**Usage :**
- Refactoring en cours
- Réorganisations majeures
- Breaking changes potentiels

---

*Version: 1.1.5 | Mis à jour: 2026-02-19*
