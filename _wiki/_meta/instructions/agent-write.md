# Protocole de Création de Fichiers

> **Chargé quand:** L'IA crée ou modifie des fichiers wiki.

---

## Règle d'Or: Inbox-First

**TOUT nouveau contenu va dans `_wiki/_inbox/` sauf indication contraire.**

Exceptions (écriture directe autorisée) :
- `WIKI-LOG.md` — append uniquement
- `_wiki/_config/config.md` — Training Log
- L'utilisateur dit explicitement "mets-le dans [dossier]"

---

## Nom de Fichier

Format : `YYYY-MM-DD-[slug-descriptif].md`

Exemples :
- `2026-04-08-auth-pattern-analysis.md`
- `2026-04-10-meeting-notes-standup.md`
- `2026-04-12-decision-use-prisma.md`

---

## Métadonnées Obligatoires

Chaque fichier DOIT avoir le bloc (voir `_wiki/_config/standard.md`) :

```markdown
**Type:** [knowledge|decision|initiative|meeting|journal]
**Summary:** [phrase au présent — PAS "Auto-generated"]
**Tags:** [#tag1 #tag2]
**Status:** draft
**Updated:** YYYY-MM-DD
```

Le Status par défaut est `draft` — l'utilisateur confirme le passage à `active`.

---

## Quand Filer (Déplacer de Inbox)

Déplacer un fichier de `_wiki/_inbox/` vers sa destination quand :
1. Le contenu est complet et vérifié
2. Le metadata block est rempli correctement
3. L'utilisateur confirme

Destinations :
- `_wiki/1-Projects/` — travaux actifs
- `_wiki/2-Knowledge/` — réfs, how-tos, décisions
- `_wiki/3-Journal/` — réflexions, notes

---

## Mise à jour de Fichiers Existants

- Mettre à jour `**Updated:**` et `**Summary:**`
- Préférer l'ajout à l'écrasement
- Ne JAMAIS écrire dans `_wiki/4-Private/`
- Ne JAMAIS créer de duplicata (R1)
