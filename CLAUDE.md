# CLAUDE CODE - CONFIG

> **Version:** 4.0.0 - TrigMem Enhanced | **Last Updated:** 2025-02-13
> **Intégration:** TrigMem v1.0 - Complete methodology for memory management

---

## 🚀 TRIGMEM: SYSTEM INTÉGRÉ

Votre système est maintenant **amélioré avec TrigMem** - une méthodologie complète pour gérer la mémoire de Claude Code.

---

## 🎯 QUICK START

```bash
# Testing TrigMem Integration
/trigmem-core           # Should identify project automatically
/trigmem-decision       # Should guide decisions
/trigmem-categories      # Should classify information
/trigmem-storage         # Should configure storage
/trigmem-examples        # Should show examples
```

---

## 📊 STRUCTURE

```
.claude/
├── skills/                    # TrigMem skills (auto-invoked)
│   ├── trigmem-*/          # Core TrigMem system
│   ├── decisions/            # Your custom rules
│   └── ...                 # Your existing rules
├── rules/                      # All rules (combined)
├── CLAUDE.md                  # Project identity (minimal)
├── rules.d/                    # Legacy rules backup
```

---

## 🎯 PROJECT CONVENTIONS

### Stack
- **Frontend:** Next.js 16, React 19.2, TypeScript (strict)
- **State:** TanStack Suite (Router, Query, Form, Start)
- **Backend:** Prisma, Supabase, NestJS (occasionnel)
- **Backend:** Rust (occasions spécifiques)
- **Testing:** Vitest, Playwright
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel
- **Payment:** Stripe

---

## 📚 RULES - TRIGMEM METHODOLOGIE

Vos règles sont maintenant organisées selon la méthodologie TrigMem :

### 1. Identité Projet (CLAUDE.md)
- Nom, tech stack, objectifs
- Toujours disponible pour Claude

### 2. Patterns Réutilisables (Skills)
- Architecture, best practices
- Chargés à la demande
- Portables entre projets

### 3. Règles Spécifiques
- Conventions du projet actuel
- Corrections automatiques
- Pattern-matching

### 4. Commandes Opérationnelles
- Workflows (build, test, deploy)
- Scripts détaillés

---

## 🚀 AUTOMATIONS TRIGMEM

Les skills suivants sont automatiquement activés :

| Skill | Status | Description |
|-------|--------|-------------|
| `trigmem-core` | ✅ Active | Concepts fondamentaux |
| `trigmem-decision` | ✅ Active | Guide de décision 2 phases |
| `trigmem-categories` | ✅ Active | Classification automatique (6 types) |
| `trigmem-storage` | ✅ Active | Configuration stockage |
| `trigmem-examples` | ✅ Active | Exemples travaillés |

---

## 🔧 UTILISATION

### Categorisation Automatique

Quand vous posez une question, Claude :
1. Détecte la catégorie (via `trigmem-categories`)
2. Route vers le mécanisme optimal (via `trigmem-decision`)
3. Applique les corrections spécifiques (Rules)

---

## 📚 EXEMPLES D'UTILISATION

### Exemple 1 : Identité Projet

**Vous** : "Qu'est-ce que c'est ShopFlow ?"
**Claude** : Détection → Catégorie 1 → Stocke dans CLAUDE.md

### Exemple 2 : Architecture

**Vous** : "Où sont les composants ?"
**Claude** : Détection → Catégorie 2 → Stocke dans CLAUDE.md + crée règle structure

### Exemple 3 : Décision Complexe

**Vous** : "Comment refactorer ?"
**Claude** : Triage → Phase 1 → Phase 2 → Décision :
- Besoin isolation ? → Sub-agent
- Connaissance universelle ? → Skill (Architecture)

---

## 🎯 GUIDE DE DÉCISION

Utilisez ce guide simple pour les décisions complexes :

```
┌─────────────────────────────────────────────┐
│ Besoin workflow/action complexe ? │
└─────────────────────────────────────────────┘
```

- **Simple workflow** → Rule/Command (CLAUDE.md)
- **Isolation nécessaire** → Sub-agent
- **Connaissance universelle** → Skill (portable)

---

## 📖 AMÉLIORATIONS PERSISTANTES

Vos workflows existants sont préservés et améliorés :

- **Scripts** : npm run dev, build, test, deploy
- **Tests** : Vitest (unit), Playwright (E2E)
- **Documentation** : docs/architecture.md, docs/api.md

---

*Last Updated: 2025-02-13 | *TrigMem v1.0*
