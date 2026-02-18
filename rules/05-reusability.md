# Reusability Rules - Write Once, Use Everywhere

> **Version:** 1.0.0 | **Motto:** "Code not reused is code wasted"

---

## 🎯 CORE PRINCIPLE

**Every piece of code should be reusable**
- Components: Composable, configurable
- Functions: Pure, generic
- Types: Shared, exported
- Utilities: Barrel exported

---

## 📦 BARREL EXPORTS

### Always Use index.ts

```typescript
// ❌ BAD - Scattered imports
import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import { Input } from '@/components/Input/Input'

// ✅ GOOD - Barrel exports
import { Button, Card, Input } from '@/ui'

// src/ui/index.ts
export { Button } from './atoms/Button'
export { Card } from './molecules/Card'
export { Input } from './atoms/Input'
```

### Barrel Structure

```
ui/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts          ← Export Button
│   ├── Input/
│   │   └── ...
│   └── index.ts              ← Re-export all atoms
├── molecules/
│   └── index.ts
└── index.ts                  ← Main barrel
```

---

## 🧩 COMPONENT REUSABILITY

### 1. Variant Props

```typescript
// ✅ GOOD - Single component with variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 2. Composition Slots

```typescript
// ✅ GOOD - Slot-based composition
export function Card({
  header,
  body,
  footer,
  children
}: CardProps) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      {body ? <div className="card-body">{body}</div> : children}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// Usage
<Card
  header={<h3>Title</h3>}
  footer={<Button>Action</Button>}
>
  <p>Content here</p>
</Card>
```

### 3. Polymorphic Components

```typescript
// ✅ GOOD - Render prop / as prop
export function Box({
  as = 'div',
  children,
  ...props
}: {
  as?: React.ElementType
  children?: React.ReactNode
}) {
  return React.createElement(as, props, children)
}

// Usage
<Box as="button" onClick={handleClick}>
  Click me
</Box>

<Box as="a" href="/about">
  About
</Box>
```

---

## 🔧 UTILITY REUSABILITY

### Pure Functions

```typescript
// ✅ GOOD - Pure, reusable utilities
// lib/utils/format.ts
export function formatCurrency(
  amount: number,
  currency = 'EUR',
  locale = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatDate(
  date: Date,
  format: 'short' | 'long' = 'short'
): string {
  // Implementation
}

export function truncate(
  str: string,
  maxLength: number
): string {
  return str.length > maxLength
    ? `${str.slice(0, maxLength)}...`
    : str
}
```

### Generic Utilities

```typescript
// ✅ GOOD - Generic, type-safe
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(array.length / size) },
    (_, i) => array.slice(i * size, i * size + size)
  )
}

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key])
    acc[group] = acc[group] ?? []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}
```

---

## 🎨 COMPOSITION OVER INHERITANCE

### Prefer Composition

```typescript
// ❌ BAD - Inheritance-style props spreading
export function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />
}

// ✅ GOOD - Just use Button with variant
<Button variant="primary">Click</Button>
<Button variant="secondary">Cancel</Button>
```

### Compound Components

```typescript
// ✅ GOOD - Compound pattern
export function Tabs({ defaultValue, children }: TabsProps) {
  const [active, setActive] = useState(defaultValue)

  return (
    <TabsContext value={{ active, setActive }}>
      {children}
    </TabsContext>
  )
}

Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>
}

Tabs.Trigger = function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { active, setActive } = useTabsContext()
  return (
    <button
      className={active === value ? 'active' : ''}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  )
}

Tabs.Content = function TabsContent({ value, children }: TabsContentProps) {
  const { active } = useTabsContext()
  if (active !== value) return null
  return <div className="tabs-content">{children}</div>
}

// Usage
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

---

## 📋 TYPE REUSABILITY

### Shared Types

```typescript
// ✅ GOOD - Centralized types
// types/api.ts
export interface ApiResponse<T> {
  data: T
  error: string | null
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface Entity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Usage
type UserResponse = ApiResponse<User>
type UsersResponse = PaginatedResponse<User>
```

### Generic Components

```typescript
// ✅ GOOD - Generic component
export function DataTable<T extends Entity>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={() => onRowClick?.(item)}>
            {columns.map((col) => (
              <td key={col.key}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Usage
<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Name', render: (u) => u.name },
    { key: 'email', label: 'Email', render: (u) => u.email }
  ]}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```

---

## 🔄 DRY - DON'T REPEAT YOURSELF

### Before Writing Code

```markdown
1. Search existing implementations
2. Check if utility exists
3. Check if component can be extended
4. Consider prop variants
```

### Extraction Patterns

```typescript
// ❌ BEFORE - Repeated logic
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false) })
      .catch(err => { setError(err); setLoading(false) })
  }, [])

  // ...
}

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(err => { setError(err); setLoading(false) })
  }, [])

  // ...
}

// ✅ AFTER - Reusable hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// Usage
const { data: users, loading, error } = useFetch<User[]>('/api/users')
const { data: posts } = useFetch<Post[]>('/api/posts')
```

---

## 📏 REUSABILITY CHECKLIST

Before creating new code:

```markdown
- [ ] Searched for existing implementation?
- [ ] Can I extend an existing component?
- [ ] Can I use variant props instead of new component?
- [ ] Can I extract to utility function?
- [ ] Is this generic enough for other use cases?
- [ ] Did I add barrel export?
```

---

## 🎯 QUICK REFERENCE

```
Components
├─ Use variant props for styling variations
├─ Use slots for flexible composition
├─ Use compound components for related elements
└─ Export via index.ts barrel

Utilities
├─ Pure functions (no side effects)
├─ Generic types for flexibility
├─ Single responsibility
└─ Group by feature in lib/

Types
├─ Shared types in types/ directory
├─ Generic components for reuse
├─ Export via index.ts barrel
└─ Use extends for shared base types

Before Creating
├─ Search existing code
├─ Extend rather than duplicate
├─ Extract common patterns
└─ Think about future use cases
```

---

*Version: 1.0.0 | Reusability Rules*
