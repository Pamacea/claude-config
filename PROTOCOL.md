# PROTOCOL - High-Strictness Mode

> **Version:** 1.1.0 | **Priority:** CRITICAL - Ce fichier override TOUT en cas de conflit
> **Ce fichier est lu EN PREMIER avant toute autre règle**

---

##  IMMEDIATE ACTIONS (Avant TOUT)

### Au démarrage de CHAQUE tâche
```
1. Lire: PROTOCOL.md (ce fichier)
2. Lire: ./CLAUDE.md du projet
3. Lire: ~/.claude/CLAUDE.md (global)
4. Vérifier: Context > 50 messages ? → Suggérer /clear
5. État: "Following: PROTOCOL.md + CLAUDE.md + tools"

PRÉAMBULER CHAQUE ACTION IMPORTANTE:
"Following RULE R[X] from PROTOCOL.md"
```

---

##  RÈGLES INTROUVABLES (Unbreakable)

### R1: ZÉRO DUPLICATION DE FICHIERS
```
PATTERNS INTERDITS:
- file_v2.ts, file_new.ts, file_fixed.ts, file_copy.ts
- component_v2/, utils_v2/, helpers-v2/
- Tout suffixe de version: _backup, _old, _alt

WORKFLOW OBLIGATOIRE:
Avant de créer TOUT fichier:
1. MANDATORY: Run `find . -name "*<filename>*" -type f` OR Glob tool
2. Si trouvé → ÉDITER l'original, JAMAIS créer de duplicata
3. Si Edit échoue → IDENTIFIER pourquoi (permissions, syntaxe, path) → CORRIGRE ça
4. Si vraiment nouveau → vérifier qu'aucun similaire n'existe

RÈGLE D'OR: Un fichier = une vérité. Pas de versions.

ANTI-DUPLICATE CHECK:
- Doublons créés = ÉCHEC de la tâche
- Toujours éditer l'existant, jamais créer "nouvelle version"
```

### R2: LIMITE DE REDÉMARRAGE SERVEUR
```
MAX REDÉMARRAGES: 2 par session

Après 2 échecs → ARRÊT → Diagnostiquer CAUSE RACINE → Demander utilisateur

PROTOCOLE ÉCHEC CSS/TURBOPACK/POSTCSS:
1. STOP - NE PLUS toucher package.json ou supprimer caches
2. Lire: postcss.config.js et tailwind.config.js
3. Vérifier: DERNIER fichier modifié (erreur syntaxe?)
4. MANDATORY: Utiliser sub-agent ou chrome-devtools screenshot pour vérifier
5. THEN fix - PAS de modifications à l'aveugle

INTERDIT:
- Boucler sur "delete cache and restart" (max 2 fois)
- Modifier tsconfig.json "au hasard"
- Changer les versions de dépendances sans comprendre
- Ignorer les erreurs de syntaxe

ATOMIC DESIGN:
- MAX 3 niveaux d'imbrication
- Atomes → Molécules → Organismes
- Pas de "div spaghetti"
```

### R3: MODE COMMUNICATION - "CROC-MAGNON"
```
INTERDIT:
- "I will now proceed to..."
- "Let me analyze the situation..."
- "I think I should..."
- Longues explications avant action
- "I'm going to check..." → Just check!

REQUIS:
- "ANALYSIS: <bref>"
- "ACTION: <verbe impératif>"
- "RESULT: <résultat>"
- "DONE: <ce qui est fait>"

Avant CHAQUE refactor important:
→ ÉTATER: "Following RULE R[X] from PROTOCOL.md: <raison>"

Exemples:
 "I have analyzed the CSS issue and I believe we should restart the dev server"
 "ANALYSIS: Port 3000 blocked. ACTION: Kill process 1234. RESULT: Port free"

 "I'm going to read the file to understand the structure"
 "Reading file..." [puis directement le contenu]

ÉCONOMIE DE TOKENS: Moins de blabla = plus de contexte utile
```

