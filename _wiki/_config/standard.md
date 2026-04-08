# Standard de Métadonnées — LLM Wiki

> **Chaque fichier du wiki DOIT avoir ce bloc** immédiatement après le titre `#`.

---

## Format du Bloc

```markdown
**Type:** knowledge
**Summary:** Une phrase au présent décrivant le contenu
**Tags:** #domain #type #topic
**Status:** active
**Updated:** YYYY-MM-DD
**Related:** [fichier1], [fichier2]
```

---

## Champs

### Requis

| Champ | Description | Valeurs |
|-------|-------------|---------|
| **Type** | Nature du contenu | `knowledge`, `decision`, `initiative`, `meeting`, `journal`, `todo`, `status`, `reference` |
| **Summary** | UNE phrase au présent — le champ le plus important | Libre (pas de "Auto-generated") |
| **Tags** | 2-5 tags `#`-préfixés, vocabulaire contrôlé | `#claude-code #frontend #rust #decision` |
| **Status** | État actuel du contenu | `active`, `draft`, `archived`, `complete`, `blocked` |
| **Updated** | Date ISO de dernière modif | `2026-04-08` |

### Optionnels

| Champ | Description |
|-------|-------------|
| **Owner** | Personne ou rôle responsable |
| **Related** | Liens vers fichiers liés `[file1], [file2]` |

---

## Pourquoi Bold Fields (pas YAML)

- Rend dans **tout** visualiseur markdown (GitHub, Obsidian, VS Code)
- Lisible en brut sans parser
- Fonctionne avec tout LLM sans plugin
- Pas de dépendance au frontmatter YAML

---

## Règles d'Usage

### Quand Écrire
- Inclure le bloc sur **chaque** nouveau fichier
- Mettre à jour `**Updated:**` et `**Summary:**` à chaque modification significative
- Choisir le bon `Type` — c'est ce qui permet le routing

### Quand Consulter
- Scanner les `**Summary:**` avant de lire les fichiers complets
- Utiliser les `**Tags:**` pour le filtrage
- Vérifier `**Updated:**` pour la fraîcheur (>90 jours = stale)
- Citer les sources avec le chemin + date

### Summary — Le Champ Clé

Le `**Summary:**` est le champ le plus important. C'est ce que l'IA scanne en premier.

**Bon:** "Patterns et conventions pour Next.js 16 avec App Router et Server Actions"
**Mauvais:** "Auto-generated file" / "Next.js stuff" / "Voir le code"
