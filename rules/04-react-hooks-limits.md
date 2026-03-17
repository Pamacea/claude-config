# React Hooks Standards - Server Components Priority

> **Version:** 2.0.0 | **Philosophy:** "Server-side first, hooks when needed"
>
> **Changement majeur:** Version basée sur des patterns Server Components
> recommandés et des alternatives positives, sans interdictions.

---

## 🎯 Core Principle

**Philosophie :** Les React hooks ajoutent de la complexité client-side.
- Chaque hook ajoute une charge mentale
- Chaque hook peut causer des bugs
- Chaque hook peut être remplacé par Server Components/Actions

**Goal :** Minimiser les hooks, maximiser le server-side rendering.

---

## 📊 Hook Usage Guidelines

### useEffect Priority

| Contexte | Approche Recommandée | Alternative |
|----------|---------------------|-------------|
| **Data fetching** | Server Components (par défaut) | TanStack Query pour interactivité |
| **DOM manipulation** | refs ou CSS | Éviter si possible |
| **State synchronization** | Derived state | Éviter useEffect |
| **Browser APIs** | Custom hook (extract) | localStorage, setInterval |
| **Third-party SDKs** | Custom hook (extract) | GA, Stripe.js |

### Pattern : Server Components Prioritaire

```typescript
// ✅ Server Component (par défaut pour data fetch)
export default async function PostsPage() {
  const posts = await fetch('/api/posts').then(r => r.json())
  return <PostList posts={posts} />
}

// ✅ TanStack Query (pour interactivité utilisateur)
const { data: posts } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(r => r.json())
})
```

---

## 🎯 useEffect - Usage Optimal

### Contextes Recommandés pour useEffect

**Utiliser useEffect pour :**
1. **Browser APIs** - localStorage, setInterval, addEventListener
2. **Third-party SDKs** - Google Analytics, Stripe.js
3. **Animations complexes** - Framer Motion, GSAP

### Pattern : Extraction vers Custom Hook

Même pour les cas valides, extraire vers un custom hook réutilisable :

```typescript
// ✅ Custom hook pour localStorage
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial)

  // Load from storage
  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) setValue(JSON.parse(stored))
  }, [key])

  // Save to storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

---

## 🎯 useMemo - Usage Optimal

### Quand Utiliser useMemo

**Utiliser pour :**
- ✅ Opérations coûteuses (> 10ms)
- ✅ Mesuré avec React DevTools Profiler
- ✅ Arrays larges (> 1000 items) avec tri/filtrage complexe
- ✅ Reference equality needed pour props

### Pattern : Inline par Défaut

```typescript
// ✅ Inline calculation (par défaut)
const fullName = `${firstName} ${lastName}`

// ✅ useMemo pour calculs lourds (mesuré avec Profiler)
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => {
    // Tri complexe avec multiples critères
    return compareByPrice(a, b) || compareByRating(a, b)
  })
}, [products]) // Seulement si products.length > 1000
```

---

## 🎯 useCallback - Usage Optimal

### Quand Utiliser useCallback

**Utiliser pour :**
- ✅ Passé à un composant enfant mémoisé (React.memo)
- ✅ Utilisé comme dépendance dans un autre hook
- ✅ Fonction référencée par useEffect

### Pattern : Inline Functions par Défaut

```typescript
// ✅ Inline function (par défaut)
const handleClick = () => {
  console.log('clicked')
}

// ✅ useCallback + React.memo (optimisation)
const Parent = () => {
  const handleClick = useCallback(() => {}, [])
  return <MemoChild onClick={handleClick} />
}

const MemoChild = React.memo(Child)
```

---

## 🔄 Alternatives aux Hooks - Patterns Serveur

### State: Server Components First

```typescript
// ✅ Server Component (par défaut)
export default async function Page() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}
```

### State: Derived State

```typescript
// ✅ Derived state (pas de useEffect pour sync)
const [firstName, setFirstName] = useState('')
const fullName = `${firstName} Doe`  // Calculé, pas sync
```

### Side Effects: Server Actions

```typescript
// ✅ Server Action pour mutations
async function handleSave(formData: FormData) {
  'use server'
  await db.user.update({ /* ... */ })
}
```

---

## 📏 Component Hook Checklist

### Avant d'Ajouter un Hook

```markdown
- [ ] Peut-être un Server Component à la place ?
- [ ] Derived state possible au lieu de useState + useEffect ?
- [ ] TanStack Query possible au lieu de useEffect + fetch ?
- [ ] useMemo nécessaire ? (profile first)
- [ ] useCallback passé à un composant mémoisé ?
- [ ] Peut extraire vers custom hook réutilisable ?
```

---

## 🎯 Custom Hooks Standards

### Quand Créer des Custom Hooks

**Créer quand :**
- ✅ Même logique de hook dans 2+ composants
- ✅ Logique de hook complexe (> 10 lignes)
- ✅ Hook a une responsabilité unique et claire

### Exemples de Custom Hooks Recommandés

```typescript
// ✅ Reusable localStorage hook
function useLocalStorage<T>(key: string, initial: T) {
  const [stored, setStored] = useState<T>(initial)
  // ... implementation
  return [stored, setStored] as const
}

// ✅ Reusable media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    // ... listener
  }, [query])
  return matches
}
```

---

## 📊 Hook Count Metrics

### Composant Sain

```
Server Component:    0 hooks (idéal !)
Client Component:    1-3 hooks (acceptable)
Complex Component:   3-5 hooks (attention requise)
Over-engineered:     5+ hooks (refactor nécessaire)
```

### Quand Hooks > 3

**Options de refactorisation :**
1. Extraire vers custom hooks
2. Diviser le composant en composants plus petits
3. Déplacer la logique vers Server Components/Actions
4. Utiliser state machines (XState) pour état complexe

---

## 🎯 Quick Reference

```
useEffect
├─ Server Components / TanStack Query (pour data)
├─ Derived state (pour sync state)
├─ Custom hook (pour browser APIs)
└─ Custom hook (pour third-party SDKs)

useMemo
├─ Inline calculation (par défaut)
├─ React DevTools Profiler (mesurer d'abord)
└─ Heavy computations seulement après mesure

useCallback
├─ Inline function (par défaut)
├─ Avec React.memo (pour optimisation)
└─ Dans dépendances d'autres hooks
```

---

## ✅ Quality Gates

### Hook Usage Gates

Un composant respecte les standards quand :
- [ ] 0-1 hooks par composant (Server Component si possible)
- [ ] Pas de useEffect pour data fetching
- [ ] Pas de state sync avec useEffect
- [ ] useMemo/useCallback justifiés (mesurés)
- [ ] Custom hooks extraits si réutilisés
- [ ] Hooks complexes divisés en plus simples

---

*Version: 2.0.0 | React Hooks Standards - Positive Approach*
