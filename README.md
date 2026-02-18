# claude-config

> **Configuration optimisée pour Claude Code** | Version 2.0.0
> **Méthodologie:** TrigMem Enhanced + UX Design + MCP Integration

---

## 🎯 Quick Start

Installation de la configuration TrigMem pour Claude Code :

```bash
# Cloner ce repo
git clone https://github.com/Pamace/claude-config.git ~/.claude

# Les skills et rules sont automatiquement chargés par Claude Code
```

---

## ✨ Nouveautés v2.0

### 🎨 UX Design Patterns
- Philosophie **Atomic Design** (Atoms → Molecules → Organisms)
- **Accessibilité d'abord** - ARIA, keyboard navigation, WCAG AA
- **Animations performantes** - GPU only, prefers-reduced-motion
- **Anti-patterns** - Ne pas copier les tendances aveuglément

### 📖 Documentation Patterns
- README.md - 30-second hook
- GUIDE.md - Storytelling 5 minutes
- REFERENCE.md - Cheat sheet
- JSDoc/TSDoc pour le code

### 🔧 MCP Mandatory
- **claude-mem** - Mémoire persistante
- **git-flow-master** - Commits versionnés
- **chrome-devtools** - Debugging UI
- **z-ai** - Analyse images/vidéos

### 📏 Nouvelles Règles
- **Delete First** - Supprimer avant de créer
- **React Hooks Limits** - MAX 1 useEffect par composant
- **Réutilisabilité** - Barrel exports, composition
- **MCP Suggestions** - Suggestions fortes (pas bloquant)

---

## ✨ Fonctionnalités

### 🚀 Économie de Tokens

- **73% d'économie** par session grâce au chargement à la demande des patterns
- Rules essentielles : ~10k tokens (au lieu de ~30k)
- Patterns techniques : chargés uniquement quand nécessaire

### 📊 Organisation TrigMem

Les règles sont organisées selon les 6 catégories TrigMem :

| Catégorie | Contenu | Chargement |
|-----------|---------|------------|
| **Cat 1** | Identité Projet | Systématique |
| **Cat 2** | Structure Codebase | Systématique |
| **Cat 3** | Workflows Opérationnels | Systématique |
| **Cat 4** | Patterns Réutilisables | **À la demande** ⭐ |
| **Cat 5** | Guides Architecturales | Systématique |
| **Cat 6** | Corrections Itératives | Systématique |

### 🎚️ Patterns Disponibles

Les patterns techniques sont chargés **à la demande** selon les triggers :

| Pattern | Trigger | Commande |
|--------|---------|----------|
| **tech-decisions** | "Quel stack ?", "X ou Y ?" | `/skill patterns/tech-decisions` |
| **nextjs** | "Server Action", "RSC", "App Router" | `/skill patterns/nextjs` |
| **rust** | "Axum", "sqlx", "Tower middleware" | `/skill patterns/rust` |
| **nestjs** | "DTO", "JWT guard", "TypeORM" | `/skill patterns/nestjs` |
| **wasm** | "wasm-bindgen", "wasm-pack" | `/skill patterns/wasm` |
| **vite** | "vite config", "build" | `/skill patterns/vite` |
| **typescript** | "generic", "utility type" | `/skill patterns/typescript` |
| **tanstack** | "useQuery", "router", "form" | `/skill patterns/tanstack` |
| **tailwind** | "responsive", "dark mode" | `/skill patterns/tailwind` |
| **ux-design** | "component design", "accessibility" | `/skill patterns/ux-design` |
| **documentation** | "write docs", "README", "changelog" | `/skill patterns/documentation` |

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
│   │   ├── examples/
│   │   └── verification/  # NOUVEAU - Analyse sessions
│   ├── patterns/          # Patterns à la demande
│   │   ├── tech-decisions/
│   │   ├── nextjs/
│   │   ├── rust/
│   │   ├── nestjs/
│   │   ├── wasm/
│   │   ├── vite/
│   │   ├── typescript/
│   │   ├── tanstack/
│   │   ├── tailwind/
│   │   ├── ux-design/     # NOUVEAU - Atomic Design
│   │   └── documentation/ # NOUVEAU - Doc patterns
│   └── operations/        # NOUVEAU - MCP workflows
│       └── mcp-mandatory/
├── rules/                  # Règles essentielles
│   ├── 00-core.md
│   ├── 01-nevers.md
│   ├── 02-conventions.md
│   ├── 03-delete-first.md       # NOUVEAU
│   ├── 04-react-hooks-limits.md # NOUVEAU
│   ├── 05-reusability.md        # NOUVEAU
│   ├── 06-mcp-mandatory.md      # NOUVEAU
│   └── README.md
└── CLAUDE.md              # Identité du projet
```

---

## 📚 Documentation

- **[GUIDE.md](./GUIDE.md)** - Guide complet d'utilisation
- **[REFERENCE.md](./REFERENCE.md)** - Référence rapide
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique des versions

---

## 🔧 Utilisation

Les skills sont automatiquement chargés par Claude Code. Pour accéder à un pattern spécifique :

```
Dans Claude Code :

# Patterns techniques
/pattern nextjs     # Charge les patterns Next.js
/skill patterns/tanstack
/pattern ux-design  # Charge les patterns UX/Design
/pattern documentation  # Charge les patterns de doc

# TrigMem
/trigmem-core       # Concepts fondamentaux
/trigmem-categories # Classification
/trigmem-decision   # Guide de décision
/trigmem-storage    # Options de stockage
/trigmem-examples   # Exemples travaillés
/trigmem-verification # Analyse sessions

# Opérations MCP
/mcp-mandatory      # Checklist pour utiliser les MCPs
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un PR.

---

**Licence:** MIT | **Auteur:** YanisDev
