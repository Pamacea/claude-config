# React Hooks Limits - Less is More

> **Version:** 1.0.0 | **Philosophy:** "Hooks are symptoms of client-side complexity"

---

## 🎯 CORE PRINCIPLE

**React hooks = Client-side complexity**
- Each hook adds mental overhead
- Each hook can cause bugs
- Each hook can be replaced by Server Components/Actions

**Goal:** Minimize hooks, maximize server-side rendering

---

## 📊 HOOK LIMITS

### useEffect

| Limit | Rule | Alternative |
|-------|------|-------------|
| **MAX 1 per component** | Count your effects | Server Components / Actions |
| **Data fetching** | ❌ NEVER | TanStack Query or Server Components |
| **DOM manipulation** | ❌ RARELY | refs or CSS |
| **Sync state** | ❌ AVOID | Derived state instead |

```typescript
// ❌ BAD - useEffect for data fetching
useEffect(() => {
  fetch('/api/posts').then(res => res.json()).then(setPosts)
}, [])

// ✅ GOOD - Server Component
export default async function PostsPage() {
  const posts = await fetch('/api/posts').then(r => r.json())
  return <PostList posts={posts} />
}

// ✅ VERY GOOD - TanStack Query (client-side only)
const { data: posts } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(r => r.json())
})
```

### useEffect Allowed Use Cases

**Only when:**
1. Browser APIs (localStorage, setInterval, addEventListener)
2. Third-party SDKs (Google Analytics, Stripe.js)
3. Complex animations (Framer Motion, GSAP)

**Even then, extract to custom hook:**

```typescript
// ✅ GOOD - Extracted hook
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) setValue(JSON.parse(stored))
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

---

### useMemo

| Rule | When to Use |
|------|-------------|
| **ONLY for expensive calculations** | Operations > 10ms |
| **Measure before optimizing** | Use React DevTools Profiler |
| **Default: DON'T use** | Premature optimization |

```typescript
// ❌ BAD - useMemo for simple operation
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`
}, [firstName, lastName])

// ✅ GOOD - Inline calculation
const fullName = `${firstName} ${lastName}`

// ✅ GOOD - useMemo for HEAVY computation
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => {
    // Complex sorting with multiple criteria
    return compareByPrice(a, b) || compareByRating(a, b)
  })
}, [products]) // Only if products.length > 1000
```

### useMemo Allowed Use Cases

**Only when:**
1. Large arrays (> 1000 items) with complex sorting/filtering
2. Expensive computations verified by Profiler
3. Reference equality needed for props

---

### useCallback

| Rule | When to Use |
|------|-------------|
| **ONLY when passed to child** | Memoized child component |
| **Prevents re-render** | Child is wrapped in React.memo |
| **Default: DON'T use** | Inline functions are fine |

```typescript
// ❌ BAD - useCallback unnecessarily
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])

// ✅ GOOD - Inline function
const handleClick = () => {
  console.log('clicked')
}

// ❌ BAD - useCallback without React.memo
const Parent = () => {
  const handleClick = useCallback(() => {}, [])
  return <Child onClick={handleClick} />
}

// ✅ GOOD - useCallback + React.memo
const Parent = () => {
  const handleClick = useCallback(() => {}, [])
  return <MemoChild onClick={handleClick} />
}

const MemoChild = React.memo(Child)
```

### useCallback Allowed Use Cases

**Only when:**
1. Passed to memoized child component
2. Used as dependency in another hook
3. Function is referenced by useEffect

---

## 🔄 HOOK ALTERNATIVES

### State: Server Components First

```typescript
// ❌ BAD - Client state for server data
const [posts, setPosts] = useState([])
useEffect(() => { /* fetch */ }, [])

// ✅ GOOD - Server Component
export default async function Page() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}
```

### State: Derived State

```typescript
// ❌ BAD - Synced state with useEffect
const [firstName, setFirstName] = useState('')
const [fullName, setFullName] = useState('')

useEffect(() => {
  setFullName(`${firstName} Doe`)
}, [firstName])

// ✅ GOOD - Derived state
const [firstName, setFirstName] = useState('')
const fullName = `${firstName} Doe`
```

### Side Effects: Server Actions

```typescript
// ❌ BAD - useEffect for mutation
useEffect(() => {
  if (shouldSave) {
    saveUser(user)
  }
}, [shouldSave, user])

// ✅ GOOD - Server Action
async function handleSave(formData: FormData) {
  'use server'
  await db.user.update({ /* ... */ })
}
```

---

## 📏 COMPONENT HOOK CHECKLIST

Before adding a hook, ask:

```markdown
- [ ] Can this be a Server Component instead?
- [ ] Can I use derived state instead of useState + useEffect?
- [ ] Can I use TanStack Query instead of useEffect + fetch?
- [ ] Is this useMemo actually necessary? (profile first)
- [ ] Is this useCallback passed to a memoized child?
- [ ] Can I extract this to a custom hook?
```

---

## 🎯 CUSTOM HOOKS RULES

### When to Create Custom Hooks

**Create when:**
- ✅ Same hook logic appears in 2+ components
- ✅ Hook logic is complex (> 10 lines)
- ✅ Hook has clear, single responsibility

**Examples:**

```typescript
// ✅ GOOD - Reusable localStorage hook
function useLocalStorage<T>(key: string, initial: T) {
  const [stored, setStored] = useState<T>(initial)
  // ... implementation
  return [stored, setStored] as const
}

// ✅ GOOD - Reusable media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    // ... listener
  }, [query])
  return matches
}

// ✅ GOOD - Reusable intersection observer
function useInView(ref: RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    // ... intersection observer
  }, [ref])
  return inView
}
```

---

## 📊 HOOK COUNT METRICS

### Healthy Component

```
Server Component: 0 hooks (ideal!)
Client Component: 1-3 hooks
Complex Component: 3-5 hooks (warning!)
 spaghetti Component: 5+ hooks (REFACTOR)
```

### When Hooks > 3

**Refactor options:**
1. Extract to custom hooks
2. Split component into smaller components
3. Move logic to Server Components/Actions
4. Use state machines (XState) for complex state

---

## 🎯 QUICK REFERENCE

```
useEffect
├─ ❌ Data fetching → Server Components / TanStack Query
├─ ❌ State sync → Derived state
├─ ✅ Browser APIs → Extract to custom hook
└─ ✅ Third-party SDKs → Extract to custom hook

useMemo
├─ ❌ Simple calculations → Inline
├─ ❌ Premature optimization → Profile first
└─ ✅ Heavy computations → Only after measuring

useCallback
├─ ❌ Not passed to child → Inline function
├─ ❌ Child not memoized → Inline function
└─ ✅ Memoized child → Use with React.memo
```

---

*Version: 1.0.0 | React Hooks Limits*
