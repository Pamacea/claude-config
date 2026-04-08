# Configuration Personnelle — LLM Wiki

> **Ce fichier est lu EN PREMIER à chaque session.** C'est le cerveau du système.

---

## Profil Utilisateur

- **Nom:** Yanis
- **Rôle:** Développeur Full Stack
- **Outils:** Claude Code, Obsidian, Oxc (Oxfmt/Oxlint)
- **Langue:** Français (réponses en français, termes techniques en anglais)

---

## Phase du Système

Calculer la phase actuelle depuis :
- **Training Start Date:** 2026-04-08
- **Training Period:** 30 jours
- **Cooldown Period:** 14 jours

```
Aujourd'hui - Training Start Date = Jour N

Jour 1-30:   TRAINING (proactif, 2-5 questions/session, décrivant)
Jour 31-44:  COOLDOWN (suggestions réduites 70%, validation)
Jour 45+:    ESTABLISHED (invisible, exécution pure)
```

### Comportement par Phase

**Training (Jour 1-30):**
- Poser 2-5 questions de clarification par session (décroissant)
- Proposer des conventions de nommage et dossiers
- Logger les observations dans Training Log ci-dessous
- Enseigner le système au fur et à mesure

**Cooldown (Jour 31-44):**
- Réduire les suggestions de ~70%
- Valider les préférences apprises
- Arrêter le logging

**Established (Jour 45+):**
- "Be mostly invisible. Just work."
- Exécuter efficacement, minimal commentary
- Pas de questions non sollicitées

---

## Training Log

<!-- L'IA remplit cette section pendant la phase training -->

| Date | Observation | Adaptation |
|------|-------------|------------|
| 2026-04-08 | Système initialisé | Structure wiki créée, metadata standard adopté |

---

## Comportements Fondamentaux (Toutes Phases)

1. **Metadata obligatoire** — Chaque fichier reçoit le bloc standard (voir `_wiki/_config/standard.md`)
2. **Inbox-first** — Nouveau contenu → `_wiki/_inbox/` d'abord
3. **Citer les sources** — Toujours indiquer le fichier + date de mise à jour
4. **Pas de fabrication** — Si l'info n'existe pas, le dire honnêtement
5. **Respecter .gitignore** — Ne jamais exposer `_wiki/4-Private/`
6. **JIT loading** — Charger les instructions seulement quand déclenchées

---

## Répertoires Wiki

| Dossier | Usage |
|---------|-------|
| `_wiki/_inbox/` | Zone de capture frictionless |
| `_wiki/_sources/` | Documents originaux préservés (immutable) |
| `_wiki/1-Projects/` | Travaux actifs multi-artefacts |
| `_wiki/2-Knowledge/` | Wiki principal — how-tos, décisions, réfs |
| `_wiki/3-Journal/` | Réflexions, notes de réunion |
| `_wiki/4-Private/` | Contenu sensible (gitignored) |
| `_wiki/assets/` | Images et pièces jointes |

---

## Chargement des Modules (JIT)

Les modules dans `_wiki/_meta/instructions/` ne sont PAS chargés au démarrage. Charger UNIQUEMENT quand déclenché :

| Trigger | Module |
|---------|--------|
| Création de fichiers | `_wiki/_meta/instructions/agent-write.md` |
| Questions sur le wiki | `_wiki/_meta/instructions/knowledge-query.md` |
| "lint", "health check" | `_wiki/_meta/instructions/knowledge-lint.md` |
| Vérifier complétion | `_wiki/_meta/instructions/definition-of-done.md` |
| "optimize", "contexte" | `_wiki/_meta/instructions/optimization-review.md` |
| Session start | `_wiki/_meta/instructions/general.md` (auto) |
