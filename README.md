# claude-config

> **Configuration Claude Code + LLM Wiki** | Version 6.0.0
> Outils Pamacea (RTK, Aureus, Parry, Argus) + Base de connaissances persistante
>
> **Dernière mise à jour :** 2026-04-08

---

## Quick Start

```bash
# 1. Cloner ce repo
git clone https://github.com/Pamace/claude-config.git ~/.claude

# 2. C'est tout ! PROTOCOL.md + CLAUDE.md se chargent automatiquement

# 3. Optionnel : Copier les settings recommandés
cp settings.json.example ~/.claude/settings.json
```

---

## Concept

**claude-config** combine deux systèmes :

1. **Config Claude Code** — Règles, skills, hooks, outils Pamacea (RTK, Aureus, Parry, Argus)
2. **LLM Wiki** — Base de connaissances persistante que l'IA construit et maintient au fil du temps

Le wiki résout le problème de l'amnésie entre sessions : chaque question, découverte et décision est compilée dans un wiki structuré qui s'enrichit.

---

## Structure

```
~/.claude/
├── CLAUDE.md              # Bootstrap (lit PROTOCOL.md + _wiki/_config/config.md)
├── PROTOCOL.md            # Règles critiques R1-R5 (override tout)
├── REFERENCE.md           # Quick reference card
│
├── rules/                 # Règles runtime (auto-chargées par globs)
│   ├── 00-core.md         # Principes, EPCT
│   ├── 01-standards.md    # Standards techniques positifs
│   ├── 02-conventions.md  # Git flow, structure, imports
│   └── ...                # (10 fichiers, < 70 lignes chacun)
│
├── skills/                # Patterns demand-loaded (metadata tags)
│   ├── INDEX.md           # Index — routing par metadata
│   ├── patterns/          # 11 domaines techniques
│   ├── standards/         # Standards techniques
│   ├── trigmem/           # TrigMem core (token budget)
│   └── workflows/         # EPCT, MCP workflows
│
├── _wiki/                 # LLM Wiki — base de connaissances
│   ├── _config/           #   Profil utilisateur, metadata standard
│   ├── _meta/             #   Instructions (JIT) + templates
│   │   ├── instructions/  #     6 modules de protocole
│   │   └── templates/     #     6 templates de contenu
│   ├── _inbox/            #   Zone de capture frictionless
│   ├── _sources/          #   Documents originaux (immutable)
│   ├── 1-Projects/        #   Travaux actifs
│   ├── 2-Knowledge/       #   Wiki principal (réfs, guides, décisions)
│   ├── 3-Journal/         #   Réflexions, notes de réunion
│   ├── 4-Private/         #   Contenu sensible (gitignored)
│   └── assets/            #   Images et pièces jointes
│
├── hooks/                 # Hooks Pamacea (RTK, Aureus, Parry, Argus)
├── .obsidian/             # Config Obsidian (graph, couleurs)
│
├── RTK.md                 # Doc outil — Token savings (60-90%)
├── AUREUS.md              # Doc outil — Versioned commits
├── PARRY.md               # Doc outil — Agentic linting
├── ARGUS.md               # Doc outil — Memory sentinel
├── PALNIA.md              # Doc outil — Tasks/Events CLI
│
├── config.json            # Config Claude Code (plugins, hooks, MCP)
├── mcp.json               # Définitions serveurs MCP
├── settings.json          # PreWriteHooks (Parry)
├── statusline.*           # Custom statusline
├── WIKI-LOG.md            # Chronologie des actions wiki
└── CHANGELOG.md           # Historique des versions
```

---

## Outils Pamacea (Auto-Active)

| Outil | Usage | Trigger |
|-------|-------|---------|
| **RTK** | Token savings (60-90%) | Auto-rewrite git, grep, cat |
| **AUREUS** | Versioned commits | `TYPE: PROJECT - vX.Y.Z` |
| **PARRY** | Agentic linting | PostWrite validation |
| **ARGUS** | Memory sentinel | recall/remember patterns |
| **PALNIA** | Tasks/Events CLI | `palnia tasks`, `palnia events` |

---

## Wiki — Comment ça marche

### Ingestion
Vous ajoutez une source dans `_wiki/_inbox/`, l'IA la lit, extrait les infos clés, et les intègre dans le wiki — pages mises à jour, cross-references, contradictions flagées.

### Recherche
Vous posez une question. L'IA scanne les `**Summary:**` des pages, lit les 1-3 plus pertinentes, synthétise une réponse avec citations.

### Lint
Périodiquement, l'IA vérifie la santé du wiki : contenu stale, metadata manquante, pages orphelines, taille du contexte.

---

## Patterns Techniques (Demand-Loaded)

| Pattern | Tags |
|---------|------|
| nextjs | #nextjs #frontend #react |
| rust | #rust #backend #axum |
| nestjs | #nestjs #backend #api |
| tanstack | #tanstack #state #react |
| tailwind | #tailwind #css #frontend |
| typescript | #typescript #types |
| vite | #vite #build #tooling |
| wasm | #wasm #rust #webassembly |
| tech-decisions | #decisions #architecture |
| ux-design | #ux #design #ui |
| documentation | #documentation #writing |

Chaque skill est chargé automatiquement quand ses tags correspondent au contexte.

---

## Règles Critiques (PROTOCOL.md)

| Règle | Description |
|-------|-------------|
| R1 | ZÉRO duplication fichiers (_v2, _new, _backup) |
| R2 | MAX 2 redémarrages serveur/session |
| R3 | Communication Cro-Magnon (ANALYSIS → ACTION → RESULT) |
| R4 | Re-read PROTOCOL toutes les 5 actions |
| R5 | Context sync si confus |

---

## Documentation

- **CLAUDE.md** — Bootstrap (point d'entrée)
- **PROTOCOL.md** — Règles critiques (read FIRST)
- **REFERENCE.md** — Quick reference card
- **CHANGELOG.md** — Historique des versions
- **_wiki/2-Knowledge/** — Guides et références

---

**Licence:** MIT | **Auteur:** Pamace | **Version:** 6.0.0 (Config + LLM Wiki)
