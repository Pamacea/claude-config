# Quality Gates - Critères de Validation Objectifs

> **Version:** 1.0.0 | **Approche:** Criteria-Based Validation
>
> **Objectif:** Définir des critères d'acceptation mesurables pour chaque type de tâche,
> permettant à l'agent de valider son propre travail de manière objective.

---

## 🎯 Philosophie des Quality Gates

**Principe :** Un Quality Gate est un critère **observable** et **vérifiable** qui détermine
si une tâche est complète.

**Caractéristiques d'un bon Quality Gate :**
- ✅ Observable (peut être vérifié par un outil ou inspection)
- ✅ Spécifique (pas d'ambiguïté)
- ✅ Mesurable (peut être quantifié)
- ✅ Négociable (défini avec le utilisateur si nécessaire)

---

## 📋 Universal Quality Gates

Ces critères s'appliquent à **toutes** les tâches d'implémentation :

### Universal Core Gates

| Gate | Verification | Command |
|------|-------------|---------|
| **Code compiles** | Build successful | `npm run build` |
| **Type checks pass** | No type errors | `npm run typecheck` |
| **Lint passes** | No lint errors | `npm run lint` |
| **Tests pass** | All tests green | `npm test` |
| **No regressions** | Existing tests still pass | `npm test` |

---

## 🏗️ Quality Gates par Type de Tâche

### 1. Feature Development

**Contexte :** Création d'une nouvelle fonctionnalité

#### Mandatory Gates

- [ ] **E1 - User requirement met** : La fonctionnalité fait ce que l'utilisateur a demandé
- [ ] **E2 - Integration successful** : S'intègre proprement avec le code existant
- [ ] **E3 - No breaking changes** : Ne casse pas les fonctionnalités existantes
- [ ] **E4 - Tests passing** : Tests unitaires passent
- [ ] **E5 - Documentation updated** : README/API docs mis à jour si public

#### Verification Commands

```bash
# E4 - Tests
npm test -- --related

# E3 - No breaking changes
npm run build
npm run test:all

# E2 - Integration check
# Manual: Verify feature works in existing flow
```

#### Acceptance Criteria

```
✅ Feature works as specified in user request
✅ Code follows project patterns (check existing files)
✅ Tests cover happy path + edge cases
✅ No new warnings in console
✅ Performance acceptable (< 100ms for typical operation)
```

---

### 2. Bug Fix

**Contexte :** Correction d'un bug existant

#### Mandatory Gates

- [ ] **B1 - Root cause identified** : La cause racine est comprise
- [ ] **B2 - Fix applied** : Le fix corrige la cause racine (pas le symptôme)
- [ ] **B3 - Regression test added** : Test ajouté pour éviter réapparition
- [ ] **B4 - Tests pass** : Tous les tests passent
- [ ] **B5 - No side effects** : Pas d'effets secondaires observables

#### Verification Commands

```bash
# B4 - All tests
npm test

# B5 - No side effects
npm run test:e2e  # If available

# Manual verification
# Reproduce original bug → Verify fixed
# Test related features → Verify no regression
```

#### Acceptance Criteria

```
✅ Original bug cannot be reproduced
✅ Regression test covers the bug scenario
✅ Related features still work correctly
✅ No new warnings/errors introduced
```

---

### 3. Refactoring

**Contexte :** Modification de la structure sans changer le comportement

#### Mandatory Gates

- [ ] **R1 - Behavior preserved** : Comportement identique avant/après
- [ ] **R2 - Tests pass** : Tous les tests passent
- [ ] **R3 - Code reduced** : Moins de code (ou même quantité, meilleure qualité)
- [ ] **R4 - Complexity reduced** : Complexité cyclomatique réduite
- [ ] **R5 - No regressions** : Aucune régression détectable

#### Verification Commands

```bash
# R2 - Tests
npm test

# R4 - Complexity
npm run complexity  # If available

# R3 - Code reduction
git diff --stat  # Verify net reduction or improvement
```

#### Acceptance Criteria

```
✅ All tests pass with same results
✅ Code is more readable/maintainable
✅ Duplicated code eliminated
✅ Functionality identical (measure with benchmarks if critical)
```

---

### 4. Performance Optimization

**Contexte :** Amélioration des performances

#### Mandatory Gates

- [ ] **P1 - Baseline measured** : Performance mesurée avant optimisation
- [ ] **P2 - Improvement verified** : Amélioration mesurée après
- [ ] **P3 - Target met** : Objectif de performance atteint
- [ ] **P4 - No regressions** : Pas de régressions fonctionnelles
- [ ] **P5 - Stability maintained** : Stabilité maintenue

#### Verification Commands

```bash
# P1 & P2 - Measure before/after
npm run benchmark  # If available

# P4 - No regressions
npm test

# Manual verification
# Test typical user flows
```

#### Acceptance Criteria

```
✅ Measurable improvement (e.g., ≥ 20% faster)
✅ Functionality unchanged
✅ Memory usage acceptable (no leaks)
✅ Stability maintained (no crashes)
```

---

### 5. Security Fix

**Contexte :** Correction d'une vulnérabilité de sécurité

#### Mandatory Gates

- [ ] **S1 - Vulnerability understood** : Vulnérabilité identifiée et comprise
- [ ] **S2 - Fix applied correctly** : Fix appliqué selon les best practices
- [ ] **S3 - Test added** : Test de sécurité ajouté
- [ ] **S4 - No new vulnerabilities** : Pas de nouvelles vulnérabilités introduites
- [ ] **S5 - Documentation updated** : Documentation mise à jour si nécessaire

#### Verification Commands

```bash
# S3 - Security test
npm test -- security

# S4 - Scan for vulnerabilities
npm audit
# or
snyk test
```

#### Acceptance Criteria

```
✅ Vulnerability eliminated
✅ Security test covers the vulnerability
✅ No high/critical vulnerabilities in audit
✅ Fix follows security best practices
```

---

### 6. Documentation

**Contexte :** Création ou mise à jour de documentation

#### Mandatory Gates

- [ ] **D1 - Content accurate** : Contenu exact à jour de publication
- [ ] **D2 - Examples runnable** : Exemples de code exécutables
- [ ] **D3 - Structure clear** : Structure logique et navigable
- [ ] **D4 - Links valid** : Tous les liens fonctionnent
- [ ] **D5 - Complete coverage** : Couverture complète du sujet

#### Verification Commands

```bash
# D4 - Check links
npm run docs:check-links  # If available

# D2 - Test examples
# Copy-paste examples from docs → Verify they work
```

#### Acceptance Criteria

```
✅ User can follow guide end-to-end
✅ Code examples produce expected results
✅ Table of contents matches sections
✅ No broken links
✅ Spelling/grammar correct
```

---

### 7. Testing

**Contexte :** Ajout de tests

#### Mandatory Gates

- [ ] **T1 - Tests pass** : Nouveaux tests passent
- [ ] **T2 - Coverage increased** : Couverture augmentée (ou maintenue)
- [ ] **T3 - Tests meaningful** : Tests testent le comportement, pas l'implémentation
- [ ] **T4 - Fast execution** : Tests s'exécutent rapidement (< 5s pour unit tests)
- [ ] **T5 - Deterministic** : Tests sont déterministes (pas de random sans seed fixe)

#### Verification Commands

```bash
# T1 - Tests pass
npm test

# T2 - Coverage
npm run test:coverage

# T4 - Execution time
npm test -- --reporter=json  # Check duration
```

#### Acceptance Criteria

```
✅ New tests fail without implementation
✅ New tests pass with implementation
✅ Tests describe behavior, not implementation details
✅ Test names are descriptive
✅ Tests are independent (can run in any order)
```

---

### 8. Dependencies Update

**Contexte :** Mise à jour de dépendances

#### Mandatory Gates

- [ ] **D1 - Update tested** : Mise à jour testée en isolation
- [ ] **D2 - No breaking changes** : Pas de breaking changes non gérés
- [ ] **D3 - Build succeeds** : Build réussit
- [ ] **D4 - Tests pass** : Tous les tests passent
- [ ] **D5 - Security scan clean** : Scan de sécurité propre

#### Verification Commands

```bash
# D1 - Check package diff
npm outdated

# D3 - Build
npm run build

# D4 - Tests
npm test

# D5 - Security
npm audit
```

#### Acceptance Criteria

```
✅ Updated dependency works as expected
✅ No new warnings/errors
✅ No new vulnerabilities introduced
✅ Changelog reviewed for breaking changes
```

---

## 🎯 Quick Reference Matrix

| Task Type | Primary Gate | Verification Command |
|-----------|--------------|---------------------|
| Feature | User requirement met | `npm test` + manual verification |
| Bug Fix | Regression test added | `npm test` + reproduce bug |
| Refactor | Behavior preserved | `npm test` + `git diff` |
| Performance | Measurable improvement | `npm run benchmark` |
| Security | Vulnerability eliminated | `npm audit` + security test |
| Documentation | Examples runnable | Copy-paste verification |
| Testing | Coverage increased | `npm run test:coverage` |
| Dependencies | No breaking changes | `npm test` + `npm audit` |

---

## ✅ Pre-Delivery Checklist

Avant de considérer une tâche comme terminée :

### Core Verification
- [ ] Code compiles (`npm run build`)
- [ ] Type checks pass (`npm run typecheck`)
- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] No console errors/warnings

