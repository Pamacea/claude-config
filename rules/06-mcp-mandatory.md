# MCP Workflows Optimaux

> **Version:** 3.1.0 | Minimal Rules → Skills Auto-Activation

##  MCP Priority

| MCP / Outil | Usage | Trigger Keywords |
|-------------|-------|------------------|
| **argus** (MCP + CLI) | Memory recall/remember | "did we", "remember", avant exploration |
| **aureus** (hook) | Versioned commits | "commit", "release" |
| **chrome-devtools** | UI debugging | "screenshot", "debug UI" |
| **web-reader** | Docs | "read URL", "docs" |
| **context7** | Docs libs | "doc", "API", "library" |

---

##  Memory First (ARGUS)

```
Avant d'implémenter:
1. argus recall "<contexte>"
2. Check si solution existe
3. Utiliser l'approche existante

Après résolution:
1. argus remember "Fixed X by doing Y"
2. Inclure contexte + snippet
```

(Voir `rules/argus.md` — frontière ARGUS vs Wiki.)

---

##  Git Flow Format

```
TYPE: PROJECT - vX.Y.Z
- Change 1

Verification:
- cargo check: 
- cargo test: 
```

---

*Version: 3.1.0 | MCP Workflows (claude-mem → ARGUS)*
