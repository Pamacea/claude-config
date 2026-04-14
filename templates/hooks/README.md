# Hook Templates — claude-config

Templates de hooks Claude Code. Inspiré de [claude-craft](https://github.com/TheBeardedBearSAS/claude-craft).

## Disponibles

| Template | Event | Rôle |
|----------|-------|------|
| `output-filter.json` | PostToolUse | Résumé des outputs > 10KB |
| `pre-compact.json` | PreCompact | Préserve context-essentials.md |
| `context-reinject.json` | PostCompact/SessionStart | Re-injecte context après compaction |
| `protect-files.json` | PreToolUse | Bloque edit sur .env, secrets, keys |
| `security-block.json` | PreToolUse | Bloque curl/wget vers scripts |
| `block-dangerous-commands.json` | PreToolUse | Bloque rm -rf, sudo, chmod 777 |
| `quality-gate.json` | PreToolUse | Tests avant git commit |

## Utilisation

1. Choisir un template
2. Copier la section `hooks` dans `~/.claude/settings.json`
3. Adapter les commandes au projet

## Format CJS (recommandé)

Pour les hooks personnalisés, utiliser le format Node.js CJS :

```javascript
#!/usr/bin/env node
const fs = require('fs');
let input = '';
try { input = fs.readFileSync(0, 'utf-8'); } catch { process.exit(0); }
let data;
try { data = JSON.parse(input); } catch { process.exit(0); }
// ... logique du hook
console.log('{}'); // ou { systemMessage: "..." }
process.exit(0);
```

## Events Reference

| Event | Quand | Usage |
|-------|-------|-------|
| `PreToolUse` | Avant exécution outil | Bloquer, valider |
| `PostToolUse` | Après exécution outil | Formater, filtrer |
| `PreCompact` | Avant compaction | Sauvegarder contexte |
| `PostCompact` | Après compaction | Restaurer contexte |
| `SessionStart` | Démarrage session | Charger contexte |
| `SessionStart(compact)` | Après compaction session | Re-injecter contexte |
