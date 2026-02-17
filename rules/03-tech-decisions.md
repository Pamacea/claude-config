# Tech Stack Decisions & Selection

> **Version:** 5.0.0 | **Choose the right tools for the job**

---

## 🎯 Decision Matrix Quick Reference

| Requirement | Stack | When to Use |
|-------------|-------|-------------|
| **Full-stack SSR app** | Next.js 16 + Prisma + Vercel | SSR/SSG needed, Vercel deploy |
| **Type-safe SPA** | TanStack Start + Query/Router/Form | 100% type-safe routing |
| **High-performance API** | Rust + Axum + PostgreSQL | Max performance, type safety |
| **Simple prototype** | Vite + React + Zustand + Supabase | Quick MVP, minimal setup |
| **Enterprise app** | Next.js + Drizzle + PostgreSQL + AWS | Complex requirements, control |
| **Real-time app** | NestJS + Socket.io + Redis | WebSockets, complex backend |
| **SaaS platform** | Next.js + Stripe + Prisma + Vercel | Subscription, payments |
| **WASM app** | Rust + Axum + WebAssembly (wasm-bindgen) | High-performance compute in browser |

---

## 🖥️ Frontend Framework Decision

### Next.js 16

**Use when:**
- ✅ SSR/SSG/ISR needed
- ✅ Vercel deployment
- ✅ Server Components (RSC)
- ✅ Built-in API routes (webhooks only)
- ✅ File-based routing

**Key Features:**
- App Router + RSC
- Cache Components (`use cache`)
- Tag-based invalidation (`revalidateTag`)
- Turbopack default in production
- React 19.2 support

**Avoid when:**
- ❌ 100% type-safe routing needed → Use TanStack Start
- ❌ Need framework-agnostic → Use Vite

### TanStack Start

**Use when:**
- ✅ 100% type-safe routing everywhere
- ✅ Advanced data loading
- ✅ TanStack ecosystem (Query/Router/Form)
- ✅ Framework-agnostic deployment

**Key Features:**
- File-based + code-based routing
- Type-safe search params
- Type-safe loaders
- Integrated with TanStack Query

### Vite + React

**Use when:**
- ✅ SPA only (no SSR)
- ✅ Maximum flexibility
- ✅ Custom backend (Rust, Go)
- ✅ Fastest build times

**Avoid when:**
- ❌ SSR needed → Use Next.js
- ❌ Built-in backend → Use Next.js

### Angular

**Use when:**
- ✅ Enterprise apps with large teams
- ✅ Full-framework ecosystem needed
- ✅ TypeScript-first
- ✅ Structured dependency injection

**Avoid when:**
- ❌ Small projects → Overkill
- ❌ Quick prototype → Slower DX

---

## 📦 State Management Decision

```
Server Data  → TanStack Query (ALWAYS)
Form State   → TanStack Form or React Hook Form
UI State     → Zustand
URL State    → Framework router
Server State → Server Components (no client state)
```

### TanStack Query

**Use for:**
- ✅ Server data fetching
- ✅ Caching
- ✅ Background refetch
- ✅ Optimistic updates
- ✅ Pagination/infinite scroll

