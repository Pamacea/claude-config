# Conventions Projet

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🔄 Git Flow Master

```
TYPE: PROJECT - vX.Y.Z
- Change 1
- Change 2
```

| Type | SemVer | Usage |
|------|--------|-------|
| RELEASE | MAJOR | Breaking changes API |
| UPDATE | MINOR | Nouvelles fonctionnalités |
| PATCH | PATCH | Corrections de bugs |

---

## 📁 Structure Standard

```
src/
├── app/           # Routing only
├── features/      # Business logic
├── ui/            # Presentational components
└── lib/           # Shared utilities
```

---

## 📝 File Naming

- `PascalCase.tsx` → Components
- `camelCase.ts` → Hooks/Utils
- `UPPER_SNAKE_CASE.ts` → Constants

---

## 🎯 Import Rules

✅ **Forward:** Feature → UI → Lib
⚠️ **Backward:** UI → Features (éviter)

---

**Voir aussi:** `project-conventions.skill`

*Version: 3.0.0 | Project Conventions*
