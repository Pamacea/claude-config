# Rules — Index

> **Version:** 3.1.0 | Standards techniques, chargés automatiquement

---

## Structure

```
rules/
├── README.md                # Ce fichier (index)
├── 00-core.md               # Principes + méthodologie EPCT
├── 01-standards.md          # Quick Reference standards
├── 02-conventions.md        # Git flow, structure, naming, imports
├── 03-delete-first.md       # Simplifier avant d'ajouter
├── 04-react-hooks-limits.md # Server Components, limites hooks
├── 05-reusability.md        # Réutilisation (barrel exports, variants)
├── 06-mcp-mandatory.md      # Workflows MCP
├── 07-pre-commit-gates.md   # Validation avant commit + gates par type de tâche
├── 08-rust-workspace.md     # Workspace Rust full stack
├── argus.md                 # ARGUS recall/remember + frontière ARGUS/Wiki
└── legacy/                  # Anciennes règles (référence uniquement)
```

---

## Contenu (résumé)

| Fichier | Sujet |
|---------|-------|
| `00-core.md` | Correctness > Completeness > Speed, EPCT, tableau de décision |
| `01-standards.md` | Quick Reference : Search, Edit, TanStack, Zod, Oxfmt, testing |
| `02-conventions.md` | `TYPE: PROJECT - vX.Y.Z`, structure `src/`, naming, imports |
| `03-delete-first.md` | Search before create, variant props, composition > création |
| `04-react-hooks-limits.md` | Server Components en priorité, useEffect limité |
| `05-reusability.md` | Barrel exports, fonctions pures, génériques |
| `06-mcp-mandatory.md` | Workflows MCP (argus, git-flow, web-reader) |
| `07-pre-commit-gates.md` | Pipeline commit + gates E/B/R/P/S (fusion quality-gates) |
| `08-rust-workspace.md` | Workspace : common/server/client/migrations |
| `argus.md` | `argus recall` avant exploration, `remember` après résolution |

---

## Notes

- **Fusion :** `quality-gates.md` absorbé par `07-pre-commit-gates.md` (v3.1.0).
- **Frontière mémoire :** ARGUS = résolutions (transactions) ; `_wiki/` = connaissance durable.
- **Skills patterns :** `../skills/INDEX.md` — chargés uniquement à la demande (suppression des `.skill` legacy et de TrigMem).
- **Hooks :** `../hooks/` — RTK (rewrite officiel + hook Aureus), PARRY (PostWrite lint), ARGUS (memory), Wiki (SessionStart).

---

*Version: 3.1.0 | Rules Index*
