# Knowledge Lint — Health Check du Wiki

> **Chargé quand:** "lint", "health check", "stale", "wiki cleanup", "audit"

---

## 5 Checks (dans l'ordre)

### 1. Stale Inbox Items
Fichiers dans `_wiki/_inbox/` de plus de 7 jours.
```
Action: Lister les fichiers concernés
Output: "X items in inbox >7 days: [liste]"
```

### 2. Missing Metadata
Fichiers de contenu sans `**Type:**`, `**Summary:**`, ou `**Tags:**`.
```
Action: Scanner tous les .md dans _wiki/1-Projects/, _wiki/2-Knowledge/, _wiki/3-Journal/
Output: "X files missing metadata: [liste]"
```

### 3. Stale Active Files
Fichiers `Status: active` avec `Updated:` > 90 jours.
```
Action: Chercher les dates dans les metadata blocks
Output: "X files >90 days old: [liste avec dates]"
```

### 4. Orphaned Files
Fichiers sans aucun lien entrant depuis un autre .md.
```
Action: Vérifier les [wikilinks] dans tous les fichiers
Output: "X orphan files: [liste]"
```

### 5. Context Size Check
Fichiers dépassant les seuils :
- Modules d'instruction: > 300 lignes
- Fichiers core: > 500 lignes
- Total session start: > 800 lignes
```
Action: wc -l sur _wiki/_config/*, _wiki/_meta/instructions/*, CLAUDE.md, PROTOCOL.md
Output: "Context load: X lines" + warnings si dépassement
```

---

## Rapport

Format :
```
## Knowledge Lint Report — [DATE]

| Check | Status | Count |
|-------|--------|-------|
| Stale Inbox | PASS/FAIL | X |
| Missing Metadata | PASS/FAIL | X |
| Stale Active | PASS/FAIL | X |
| Orphaned | PASS/FAIL | X |
| Context Size | PASS/FAIL | X lines |

Actions recommandées:
- [item 1]
- [item 2]
```

---

## Cadence

- **Mensuel** recommandé
- Lancer automatiquement si > 30 jours sans lint (via optimization-review)
