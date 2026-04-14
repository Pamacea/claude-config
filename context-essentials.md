# Context Essentials — claude-config

> **Ce fichier survit aux compactions.** Mettre ici les décisions critiques.
> Dernière mise à jour: 2026-04-14

## Projet

- **Repo:** claude-config (plugin Claude Code + LLM Wiki)
- **Type:** Configuration personnelle Claude Code
- **Stack:** TypeScript/Node.js (hooks CJS), Markdown (rules/skills)

## Architecture

```
~/.claude/
├── rules/           # Règles runtime (auto-chargées par globs)
├── skills/          # Patterns demand-loaded (TrigMem + Pamacea)
├── hooks/           # Hooks Pamacea + optimisations token
├── _wiki/           # LLM Wiki (brain + moteur + inbox)
├── .obsidian/       # Config Obsidian
└── settings.json    # Config principale Claude Code
```

## Outils Pamacea (Auto-Active)

| Outil | Rôle | Status |
|-------|------|--------|
| **RTK** | Token savings (60-90%) | Active |
| **AUREUS** | Versioned commits | Active |
| **PARRY** | Agentic linter | Active (PostWrite) |
| **ARGUS** | Memory sentinel | Active (all hooks) |
| **PALNIA** | Tasks/Events CLI | Available |

## Conventions

- **Commit format:** `TYPE: PROJECT - vX.Y.Z`
- **Langue:** Français pour les explications
- **Formatting:** Oxfmt (pas Prettier)
- **Methodology:** EPCT (Explore, Plan, Code, Test)

## Hooks Actifs

| Hook | Event | Fichier |
|------|-------|---------|
| PARRY | PostToolUse (Write/Edit) | parry-post-write.cjs |
| ARGUS | PostToolUse + PreToolUse + SessionStart | argus-*.cjs |
| Bash filter | PreToolUse (Bash) | bash-pre-tool.cjs |
| Output filter | PostToolUse (Bash/Grep/Glob) | output-filter.cjs |
| Protect files | PreToolUse (Edit/Write) | protect-files.cjs |
| Pre-compact | PreCompact | pre-compact.cjs |
| Context reinject | PostCompact + SessionStart(compact) | context-reinject.cjs |

## Quality Gates

- [ ] Lint passe
- [ ] Typecheck passe
- [ ] Tests passent
- [ ] Pas de secrets exposés
- [ ] Commit au format TYPE: PROJECT - vX.Y.Z

## Métriques Token

- **Target:** 55-65% reduction globale
- **RTK:** 60-90% sur CLI output
- **Sub-agent model:** variable (selon projet)
- **Hooks:** output filtering + context preservation
