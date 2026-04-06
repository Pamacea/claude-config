# TanStack Patterns

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "usequery", "usemutation", "tanstack query", "react query", "tanstack form"
> **Tags:** [tanstack, react-query, state-management, server-state, forms]
> **Related:** [nextjs-patterns], [typescript-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Using TanStack Query for server state
- Implementing mutations with useMutation
- Building forms with TanStack Form
- Managing cache and invalidation
- Optimistic updates

**Progressive Disclosure:**
1. **Metadata** → Core hooks
2. **Instructions** → Common patterns
3. **Resources** → Advanced configurations

---

##  Quick Start

```typescript
// 1. Query for fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});

// 2. Mutation for updates
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
});

// 3. Form handling
const form = useForm({
  defaultValues: { name: '', email: '' },
  onSubmit: async (values) => mutation.mutateAsync(values),
});
```

---

##  Quick Reference

| Hook | Purpose | Use Case |
|------|---------|----------|
| **useQuery** | Fetch data | Server state, caching |
| **useInfiniteQuery** | Paginated data | Infinite scroll, load more |
| **useMutation** | Server writes | POST, PUT, DELETE |
| **useQueryClient** | Cache manipulation | Invalidation, updates |

---

##  Core Concepts

### Query Key Factory

**What:** Typed, hierarchical cache keys

```typescript
// keys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },
};

// Usage
useQuery({ queryKey: queryKeys.users.detail(id), queryFn: () => fetchUser(id) });
```

### Query Invalidation

**Purpose:** Keep cache fresh after mutations

```typescript
// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate any matching query
queryClient.invalidateQueries({ 
  predicate: (query) => query.queryKey[0] === 'users' 
});

// Refetch after mutation
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

---

##  Implementation Patterns

### Pattern 1: Optimistic Updates

**Purpose:** Update UI immediately, rollback on error

```typescript
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel in-flight queries
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(['todos']);
    
    // Optimistically update
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    
    return { previous };
  },
  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previous);
  },
  onSettled: () => {
    // Always refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

### Pattern 2: Infinite Scroll

```typescript
function useInfiniteTodos() {
  return useInfiniteQuery({
    queryKey: ['todos', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchTodos(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}

// Usage
const { data, fetchNextPage, hasNextPage } = useInfiniteTodos();
```

### Pattern 3: Dependent Queries

```typescript
// Query only runs when userId exists
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId,
});

// Dependent on first query
const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user,
});
```

---

##  Quality Gates

### Validation Checklist

- [ ] Query keys are typed and hierarchical
- [ ] Error handling in place for mutations
- [ ] Cache invalidation after mutations
- [ ] Loading states displayed
- [ ] Retry logic configured

### Acceptance Criteria

- **Freshness:** Data never stale (invalidation working)
- **UX:** Loading/error states shown
- **Performance:** Duplicate requests eliminated
- **Type Safety:** Full TypeScript coverage

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| Infinite loop | Missing dependency array | Add deps to useQuery or use useEffect |
| Stale data | No invalidation | Add onSuccess invalidateQueries |
| Memory leak | Not unmounting | Use useQuery's remove callback |
| Type errors | Poor query key structure | Use key factory pattern |

---

##  Best Practices

### Query Key Design

```typescript
//  Good: Hierarchical, typed
['users', 'list', { filters }]
['users', 'detail', userId]

//  Bad: Flat, untyped
['userList']
['user-detail']
```

### Error Handling

```typescript
const { data, error, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3, // Retry 3 times on failure
  staleTime: 5 * 60 * 1000, // 5 minutes
  onError: (err) => {
    // Global error handling
    showErrorToast(err.message);
  },
});
```

### Selectors for Data Transformation

```typescript
// Select specific fields, reduce re-renders
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  select: (data) => data.map(user => ({ id: user.id, name: user.name })),
});
```

---

##  Advanced Topics

### Custom Hooks

```typescript
function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ['users', 'list', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 60 * 1000, // 1 minute
  });
}
```

### Background Refetching

```typescript
// Auto-refetch on window focus
useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});
```

---

##  Related Skills

- **Related:** `nextjs-patterns` - Next.js integration
- **Prerequisite:** `typescript-patterns` - Type safety

---

##  Further Reading

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Form Docs](https://tanstack.com/form/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)

---

##  Success Criteria

Implementation is complete when:
- [ ] Query keys are typed
- [ ] Mutations invalidate cache
- [ ] Error boundaries catch errors
- [ ] Loading states displayed
- [ ] No duplicate requests

---

*Version: 1.0.0 | TanStack Patterns*
