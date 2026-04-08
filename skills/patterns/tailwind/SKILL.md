# Tailwind CSS Patterns

**Type:** knowledge
**Summary:** Tailwind CSS utility-first patterns for responsive design, configuration, and design system integration.
**Tags:** #tailwind #css #frontend
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Beginner
> **Auto-Activation:** "tailwind class", "tailwind config", "@tailwind", "responsive design"
> **Tags:** [tailwind, css, utility-first, responsive, design-system]
> **Related:** [nextjs-patterns], [typescript-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Writing Tailwind CSS classes
- Configuring tailwind.config.js
- Building responsive layouts
- Creating component variants with classes
- Debugging Tailwind-related issues

**Progressive Disclosure:**
1. **Metadata** → Class categories
2. **Instructions** → Common patterns
3. **Resources** → Custom configuration

---

##  Quick Start

```html
<!-- 1. Use utility classes directly -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">

<!-- 2. Responsive with modifiers -->
<div class="p-4 md:p-6 lg:p-8">

<!-- 3. Dark mode support -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

---

##  Quick Reference

| Category | Pattern | Example |
|----------|---------|---------|
| **Layout** | Flexbox | `flex items-center justify-between` |
| **Spacing** | Margins/Padding | `m-4 px-2 py-1` |
| **Typography** | Text sizing | `text-sm font-bold text-gray-700` |
| **Colors** | Backgrounds/Text | `bg-blue-500 text-white hover:bg-blue-600` |
| **Responsive** | Breakpoints | `sm: md: lg: xl: 2xl:` |
| **States** | Hover/Focus | `hover:bg-blue-600 focus:ring-2` |

---

##  Core Concepts

### Utility-First Philosophy

**What:** Pre-defined classes that map to CSS properties

```css
/* Instead of custom CSS: */
.custom-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

/* Use utilities directly: */
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
```

**Benefits:**
-  Faster development - no class naming
-  Smaller bundle - unused styles purged
-  Consistency - design system built-in
-  No context switching - HTML = styling

### Responsive Design

**Mobile-first approach:**

```html
<!-- Default (mobile), then override for larger screens -->
<div class="
  text-sm        /* Mobile: small */
  md:text-base  /* Tablet+: base */
  lg:text-lg     /* Desktop+: large */
">
```

**Breakpoints:**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

---

##  Implementation Patterns

### Pattern 1: Component Variants

**Purpose:** Reusable component styles

```typescript
// buttonVariants.ts
const buttonVariants = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

// Usage
<button className={`px-4 py-2 rounded ${buttonVariants[prop.variant]}`}>
```

### Pattern 2: Container Queries (Tailwind v3+)

```html
<!-- Parent container -->
<div class="@container">
  <!-- Child responds to container, not viewport -->
  <div class="@lg:text-xl">@lg responds to container</div>
</div>
```

### Pattern 3: Arbitrary Values

```html
<!-- When design tokens don't exist -->
<div class="w-[137px] h-[42px] bg-[#1da1f2]">

<!-- Top/right/bottom/left -->
<div class="top-[17px] right-[14%]">
```

---

##  Quality Gates

### Validation Checklist

- [ ] No inline styles (use Tailwind classes)
- [ ] No `@apply` in component files
- [ ] Responsive classes use mobile-first
- [ ] Dark mode classes included where applicable
- [ ] Arbitrary values documented (why not design token?)

### Acceptance Criteria

- **Consistency:** Spacing uses scale (0.5, 1, 2, 4, etc.)
- **Responsive:** Works at all breakpoints
- **Accessibility:** Focus states included
- **Performance:** No unused classes in prod

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| Classes not working | JIT not scanning | Check content paths in config |
| Purged styles missing | Dynamic class names | Use `safelist` or full class names |
| Dark mode broken | Class vs media strategy | Check `darkMode: 'class'` in config |
| Order conflicts | specificity | Use `!important` variant: `!text-red-500` |

---

##  Best Practices

### Spacing Scale

```html
<!-- Use the scale: 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 -->
 class="p-4 m-2"
 class="p-[17px] m-[9px]"
```

### Composition

```html
<!-- Combine utilities instead of custom CSS -->
 class="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
 @apply flex .items-center (avoid in components)
```

### Extending the Theme

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
}
```

---

##  Advanced Topics

### Dynamic Classes with clsx

```typescript
import clsx from 'clsx';

function Button({ variant, size, className }) {
  return clsx(
    // Base classes
    'rounded font-medium transition-colors',
    // Variant
    variants[variant],
    // Size
    sizes[size],
    // Custom
    className
  );
}
```

### Type-Safe Class Names

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prevents conflicting classes
cn('px-2 py-1 px-4') // → 'py-1 px-4' (px-4 wins)
```

---

##  Related Skills

- **Related:** `nextjs-patterns` - Tailwind in Next.js
- **Complementary:** `ux-design-patterns` - Design tokens

---

##  Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

---

##  Success Criteria

Implementation is complete when:
- [ ] All styles use Tailwind classes
- [ ] Responsive breakpoints tested
- [ ] Dark mode working
- [ ] No custom CSS except for animations
- [ ] Bundle size optimized (purged unused)

---

*Version: 1.0.0 | Tailwind CSS Patterns*
