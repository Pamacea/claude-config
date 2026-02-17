# Claude Config - Rules & Skills

> **Configuration complète pour Claude Code** - Rules, conventions, patterns et best practices

---

## 🚀 Quick Start

```bash
# Clone ou télécharge le projet
git clone <your-repo>
cd claude-config

# Lance le script d'installation
./install.sh        # Linux/Mac
# OU
.\install.ps1       # Windows PowerShell
```

**Le script installe automatiquement :**
- ✅ Les règles dans `~/.claude/rules/`
- ✅ Les skills dans `~/.claude/skills/`
- ✅ Le CLAUDE.md à la racine
- ✅ Les scripts de cleanup
- ✅ Le .gitignore pour exclure node_modules

---

## 📁 Structure du Projet

```
claude-config/
├── README.md              # Ce fichier
├── install.sh             # Script d'installation (Linux/Mac)
├── install.ps1            # Script d'installation (Windows)
├── cleanup.sh             # Script de cleanup
├── cleanup.ps1
│
├── rules/                 # Règles Claude Code (→ ~/.claude/rules/)
│   ├── README.md          # Guide des règles
│   ├── 00-core.md         # Principes, EPCT, mission
│   ├── 01-nevers.md       # 50+ règles bloquantes
│   ├── 02-conventions.md  # Git, Docs, Structure
│   ├── 03-tech-decisions.md  # Choix de stack
│   ├── 10-patterns-nextjs.md
│   ├── 11-patterns-rust-axum.md
│   ├── 12-patterns-nestjs.md
│   └── 13-patterns-wasm-rust.md
│
├── skills/                # Skills Claude Code (→ ~/.claude/skills/)
│   └── (vos skills personnalisés)
│
└── CLAUDE.md              # Configuration projet (→ ~/.claude/CLAUDE.md)
```

---

## 📋 Contenu des Règles

### 00-core.md - Fondamentaux

- Mission de Claude Code
- Principes : Correctness > Completeness > Speed
- Méthodologie EPCT (Explore, Plan, Code, Test)
- Quand utiliser Plan Mode
- Style de communication

### 01-nevers.md - Règles Bloquantes

50+ règles organisées par catégories :
- Search & Navigation
- Code Editing
- Implementation (React, State, TypeScript)
- Testing
- Git & Version Control
- Security
- Performance
- Communication
- Architecture
- Styling
- Tooling

### 02-conventions.md - Conventions

**Git Flow Master :**
- Format des commits : `TYPE: PROJECT - vX.Y.Z`
- Types : RELEASE, UPDATE, PATCH
- Checklist pre-commit
- Interface web (localhost:3747)

**Documentation Convention :**
- Dual-layout (README + GUIDE + REFERENCE)
- README.md : 30-second hook
- GUIDE.md : Storytelling deep dive

**Project Structure :**
- Architecture Clean (app/, ui/, features/, lib/)
- Feature module pattern
- Import rules

### 03-tech-decisions.md - Décisions Techniques

Matrices de décision pour :
- Frontend Framework (Next.js, TanStack Start, Vite, Angular)
- State Management (TanStack Query, Zustand, Redux)
- Backend (NestJS, Rust/Axum, Go)
- Database (PostgreSQL, MongoDB, SQLite)
- ORM (Prisma, Drizzle, sqlx)
- Testing (Vitest, Playwright)
- Deployment (Vercel, AWS, Docker)
- **WebAssembly** (Rust + wasm-bindgen)

### 10-patterns-nextjs.md - Next.js 16

Patterns complets avec exemples :
- Server vs Client Components
- Server Actions avec Zod
- Cache Components (`use cache`)
- TanStack Query integration
- Route handlers (webhooks)
- Performance (dynamic imports, images)
- Security (env vars, validation)
- Testing

### 11-patterns-rust-axum.md - Rust + Axum

Patterns détaillés :
- Project structure (DDD)
- Router setup
- Handlers & Extractors
- JWT Authentication
- Database avec SQLx
- Repository pattern
- Error handling
- WebSockets
- Testing

### 12-patterns-nestjs.md - NestJS

Patterns complets :
- Modules & Controllers
- Services & DTOs
- Guards & Strategies (JWT)
- Roles & Permissions
- TypeORM integration
- WebSockets (Socket.io)
- Scheduling tasks
- Testing

### 13-patterns-wasm-rust.md - WebAssembly

**NOUVEAU !** Patterns Rust + WebAssembly :
- Configuration wasm-bindgen
- Intégration avec Next.js
- Traitement d'images
- Parallel processing avec Rayon
- Game loops
- Cryptographie
- Optimisation WASM

---

## 🔧 Installation Manuelle

Si le script ne fonctionne pas, installation manuelle :

```bash
# 1. Copier les règles
cp -r rules/* ~/.claude/rules/

# 2. Copier les skills (si existants)
cp -r skills/* ~/.claude/skills/

# 3. Copier CLAUDE.md
cp CLAUDE.md ~/.claude/

# 4. Copier les scripts
cp cleanup.* ~/.claude/

# 5. Copier .gitignore (exclut node_modules)
cp .claudeignore ~/.claude/
```

---

## 🎯 Personnalisation

### Modifier les Règles

Les règles sont dans `rules/`. Modifiez-les selon vos besoins, puis relancez l'installation.

### Ajouter des Skills

Créez vos skills dans `skills/` :

```
skills/
└── my-skill/
    ├── skill.md
    └── (fichiers associés)
```

### CLAUDE.md Personnalisé

Éditez `CLAUDE.md` pour définir votre stack technique préférée :

```markdown
# Mon Projet

## Stack
- Frontend: Next.js 16, React 19
- Backend: Rust + Axum
- Database: PostgreSQL

## Conventions
...
```

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|-------|
| **Fichiers de règles** | 10 |
| **Lignes totales** | ~4,100 |
| **Taille** | ~150 KB |
| **Est. Tokens** | ~20K |
| **Réduction vs ancien** | 92% |

---

## 🔄 Mise à Jour

Pour mettre à jour votre configuration :

```bash
cd claude-config
git pull origin main

# Relancer l'installation
./install.sh        # ou install.ps1
```

---

## 🧹 Cleanup

Pour nettoyer les anciens fichiers :

```bash
# Linux/Mac
~/.claude/cleanup.sh

# Windows
~/.claude/cleanup.ps1
```

---

## 📚 Ressources

### Documentation Officielle

- **Claude Code:** https://github.com/anthropics/claude-code
- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **TanStack:** https://tanstack.com
- **Rust:** https://doc.rust-lang.org/
- **Axum:** https://docs.rs/axum/
- **NestJS:** https://docs.nestjs.com/

### Outils

- **grepai:** https://github.com/yoanbernabeu/grepai
- **SMITE:** https://github.com/Pamacea/smite
- **wasm-bindgen:** https://rustwasm.github.io/wasm-bindgen/

---

## 📝 Licence

MIT

---

**Version:** 5.0.0
**Dernière mise à jour:** 2025-02-17
