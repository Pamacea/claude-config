# MCP Tools - Optimal Workflows

> **Version:** 2.0.0 | **Approche:** Recommandations Optimales
>
> **Changement majeur:** Version basée sur des workflows optimaux et des
> patterns d'utilisation recommandés.

---

## 🎯 Core Principle

**Avant toute action significative, considérer :**
1. **Memory First** → Rechercher dans claude-mem
2. **Version Control** → Git Flow Master pour commits
3. **UI Testing** → Chrome DevTools pour debug UI
4. **Visual Analysis** → z-ai pour images/vidéos

---

## 📊 MCP Reference Guide

| MCP | Optimal For | Trigger Keywords | Priority |
|-----|-------------|------------------|----------|
| **claude-mem** | Reusing past solutions | "did we", "how did we", "remember" | 1 (Memory first) |
| **git-flow-master** | Versioned commits | "commit", "release", "update", "patch" | 2 (After gates) |
| **chrome-devtools** | UI debugging/testing | "debug UI", "test page", "screenshot" | 3 (When UI work) |
| **z-ai** | Visual analysis | "analyze image", "screenshot error", "video" | 4 (Visual content) |
| **web-reader** | Fetching docs | "read URL", "fetch page", "scrape" | 5 (Before implementing) |
| **web-search-prime** | Latest info | "latest docs", "current info", "search" | 5 (Before implementing) |

---

## 🧠 CLAUDE-MEM - Memory Reuse

### Optimal Usage Workflow

**Utiliser claude-mem pour :**
- ✅ Retrouver des solutions passées
- ✅ Comprendre comment quelque chose a été implémenté
- ✅ Éviter de répéter les erreurs
- ✅ Sauvegarder les patterns pour le futur

### Search-First Workflow

```markdown
Avant d'implémenter :
1. Search claude-mem pour problèmes similaires
2. Vérifier si solution existe déjà
3. Utiliser l'approche existante si trouvée

Après résolution :
1. Sauvegarder solution dans claude-mem
2. Inclure contexte et code snippet
3. Rendre searchable avec bon titre/tags
```

### Memory Categories

| Category | What to Store |
|----------|---------------|
| **Solutions** | Patterns de code fonctionnels |
| **Mistakes** | Ce qui n'a pas fonctionné (pour éviter) |
| **Decisions** | Choix techniques + rationale |
| **Workflows** | Processus répétables |

---

## 🔄 GIT FLOW MASTER - Versioned Commits

### Optimal Usage Workflow

**Utiliser git-flow-master pour :**
- ✅ Créer commits versionnés (RELEASE, UPDATE, PATCH)
- ✅ Analyser les changements pour impact SemVer
- ✅ Générer les release notes
- ✅ Valider les messages de commit

### Commit Workflow Standard

```markdown
Avant commit :
1. git_get_status → Voir les changements
2. git_get_diff → Voir les changements exacts
3. git_suggest_type → Obtenir le type de commit
4. git_generate_message → Générer message formaté
5. Run quality gates (lint, typecheck, test)
6. git_versioned_commit → Créer commit

Après feature complète :
1. git_analyze_commits → Vérifier impact SemVer
2. git_suggest_version → Obtenir numéro de version
3. git_create_release → Créer release + changelog
```

### Commit Format Standard

