---
name: trigmem-verification
description: "TrigMem Verification - Quality Gates — triggers: verify"
---

# TrigMem Verification - Quality Gates

> **Version:** 2.0.0 | **Category:** Cat 0 (Meta-Memory) | **Difficulty:** Intermediate
> **Auto-Activation:** "verify", "check", "validate", "audit", "is this correct"
> **Tags:** [verification, validation, quality, audit, checklist]
> **Related:** trigmem-core, trigmem-categories, trigmem-storage
> **Last Updated:** 2025-02-24

---

## 🎯 Auto-Activation

**This skill auto-activates when:**
- Validating TrigMem implementation
- Checking classification accuracy
- Verifying storage decisions
- Auditing token efficiency

**Progressive Disclosure:**
1. **Metadata** → Validation checks
2. **Instructions** → Full verification process
3. **Resources** → Audit templates

---

## 📊 VERIFICATION CHECKLISTS

### Category 1: Project Identity

**Checklist:**
```markdown
Location: CLAUDE.md
☐ Project name present?
☐ One-liner description?
☐ Tech stack listed (max 5 items)?
☐ Directory structure included?
☐ Quick start commands?
☐ < 100 lines total?
☐ No code examples (delegate to skills)?
```

**Verification:**
```bash
# Check line count
wc -l ~/.claude/CLAUDE.md

# Should be < 100 lines
```

---

### Category 2: Structure & Architecture

**Checklist:**
```markdown
Location: CLAUDE.md + rules/02-conventions.md
☐ Directory structure in CLAUDE.md?
☐ Import rules clearly defined?
☐ Architecture pattern specified?
☐ Reference to detailed rules?
☐ No duplication with other rules?
```

**Verification:**
```bash
# Check for duplication
grep -r "import.*from.*features" ~/.claude/

# Should be in 02-conventions.md only
```

---

### Category 3: Context & Nuance

**Checklist:**
```markdown
Location: Session context only
☐ NOT stored in CLAUDE.md?
☐ NOT in rules/?
☐ NOT in skills/?
☐ Session-specific marker present?
☐ Temporary decision noted?
```

**Verification:**
```bash
# Should NOT appear in persistent storage
grep -r "session specific" ~/.claude/{CLAUDE.md,rules/,skills/}

# Should return empty
```

---

### Category 4: Reusable Patterns

**Checklist:**
```markdown
Location: skills/[name]/SKILL.md
☐ Skill has SKILL.md file?
☐ Auto-activation defined?
☐ Progressive disclosure structure?
☐ Portable across projects?
☐ Metadata section present?
☐ NOT duplicated in CLAUDE.md?
☐ NOT duplicated in rules/?
```

**Verification:**
```bash
# Check skill structure
ls ~/.claude/skills/[name]/
# Should contain: SKILL.md

# Check for duplication
grep -r "[pattern content]" ~/.claude/{CLAUDE.md,rules/}
# Should not duplicate skill content
```

---

### Category 5: Operational Guides

**Checklist:**
```markdown
Location: skills/[name]/SKILL.md
☐ Skill has SKILL.md file?
☐ Workflow clearly defined?
☐ Step-by-step instructions?
☐ Examples included?
☐ Portable across projects?
☐ NOT code pattern (use patterns/ instead)?
```

**Verification:**
```bash
# Check operation skill
ls ~/.claude/skills/[name]/
# Should contain: SKILL.md

# Verify it's workflow, not pattern
grep -E "(workflow|step|process)" ~/.claude/skills/[name]/SKILL.md
```

---

### Category 6: Corrections & Anti-Patterns

**Checklist:**
```markdown
Location: rules/01-nevers.md or other rule files
☐ Blocking rule format (❌ NEVER | ✅ ALWAYS)?
☐ Clear anti-pattern?
☐ Correct alternative provided?
☐ Code examples (bad vs good)?
☐ In appropriate rule file?
```

**Verification:**
```bash
# Check rule format
grep -E "(❌ NEVER|✅ ALWAYS)" ~/.claude/rules/01-nevers.md
# Should have multiple entries

# Check for examples
grep -A 10 "❌ BAD" ~/.claude/rules/01-nevers.md
# Should show bad + good examples
```

---

## 🎯 TOKEN EFFICIENCY VERIFICATION

### Base Context Budget

**Target:** < 10k tokens

**Checklist:**
```markdown
☐ CLAUDE.md < 2k tokens?
☐ rules/ total < 8k tokens?
☐ Skills not loaded (0 tokens)?
☐ Total base < 10k tokens?
```

**Verification:**
```bash
# Count CLAUDE.md tokens (approximate)
wc -w ~/.claude/CLAUDE.md
# 1 word ≈ 1.3 tokens
# Should be < 1500 words (~2k tokens)

# Count rules tokens
wc -w ~/.claude/rules/*.md
# Total should be < 6000 words (~8k tokens)
```

---

### Progressive Disclosure Verification

**Checklist:**
```markdown
Skills Structure:
☐ Metadata section (quick reference)?
☐ Instructions section (full content)?
☐ Resources section (examples)?
☐ Clear sections with ## markers?
☐ Loads on-demand (not in base context)?
```

