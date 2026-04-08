# Vite Patterns

**Type:** knowledge
**Summary:** Vite build tool patterns covering configuration, plugins, HMR, and bundler optimization.
**Tags:** #vite #build #tooling
**Status:** active
**Updated:** 2026-04-08
**Related:** []

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Intermediate
> **Auto-Activation:** "vite config", "vite plugin", "hmr vite", "build tool"
> **Tags:** [vite, build-tool, bundler, hmr, plugins]
> **Related:** [nextjs-patterns], [typescript-patterns]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Configuring Vite
- Creating Vite plugins
- Debugging HMR issues
- Optimizing build performance
- Setting up monorepos

**Progressive Disclosure:**
1. **Metadata** → Core concepts
2. **Instructions** → Configuration patterns
3. **Resources** → Plugin development

---

##  Quick Start

```bash
# Create project
npm create vite@latest my-app -- --template react-ts

# Config files
vite.config.ts  # Main config
. env            # Environment variables
```

---

##  Quick Reference

| Concept | Config | Use Case |
|---------|--------|----------|
| **Aliases** | `resolve.alias` | Import shortcuts |
| **Plugins** | `plugins: []` | Extend functionality |
| **Define** | `define: {}` | Global constants |
| **Build** | `build.rollupOptions` | Bundle optimization |

---

##  Core Concepts

### Basic Configuration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
  },
});
```

### Environment Variables

```typescript
// .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

// Usage in code
const apiUrl = import.meta.env.VITE_API_URL;
```

---

##  Implementation Patterns

### Pattern 1: Path Aliases

**Purpose:** Clean imports across project

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
});

// tsconfig.json - mirror aliases
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
  }
}
```

### Pattern 2: Development Server Config

```typescript
export default defineConfig({
  server: {
    port: 3000,
    host: true, // Expose to network
    strictPort: true, // Fail if port taken
    open: true, // Auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

### Pattern 3: Build Optimization

```typescript
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // KB
  },
});
```

---

##  Quality Gates

### Validation Checklist

- [ ] HMR working for all file types
- [ ] Environment variables prefixed `VITE_`
- [ ] Sourcemaps enabled in dev
- [ ] Bundle size within limits
- [ ] No console errors in build

### Acceptance Criteria

- **Speed:** Dev server starts < 2s
- **HMR:** Updates appear < 200ms
- **Bundle:** Production build optimized
- **Compatibility:** Works with target browsers

---

##  Troubleshooting

| Symptom | Root Cause | Solution |
|---------|-----------|----------|
| HMR not working | Wrong import path | Use aliases consistently |
| Env vars undefined | Missing `VITE_` prefix | Rename env variables |
| Build fails | Circular dependencies | Check imports, use lazy load |
| Slow build | Large dependencies | Use manual chunks |

---

##  Best Practices

### Plugin Selection

```typescript
// Essential plugins
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Type definitions
  ],
});
```

### Performance Tips

```typescript
// Pre-bundle heavy dependencies
export default defineConfig({
  optimizeDeps: {
    include: ['lodash-es', 'date-fns'],
  },
});

// Disable in-source maps for production
export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: mode === 'development',
  },
}));
```

---

##  Advanced Topics

### Custom Plugins

```typescript
import { Plugin } from 'vite';

function virtualPlugin(): Plugin {
  return {
    name: 'virtual-module',
    resolveId(id) {
      if (id === '@virtual') {
        return '\0virtual';
      }
    },
    load(id) {
      if (id === '\0virtual') {
        return `export const msg = "Hello";`;
      }
    },
  };
}
```

### Library Mode

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
});
```

---

##  Related Skills

- **Related:** `nextjs-patterns` - Vite in Next.js
- **Complementary:** `typescript-patterns` - Type safety

---

##  Further Reading

- [Vite Documentation](https://vitejs.dev/)
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [Rollup Options](https://vitejs.dev/config/build-options.html)

---

##  Success Criteria

Implementation is complete when:
- [ ] Dev server starts quickly
- [ ] HMR works for all changes
- [ ] Production build is optimized
- [ ] No warnings in console
- [ ] Bundle size is reasonable

---

*Version: 1.0.0 | Vite Patterns*
