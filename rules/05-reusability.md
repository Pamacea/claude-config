# Reusability Standards - Write Once, Use Everywhere

> **Version:** 2.0.0 | **Motto:** "Code not reused is code wasted"
>
> **Changement majeur:** Version basée sur des patterns de réutilisation
> positifs et des guidelines de composition.

---

## 🎯 Core Principle

**Philosophie :** Chaque morceau de code devrait être réutilisable.

**Standards de réutilisabilité :**
- Components: Composables, configurables
- Functions: Pures, génériques
- Types: Partagés, exportés
- Utilities: Barrel exportés

---

## 📦 Barrel Exports

### Standard : Toujours Utiliser index.ts

```typescript
// ✅ Pattern recommandé : Barrel exports
import { Button, Card, Input } from '@/ui'

// src/ui/index.ts
export { Button } from './atoms/Button'
export { Card } from './molecules/Card'
export { Input } from './atoms/Input'
```

### Structure de Barrels Recommandée

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

## 🧩 Component Reusability Patterns

### Pattern 1 : Variant Props

Utiliser des variant props pour les variations visuelles :

```typescript
// ✅ Single component with variants
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

### Pattern 2 : Composition Slots

Utiliser des slots pour composition flexible :

```typescript
// ✅ Slot-based composition
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
```

### Pattern 3 : Polymorphic Components

Utiliser render prop / as prop pour flexibilité :

```typescript
// ✅ Render prop / as prop
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
```

---

## 🔧 Utility Reusability

### Pattern : Pure Functions

```typescript
// ✅ Pure, reusable utilities
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

export function truncate(
  str: string,
  maxLength: number
): string {
  return str.length > maxLength
    ? `${str.slice(0, maxLength)}...`
    : str
}
```

### Pattern : Generic Utilities

```typescript
// ✅ Generic, type-safe
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

## 🎨 Composition Over Inheritance

### Pattern : Composition de Props

```typescript
// ✅ Use Button with variant prop directly
<Button variant="primary">Click</Button>
<Button variant="secondary">Cancel</Button>
```

### Pattern : Compound Components

```typescript
// ✅ Compound pattern pour composants complexes
export function Tabs({ defaultValue, children }: TabsProps) {
  const [active, setActive] = useState(defaultValue)
  return <TabsContext value={{ active, setActive }}>{children}</TabsContext>
}

Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>
}

Tabs.Trigger = function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { active, setActive } = useTabsContext()
  return <button onClick={() => setActive(value)}>{children}</button>
}

Tabs.Content = function TabsContent({ value, children }: TabsContentProps) {
  const { active } = useTabsContext()
  if (active !== value) return null
  return <div className="tabs-content">{children}</div>
}
```

---

## 📋 Type Reusability

### Pattern : Types Partagés

```typescript
// ✅ Centralized types
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
```

### Pattern : Generic Components

```typescript
// ✅ Generic component
export function DataTable<T extends Entity>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  return (
    <table>
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
```

---

## 🔄 DRY - Patterns d'Extraction

### Workflow Avant Création

```markdown
1. Rechercher implémentations existantes
2. Vérifier si utilitaire existe
3. Vérifier si composant peut être étendu
4. Considérer variant props
```

### Pattern d'Extraction

```typescript
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
```

---

## 📏 Reusability Checklist

### Avant de Créer du Code

```markdown
- [ ] Recherché implémentation existante ?
- [ ] Peut étendre composant existant ?
- [ ] Peut utiliser variant props au lieu de nouveau composant ?
- [ ] Peut extraire vers fonction utilitaire ?
- [ ] Est assez générique pour autres cas d'usage ?
- [ ] Barrel export ajouté ?
```

---

## 🎯 Quick Reference

```
Components
├─ Variant props pour variations visuelles
├─ Slots pour composition flexible
├─ Compound components pour éléments liés
└─ Export via index.ts barrel

Utilities
├─ Pure functions (pas d'effets de bord)
├─ Generic types pour flexibilité
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

## ✅ Quality Gates

### Reusability Gates

Le code est réutilisable quand :
- [ ] Barrel exports en place pour les modules
- [ ] Variant props pour variations
- [ ] Composition slots pour flexibilité
- [ ] Types partagés exportés
- [ ] Fonctions pures et génériques
- [ ] Custom hooks pour logique dupliquée

---

*Version: 2.0.0 | Reusability Standards - Positive Approach*
