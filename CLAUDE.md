# CLAUDE CODE - CONFIG

> **Version:** 4.1.0 | **Méthodologie:** TrigMem v1.0

---

## 🎯 PROJECT IDENTITY

**claude-config** : Configuration optimisée pour Claude Code utilisant **TrigMem** v1.0 pour une gestion optimale des tokens (73% d'économie).

### Stack Technique
- **Frontend:** Next.js 16, React 19.2, TypeScript (strict)
- **State:** TanStack Suite (Router, Query, Form, Start)
- **Backend:** Prisma, Supabase, NestJS (occasionnel)
- **Testing:** Vitest, Playwright
- **Deployment:** Vercel

---

## 🚀 TRIGMEM v1.0

| Catégorie | Stockage | Contenu |
|-----------|----------|---------|
| Cat 1 | CLAUDE.md | Identité projet |
| Cat 2 | rules/02-conventions.md | Structure codebase |
| Cat 3 | CLAUDE.md | Workflows opérationnels |
| Cat 4 | skills/patterns/* | Patterns réutilisables |
| Cat 5 | rules/02-conventions.md | Guides architecturaux |
| Cat 6 | rules/01-nevers.md | Corrections itératives |

---

## 📖 QUICK START

```bash
npm install    # Dependencies
npm run dev    # Development
npm run test   # Tests
npm run build  # Production build
```

---

## 🔧 KEY WORKFLOWS

### Git Flow Master
```
TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2
```

Types: RELEASE (MAJOR), UPDATE (MINOR), PATCH (FIX)

### Testing
- `npm run test` → Vitest (unit)
- `npm run test:e2e` → Playwright (E2E)

---

## 📚 DOCUMENTATION

- `/trigmem-core` - Concepts fondamentaux TrigMem
- `/pattern [name]` - Charger un pattern technique
- `GUIDE.md` - Guide complet d'utilisation
- `REFERENCE.md` - Cheat sheet rapide

---

*Version: 4.1.0 | TrigMem Enhanced*
