# Rules — Index

> **Version:** 3.0.0 | Standards techniques positifs, chargés automatiquement

---

## Structure

```
rules/
├── README.md                # Ce fichier (index)
├── 00-core.md               # Principes + méthodologie EPCT
├── 01-standards.md          # Standards techniques positifs
├── 02-conventions.md        # Git flow, structure, naming, imports
├── 03-delete-first.md       # Simplifier avant d'ajouter
├── 04-react-hooks-limits.md # Server Components, limites hooks
├── 05-reusability.md        # Réutilisation (barrel exports, variants)
├── 06-mcp-mandatory.md      # Workflows MCP
├── 07-pre-commit-gates.md   # Validation avant commit (bloquant)
├── 08-rust-workspace.md     # Workspace Rust full stack
├── quality-gates.md         # Critères de validation par type de tâche
├── argus.md                 # ARGUS recall/remember (obligatoire)
└── legacy/                  # Anciennes règles (référence uniquement)
```

---

## Contenu (résumé)

| Fichier | Sujet |
|---------|-------|
| `00-core.md` | Correctness > Completeness > Speed, EPCT, tableau de décision |
| `01-standards.md` | Search, Edit, React, TypeScript, testing, git, sécurité, perf |
| `02-conventions.md` | `TYPE: PROJECT - vX.Y.Z`, structure `src/`, naming, imports |
| `03-delete-first.md` | Search before create, variant props, composition > création |
| `04-react-hooks-limits.md` | Server Components en priorité, useEffect limité |
| `05-reusability.md` | Barrel exports, fonctions pures, génériques |
| `06-mcp-mandatory.md` | claude-mem, git-flow, dev-browser, web-reader |
| `07-pre-commit-gates.md` | check → clippy → fmt → test (Rust) / typecheck → lint (TS) |
| `08-rust-workspace.md` | Workspace : common/server/client/migrations |
| `quality-gates.md` | Gates E/B/R/P/S par type de tâche + universels |
| `argus.md` | `argus recall` avant exploration, `remember` après résolution |

---

## Notes

- **Migration terminée :** `01-nevers.md` (approche négative) → `01-standards.md` (positif). Copie historique dans `legacy/`.
- **Skills patterns :** `../skills/INDEX.md` — chargés uniquement à la demande.
- **Hooks :** `../hooks/` — RTK (auto-rewrite), PARRY (PostWrite lint), ARGUS (memory).

---

*Version: 3.0.0 | Rules Index*
