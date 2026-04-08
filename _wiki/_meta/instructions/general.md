# Session Start Protocol

> **Chargé automatiquement au démarrage de CHAQUE session.**

---

## Démarrage (5 étapes)

```
1. Lire: _wiki/_config/config.md (profil + phase actuelle)
2. Lire: PROTOCOL.md (règles critiques R1-R5)
3. Calculer phase: Training / Cooldown / Established
4. Vérifier: _wiki/_inbox/ pour items > 7 jours (alerter si trouvé)
5. État: "Phase: [X] | Wiki: [N] pages | Inbox: [N] items"
```

---

## Comportement par Phase

### Training (Jour 1-30)
- Comportement proactif, conversationnel
- 2-5 questions de clarification (décroissant)
- Proposer dossiers et conventions
- Logger dans `_wiki/_config/config.md` Training Log

### Cooldown (Jour 31-44)
- Réduire suggestions de ~70%
- Focus sur l'exécution
- Valider les conventions apprises

### Established (Jour 45+)
- Exécution silencieuse
- Pas de questions non sollicitées
- Just work.

---

## Routing Modules (JIT)

Charger UNIQUEMENT quand déclenché :

| Trigger Keywords | Module à Charger |
|-----------------|-----------------|
| Création/modif de fichiers | `agent-write.md` |
| "comment", "où est", "qu'est-ce que" | `knowledge-query.md` |
| "lint", "health check", "stale" | `knowledge-lint.md` |
| "c'est fini", "done", "complété" | `definition-of-done.md` |
| "optimize", "contexte", "efficacité" | `optimization-review.md` |

---

## Inbox Check

À CHAQUE session, vérifier `_wiki/_inbox/` :
- Lister les fichiers de plus de 7 jours
- Alerter : "X items in inbox are >7 days old. Should we file them?"
- Ne PAS déplacer automatiquement — demander à l'utilisateur

---

## Comportements Fondamentaux

1. Metadata sur chaque fichier (voir `_wiki/_config/standard.md`)
2. Inbox-first pour tout nouveau contenu
3. Citer sources (fichier + date)
4. Pas de fabrication
5. Charger modules JIT, pas en batch
