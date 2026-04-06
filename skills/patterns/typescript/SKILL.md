# TypeScript Patterns

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "generic type", "utility type", "interface ts", "typescript", "type inference"
> **Tags:** [typescript, types, generics, utility-types, interfaces]
> **Related:** [nextjs-patterns], [tanstack-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Working with TypeScript generic types
- Creating utility types or type manipulations
- Defining interfaces for complex data structures
- Debugging type errors
- Using advanced TypeScript features

**Progressive Disclosure:**
1. **Metadata** → Type system fundamentals
2. **Instructions** → Common patterns and best practices
3. **Resources** → Advanced type manipulation

---

##  Quick Start

```typescript
// 1. Prefer interfaces for objects, types for unions
interface User { id: number; name: string }
type Status = "pending" | "active" | "inactive"

// 2. Use generics for reusable components
function identity<T>(arg: T): T { return arg; }

// 3. Utility types for transformations
type PartialUser = Partial<User>;
type UserKeys = keyof User;
```

---

##  Quick Reference

| Concept | Pattern | Use Case |
|---------|---------|----------|
| **Interface vs Type** | Interface = objects, Type = unions | Shape definitions |
| **Generics** | `<T>` parameter | Reusable functions/components |
| **Utility Types** | `Partial<T>`, `Pick<T>` | Type transformations |
| **Type Guards** | `isX(value): value is X` | Narrowing types |
| **Branded Types** | `type T = string & { __brand: B }` | Type safety |

---

##  Core Concepts

### Interface vs Type

**When to use Interface:**
-  Defining object shapes
-  Extending existing types
-  Class implementations

**When to use Type:**
-  Unions (`A | B`)
-  Intersections (`A & B`)
-  Utility types
-  Mapped types

```typescript
//  Interface for objects
interface User {
  id: number;
  name: string;
  email: string;
}

//  Type for unions and utilities
type Status = "pending" | "active" | "inactive";
type UserUpdate = Partial<User>;
type UserId = User["id"]; // Indexed access
```

### Generics

**What:** Type parameters that make components reusable

```typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Generic with constraints
function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}

// Generic class
class Box<T> {
  constructor(private value: T) {}
  get(): T { return this.value; }
}
```

### Utility Types

**Built-in utilities to know:**

```typescript
// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<Partial<User>>;

// Pick - subset of properties
type UserDTO = Pick<User, "id" | "name">;

// Omit - exclude properties
type CreateUser = Omit<User, "id">;

// Record - object with specific keys
type UserMap = Record<string, User>;

// ReturnType - extract return type
type FnReturn = ReturnType<typeof fn>;

// Parameters - extract parameter types
type FnParams = Parameters<typeof fn>;
```

---

##  Implementation Patterns

### Pattern 1: Branded Types for Type Safety

**Purpose:** Prevent mixing values of the same primitive type

```typescript
// Brand primitive types
type UserId = string & { __brand: "UserId" };
type Email = string & { __brand: "Email" };

// Constructor functions
const UserId = (id: string): UserId => id as UserId;
const Email = (email: string): Email => email as Email;

// Usage - types are incompatible
function getUser(id: UserId) { /* ... */ */
}

const id = UserId("abc");
const email = Email("test@test.com");

getUser(id);    //  OK
getUser(email); //  Type error
```

### Pattern 2: Type Guards for Narrowing

**Purpose:** Narrow union types safely

```typescript
// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

// Type guard
function isCircle(shape: Shape): shape is { kind: "circle"; radius: number } {
  return shape.kind === "circle";
}

// Type predicate in function signature
function area(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  // TypeScript knows shape is not circle here
}
```

### Pattern 3: Template Literal Types

**Purpose:** Type string values precisely

```typescript
// Event naming convention
type EventName<T extends string> = `on${Capitalize<T>}Changed`;

type UserEvents = EventName<"name" | "email">;
// "onNameChanged" | "onEmailChanged"

// CSS properties
type CssProperty = `margin-${"top" | "bottom" | "left" | "right"}`;
```

---

##  Quality Gates

### Validation Checklist

- [ ] No `any` types used (except deliberate escape hatches)
- [ ] Generic types have proper constraints
- [ ] Type guards use `value is Type` predicates
- [ ] Utility types reduce duplication
- [ ] Index signatures avoided (use `Record` instead)

### Acceptance Criteria

- **Type Safety:** All paths type-checked without casts
- **Reusability:** Generics used for repeated patterns
- **Maintainability:** Types inferable where possible

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| "Property does not exist" | Missing type assertion | Use type guard or branded type |
| "Type is not assignable" | Union too wide | Narrow with discriminators |
| "Cannot use 'in' operator" | Not a union of object types | Add kind/shape discriminator |
| "Circular reference" | Recursive type | Use interface, not type |

---

##  Best Practices

### Strict Mode Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

### Type First Development

1. **Define types first** before implementation
2. **Use types as documentation** - self-documenting code
3. **Let types drive errors** - fail fast at compile time

### Avoid These Patterns

```typescript
//  DON'T: Type assertions
const user = data as User;

//  DO: Type guards
if (isUser(data)) { use(data); }

//  DON'T: any
function process(data: any) { }

//  DO: Generics
function process<T>(data: T): T { }

//  DON'T: Index signatures
interface Dict { [key: string]: any }

//  DO: Record with specific type
interface Dict { [key: string]: string }
```

---

##  Advanced Topics

### Conditional Types

```typescript
// NonNullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Extract type from array
type ElementType<T> = T extends (infer U)[] ? U : never;

// Function return type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

### Mapped Types

```typescript
// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Make all properties optional
type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Template for transformations
type Modifiers<T> = {
  [P in keyof T as `${Prefix}_${P & string}`]: T[P];
};
```

---

##  Related Skills

- **Prerequisite:** None - foundational skill
- **Related:** `nextjs-patterns` - TypeScript in Next.js
- **Complementary:** `tailwind-patterns` - Type-safe class names

---

##  Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Utility Types Reference](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

##  Success Criteria

Implementation is complete when:
- [ ] Zero `any` types (except deliberate escape)
- [ ] All generics properly constrained
- [ ] Type guards use predicates
- [ ] Types inferable without explicit annotation
- [ ] Strict mode configuration enabled

---

*Version: 1.0.0 | TypeScript Patterns*
