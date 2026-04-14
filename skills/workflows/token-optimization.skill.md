---
name: token-optimization
description: Configuration RTK + optimisations tokens Claude Code (55-65% reduction globale)
type: workflow
triggers: ["rtk", "token", "optimization", "cost", "savings", "budget", "setup-rtk"]
---

# Token Optimization — Optimisation des Tokens

> **Objectif:** 55-65% de réduction de consommation de tokens.
> Inspiré de claude-craft `setup-rtk.md`.

## Optimisations Disponibles

| Optimisation | Économie | Status |
|---|---|---|
| RTK + ultra-compact | 60-90% sur outputs CLI | Vérifier avec `rtk gain` |
| SUBAGENT_MODEL=sonnet | 40-60% coût sub-agents | Variable |
| Output filter hook | Réduit pollution contexte | Actif |
| PreCompact hook | Évite perte de contexte | Actif |
| Context reinject hook | Maintient continuité | Actif |

## Vérification RTK

```bash
# Vérifier l'installation
if command -v rtk &>/dev/null; then
  echo "RTK installed: $(rtk --version)"
  rtk gain 2>/dev/null || echo "No savings data yet"
else
  echo "RTK NOT installed — run: curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/master/install.sh | bash"
fi
```

## Configuration RTK

### Ultra-compact mode

Vérifier `~/.claude/hooks/rtk-rewrite.sh` — le rewrite doit utiliser `--ultra-compact`:

```bash
REWRITTEN=$(rtk rewrite --ultra-compact "$CMD" 2>/dev/null)
```

### Optimiser les limites

Vérifier `~/.config/rtk/config.toml`:

```toml
[limits]
grep_max_results = 100
grep_max_per_file = 10
status_max_files = 10
status_max_untracked = 5
passthrough_max_chars = 1500
```

### Filtres personnalisés

Vérifier `~/.config/rtk/filters.toml` — ajouter des filtres pour:
- Docker: `docker exec`, `compose`, `logs`
- Node.js: `npm/npx install`
- Rust: `cargo` commands

## Modèle Sub-Agents

```bash
# Vérifier
echo "CLAUDE_CODE_SUBAGENT_MODEL=${CLAUDE_CODE_SUBAGENT_MODEL:-NOT SET}"

# Recommandé (dans ~/.bashrc ou settings.json env)
export CLAUDE_CODE_SUBAGENT_MODEL="sonnet"
```

Économise 40-60% sur les coûts des sous-agents (exploration, grep, lecture).

## Hooks d'Optimisation

| Hook | Fichier | Impact |
|------|---------|--------|
| Output filter | `~/.claude/hooks/output-filter.cjs` | Guide Claude à résumer les outputs > 10KB |
| Pre-compact | `~/.claude/hooks/pre-compact.cjs` | Préserve context-essentials.md |
| Context reinject | `~/.claude/hooks/context-reinject.cjs` | Re-injecte après compaction |
| Protect files | `~/.claude/hooks/protect-files.cjs` | Bloque edit sur fichiers sensibles |

## Autres Optimisations

### CLI natifs vs MCPs

| Approche | Coût contexte |
|----------|--------------|
| Outil natif (Glob, Grep) | 0 tokens supplémentaires |
| Serveur MCP | ~500-2000 tokens/outil/tour |
| CLI externe (gh, aws) | Ponctuel, via Bash |

### Modèles par tâche

| Tâche | Modèle recommandé |
|-------|-------------------|
| Lookups, classification simple | Haiku |
| Implémentation standard | Sonnet |
| Architecture, raisonnement complexe | Opus |

### Strategies multi-session

Diviser en sessions courtes:
1. Session 1: investigation + `/memory` + `/clear`
2. Session 2: implémentation avec contexte frais

**~55% réduction tokens** vs session unique.

## Checklist Setup

- [ ] RTK installé et hooks actifs
- [ ] `CLAUDE_CODE_SUBAGENT_MODEL=sonnet` configuré
- [ ] Output filter hook actif
- [ ] Pre-compact hook actif
- [ ] Context reinject hook actif
- [ ] context-essentials.md créé
- [ ] CLAUDE.md < 200 lignes