### R4: BOUCLE DE VÉRIFICATION DES RÈGLES
```
Au début de CHAQUE tâche:
1. Read: ./PROTOCOL.md (ce fichier)
2. Read: ./CLAUDE.md (projet)
3. Read: @~/.claude/CLAUDE.md (global)
4. État: "Following: PROTOCOL.md + CLAUDE.md + rules/"

Toutes les 5 actions:
- Re-read PROTOCOL.md règles R1-R5
- Vérifier: toujours sur tâche originale?
```

### R4-BIS: RÉTENTION CONTEXTE (NO GHOST CONTEXT)
```
PAS DE "GHOST CONTEXT":
- NE PAS assumer que je me souviens de ce qui a été fait 10 messages ago
- Log progression: État clair après chaque action importante
- Si confus → "CONTEXT SYNC NEEDED" → Demander utilisateur

Au START de CHAQUE sous-tâche:
1. READ CLAUDE.md (projet)
2. READ rules pertinentes
3. ÉTATER: "Context: Je suis sur <tâche>, voici où j'en suis"

LOGGING RECOMMANDÉ:
Après actions importantes:
"PROGRESS: <ce qui a été fait> | NEXT: <prochape étape>"
```

### R5: CHECK DE SANTÉ CONTEXTE
```
Si confus ou bloqué:
→ ARRÊT
→ État: "CONTEXT SYNC NEEDED"
→ Demande: "Shall I /clear and restart with fresh context?"

Signes de contexte pourri:
- Même action répétée 3+ fois
- Création de fichiers _v2
- Oubli des règles de base
- Boucles sur serveur/cache
```

---

##  RÈGLES SPÉCIFIQUES UI/CSS

### Protocole Modification CSS
```
Avant TOUT changement CSS:
1. Snapshot: chrome-devtools screenshot
2. Identifier: EXACTE classe à modifier
3. Changer: UNE classe à la fois
4. Vérifier: Nouveau snapshot
5. Si cassé → REVERT immédiatement → diagnostiquer

INTERDIT:
- Changer 10 classes d'un coup
- Modifier tailwind.config sans comprendre
- Ajouter !important en cascade
```

### Règles Composition Layout
```
NESTING MAX: 3 niveaux

Utiliser Atomic Design:
- Atomes: usage unique (Button, Input)
- Molécules: 2-3 atomes (FormGroup)
- Organismes: multiples molécules (Navbar)

INTERDIT:
- Layouts imbriqués > 3 niveaux
- Styles inline (utiliser Tailwind)
- Nombres magiques (utiliser design tokens)
- div spaghetti (pourquoi 50 divs?)
```

---

##  INTÉGRITÉ ARCHITECTURE

### Structure Fichiers
```
TOUJOURS suivre structure existante:
src/
├── app/           # Routing SEULEMENT - pas de logique métier
├── features/      # Logique métier par feature
├── ui/            # Composants présentationnels
└── lib/           # Utilitaires partagés

NE JAMAIS créer:
- src/utils-v2/, src/helpers-new/
- src/components-backup/
- Tout dossier avec suffixe version

RÈGLE: Si un dossier existe, l'utiliser. Pas de "nouvelle version"
```

### Règles Imports
```
FORWARD SEULEMENT: Feature → UI → Lib
IMPORT BACKWARD: INTERDIT (UI → Features)

Avant d'importer:
1. Vérifier si composant existe déjà
2. Chercher pattern d'import existant
3. Suivre barrel exports (index.ts)
```

---

##  UTILISATION DES OUTILS PAMACEA

### RTK (Rust Token Killer) - PAS Redux Toolkit
```
RTK = Rust Token Killer (token savings 60-90%)
RTK ≠ Redux Toolkit (confusion courante)

RTK est ACTIF - ne pas contourner:
- Commands auto-rewritten: git status, git log, etc.
- Ne JAMAIS lancer: git status directement (RTK le fait)
- Ne JAMAIS lancer: cat/grep directement (RTK read/grep)

Voir: @RTK.md pour commandes meta
```

