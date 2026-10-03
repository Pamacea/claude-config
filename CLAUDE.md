# CLAUDE.md — Bootstrap

> **Version:** 6.1.0 | Config Claude Code + LLM Wiki
> **Lit d'abord:** PROTOCOL.md (règles critiques R1-R5)
> **Puis:** _wiki/_config/config.md (profil + phase training)

---

## Quick Commands

```bash
npm install / dev / test / build    # Projets
pnpm run fmt / fmt:check            # Oxfmt formatting
```

---

## RTK — Token Savings

Le hook `hooks/bash-pre-tool.cjs` réécrit automatiquement les commandes
(`git status` → `rtk git status`, 60-90% d'économie).

**Golden rule:** préfixer manuellement avec `rtk` les commandes non interceptées,
y compris dans les chaînes `&&` :
`rtk git add . && rtk git commit -m "msg"`

→ Référence complète: **RTK.md** | Stats: `rtk gain` | Doc: https://github.com/rtk-ai/rtk

---

## Rules — rules/ (auto-chargées)

| Fichier | Sujet |
|---------|-------|
| `00-core.md` | Principes (Correctness > Completeness > Speed), méthodologie EPCT |
| `01-standards.md` | Standards techniques positifs (remplace 01-nevers) |
| `02-conventions.md` | Git flow `TYPE: PROJECT - vX.Y.Z`, structure, naming, imports |
| `03-delete-first.md` | Simplifier avant d'ajouter — variant props, composition |
| `04-react-hooks-limits.md` | Server Components en priorité, limites useEffect/useMemo |
| `05-reusability.md` | Barrel exports, variant props, fonctions pures |
| `06-mcp-mandatory.md` | Workflows MCP (claude-mem, git-flow, dev-browser) |
| `07-pre-commit-gates.md` | Pipeline validation avant commit (bloquant) |
| `08-rust-workspace.md` | Structure workspace Rust full stack |
| `quality-gates.md` | Critères de validation par type de tâche |
| `argus.md` | ARGUS — `recall` avant exploration, `remember` après résolution |

---

## Outils Pamacea (auto-actifs)

| Outil | Usage |
|-------|-------|
| **RTK.md** | Token savings (60-90%) — auto-rewrite commands |
| **AUREUS.md** | Versioned commits — `TYPE: PROJECT - vX.Y.Z` |
| **PARRY.md** | Agentic linting — PostWrite validation |
| **ARGUS.md** | Memory sentinel — recall/remember patterns |
| **PALNIA.md** | Tasks/Events CLI |

---

## Wiki — _wiki/ (Obsidian)

| Trigger | Module |
|---------|--------|
| Session start | `_wiki/_meta/instructions/general.md` (auto) |
| Création fichiers | `_wiki/_meta/instructions/agent-write.md` |
| Recherche wiki | `_wiki/_meta/instructions/knowledge-query.md` |
| Health check | `_wiki/_meta/instructions/knowledge-lint.md` |
| Complétion | `_wiki/_meta/instructions/definition-of-done.md` |
| Optimisation | `_wiki/_meta/instructions/optimization-review.md` |

**Skills patterns:** `skills/INDEX.md` — chargés uniquement à la demande.

---

## Références rapides

- **Quality Gates** → `rules/quality-gates.md` + `rules/07-pre-commit-gates.md`
- **Git Flow** → `rules/02-conventions.md` (`TYPE: PROJECT - vX.Y.Z`, types: RELEASE/UPDATE/PATCH)
- **Architectures** → `rules/` (rust-workspace) | `skills/` (frameworks)

---

*Version: 6.1.0 | Ultra-concise — détails dans rules/ et fichiers d'outils*
