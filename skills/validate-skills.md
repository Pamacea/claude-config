# Skill Validation System

> **Version:** 1.0.0 | **Purpose:** Automated skill quality validation
> **Last Updated:** 2025-02-24

---

## 🎯 Usage

```bash
# Validate all skills
/studio build --validate "all skills"

# Validate specific skill
/studio build --validate "skill: nextjs-patterns"

# Validate by category
/studio build --validate "category: patterns"
```

---

## 📋 Validation Checklist

### 1. Structure Validation

```markdown
Required Sections:
☐ Metadata block (version, category, auto-activation, tags, related, last_updated)
☐ Auto-Activation section
☐ Quick Start section (≤ 3 commands)
☐ Quick Reference table
☐ Core Concepts / Patterns section
☐ Anti-Patterns table (❌/✅ format)
☐ Troubleshooting table
☐ Best Practices checklist
☐ Related Skills section
☐ Success Criteria section

File Structure:
☐ File named SKILL.md (for skills) or [name].skill (for patterns)
☐ Located in correct directory (patterns/, operations/, or root)
☐ Follows TEMPLATE.md structure
☐ No duplicate content
```

### 2. Format Validation

```markdown
Metadata:
☐ Version: X.X.X format
☐ Category: Cat 0-6 or Cat X (Name)
☐ Difficulty: Beginner/Intermediate/Advanced (optional)
☐ Auto-Activation: Clear trigger conditions
☐ Tags: [tag1, tag2, tag3] format
☐ Related: [skill1], [skill2] format
☐ Last Updated: YYYY-MM-DD format

Content:
☐ Valid markdown
☐ Proper heading hierarchy (##, ###)
☐ Code blocks with language tags
☐ Tables properly formatted
☐ No broken links
```

### 3. Content Validation

```markdown
Quality:
☐ Quick Start ≤ 3 commands
☐ All code examples runnable
☐ Anti-Patterns in table format (❌ NEVER | ✅ ALWAYS)
☐ Troubleshooting in table format
☐ Success Criteria checklist format
☐ Examples are current (not deprecated)

Completeness:
☐ No TODO placeholders
☐ No "Coming soon" sections
☐ No empty sections
☐ All cross-references valid
☐ All related skills exist
```

### 4. Token Efficiency

```markdown
Size Guidelines:
☐ File < 500 lines (prefer < 300)
☐ Quick Start section < 30 lines
☐ Metadata section < 50 lines
☐ Progressive disclosure applied

Token Budget:
☐ Metadata: ~200-300 tokens
☐ Instructions: ~1000-1500 tokens
☐ Resources: ~500-1000 tokens
☐ Total: ~2000-3000 tokens max
```

### 5. Cross-Reference Validation

```markdown
Internal References:
☐ All [skill-name] references exist in INDEX.md
☐ All related skills listed in INDEX.md
☐ No circular references

External References:
☐ All links valid (check if accessible)
☐ Documentation links current
☐ No broken URLs
```

---

## 🔧 Validation Commands

### Check All Skills

```bash
# List all skills
find ~/.claude/skills -name "SKILL.md" -o -name "*.skill"

# Count lines in each skill
find ~/.claude/skills -name "SKILL.md" -exec wc -l {} \;

# Check for required sections
grep -l "## 🎯 Auto-Activation" ~/.claude/skills/*/SKILL.md
grep -l "## ⚠️ Anti-Patterns" ~/.claude/skills/*/SKILL.md
grep -l "## 🔧 Troubleshooting" ~/.claude/skills/*/SKILL.md
```

### Validate Specific Skill

```bash
# Check structure
grep -E "(## 🎯 Auto-Activation|## 🚀 Quick Start|## ⚠️ Anti-Patterns|## 🔧 Troubleshooting)" ~/.claude/skills/patterns/nextjs/SKILL.md

# Check metadata
grep -A 7 "> \*\*Version:\*\*" ~/.claude/skills/patterns/nextjs/SKILL.md

# Check for broken links
# (Manual check required)
```

### Validate by Category

```bash
# Validate TrigMem skills
for skill in ~/.claude/skills/trigmem-*/SKILL.md; do
    echo "Validating $skill"
    # Run validation checks
done

# Validate Pattern skills
for skill in ~/.claude/skills/patterns/*/SKILL.md ~/.claude/skills/patterns/*/*.skill; do
    echo "Validating $skill"
    # Run validation checks
done
```

---

## 📊 Validation Report Template

```markdown
# Skill Validation Report

**Date:** YYYY-MM-DD
**Scope:** All skills / Specific skill / Category

---

## Summary

- **Total Skills:** X
- **Valid:** Y
- **Invalid:** Z
- **Warnings:** W

---

## Detailed Results

### ✅ Valid Skills

- [x] trigmem-core
- [x] trigmem-categories
- ...

### ❌ Invalid Skills

- [ ] trigmem-decision
  - Missing: Troubleshooting section
  - Fix: Add troubleshooting table

- [ ] nextjs-patterns
  - Broken: Link to outdated docs
  - Fix: Update documentation link

### ⚠️ Warnings

- [ ] rust-axum
  - Warning: File size 550 lines (exceeds 500)
  - Recommendation: Split into multiple files

---

## Recommendations

1. [High priority fix]
2. [Medium priority fix]
3. [Low priority improvement]

---

## Next Steps

- [ ] Fix invalid skills
- [ ] Address warnings
- [ ] Re-validate
```

---

## 🎯 Success Criteria

Validation is complete when:
- [ ] All skills have required sections
- [ ] All skills follow template structure
- [ ] All metadata is complete and correct
- [ ] All cross-references are valid
- [ ] All files are within size limits
- [ ] All code examples are runnable
- [ ] All links are valid

---

## 💡 Key Insights

### Why Validation Matters

1. **Consistency** - All skills follow same structure
2. **Quality** - All content is complete and accurate
3. **Maintainability** - Easy to update and extend
4. **User Experience** - Progressive disclosure works correctly

### Common Issues

- **Missing sections** → Follow TEMPLATE.md
- **Broken links** → Update documentation links
- **Oversized files** → Split into multiple skills
- **Missing metadata** → Add complete metadata block
- **Invalid cross-refs** → Verify skills exist in INDEX.md

---

*Version: 1.0.0 | Skill Validation System*
