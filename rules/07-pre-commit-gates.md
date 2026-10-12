# Pre-Commit Gates

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## � Pipeline Obligatoire

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

##  Commit Format

```
TYPE: PROJECT - vX.Y.Z

- Change 1
- Change 2

Verification:
- cargo check: 
- cargo clippy: 
- cargo test: 
```

---

##  Gates par Type de Tâche

| Type | Gates |
|------|--------|
| Feature | E1-E5 complétés |
| Bug Fix | B1-B5 complétés |
| Refactor | R1-R5 complétés |
| Performance | P1-P5 complétés |
| Security | S1-S5 complétés |

### Universal Gates

- [ ] Code compiles
- [ ] Type checks pass
- [ ] Lint passes
- [ ] Tests pass
- [ ] No regressions

---

##  Checklist

- [ ] Lint OK
- [ ] Typecheck OK
- [ ] Format OK (oxfmt)
- [ ] Tests OK
- [ ] Pas de secrets
- [ ] Message au format TYPE: PROJECT

---

*Version: 3.1.0 | Pre-Commit Gates (fusion quality-gates)*
