# MCP Workflows Optimaux

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🎯 MCP Priority

| MCP | Usage | Trigger Keywords |
|-----|-------|------------------|
| **claude-mem** | Memory reuse | "did we", "remember" |
| **git-flow-master** | Versioned commits | "commit", "release" |
| **chrome-devtools** | UI debugging | "screenshot", "debug UI" |
| **web-reader** | Docs | "read URL", "docs" |

---

## 🧠 Memory First

```
Avant d'implémenter:
1. Search claude-mem
2. Check si solution existe
3. Utiliser l'approche existante

Après résolution:
1. Sauver dans claude-mem
2. Inclure contexte + snippet
```

---

## 🔄 Git Flow Format

```
TYPE: PROJECT - vX.Y.Z
- Change 1

Verification:
- cargo check: ✅
- cargo test: ✅
```

---

**Voir aussi:** `mcp-workflows.skill`

*Version: 3.0.0 | MCP Workflows*