### Task-Specific Verification
- [ ] Quality gates pour le type de tâche appliqués
- [ ] Acceptance criteria spécifiques satisfaits

### Final Verification
- [ ] Fichiers modifiés listés dans le résumé
- [ ] Références de fichiers incluses (`file:line`)
- [ ] Prochaines étapes claires (si nécessaire)

---

## 📊 Measuring Success

### Metrics par Type de Tâche

| Task Type | Success Metric | Target |
|-----------|----------------|--------|
| Feature | User requirement coverage | 100% |
| Bug Fix | Bug cannot be reproduced | 100% |
| Refactor | Code reduction / Complexity down | ≥ 10% |
| Performance | Performance improvement | ≥ 20% |
| Security | Vulnerability eliminated | 100% |
| Documentation | Examples runnable | 100% |
| Testing | Coverage increase | ≥ 5% |
| Dependencies | No regressions | 100% |

---

## 🔧 Self-Validation Workflow

```
Task Completed
       ↓
Run Universal Gates
       ↓
   All Pass?
       ↓
   No → Fix issues
   Yes → Continue
       ↓
Run Task-Specific Gates
       ↓
   All Pass?
       ↓
   No → Fix issues
   Yes → Mark Complete
       ↓
Document Results
```

---

*Version: 1.0.0 | Quality Gates - Criteria-Based Validation*