```
TYPE: PROJECT_NAME - vX.Y.Z

- Change 1
- Change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Commit Types

| Type | SemVer | Contexte |
|------|--------|----------|
| **RELEASE** | MAJOR | Breaking changes API publique |
| **UPDATE** | MINOR | Nouvelles fonctionnalités |
| **PATCH** | PATCH | Corrections de bugs |

---

## 🌐 CHROME DEVTOOLS - UI Testing

### Optimal Usage Workflow

**Utiliser chrome-devtools pour :**
- ✅ Debugger les problèmes de layout
- ✅ Tester les éléments interactifs
- ✅ Prendre des screenshots pour vérification
- ✅ Vérifier les erreurs console
- ✅ Analyser les requêtes réseau

### UI Debugging Workflow

```markdown
1. list_pages → Voir les pages ouvertes
2. select_page → Choisir la page à travailler
3. navigate_page → Aller à l'URL
4. take_snapshot → Obtenir la structure de la page
5. list_console_messages → Vérifier les erreurs
6. take_screenshot → Vérification visuelle
```

### Interactive Testing Workflow

```markdown
1. fill_form → Remplir champs multiples
2. evaluate_script → Exécuter JS custom
3. list_network_requests → Vérifier appels API
```

---

## 🖼️ Z-AI - Visual Analysis

### Optimal Usage

**Utiliser z-ai pour :**
- ✅ Convertir designs UI en code
- ✅ Debugger des erreurs via screenshots
- ✅ Comparer deux designs/implémentations
- ✅ Extraire du texte d'images
- ✅ Analyser des graphiques/data visualizations

### Tools Overview

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `ui_to_artifact` | UI → Code/prompt/spec | Converting designs |
| `extract_text_from_screenshot` | OCR extraction | Error messages, code |
| `diagnose_error_screenshot` | Debug errors | Debugging crashes |
| `ui_diff_check` | Compare two UIs | Design vs implementation |
| `analyze_data_visualization` | Charts analysis | Dashboard debugging |
| `analyze_video` | Video content | Tutorial/feature analysis |

---

## 📖 WEB READER & SEARCH - Documentation

### Optimal Usage

**web-reader pour :**
- ✅ Lire les pages de documentation
- ✅ Récupérer le contenu d'URLs
- ✅ Obtenir les articles en markdown

**web-search-prime pour :**
- ✅ Trouver la documentation récente
- ✅ Rechercher les best practices actuelles
- ✅ Voir ce qui est nouveau dans les frameworks

### Verification Workflow (Post-2024 Libraries)

```markdown
Avant d'implémenter :
1. web-search-prime → Trouver docs récents
2. web-reader → Lire documentation complète
3. Vérifier breaking changes
4. Tester exemples en isolation
```

---

## ✅ Pre-Action Checklists

### Before Implementing Feature

```markdown
Memory Check :
☐ Search claude-mem for similar implementations
☐ Check if solution exists in project memory
☐ Look for past mistakes to avoid

Code Quality :
☐ Check for existing reusable components
☐ Verify patterns in project
☐ Consider delete-first approach

After Implementation :
☐ Save successful pattern to claude-mem
☐ Document any new decisions
☐ Update project memory if needed
```

### Before Committing

```markdown
Git Workflow :
☐ git_get_status → Check changes
☐ git_suggest_type → Get commit type
☐ git_generate_message → Format message
☐ Run quality gates (lint, typecheck, test)
☐ git_versioned_commit → Create commit
```

### Before UI Work

```markdown
UI Debugging :
☐ Navigate to page with chrome-devtools
☐ Take snapshot for structure
☐ Check console for errors
☐ Take screenshot for visual check
☐ Test interactions if needed
```

---

## 🎯 MCP Selection Guide

```
┌─────────────────────────────────────────┐
│ What do you need to do?                 │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Check memory / reuse past work?         │ → claude-mem
├─────────────────────────────────────────┤
│ Commit changes with versioning?         │ → git-flow-master
├─────────────────────────────────────────┤
│ Debug/test UI in browser?               │ → chrome-devtools
├─────────────────────────────────────────┤
│ Analyze image/screenshot/video?         │ → z-ai
├─────────────────────────────────────────┤
│ Read docs from URL?                     │ → web-reader
├─────────────────────────────────────────┤
│ Search latest info online?              │ → web-search-prime
└─────────────────────────────────────────┘
```

---

## 💡 Self-Reminder Prompts

### Pour Claude (Auto-Suggestion)

```
Quand travaillant sur tâche :
→ "Let me check claude-mem for similar solutions first"
→ "I should use git-flow-master for this commit"
→ "Let me debug this with chrome-devtools"
→ "I can analyze this screenshot with z-ai"

Avant de commit :
→ "Let me use git-flow-master to format this properly"

Après résolution :
→ "Let me save this to claude-mem for future reference"
```

---

## 🔧 MCP Configuration

### MCPs Recommandés

```json
{
  "mcpServers": {
    "claude-mem": { /* Config */ },
    "git-flow-master": { /* Config */ },
    "chrome-devtools": { /* Config */ },
    "z-ai": { /* Config */ },
    "web-reader": { /* Config */ },
    "web-search-prime": { /* Config */ }
  }
}
```

---

## ✅ Quality Gates

### MCP Usage Gates

MCP utilisé efficacement quand :
- [ ] claude-mem recherché avant implémentation
- [ ] git-flow-master utilisé pour tous commits
- [ ] chrome-devtools utilisé pour debug UI
- [ ] z-ai utilisé pour analyse visuelle
- [ ] web-search-prime utilisé pour docs récentes
- [ ] Patterns sauvegardés dans claude-mem
- [ ] Messages de commit cohérents
- [] Moins de questions/issues répétitives

---

*Version: 2.0.0 | MCP Tools - Optimal Workflows*
