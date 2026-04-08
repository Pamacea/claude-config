# SETTINGS - Configuration Optimale

**Type:** reference
**Summary:** Configuration settings.json, variables d'environnement, hooks, troubleshooting
**Tags:** #claude-code #settings #configuration #hooks
**Status:** active
**Updated:** 2026-04-08
**Related:** [setup-guide]

---

##  Chargement Automatique

**PROTOCOL.md est chargé automatiquement** via la référence `@PROTOCOL.md` dans CLAUDE.md.
**AUCUNE action manuelle requise** - tout est automatique.

---

## Configuration Recommandée

```json
{
  "// Comment": "Optimisé pour Pamacea claude-config + GLM Gateway",

  "autoMemoryEnabled": false,
  "autoCompactThreshold": 0.80,
  "compactOnContextLimit": true,

  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-context7"]
    }
  },

  "environmentVariables": {
    "CLAUDE_CODE_DISABLE_AUTO_MEMORY": "1",
    "MAX_MCP_OUTPUT_TOKENS": "25000",
    "ENABLE_TOOL_SEARCH": "auto:5"
  },

  "permissions": {
    "default": "ask"
  }
  
}
```

---

## Variables d'Environnement

```bash
# ~/.bashrc ou ~/.zshrc

# Claude Code Optimisations
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=1
export MAX_MCP_OUTPUT_TOKENS=25000
export ENABLE_TOOL_SEARCH=auto:5

# GLM Gateway (si utilisé)
# export GLM_API_KEY="sk-..."
# export GLM_BASE_URL="https://..."

# Pamacea Tools
export PATH="$HOME/.cargo/bin:$PATH"  # RTK, Argus, Aureus, Parry
```

---

## Settings par Use Case

### Développement Rapide (--speed)
```json
{
  "autoCompactThreshold": 0.90,
  "autoMemoryEnabled": false
}
```

### Qualité Critique (--quality)
```json
{
  "autoCompactThreshold": 0.70,
  "autoMemoryEnabled": true,
  "permissions": {
    "default": "acceptEdits"
  }
}
```

### GLM Gateway (Optimisé latence)
```json
{
  "autoCompactThreshold": 0.75,
  "autoMemoryEnabled": false,
  "environmentVariables": {
    "CLAUDE_CODE_DISABLE_AUTO_MEMORY": "1",
    "MAX_MCP_OUTPUT_TOKENS": "15000"
  }
}
```

---

## Hooks Actifs (Pamacea)

Les hooks Pamacea sont automatiquement installés dans `~/.claude/hooks/`:

| Hook | Fichier | Event |
|------|---------|-------|
| **RTK** | `rtk-rewrite.cjs` | PreToolUse |
| **Aureus** | `aureus-rewrite.cjs` | PreToolUse |
| **Parry** | `parry-post-write.cjs` | PostToolUse |
| **Argus** | `argus-*.cjs` | SessionStart, Pre/PostToolUse |

**NE PAS désactiver ces hooks** - ils sont essentiels au PROTOCOL.

---

## Diagnostic Settings

```bash
# Vérifier settings actuels
cat ~/.claude/settings.json

# Vérifier hooks
ls -la ~/.claude/hooks/

# Vérifier mémoire
ls -la ~/.claude/projects/*/memory/

# Context usage
/context  # dans Claude Code
```

---

## Problèmes Communs

### "Claude ignore mes règles"
```json
// settings.json
{
  "autoCompactThreshold": 0.80,  // Compact plus agressivement
  "autoMemoryEnabled": false      // Évite conflit mém.
}
```

### "Trop lent avec GLM"
```bash
export MAX_MCP_OUTPUT_TOKENS=15000  # Réduit output MCP
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=1
```

### "Oublie les règles après 30 messages"
```bash
# Dans session Claude Code
/compact Keep only: PROTOCOL.md rules + current task
```

---

*SETTINGS.md v1.0.0 - 2025-04-06*