**Example:**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPosts(page),
  staleTime: 5 * 60 * 1000, // 5 min
})
```

### Zustand

**Use for:**
- ✅ UI state (modals, sidebars, themes)
- ✅ Client-side cache
- ✅ Simple global state
- ✅ Form state (small forms)

**Avoid for:**
- ❌ Server data → Use TanStack Query
- ❌ Complex time-travel → Use Redux Toolkit

**Example:**
```typescript
const useStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}))
```

### Redux Toolkit

**Use for:**
- ✅ Large-scale apps
- ✅ Time-travel debugging needed
- ✅ Complex state relationships
- ✅ Middleware required

**Avoid for:**
- ❌ Simple apps → Overkill

---

## 🔧 Backend Decision

### Node.js + NestJS

**Use when:**
- ✅ Team knows JavaScript/TypeScript
- ✅ Quick prototyping
- ✅ I/O-bound operations
- ✅ Microservices architecture
- ✅ Real-time (WebSocket)
- ✅ Structured, enterprise-style framework

**NestJS Features:**
- TypeScript-first
- Dependency injection
- Modules architecture
- Built-in validation (class-validator)
- Guards, interceptors, pipes
- Excellent for large teams

**Example Structure:**
```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   └── users/
├── common/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
└── main.ts
```

### Rust + Axum

**Use when:**
- ✅ Maximum performance
- ✅ Complex business logic (DDD)
- ✅ Memory constraints
- ✅ Type safety critical
- ✅ Zero-cost abstractions

**Axum Features:**
- Ergonomic router
- Extractor system
- Tower middleware
- Async/await first
- Memory safe

**Example:**
```rust
use axum::{Json, Router};
use serde::Deserialize;

#[derive(Deserialize)]
struct CreateUser {
    name: String,
}

