# Protocole de Recherche Wiki

> **Chargé quand:** Questions du type "comment", "où est", "qu'est-ce que", "qu'avons-nous décidé"

---

## Workflow en 5 Étapes

```
1. CLASSIFIER    → Mapper le type de question au répertoire
2. INDEX CHECK   → Lire le README du dossier cible
3. SUMMARY SCAN  → Scanner les **Summary:** des fichiers
4. DEEP READ     → Ouvrir 1-3 fichiers les plus pertinents
5. CITER         → Répondre avec chemin + date de MAJ
```

---

## Table de Routage

| Type de Question | Répertoire Cible |
|-----------------|-----------------|
| "Comment faire X ?" | `_wiki/2-Knowledge/` |
| "Qu'avons-nous décidé sur Y ?" | `_wiki/2-Knowledge/` (décisions) |
| "Où en est le projet Z ?" | `_wiki/1-Projects/` |
| "Notes de la réunion du [date]" | `_wiki/3-Journal/` |
| "Quelle est la config pour..." | `_wiki/2-Knowledge/` |

---

## Freshness Alerts

| Âge du Contenu | Alerte |
|---------------|--------|
| > 30 jours (status/décision) | "Ce contenu date de [date] — vérifier si toujours à jour" |
| > 90 jours (référence) | "Référence ancienne — potentiellement obsolète" |

---

## Règles

1. **Scanner d'abord** — Lire les summaries avant les fichiers complets
2. **1-3 fichiers max** — Ne jamais bulk-loader des dossiers entiers
3. **Citer les sources** — Toujours `[chemin/fichier.md] (Updated: YYYY-MM-DD)`
4. **Pas de fabrication** — Si l'info n'existe pas, le dire + proposer de la capturer
5. **Decision learning** — Quand un choix est posé, rappeler les décisions passées similaires
