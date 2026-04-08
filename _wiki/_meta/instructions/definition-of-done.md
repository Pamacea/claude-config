# Definition of Done — Critères de Complétion

> **Chargé quand:** Vérifier si un travail est "fini", ou quand on termine une tâche wiki

---

## Principe

Rien n'est "done" tant que ce n'est pas **trouvable et utile**. "Drafted" ≠ "Done".

---

## Checklists par Type

### Knowledge Article
- [ ] Contenu complet et vérifié
- [ ] Metadata block rempli (`Type`, `Summary`, `Tags`, `Status`, `Updated`)
- [ ] Fiché dans le bon répertoire (pas dans `_wiki/_inbox/`)
- [ ] `Status` = `active`
- [ ] Liens `Related` ajoutés

### Decision Record
- [ ] Décision énoncée avec raisonnement
- [ ] Options considérées documentées (pros/cons)
- [ ] Owner et date enregistrés
- [ ] `Status` = `active` ou `complete`
- [ ] Section Outcome remplie APRÈS implémentation

### Initiative (Projet)
- [ ] Tous les objectifs atteints ou descopés
- [ ] Artefacts livrés
- [ ] `Status` = `complete`
- [ ] Déplacé vers archive si terminé

### Meeting Notes
- [ ] Points clés capturés
- [ ] Action items avec owners
- [ ] Fiché dans `_wiki/3-Journal/`

### Journal Entry
- [ ] Réflexion claire et structurée
- [ ] Metadata rempli
- [ ] Fiché dans `_wiki/3-Journal/`

---

## Phrases Red Flags

Si l'IA utilise ces formulations, le travail N'EST PAS done :
- "Guide drafted" → Pas filed, pas vérifié
- "Decision recorded" → Pas de raisonnement ni options
- "Notes captured" → Pas d'action items

---

## Le Moment de Complétion

Quand un élément est prêt :
1. Vérifier la checklist ci-dessus
2. Proposer à l'utilisateur : "Ceci est prêt — passer Status à active ?"
3. Mettre à jour metadata
4. Déplacer de `_wiki/_inbox/` si nécessaire
