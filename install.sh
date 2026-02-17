#!/bin/bash
# Claude Config Installation Script
# Linux/Mac

set -e

CLAUDE_DIR="$HOME/.claude"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================"
echo "  Claude Config - Installation"
echo "========================================"
echo ""

# Colors
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
CYAN='\033[1;36m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Create directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p "$CLAUDE_DIR/rules"
mkdir -p "$CLAUDE_DIR/skills"
echo -e "${GREEN}  Done${NC}"
echo ""

# Install rules
echo -e "${YELLOW}Installing rules...${NC}"
RULES_COPIED=0
for file in "$PROJECT_DIR/rules"/*.md; do
    if [ -f "$file" ]; then
        echo -e "${GRAY}  Copying: $(basename "$file")${NC}"
        cp -f "$file" "$CLAUDE_DIR/rules/"
        ((RULES_COPIED++))
    fi
done
echo -e "${GREEN}  Copied $RULES_COPIED rule files${NC}"
echo ""

# Install skills
echo -e "${YELLOW}Installing skills...${NC}"
if [ -d "$PROJECT_DIR/skills" ]; then
    SKILL_COUNT=0
    for skill_dir in "$PROJECT_DIR/skills"/*; do
        if [ -d "$skill_dir" ]; then
            echo -e "${GRAY}  Copying skill: $(basename "$skill_dir")${NC}"
            cp -rf "$skill_dir" "$CLAUDE_DIR/skills/"
            ((SKILL_COUNT++))
        fi
    done
    echo -e "${GREEN}  Copied $SKILL_COUNT skill(s)${NC}"
else
    echo -e "${GRAY}  No skills to copy${NC}"
fi
echo ""

# Install CLAUDE.md
echo -e "${YELLOW}Installing CLAUDE.md...${NC}"
if [ -f "$PROJECT_DIR/CLAUDE.md" ]; then
    cp -f "$PROJECT_DIR/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
    echo -e "${GREEN}  Done${NC}"
else
    echo -e "${GRAY}  Warning: CLAUDE.md not found${NC}"
fi
echo ""

# Install scripts
echo -e "${YELLOW}Installing scripts...${NC}"
if [ -f "$PROJECT_DIR/cleanup.sh" ]; then
    cp -f "$PROJECT_DIR/cleanup.sh" "$CLAUDE_DIR/cleanup.sh"
    chmod +x "$CLAUDE_DIR/cleanup.sh"
fi
if [ -f "$PROJECT_DIR/cleanup.ps1" ]; then
    cp -f "$PROJECT_DIR/cleanup.ps1" "$CLAUDE_DIR/cleanup.ps1"
fi
echo -e "${GREEN}  Done${NC}"
echo ""

# Install .claudeignore
echo -e "${YELLOW}Installing .claudeignore...${NC}"
if [ -f "$PROJECT_DIR/.claudeignore" ]; then
    cp -f "$PROJECT_DIR/.claudeignore" "$CLAUDE_DIR/.claudeignore"
    echo -e "${GREEN}  Done${NC}"
else
    echo -e "${GRAY}  Warning: .claudeignore not found${NC}"
fi
echo ""

# Summary
echo -e "${CYAN}========================================"
echo -e "${GREEN}  Installation Complete!"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${NC}Installed files:"
echo -e "${GRAY}  - Rules: $CLAUDE_DIR/rules/${NC}"
echo -e "${GRAY}  - Skills: $CLAUDE_DIR/skills/${NC}"
echo -e "${GRAY}  - Config: $CLAUDE_DIR/CLAUDE.md${NC}"
echo ""
echo -e "${NC}Next steps:"
echo -e "${GRAY}  1. Restart Claude Code${NC}"
echo -e "${GRAY}  2. Check that rules are loaded${NC}"
echo -e "${GRAY}  3. Customize rules for your needs${NC}"
echo ""
