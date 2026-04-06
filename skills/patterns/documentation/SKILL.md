# Documentation Patterns

> **Version:** 1.0.0 | **Category:** Cat 4 (Patterns) | **Difficulty:** Beginner
> **Auto-Activation:** "api documentation", "readme format", "docs pattern"
> **Tags:** [documentation, readme, api-docs, guides, standards]
> **Related:** [nestjs-patterns], [tech-decisions]
> **Last Updated:** 2025-04-06

---

##  Auto-Activation

**This skill auto-activates when:**
- Writing README files
- Creating API documentation
- Documenting code patterns
- Building developer guides
- Writing changelogs

**Progressive Disclosure:**
1. **Metadata** → Doc types
2. **Instructions** → Writing patterns
3. **Resources** → Tools and formats

---

##  Quick Start

```markdown
# Project Name

> Brief description

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Documentation
- [API Docs](./docs/api.md)
- [Contributing](./CONTRIBUTING.md)
```

---

##  Quick Reference

| Doc Type | Purpose | Format |
|----------|---------|--------|
| **README** | Project overview | Markdown |
| **API Docs** | Endpoints | OpenAPI/MD |
| **GUIDE** | How-to | Markdown |
| **CHANGELOG** | Version history | Keep a Changelog |

---

##  Core Concepts

### README Structure

```markdown
# Project Name

> Tagline

## Features
- Bullet points

## Quick Start
\`\`\`bash
# Installation
npm install

# Development
npm run dev
\`\`\`

## Usage
Basic example

## Documentation
Links to detailed docs

## Contributing
How to contribute

## License
SPDX identifier
```

### API Documentation

```markdown
# API Reference

## Endpoints

### GET /users

Get all users.

**Response:**
\`\`\`json
{
  "data": [...],
  "pagination": {...}
}
\`\`\`

### POST /users

Create a new user.

**Request:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

**Response:** `201 Created`
```

---

##  Implementation Patterns

### Pattern 1: Code Comments

```typescript
/**
 * Fetches a user by ID.
 * 
 * @param id - The user ID
 * @returns The user data
 * @throws {UserNotFoundError} If user doesn't exist
 * 
 * @example
 * ```typescript
 * const user = await fetchUser(123);
 * ```
 */
async function fetchUser(id: number): Promise<User> {
  // Implementation
}
```

### Pattern 2: JSDoc for Components

```typescript
/**
 * Button component with variants.
 * 
 * @param variant - Visual style ('primary' | 'secondary')
 * @param size - Size ('sm' | 'md' | 'lg')
 * @param children - Button content
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Click me</Button>
 * ```
 */
export function Button({ 
  variant = 'primary', 
  size = 'md',
  children 
}: ButtonProps) {
  // Implementation
}
```

### Pattern 3: Guides

```markdown
# Authentication Guide

## Overview
This guide explains how to authenticate API requests.

## Token-Based Auth

### 1. Obtain Token
\`\`\`bash
curl -X POST /auth/login \\
  -d '{"email":"user@example.com","password":"secret"}'
\`\`\`

### 2. Use Token
\`\`\`bash
curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/users
\`\`\`

## Troubleshooting
| Error | Cause | Solution |
|-------|--------|----------|
| 401 | Invalid token | Refresh token |
| 403 | Missing scope | Check permissions |
```

---

##  Quality Gates

### Validation Checklist

- [ ] README has quick start section
- [ ] API docs include all endpoints
- [ ] Code comments explain WHY, not WHAT
- [ ] Examples are runnable
- [ ] License file included

### Acceptance Criteria

- **Clarity:** New users can start in < 5 minutes
- **Completeness:** All public APIs documented
- **Accuracy:** Examples match current code
- **Accessibility:** Docs are searchable

---

##  Troubleshooting

| Issue | Cause | Solution |
|-------|--------|----------|
| Docs outdated | Not updated with code | Add docs to CI check |
| Unclear instructions | Missing context | Add examples |
| Broken links | Files moved | Use relative paths |

---

##  Best Practices

### Writing Style

-  Active voice: "Install dependencies" (not "Dependencies should be installed")
-  Present tense: "This function returns" (not "This function will return")
-  Second person: "You can run" (not "Users can run")
-  Code fences with language: ```typescript ```

### Diagrams

```markdown
## Architecture

\`\`\`
┌─────────┐    HTTP    ┌──────────┐
│ Client  │ ══════════> │  Server  │
└─────────┘           └──────────┘
\`\`\`
```

---

##  Advanced Topics

### OpenAPI/Swagger

```typescript
//swagger.ts
export const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};
```

### Auto-Generated Docs

```bash
# TypeDoc for TypeScript
npm install -D typedoc
npx typedoc --out docs src/

# JSDoc for JavaScript
npm install -D jsdoc
jsdoc src -d docs
```

---

##  Related Skills

- **Related:** All pattern skills for code docs
- **Complementary:** `nestjs-patterns` - API docs

---

##  Further Reading

- [Google Developer Documentation Style Guide](https://developers.google.com/tech-writing/one)
- [Write the Docs](https://www.writethedocs.org/)
- [Diátaxis Framework](https://diataxis.fr/)

---

##  Success Criteria

Documentation is complete when:
- [ ] New users can onboard themselves
- [ ] API docs match implementation
- [ ] Examples are tested and working
- [ ] Contributing guidelines are clear
- [ ] License is specified

---

*Version: 1.0.0 | Documentation Patterns*
