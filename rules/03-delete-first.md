# Delete First Philosophy

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🎯 Philosophie

**Avant d'ajouter, se demander:**
1. Puis-je supprimer à la place ?
2. Puis-je réutiliser l'existant ?
3. Puis-je simplifier ?

---

## 🔍 Search Before Create

```bash
# Toujours rechercher d'abord
grepai search "similar functionality"
```

---

## 🧩 Variant Props Pattern

```typescript
// ❌ Multiples composants
<PrimaryButton />
<SecondaryButton />

// ✅ Variant prop
<Button variant="primary" />
<Button variant="secondary" />
```

---

## 🔄 Composition > Creation

```typescript
// Composer depuis atomes existants
<Card>
  <Avatar />
  <UserInfo />
</Card>
```

---

**Voir aussi:** `delete-first.skill`

*Version: 3.0.0 | Delete First Philosophy*
