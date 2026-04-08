# Next.js Patterns

**Type:** knowledge
**Summary:** Patterns and conventions for Next.js 16 development including server components, app router, SSR, and server actions.
**Tags:** #nextjs #frontend #react
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "server component", "app router", "ssr", "nextjs", "next.js"
> **Tags:** [nextjs, react, ssr, app-router, server-actions]
> **Related:** [tailwind-patterns], [tanstack-patterns], [typescript-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Building Next.js 16 applications
- Using App Router (app directory)
- Implementing Server Components
- Configuring Next.js
- Optimizing performance

**Progressive Disclosure:**
1. **Metadata** → Core concepts
2. **Instructions** → Common patterns
3. **Resources** → Advanced features

---

##  Quick Start

```bash
# Create Next.js app
npx create-next-app@latest my-app --typescript --tailwind --app

# Directory structure
app/
├── (routes)/      # File-based routing
├── layout.tsx     # Root layout
├── page.tsx       # Home page
└── globals.css    # Global styles
```

---

##  Quick Reference

| Concept | Pattern | Use Case |
|---------|---------|----------|
| **Server Component** | Default | Data fetching, security |
| **Client Component** | "use client" | Interactivity, state |
| **Server Action** | async function | Form handling |
| **Route Handler** | route.ts | API endpoints |

---

##  Core Concepts

### Server vs Client Components

```typescript
//  Server Component (default)
// Runs on server, can access database
async function UserList() {
  const users = await db.user.findMany();
  return <div>{users.map(u => <UserCard user={u} />)}</div>;
}

//  Client Component
// Runs in browser, can use hooks
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Server Actions

```typescript
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const data = schema.parse(Object.fromEntries(formData));
  await db.user.create({ data });
  revalidatePath('/users');
}
```

---

##  Implementation Patterns

### Pattern 1: Data Fetching with Server Components

```typescript
// app/users/page.tsx
import { db } from '@/lib/db';

export default async function UsersPage() {
  // Fetch data directly in component
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}
```

### Pattern 2: Streaming with Suspense

```typescript
// app/users/page.tsx
import { Suspense } from 'react';

export default async function UsersPage() {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}

// app/components/UserList.tsx
async function UserList() {
  const users = await fetchUsers();
  return <div>{/* ... */}</div>;
}
```

### Pattern 3: Form Handling with Server Actions

```typescript
// app/users/new/page.tsx
import { createUser } from '@/app/actions/users';

export default function NewUserPage() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

### Pattern 4: Dynamic Routes

```typescript
// app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) notFound();

  return <UserProfile user={user} />;
}
```

---

##  Quality Gates

### Validation Checklist

- [ ] Server Components used by default
- [ ] Client Components only when necessary
- [ ] Database calls in Server Components
- [ ] Proper error handling (notFound(), error())
- [ ] Revalidation after mutations

### Acceptance Criteria

- **Performance:** LCP < 2.5s, FID < 100ms
- **SEO:** Metadata on all pages
- **Accessibility:** Semantic HTML, ARIA labels
- **Type Safety:** Full TypeScript coverage

---

##  Troubleshooting

| Issue | Cause | Solution |
|-------|--------|----------|
| "use client" needed | Using hooks | Add 'use client' directive |
| hydration errors | Server/client mismatch | Use suppressHydrationWarning |
| Slow page | Blocking fetch | Use streaming/Suspense |
| Build fails | Type error | Check node_modules |

---

##  Best Practices

### Component Organization

```typescript
// app/layout.tsx - Root layout
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'My App Description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Route Handlers (API)

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const users = await db.user.findMany({
    where: {
      name: { contains: searchParams.get('q') || '' },
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await db.user.create({ data });
  return NextResponse.json(user, { status: 201 });
}
```

### Environment Variables

```typescript
// app/api/env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    // Server-only vars
    dbUrl: process.env.DATABASE_URL,
  });
}
```

---

##  Advanced Topics

### Parallel Routes

```typescript
// app/@team/layout.tsx
export default function TeamLayout({
  children,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {analytics}
    </div>
  );
}
```

### Intercepting Routes

```typescript
// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

### Partial Prerendering

```typescript
// app/products/[id]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { id: true } });
  return products.map(p => ({ id: p.id.toString() }));
}
```

---

##  Related Skills

- **Related:** `tailwind-patterns` - Styling
- **Related:** `tanstack-patterns` - Server state
- **Prerequisite:** `typescript-patterns` - Type safety

---

##  Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

---

##  Success Criteria

Implementation is complete when:
- [ ] Server Components used by default
- [ ] Client Components minimized
- [ ] SEO metadata on all pages
- [ ] Error boundaries in place
- [ ] Performance targets met

---

*Version: 1.0.0 | Next.js Patterns*
