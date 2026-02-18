# Delete First Code Philosophy

> **Version:** 1.0.0 | **Motto:** "The best code is no code"

---

## 🎯 CORE PRINCIPLE

**Before adding ANY code, ask:**
1. Can I delete something instead?
2. Can I reuse something existing?
3. Can I simplify by removing?

---

## 📊 Decision Matrix

| ❌ NEVER | ✅ ALWAYS |
|---------|-----------|
| Add code without checking | Search for existing first |
| Duplicate code | Extract/reuse |
| Create new component | Compose existing ones |
| Add abstraction for 1 use | YAGNI - wait for 3+ uses |
| Wrap in function prematurely | Keep inline until repeated |
| Add "just in case" code | Add when actually needed |

---

## 🔍 DELETE BEFORE CREATE

### Step 1: Search Existing Code

```bash
# Before writing new functionality
/toolkit search "similar functionality"
grepai search "keyword related to task"
```

### Step 2: Evaluate Duplication

**Questions to ask:**
- Is there already a component that does 80% of this?
- Can I extend an existing utility instead of creating new?
- Is this a variation that could be a prop variant?

### Step 3: Delete or Simplify

**Examples:**

```typescript
// ❌ BAD - Creating new component
export function PrimaryButton({ children }: { children: ReactNode }) {
  return <button className="bg-blue-500">{children}</button>
}

export function SecondaryButton({ children }: { children: ReactNode }) {
  return <button className="bg-gray-500">{children}</button>
}

// ✅ GOOD - Single component with variant
export function Button({
  children,
  variant = "primary"
}: {
  children: ReactNode
  variant?: "primary" | "secondary"
}) {
  const classes = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500"
  }
  return <button className={classes[variant]}>{children}</button>
}
```

---

## 🧩 COMPOSITION > CREATION

### Prefer Component Composition

```typescript
// ❌ BAD - Monolithic component
export function UserCard() {
  return (
    <div className="card">
      <Avatar src={user.avatar} />
      <div className="info">
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
        <button>Follow</button>
      </div>
    </div>
  )
}

// ✅ GOOD - Composed from atoms
export function UserCard() {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserBio>{user.bio}</UserBio>
        <FollowButton userId={user.id} />
      </UserInfo>
    </Card>
  )
}
```

### Prefer Utility Functions

```typescript
// ❌ BAD - New function for simple operation
function formatUserDate(date: Date) {
  return date.toLocaleDateString('fr-FR')
}

// ✅ GOOD - Use existing or inline
date.toLocaleDateString('fr-FR')
// OR use existing utility
formatDate(date, 'fr-FR')
```

---

## 📦 ABSTRACTION RULES

### YAGNI (You Aren't Gonna Need It)

**Only create abstractions when:**
- ✅ Same code appears 3+ times
- ✅ Different parts of app need same behavior
- ✅ Test requires mocking shared logic

**Do NOT abstract when:**
- ❌ "Might need it later"
- ❌ "Could be useful someday"
- ❌ Single use case

### Abstraction Checklist

Before creating abstraction:
```markdown
- [ ] Code duplicated 3+ times?
- [ ] Cannot be solved with configuration?
- [ ] Cannot be solved with composition?
- [ ] Name is obvious and descriptive?
```

---

## 🎯 VARIANTS OVER DUPLICATES

### Use Variant Props

```typescript
// ❌ BAD - Multiple similar components
export function ErrorAlert({ message }: { message: string }) {
  return <div className="bg-red-500">{message}</div>
}

export function SuccessAlert({ message }: { message: string }) {
  return <div className="bg-green-500">{message}</div>
}

export function WarningAlert({ message }: { message: string }) {
  return <div className="bg-yellow-500">{message}</div>
}

// ✅ GOOD - Single component with variants
type AlertVariant = "error" | "success" | "warning"

export function Alert({
  variant = "error",
  message
}: {
  variant?: AlertVariant
  message: string
}) {
  const colors = {
    error: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-yellow-500"
  }
  return <div className={colors[variant]}>{message}</div>
}
```

---

## 🔄 REFACTORING WORKFLOW

### When You Find Duplicate Code

1. **Count occurrences** - Is it really duplicated?
2. **Extract** - Create reusable function/component
3. **Replace** - Replace ALL occurrences
4. **Delete original** - Remove old duplicated code
5. **Test** - Verify behavior unchanged

---

## 📏 MEASURING SUCCESS

**Good indicators:**
- Total lines of code decreasing
- Component count staying stable or decreasing
- Reuse percentage increasing
- Test coverage maintained

**Bad indicators:**
- Constant addition of new components
- Similar code in multiple files
- "Utils" folder with single-use functions

---

## 🎯 QUICK REFERENCE

```
Before adding code:
├─ Search existing (grepai search)
├─ Count occurrences
├─ Can I variant instead?
├─ Can I compose instead?
└─ Can I delete instead?

After finding duplicate:
├─ Extract to reusable
├─ Replace all occurrences
├─ Delete originals
└─ Test
```

---

*Version: 1.0.0 | Delete First Philosophy*
