# Standards Techniques Positifs

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

Chaque standard technique est maintenant un **skill auto-activable** pour économiser les tokens.

---

## 🚀 Chargement Automatique

| Concept | Trigger → Skill |
|---------|----------------|
| **Best Practices** | "standards", "conventions", "best practices" → `technical-standards` |
| **Refactoring** | "refactor", "simplify", "delete code" → `delete-first` |
| **Réutilisation** | "reuse", "barrel export", "shared" → `reusability` |
| **React Hooks** | "useeffect", "usememo", "server component" → `react-hooks` |
| **Workflow** | "epct", "methodology", "how to implement" → `epct-methodology` |
| **MCP Tools** | "git commit", "screenshot", "debug UI" → `mcp-workflows` |
| **Git Format** | "commit format", "git flow" → `project-conventions` |
| **Quality** | "quality gate", "validation" → `quality-validation` |

---

## 📁 Skills Créés

### standards/ (Cat 4)
- `technical-standards.skill` - Search, Edit, Implementation, Testing
- `delete-first.skill` - Philosophy de simplification
- `reusability.skill` - Barrel exports, variant props, composition
- `react-hooks.skill` - useEffect, useMemo, useCallback standards
- `quality-validation.skill` - Quality gates par type de tâche

### workflows/ (Cat 3)
- `epct-methodology.skill` - Explore, Plan, Code, Test
- `mcp-workflows.skill` - claude-mem, git-flow, chrome-devtools

### conventions/ (Cat 2)
- `project-conventions.skill` - Git flow, file structure, naming

---

## ✅ Quick Reference

```
Search         → grepai search (jamais grep/glob direct)
Edit           → Read first, Edit with exact old_string
Server data    → TanStack Query (jamais useState pour data)
Data fetching  → Server Components (par défaut)
Type Safety    → Zod aux frontières (jamais any)
Testing        → Behavior, not implementation
```

---

## 📚 Voir Aussi

- `skills/INDEX.md` - Matrice d'activation complète
- `trigmem-core` - Méthodologie EPCT complète

---

*Version: 3.0.0 | Rules Minimal → Skills Auto-Activation*
