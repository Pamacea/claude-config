---
name: context-management
description: Gestion optimale du contexte Claude Code — taille CLAUDE.md, sous-agents, compaction, token tracking
type: workflow
triggers: ["context", "compaction", "clear", "token", "context window", "pollution"]
---

# Context Management — Gestion du Contexte

> **Objectif:** Économiser les tokens et maintenir la qualité des réponses.
> Inspiré de claude-craft `12-context-management.md`.

## Règles de Taille CLAUDE.md

**CLAUDE.md principal: 150-200 lignes maximum.**

```
~/.claude/
  CLAUDE.md              <- Résumé (< 200 lignes)
  rules/                 <- Règles détaillées (chargées par globs)
  skills/                <- Compétences à la demande
```

| Contenu | Emplacement |
|---------|-------------|
| Technologies, commandes, agents | CLAUDE.md |
| Principes détaillés | `rules/00-core.md` |
| Standards techniques | `rules/01-standards.md` |
| Hooks | `settings.json` |

## Nettoyage du Contexte

```
Utiliser /clear:
- Entre deux tâches NON liées
- Après une longue investigation
- Quand le contexte dépasse 50% de la fenêtre
- Avant de commencer une nouvelle feature

NE PAS utiliser /clear:
- Au milieu d'une tâche en cours
- Si le contexte précédent est nécessaire
```

## Sous-Agents pour les Investigations

Déléguer les recherches aux sous-agents pour garder le contexte principal propre.

| Situation | Action |
|-----------|--------|
| Chercher un fichier/pattern spécifique | Glob/Grep directement |
| Explorer une architecture inconnue | Sous-agent Explore |
| Investigation multi-fichiers (> 3) | Sous-agent Explore |
| Planifier une implémentation | Sous-agent Plan |
| Tâche indépendante en parallèle | Sous-agent general-purpose |

## Context Compaction

Claude Code compacte automatiquement le contexte quand il approche les limites.

- À partir de **70% de contexte**, lancer `/compact` proactivement
- `/memory` sauvegarde des apprentissages persistants qui survivent aux compactions

**Hooks configurés:**
- **PreCompact** — Sauvegarde context-essentials.md avant compaction
- **PostCompact** — Re-injecte context-essentials.md après compaction
- **SessionStart (compact)** — Re-injecte context-essentials.md après compaction de session

## Suivi des Tokens

| Contexte utilisé | Action |
|------------------|--------|
| < 30% | Normal, continuer |
| 30-60% | Surveiller, éviter les lectures inutiles |
| 60-80% | Déléguer aux sous-agents, envisager /clear |
| > 80% | Compaction imminente, sauvegarder le contexte critique |

## Boucles de Vérification

Toujours fournir des moyens de vérification: tests, screenshots, outputs attendus.

| Type | Boucle |
|------|--------|
| Code | TDD (red/green/refactor) |
| UI | Screenshot avant/après |
| API | spec/implementation/test curl |

## Anti-patterns

| Anti-pattern | Solution |
|-------------|----------|
| Kitchen-sink session | `/clear` entre tâches, sous-agents |
| CLAUDE.md surcharge | Modulariser dans `rules/` |
| Over-correcting | Après 2 échecs, `/clear` et reformuler |
| Exploration infinie | Définir le scope avant d'explorer |

## Bonnes Pratiques CLAUDE.md

- **Pointeurs > copies:** Utiliser `@chemin` pour référencer des fichiers
- **Emphase:** `IMPORTANT`, `JAMAIS` pour les contraintes non-négociables
- **Maintenance:** Revoir chaque trimestre

## Checklist Session

### Avant
- [ ] CLAUDE.md < 200 lignes
- [ ] Contexte propre (pas de résidus)

### Pendant
- [ ] Surveiller le % de contexte
- [ ] Déléguer les investigations aux sous-agents
- [ ] `/clear` entre tâches non liées

### Complexes
- [ ] Utiliser Plan Mode si > 3 fichiers
- [ ] Worktrees pour le parallélisme
