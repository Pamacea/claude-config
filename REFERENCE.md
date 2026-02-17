# REFERENCE - Claude Config

> **Version:** 1.0.0 | Référence rapide

---

## 📁 Structure

```
.claude/
├── skills/
│   ├── trigmem/           # Système TrigMem
│   │   ├── core/
│   │   ├── categories/
│   │   ├── decisions/
│   │   ├── storage/
│   │   └── examples/
│   └── patterns/          # Patterns à la demande
├── rules/                  # Règles essentielles
└── CLAUDE.md              # Identité projet
```

---

## 🎯 Patterns Disponibles

| Pattern | Trigger | Commande |
|--------|---------|----------|
| tech-decisions | "Quel stack ?", "X ou Y ?" | `/skill patterns/tech-decisions` |
| nextjs | "Server Action", "RSC", "App Router" | `/skill patterns/nextjs` |
| rust | "Axum", "sqlx", "Tower" | `/skill patterns/rust` |
| nestjs | "DTO", "JWT", "TypeORM" | `/skill patterns/nestjs` |
| wasm | "wasm-bindgen", "wasm-pack" | `/skill patterns/wasm` |
| vite | "vite config", "build" | `/skill patterns/vite` |
| typescript | "generic", "utility type" | `/skill patterns/typescript` |
| tanstack | "useQuery", "router", "form" | `/skill patterns/tanstack` |
| tailwind | "responsive", "dark mode" | `/skill patterns/tailwind` |

---

## 🚀 Commands Utiles

```
/trigmem-core       # Principes fondamentaux
/trigmem-examples   # Exemples d'utilisation
/pattern <name>     # Charger un pattern
```

---

## 📋 Rules Essentielles

### 00-core.md
- Mission Claude Code
- Principes: Correctness > Completeness > Speed
- Méthodologie EPCT
- Plan Mode decision

### 01-nevers.md
- 40+ règles bloquantes
- Search & Navigation
- Code Editing
- Implementation patterns
- Testing, Git, Security

### 02-conventions.md
- Git Flow Master (TYPE: PROJECT - vX.Y.Z)
- Documentation convention
- Project structure (app/, ui/, features/, lib/)
- Import rules

---

## 🎯 Quick EPCT

| Type de Tâche | Approche |
|---------------|----------|
| Tiny Fix | CODE only |
| Small Feature | EXPLORE → CODE |
| Medium Feature | EPCT complet |
| Complex Feature | EPCT + Plan Mode |
| Architecture | Plan Mode → EPCT |

---

*Version: 1.0.0*
