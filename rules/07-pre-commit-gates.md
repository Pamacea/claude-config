# Pre-Commit Gates

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🚪 Pipeline Obligatoire

**Aucun commit sans validation complète.**

```
Rust:
┌─────────────────────────────────────────┐
│ cargo check → cargo clippy →           │
│ cargo fmt --check → cargo test           │
└─────────────────────────────────────────┘

TypeScript:
┌─────────────────────────────────────────┐
│ npm run typecheck → npm run lint →      │
│ oxfmt --check                            │
└─────────────────────────────────────────┘
```

---

## 📋 Commit Format

```
TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2

Verification:
- cargo check: ✅
- cargo clippy: ✅
- cargo test: ✅
```

---

## ✅ Checklist

- [ ] Lint OK
- [ ] Typecheck OK
- [ ] Format OK (oxfmt)
- [ ] Tests OK
- [ ] Pas de secrets
- [ ] Message au format TYPE: PROJECT

---

**Voir aussi:** `quality-validation.skill`

*Version: 3.0.0 | Pre-Commit Gates*
