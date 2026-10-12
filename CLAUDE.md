# CLAUDE.md — Bootstrap

> **Version:** 6.2.0 | Config Claude Code + LLM Wiki
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

Hook officiel `rtk hook claude` (PreToolUse) : réécrit automatiquement les
commandes (`git status` → `rtk git status`, 60-90% d'économie).
Le hook `hooks/bash-pre-tool.cjs` ne gère plus que la réécriture Aureus
(`git commit` → `aureus commit`).

**Golden rule:** préfixer manuellement avec `rtk` les commandes non interceptées,
y compris dans les chaînes `&&` :
`rtk git add . && rtk git commit -m "msg"`

→ Référence complète: **@RTK.md** (importé en bas de fichier) | Stats: `rtk gain`

---

## Mémoire — ARGUS vs Wiki (frontière)

| Système | Rôle | Quand |
|---------|------|-------|
| **ARGUS** | Mémoire des résolutions (transactions) | `recall` avant exploration, `remember` après résolution |
| **Wiki `_wiki/`** | Connaissance durable (pages, conventions, protocole) | Décision/conviction documentée → page wiki |

Une résolution unique n'est enregistrée que dans ARGUS. Une convention réutilisable
que dans le wiki. Jamais les deux.

---

## Rules — rules/ (auto-chargées)

| Fichier | Sujet |
|---------|-------|
| `00-core.md` | Principes (Correctness > Completeness > Speed), méthodologie EPCT |
| `01-standards.md` | Quick Reference techniques (Search, TanStack, Zod, Oxfmt) |
| `02-conventions.md` | Git flow `TYPE: PROJECT - vX.Y.Z`, structure, naming, imports |
| `03-delete-first.md` | Simplifier avant d'ajouter — variant props, composition |
| `04-react-hooks-limits.md` | Server Components en priorité, limites useEffect/useMemo |
| `05-reusability.md` | Barrel exports, variant props, fonctions pures |
| `06-mcp-mandatory.md` | Workflows MCP (argus, git-flow, web-reader) |
| `07-pre-commit-gates.md` | Pipeline validation + gates E/B/R/P/S (bloquant) |
| `08-rust-workspace.md` | Structure workspace Rust full stack |
| `argus.md` | ARGUS — `recall` avant exploration, `remember` après résolution |

---

## Plugins (actifs)

| Plugin | Rôle |
|--------|------|
| **ponytail** | Lazy senior dev — review/audit/simplification `/ponytail-*` |
| **agent-skills** | 25 skills lifecycle — spec, TDD, review, security (`/spec`, `/plan`…) |
| **typescript-lsp / pyright-lsp / rust-analyzer-lsp** | Diagnostics compilateur directs |
| **smite / strike** | Subagents + patterns UI (Pamacea) |
| **context7, github, frontend-design, skill-creator** | Docs, GH, design, skills |

---

## Outils Pamacea (auto-actifs)

| Outil | Usage |
|-------|-------|
| **RTK.md** | Token savings (60-90%) — hook officiel auto-rewrite |
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

- **Quality Gates** → `rules/07-pre-commit-gates.md` (fusion quality-gates)
- **Git Flow** → `rules/02-conventions.md` (`TYPE: PROJECT - vX.Y.Z`, types: RELEASE/UPDATE/PATCH)
- **Architectures** → `rules/` (rust-workspace) | `skills/` (frameworks)

---

*Version: 6.2.0 | Reset config — purge skills/rules legacy, hook RTK officiel, plugins agent-skills + LSP, Graphify*

# graphify
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

@RTK.md
