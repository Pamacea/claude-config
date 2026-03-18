# React Hooks Standards

> **Version:** 3.0.0 | Minimal Rules → Skills Auto-Activation

## 🎯 Server Components Priority

**Goal:** 0-1 hooks par composant

```
Server Component:    0 hooks (idéal)
Client Component:    1-3 hooks (acceptable)
Complex:             3-5 hooks (attention)
Over-engineered:      5+ hooks (refactor!)
```

---

## 🎯 useEffect Guidelines

**Use for:**
- ✅ Browser APIs (localStorage, setInterval)
- ✅ Third-party SDKs (GA, Stripe.js)
- ✅ Animations (Framer Motion)

**NOT for:**
- ❌ Data fetching → Server Components / TanStack Query
- ❌ State sync → Derived state
- ❌ API calls → Server Actions

---

## 🎯 useMemo / useCallback

**useMemo:** Mesurer avec Profiler d'abord
**useCallback:** Seulement avec React.memo

---

**Voir aussi:** `react-hooks.skill`

*Version: 3.0.0 | React Hooks Standards*
