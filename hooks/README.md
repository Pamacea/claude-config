# Git Hooks - Hooks Cross-Platform

> **Version:** 1.0.0 | Node.js Based Hooks
>
> Hooks Git cross-platform utilisant Node.js pour une compatibilité Windows/macOS/Linux.

---

## 📁 Structure

```
hooks/
├── README.md           # Ce fichier
└── pre-commit.cjs      # Hook pre-commit
```

---

## 🔧 pre-commit.cjs

Hook de validation automatique avant chaque commit.

### Fonctionnalités

- **Détection automatique** du type de projet
- **Rust** : `cargo check`, `cargo clippy`, `cargo fmt`, `cargo test`
- **TypeScript** : `typecheck`, `lint`
- **E2E** : `playwright test` (si config détectée)

### Installation

```bash
# Méthode 1: Copie directe
cp hooks/pre-commit.cjs .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Méthode 2: Husky (recommandé)
npm install -D husky
npx husky set .husky/pre-commit 'node hooks/pre-commit.cjs'
```

### Désactivation temporaire

```bash
git commit --no-verify -m "message"
```

---

## 📋 Sortie

```
🔍 Pre-commit validation pipeline...
==================================
📦 TypeScript project detected
  ▶ typecheck... ✅
  ▶ lint... ✅
✅ All validation gates passed!
==================================
```

---

*Version: 1.0.0 | Git Hooks*
