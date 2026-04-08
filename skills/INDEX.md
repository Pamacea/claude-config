# Skills Index — Metadata-Based Routing

> **Version:** 3.0.0 | **Mise à jour:** 2026-04-08
> **Approche:** Scan des `**Summary:**` + `**Tags:**` au lieu de keyword triggers manuels

---

## Comment ça marche

1. Extraire les concepts de la question utilisateur
2. Scanner les `**Summary:**` et `**Tags:**` des SKILL.md
3. Charger le skill le plus pertinent (1 seul primaire)
4. Référencer (pas charger) les skills liés via `**Related:**`

**Avantage vs keyword triggers:** Pas de maintenance manuelle des conflits. Chaque SKILL.md est auto-descriptif via ses metadata.

---

## Skills Disponibles

### Patterns Frontend

| Skill | Tags | Summary |
|-------|------|---------|
| [nextjs](patterns/nextjs/SKILL.md) | #nextjs #frontend #react | Next.js 16 — App Router, RSC, Server Actions |
| [tanstack](patterns/tanstack/SKILL.md) | #tanstack #state #react | TanStack Suite — Query, Router, Form |
| [tailwind](patterns/tailwind/SKILL.md) | #tailwind #css #frontend | Tailwind CSS — responsive, dark mode, design system |
| [vite](patterns/vite/SKILL.md) | #vite #build #tooling | Vite — config, plugins, HMR |
| [typescript](patterns/typescript/SKILL.md) | #typescript #types | TypeScript — generics, utility types, strict mode |

### Patterns Backend

| Skill | Tags | Summary |
|-------|------|---------|
| [rust](patterns/rust/SKILL.md) | #rust #backend #axum | Rust — Axum, sqlx, Tower, workspace |
| [nestjs](patterns/nestjs/SKILL.md) | #nestjs #backend #api | NestJS — DTO, JWT, TypeORM |
| [wasm](patterns/wasm/SKILL.md) | #wasm #rust #webassembly | WebAssembly — wasm-bindgen, wasm-pack, WasmGC |

### Patterns Transversaux

| Skill | Tags | Summary |
|-------|------|---------|
| [tech-decisions](patterns/tech-decisions/SKILL.md) | #decisions #architecture | Choix de stack — comparatifs, critères |
| [ux-design](patterns/ux-design/SKILL.md) | #ux #design #ui | UX/UI — patterns, accessibilité, design system |
| [documentation](patterns/documentation/SKILL.md) | #documentation #writing | Documentation — API docs, README, guides |

### Opérations

| Skill | Tags | Summary |
|-------|------|---------|
| [mcp-mandatory](operations/mcp-mandatory/SKILL.md) | #mcp #operations | Workflows MCP — git, screenshots, analysis |
| [pattern-autoloader](pattern-autoloader/SKILL.md) | #autoloader #patterns | Auto-détection des patterns nécessaires |

---

## Règles d'Exclusivité

### Framework (1 seul chargé)

| Si détecté | Charger | Exclure |
|-----------|---------|---------|
| nextjs, server component, app router | nextjs | Autres frontend frameworks |
| nestjs, decorator, controller | nestjs | Autres backend frameworks |
| axum, tokio, actix | rust (backend) | Autres backend frameworks |

### Langage (1 seul chargé)

| Si détecté | Charger | Exclure |
|-----------|---------|---------|
| typescript, generic, interface | typescript | Autres langages |
| rust, cargo, lifetime | rust | Autres langages |

### Rust Frontend (1 seul chargé)

| Si détecté | Charger | Exclure |
|-----------|---------|---------|
| leptos, view!, create_signal | leptos (dans rust/) | Dioxus |
| dioxus, rsx!, use_signal | dioxus (dans rust/) | Leptos |

---

## Cross-References

| Skill primaire | Référencer (pas charger) |
|---------------|------------------------|
| nextjs | typescript, tailwind |
| nestjs | typescript |
| tanstack | typescript, nextjs |
| rust | wasm |
| rust (fullstack) | rust, wasm |

---

## Priorité de Chargement

1. **Meta** (trigmem-core, decision, autoloader)
2. **Patterns** (frontend > backend > transversal)
3. **Opérations** (mcp-mandatory)

Au sein de la même catégorie: le skill avec le plus de tags correspondants gagne.

---

*Version: 3.0.0 | Metadata-based routing — pas de keyword triggers manuels*
