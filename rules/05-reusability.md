# Reusability Standards

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🎯 Core Principle

**Code not reused is code wasted.**

---

## 📦 Barrel Exports

```typescript
// index.ts
export { Button } from './atoms/Button'
export { Card } from './molecules/Card'
```

---

## 🧩 Variant Props

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger'

export function Button({ variant, ... }) {
  // Single component, variants
}
```

---

## 🔧 Pure Functions

```typescript
// Generic, reusable utilities
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) },
    (_, i) => array.slice(i * size, i * size + size)
  )
}
```

---

## 📋 Checklist

- [ ] Researché existing?
- [ ] Can extend vs create new?
- [ ] Barrel export added?
- [ ] Generic where possible?

---

**Voir aussi:** `reusability.skill`

*Version: 3.0.0 | Reusability Standards*