**Verification:**
```bash
# Check skill structure
grep -E "(## Metadata|## Instructions|## Resources)" ~/.claude/skills/*/SKILL.md
# Should exist in each skill

# Verify on-demand (not referenced in CLAUDE.md)
grep -r "skills/" ~/.claude/CLAUDE.md
# Should only mention as reference, not load content
```

---

## 🔄 STORAGE DECISION VERIFICATION

### Decision Tree Test

**Scenario:** User asks "Where should I store X?"

**Verification Steps:**

1. **Identify information type**
   ```markdown
   ☐ Project identity? → Cat 1
   ☐ Structure/architecture? → Cat 2
   ☐ Reusable pattern? → Cat 4
   ☐ Workflow/operations? → Cat 5
   ☐ Correction/anti-pattern? → Cat 6
   ☐ Context-specific? → Don't store
   ```

2. **Verify storage location**
   ```markdown
   ☐ Correct location chosen?
   ☐ Not duplicated elsewhere?
   ☐ Appropriate format used?
   ☐ Token efficient?
   ```

3. **Test retrieval**
   ```markdown
   ☐ Easy to find?
   ☐ Clear category?
   ☐ Quick access?
   ☐ Properly labeled?
   ```

---

## 📋 AUDIT TEMPLATE

### Monthly TrigMem Audit

**Purpose:** Ensure optimal configuration

**Checklist:**
```markdown
Storage Audit:
☐ CLAUDE.md < 100 lines?
☐ rules/ < 10 files?
☐ All skills have SKILL.md?
☐ No duplication across files?
☐ Progressive disclosure working?

Token Audit:
☐ Base context < 10k tokens?
☐ Skills on-demand?
☐ No bloat in CLAUDE.md?
☐ Rules minimal but complete?

Classification Audit:
☐ All info categorized (Cat 1-6)?
☐ Context info NOT persisted?
☐ Portable info in skills/?
☐ Blocking info in rules/?

Usage Audit:
☐ Skills load correctly?
☐ Decision framework working?
☐ Memory search functional?
☐ Sub-agents spawn correctly?
```

---

## 🧪 TEST CASES

### Test Case 1: Project Identity

**Input:** "What is this project?"

**Expected:**
```markdown
1. Find in CLAUDE.md
2. Return: Project name, stack, purpose
3. Token cost: ~1k
4. Time: Instant
```

**Verification:**
```bash
# Test: Read CLAUDE.md
cat ~/.claude/CLAUDE.md

# Should contain:
# - Project name
# - Stack
# - Purpose
# - < 100 lines
```

---

### Test Case 2: Pattern Loading

**Input:** "How do I implement Server Components?"

**Expected:**
```markdown
1. Recognize: Reusable pattern request
2. Load: /nextjs
3. Find: Server Components section
4. Apply: User's project
5. Token cost: ~3k (skill only)
```

**Verification:**
```bash
# Test: Load skill
ls ~/.claude/skills/nextjs/SKILL.md

# Should exist and contain:
# - Server Components pattern
# - Code examples
# - Best practices
```

---

### Test Case 3: Decision Routing

**Input:** "Build payment system"

**Expected:**
```markdown
1. Recognize: Complex workflow
2. Decision: Spawn sub-agent
3. Task: "Implement Stripe payment"
4. Context: Provide project details
5. Token cost: Isolated context
```

**Verification:**
```bash
# Test: Decision framework
# Input: Complex task
# Expected: Sub-agent spawned
# Actual: Check implementation
```

---

## 💡 KEY INSIGHTS

### Verification Principles

1. **Categorization** → Correct storage
2. **Token Efficiency** → Minimal base context
3. **Progressive Disclosure** → On-demand loading
4. **No Duplication** → Single source of truth

### Common Issues

**Issue:** Bloated CLAUDE.md
**Fix:** Move details to skills/, keep CLAUDE.md minimal

**Issue:** Duplicated content
**Fix:** Single source of truth, reference elsewhere

**Issue:** High token cost
**Fix:** Progressive disclosure, on-demand skills

**Issue:** Poor categorization
**Fix:** Apply 6-category system consistently

---

## 🎯 QUICK REFERENCE

```
Verification Checks:
├─ Cat 1: CLAUDE.md < 100 lines
├─ Cat 2: Structure in CLAUDE.md + rules
├─ Cat 3: NOT persisted (session only)
├─ Cat 4: Pattern in skills/
├─ Cat 5: Operation in skills/
└─ Cat 6: Correction in rules/

Token Budget:
├─ CLAUDE.md: < 2k tokens
├─ rules/: < 8k tokens
├─ skills/: 0 tokens (on-demand)
└─ Total: < 10k tokens

Audit Frequency:
├─ Weekly: Quick checks (line counts)
├─ Monthly: Full audit (all checklists)
└─ Quarterly: Optimization (remove bloat)
```

---

*Version: 1.0.0 | TrigMem Verification Skill*