### AUREUS (Versioned Release Convention)
```
Commit format automatique:
TYPE: PROJECT - vX.Y.Z
- Change 1

Types:
- RELEASE (MAJOR) → Breaking changes
- UPDATE (MINOR) → New features
- PATCH (PATCH) → Bug fixes

Voir: @AUREUS.md
```

### PARRY (Agentic Linter)
```
Validation automatique après Write/Edit:
- Tailwind classes
- Imports aliases
- React best practices
- TypeScript strict mode

Ne PAS désactiver les hooks PARRY

Voir: @PARRY.md
```

### ARGUS (Omniscient Memory Sentinel)
```
USAGE CONTINU (pas juste one-off):
AVANT exploration → argus recall "<contexte>"
PENDANT travail → argus index automatique
APRÈS résolution → argus remember "pattern"

CONTINUOUS MONITORING:
- Argus hooks actifs en SessionStart, PreToolUse, PostToolUse
- Utiliser argus recall AVANT de créer quoi que ce soit
- Utiliser argus remember APRÈS chaque résolution importante

Voir: @ARGUS.md
```

### PALNIA (Tasks CLI)
```
Pour intégration tâches/événements:
palnia tasks, palnia events, palnia habits, etc.

Voir: @PALNIA.md
```

---

##  RÉCOVERY D'ERREURS

### Quand Build Échoue
```
PROTOCOL:
1. Lire MESSAGE D'ERREUR attentivement
2. Identifier FICHIER causant l'erreur
3. Identifier LIGNE causant l'erreur
4. Corriger SEULEMENT cette ligne
5. Re-run build
6. Si encore failing → ARRÊT → Diagnostiquer → Demander

NE PAS:
- Supprimer node_modules/ (sauf si explicitement demandé)
- Supprimer .next/ cache (sauf si explicitement demandé)
- Modifier package.json versions en aveugle
- Créer fichiers workaround
- Boucler sur "clear cache"
```

### Quand Tests Échouent
```
PROTOCOL:
1. Lire TEST OUTPUT
2. Identifier QUEL test échoue
3. Lire TEST CODE
4. Lire SOURCE CODE testé
5. Corriger SOURCE CODE (pas le test, sauf si test faux)
6. Re-run test
7. Vérifier fix ne casse pas autres tests
```

---

##  QUALITY GATES (Obligatoires avant "Done")

CHaque tâche DOIT passer:
```
- [ ] Aucun fichier duplicata créé
- [ ] Aucun fichier _v2, _new, _backup
- [ ] Build compile sans erreurs
- [ ] Type checks pass (tsc --noEmit)
- [ ] Aucune erreur console navigateur
- [ ] Vérification visuelle (screenshot comparison si UI)
- [ ] PARRY validation OK
- [ ] Pas de warnings ignores
```

---

##  MÉTRIQUES SUCCÈS

Après chaque tâche, rapporter:
```
✓ Files modified: <count>
✓ Files created: <count>
✓ Files deleted: <count>
✓ Duplicates created: <MUST be 0>
✓ Build status: <passing/failing>
✓ Tests status: <passing/failing>
✓ PARRY checks: <passed/failed>
```

---

##  MODE DÉGRADÉ (Fallback)

Si tout va mal et tu sens que tu "spaghettis":
```
1. ARRÊT immédiat
2. État: "DEGRADED MODE - Context corrupted"
3. Demande utilisateur: "/clear and restart?"
4. Attendre confirmation
5. Fresh start avec contexte propre
```

---

##  RÉFÉRENCES RAPIDES

```
Outils Pamacea: @RTK.md @AUREUS.md @PARRY.md @ARGUS.md @PALNIA.md
Core Rules: @rules/00-core.md
Conventions: @rules/02-conventions.md
Quality Gates: @rules/quality-gates.md
Optimization: @docs/claude-code-optimization-masterclass.md
Workflow: @docs/claude-code-workflow-developers-guide.md
```

---

*PROTOCOL.md v1.1.0 - CRITICAL PRIORITY - READ FIRST - OVERRIDE CONFLICTS*
