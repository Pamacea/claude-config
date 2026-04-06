# UX Design Patterns

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "ux design", "user experience", "usability test", "accessibility"
> **Tags:** [ux, design-system, accessibility, usability, patterns]
> **Related:** [tailwind-patterns], [nextjs-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Designing user interfaces
- Implementing design systems
- Creating accessibility features
- Conducting usability tests
- Building user flows

**Progressive Disclosure:**
1. **Metadata** → Core principles
2. **Instructions** → Common patterns
3. **Resources** → Testing methods

---

##  Quick Start

```bash
# Core UX Principles
1. Clarity > Cleverness
2. Consistency > Novelty  
3. Feedback > Silence
4. Accessibility > Features
```

---

##  Quick Reference

| Principle | Pattern | Example |
|-----------|---------|---------|
| **Visibility** | Show system status | Loading spinners, progress bars |
| **Match** | Real-world metaphors | Trash icon for delete |
| **User Control** | Undo/Redo available | Cancel buttons, confirm dialogs |
| **Accessibility** | WCAG compliant | ARIA labels, keyboard nav |

---

##  Core Concepts

### The 5 Principles of UX

1. **Visibility** - Always show system status
2. **Match** - Use familiar concepts
3. **Control** - Give users freedom (and exit)
4. **Consistency** - Same words/situations = same meaning
5. **Error Prevention** - Better than error messages

### Design Tokens

```typescript
// tokens.ts
export const tokens = {
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  transition: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
};
```

---

##  Implementation Patterns

### Pattern 1: Loading States

```typescript
// Show what's happening
function SubmitButton({ isLoading, children }) {
  return (
    <button disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner />
          <span>Saving...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

### Pattern 2: Empty States

```typescript
function EmptyState({ action, onAction }) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium">No items yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first item.
      </p>
      {action && (
        <button onClick={onAction}>{action}</button>
      )}
    </div>
  );
}
```

### Pattern 3: Error Messages

```typescript
function ErrorMessage({ error, onRetry }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <ExclamationIcon className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {error.title || "Something went wrong"}
          </h3>
          <p className="mt-1 text-sm text-red-700">{error.message}</p>
          {onRetry && (
            <button onClick={onRetry}>Try again</button>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

##  Quality Gates

### Validation Checklist

- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Loading states displayed
- [ ] Errors are actionable

### Acceptance Criteria

- **Accessibility:** WCAG 2.1 AA compliant
- **Usability:** Task completion rate > 90%
- **Performance:** Interaction < 100ms
- **Mobile:** Touch targets ≥ 44×44px

---

##  Troubleshooting

| Issue | Cause | Solution |
|-------|--------|----------|
| Can't tap buttons | Touch target too small | Min 44×44px |
| Can't find feature | Hidden navigation | Clear labels, search |
| Form errors | Unclear validation | Inline error messages |
| Confusing flows | No progress indication | Show steps, progress bar |

---

##  Best Practices

### Mobile First Design

```css
/* Start with mobile, enhance for desktop */
.button {
  padding: 0.75rem 1rem;  /* Mobile: larger touch target */
  font-size: 1rem;
}

@media (min-width: 768px) {
  .button {
    padding: 0.5rem 0.75rem;  /* Desktop: smaller */
  }
}
```

### Accessible Forms

```typescript
<form>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    required
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <span id="email-error" className="error">
      {errors.email}
    </span>
  )}
</form>
```

---

##  Advanced Topics

### ARIA Live Regions

```typescript
<div role="status" aria-live="polite">
  {status && <p>{status}</p>}
</div>

<div role="alert" aria-live="assertive">
  {error && <p>{error}</p>}
</div>
```

### Focus Management

```typescript
function Modal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      // Trap focus in modal
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          // Focus trap logic
        }
      };
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [isOpen]);

  return <div ref={modalRef}>...</div>;
}
```

---

##  Related Skills

- **Related:** `tailwind-patterns` - Styling
- **Complementary:** `nextjs-patterns` - Implementation

---

##  Further Reading

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Laws of UX](https://lawsofux.com/)
- [Refactoring UI](https://www.refactoringui.com/)

---

##  Success Criteria

UX is complete when:
- [ ] All users can complete core tasks
- [ ] Errors are prevented or easily fixed
- [ ] Interface is consistent throughout
- [ ] Accessibility audit passes
- [ ] Usability testing validates decisions

---

*Version: 1.0.0 | UX Design Patterns*
