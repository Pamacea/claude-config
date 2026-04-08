# Optimization Review — Efficacité du Contexte

> **Chargé quand:** "optimize", "context efficiency", "review loading", ou lint flag > 30 jours

---

## Seuils de Taille

| Type de Fichier | Seuil | Action si dépassement |
|----------------|-------|----------------------|
| Module d'instruction | > 300 lignes | Split ou compacter |
| Fichier core (CLAUDE.md, PROTOCOL.md) | > 500 lignes | Déplacer contenu vers wiki |
| Template | > 100 lignes | Simplifier |
| Total session start load | > 800 lignes | Révision complète |

---

## Workflow en 5 Étapes

```
1. ANALYSER     → wc -l sur tous les fichiers chargés au start
2. IDENTIFIER   → Trouver les dépassements de seuil
3. PROPOSER     → Split, compact, conditional load, ou remove
4. IMPLÉMENTER  → Avec approbation utilisateur
5. DOCUMENTER   → Mettre à jour .last-optimization-review
```

---

## Métriques de Succès

- Session start load: **600-800 lignes** (healthy)
- Modules individuels: **< 300 lignes**
- Fichiers lus 1x par session (pas de re-reads)

---

## Quand NE PAS Optimizer

- Si les sessions sont rapides et fluides
- Si le système fonctionne bien
- Ne pas optimizer prématurément

---

## Dernière Review

<!-- Mettre à jour après chaque optimization -->
- **Date:** 2026-04-08
- **Status:** Initial setup
- **Context load:** À mesurer après implémentation
