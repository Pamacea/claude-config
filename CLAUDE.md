# CLAUDE.md — Bootstrap

> **Version:** 6.0.0 | Config Claude Code + LLM Wiki
> **Lit d'abord:** PROTOCOL.md (règles critiques R1-R5)
> **Puis:** _wiki/_config/config.md (profil + phase training)

---

## Quick Commands

```bash
npm install / dev / test / build    # Projets
pnpm run fmt / fmt:check            # Oxfmt formatting
```

### Oxfmt (successeur Rust de Prettier)
~30x plus rapide que Prettier. Built-in: import sorting, Tailwind class sorting, package.json sorting.
Docs: https://oxc.rs/docs/guide/usage/formatter.html

---

## Architecture

```
~/.claude/
├── rules/              # Règles runtime (auto-chargées par globs)
├── skills/             # Patterns demand-loaded (metadata tags)
├── _wiki/              # LLM Wiki — base de connaissances
│   ├── _config/        #   Brain (profil, metadata standard)
│   ├── _meta/          #   Moteur (instructions, templates)
│   ├── _inbox/         #   Zone de capture frictionless
│   ├── 1-Projects/     #   Travaux actifs
│   ├── 2-Knowledge/    #   Wiki principal
│   └── 3-Journal/      #   Réflexions, notes
├── hooks/              # Hooks Pamacea
└── .obsidian/          # Config Obsidian
```

---

## Outils Pamacea (Auto-Active)

| Outil | Usage |
|-------|-------|
| **RTK.md** | Token savings (60-90%) — auto-rewrite commands |
| **AUREUS.md** | Versioned commits — `TYPE: PROJECT - vX.Y.Z` |
| **PARRY.md** | Agentic linting — PostWrite validation |
| **ARGUS.md** | Memory sentinel — recall/remember patterns |
| **PALNIA.md** | Tasks/Events CLI |

---

## Wiki — Outils

| Trigger | Module |
|---------|--------|
| Session start | `_wiki/_meta/instructions/general.md` (auto) |
| Création fichiers | `_wiki/_meta/instructions/agent-write.md` |
| Recherche wiki | `_wiki/_meta/instructions/knowledge-query.md` |
| Health check | `_wiki/_meta/instructions/knowledge-lint.md` |
| Complétion | `_wiki/_meta/instructions/definition-of-done.md` |
| Optimisation | `_wiki/_meta/instructions/optimization-review.md` |

---

## Quality Gates

- [ ] Lint passe
- [ ] Typecheck passe
- [ ] Tests passent
- [ ] Pas de secrets exposés
- [ ] Commit au format TYPE: PROJECT - vX.Y.Z

---

## Git Flow

```
TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2
```

Types: RELEASE (MAJOR), UPDATE (MINOR), PATCH (FIX)

---

*Version: 6.0.0 | Config + LLM Wiki unifié*