async fn create_user(Json(payload): Json<CreateUser>) -> Json<User> {
    // Create user
    Json(user)
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/users", post(create_user));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

### Go

**Use when:**
- ✅ High concurrency needs
- ✅ Simple, fast services
- ✅ Team knows Go
- ✅ Cloud-native apps
- ✅ Standard library preference

---

## 🗄️ Database Decision

### PostgreSQL

**Use when:**
- ✅ Complex relations
- ✅ Full-text search needed
- ✅ ACID transactions required
- ✅ JSONB flexibility useful
- ✅ Geospatial data (PostGIS)

**Best ORM:** Prisma or Drizzle

### MySQL

**Use when:**
- ✅ Existing MySQL infrastructure
- ✅ Simpler needs
- ✅ Team familiarity

### MongoDB

**Use when:**
- ✅ Flexible schema required
- ✅ Document-based data model
- ✅ Horizontal scaling priority
- ✅ JSON-heavy data

**Avoid when:**
- ❌ Complex relations → Use PostgreSQL
- ❌ ACID critical → Use PostgreSQL

### SQLite

**Use when:**
- ✅ Embedded database needed
- ✅ Simple data model
- ✅ Single-instance app
- ✅ Testing/local development

---

## 🔌 ORM Decision

### Prisma

**Use when:**
- ✅ Type safety critical
- ✅ Schema migrations needed
- ✅ Complex relations
- ✅ TypeScript project
- ✅ Great DX required

**Example:**
```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { posts: true }
})
```

### Drizzle

**Use when:**
- ✅ SQL-like API needed
- ✅ Smaller bundle size
- ✅ No migrations needed
- ✅ Performance critical
- ✅ Maximum type safety

**Example:**
```typescript
const user = await db.select().from(users).where(eq(users.id, userId))
```

### sqlx (Rust)

**Use when:**
- ✅ Compile-time verification
- ✅ Raw SQL performance
- ✅ Rust project
- ✅ No ORM overhead

**Example:**
```rust
let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
    .bind(user_id)
    .fetch_one(&pool)
    .await?;
```

---

## 🧪 Testing Decision

```
Unit/Integration → Vitest (fast, native ESM)
E2E              → Playwright (cross-browser, fast)
Visual Regression → Chromatic or Percy
Load Testing      → k6 or Artillery
```

### Vitest

**Use when:**
- ✅ Unit tests
- ✅ Integration tests
- ✅ Fast feedback needed
- ✅ Vite project

**Example:**
```typescript
import { describe, it, expect } from 'vitest'
import { add } from './math'

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

### Playwright

**Use when:**
- ✅ E2E tests
- ✅ Cross-browser testing
- ✅ User flow testing

---

## 🚀 Deployment Decision

### Vercel

**Use when:**
- ✅ Next.js project
- ✅ Zero-config deployment
- ✅ Edge functions needed
- ✅ Preview deployments
- ✅ Automatic HTTPS

### AWS

**Use when:**
- ✅ Existing AWS infrastructure
- ✅ Full control needed
- ✅ Complex requirements
- ✅ Cost optimization at scale
- ✅ Multi-region

### Docker

**Use when:**
- ✅ Consistency across environments
- ✅ Self-hosted
- ✅ Microservices
- ✅ On-premise deployment

---

## 🌐 Real-Time Decision

### WebSockets

| Solution | Use When |
|----------|----------|
| **Socket.io** | Node.js, fallbacks needed |
| **ws** | Node.js, simple WebSockets |
| **Socketize** | Rust, Axum |
| **SignalR** | .NET backend |

### Server-Sent Events (SSE)

**Use when:**
- ✅ One-way communication (server → client)
- ✅ Simpler than WebSockets
- ✅ Auto-reconnect needed

---

## 📦 API Decision

### REST

**Use when:**
- ✅ Standard CRUD operations
- ✅ Simple caching (HTTP)
- ✅ Stateless

### GraphQL

**Use when:**
- ✅ Complex data relationships
- ✅ Multiple clients with different needs
- ✅ Flexible queries needed

### tRPC

**Use when:**
- ✅ TypeScript end-to-end
- ✅ Next.js full-stack
- ✅ No schema duplication

---

## 🎨 Styling Decision

| Solution | Use When |
|----------|----------|
| **Tailwind CSS** | Utility-first, rapid UI dev |
| **CSS Modules** | Component-scoped, traditional |
| **Styled Components** | CSS-in-JS, React |
| **shadcn/ui** | Copy-paste, Radix primitives |

---

## 🔐 Authentication Decision

| Solution | Use When |
|----------|----------|
| **NextAuth.js** | Next.js, OAuth providers |
| **Clerk** | Drop-in auth, great UX |
| **Lucia** | Framework-agnostic, lightweight |
| **Supabase Auth** | Supabase ecosystem |

---

## ⚡ WebAssembly Decision

### When to Use WebAssembly

| Use Case | Stack | Why |
|----------|-------|-----|
| **High-performance compute** | Rust + wasm-bindgen | Near-native speed |
| **Image/Video processing** | Rust + WASM + Workers | Offload main thread |
| **Cryptography** | Rust + WASM | Secure, fast |
| **Games/Physics** | Rust + WASM | Performance critical |
| **Data visualization** | Rust + WASM | Large dataset processing |
| **Audio processing** | Rust + WASM | Real-time processing |

### Rust + WebAssembly Stack

```
Frontend (React/Next.js)
    ↓ (loads WASM module)
Rust (compiled to WASM)
    ↓ (wasm-bindgen)
Browser (high-performance)
```

**Tools:**
- `wasm-pack` - Build Rust WASM packages
- `wasm-bindgen` - JS/Rust interop
- `js-sys` - Web API bindings
- `web-sys` - DOM bindings

**Target Size:**
- Optimize with `wasm-opt` (Binaryen)
- Use `wasm-gc` to remove unused code
- Enable LTO in Cargo

### When NOT to Use WASM

❌ **Avoid for:**
- Simple DOM manipulation → JS is fine
- Basic CRUD → No performance gain
- Small apps → Overhead of WASM > benefits
- Team doesn't know Rust → Learning curve

### WASM + Server-Side Rendering

**Pattern: Next.js + Rust WASM**

```typescript
// app/page.tsx
import dynamic from 'next/dynamic'

const WasmComponent = dynamic(
  () => import('@/components/WasmComponent'),
  { ssr: false, loading: () => <p>Loading...</p> }
)

export default function Page() {
  return <WasmComponent />
}
```

---

## Version Checklist

For post-2024 libraries:
1. ✅ Web search official docs
2. ✅ Check breaking changes
3. ✅ Read migration guide
4. ✅ Test in isolation

---

*Version: 5.0.0*
