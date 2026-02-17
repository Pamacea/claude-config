# Claude Config Installation Script
# Windows PowerShell

$ErrorActionPreference = "Stop"

$CLAUDE_DIR = "$env:USERPROFILE\.claude"
$PROJECT_DIR = $PSScriptRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Claude Config - Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour copier avec écrasement
function Copy-WithOverwrite {
    param([string]$Source, [string]$Destination)

    if (Test-Path $Source) {
        Write-Host "  Coping: $Source → $Destination" -ForegroundColor Gray
        Copy-Item -Path $Source -Destination $Destination -Force -Recurse
        return $true
    }
    return $false
}

# Créer les dossiers nécessaires
Write-Host "Creating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "$CLAUDE_DIR/rules" | Out-Null
New-Item -ItemType Directory -Force -Path "$CLAUDE_DIR/skills" | Out-Null
Write-Host "  Done" -ForegroundColor Green
Write-Host ""

# Installer les règles
Write-Host "Installing rules..." -ForegroundColor Yellow
$rulesCopied = 0
Get-ChildItem -Path "$PROJECT_DIR/rules\*.md" | ForEach-Object {
    if (Copy-WithOverwrite $_.FullName "$CLAUDE_DIR/rules\") {
        $rulesCopied++
    }
}
Write-Host "  Copied $rulesCopied rule files" -ForegroundColor Green
Write-Host ""

# Installer les skills
Write-Host "Installing skills..." -ForegroundColor Yellow
if (Test-Path "$PROJECT_DIR/skills") {
    $skillCount = 0
    Get-ChildItem -Path "$PROJECT_DIR/skills" -Directory | ForEach-Object {
        $dest = "$CLAUDE_DIR/skills/$($_.Name)"
        Copy-WithOverwrite $_.FullName $dest
        $skillCount++
    }
    Write-Host "  Copied $skillCount skill(s)" -ForegroundColor Green
} else {
    Write-Host "  No skills to copy" -ForegroundColor Gray
}
Write-Host ""

# Installer CLAUDE.md
Write-Host "Installing CLAUDE.md..." -ForegroundColor Yellow
if (Test-Path "$PROJECT_DIR\CLAUDE.md") {
    Copy-WithOverwrite "$PROJECT_DIR\CLAUDE.md" "$CLAUDE_DIR\CLAUDE.md"
    Write-Host "  Done" -ForegroundColor Green
} else {
    Write-Host "  Warning: CLAUDE.md not found" -ForegroundColor Red
}
Write-Host ""

# Installer les scripts
Write-Host "Installing scripts..." -ForegroundColor Yellow
if (Test-Path "$PROJECT_DIR\cleanup.ps1") {
    Copy-WithOverwrite "$PROJECT_DIR\cleanup.ps1" "$CLAUDE_DIR\cleanup.ps1"
}
if (Test-Path "$PROJECT_DIR\cleanup.sh") {
    Copy-WithOverwrite "$PROJECT_DIR\cleanup.sh" "$CLAUDE_DIR\cleanup.sh"
}
Write-Host "  Done" -ForegroundColor Green
Write-Host ""

# Installer .claudeignore
Write-Host "Installing .claudeignore..." -ForegroundColor Yellow
if (Test-Path "$PROJECT_DIR\.claudeignore") {
    Copy-WithOverwrite "$PROJECT_DIR\.claudeignore" "$CLAUDE_DIR\.claudeignore"
    Write-Host "  Done" -ForegroundColor Green
} else {
    Write-Host "  Warning: .claudeignore not found" -ForegroundColor Yellow
}
Write-Host ""

# Résumé
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installed files:" -ForegroundColor White
Write-Host "  - Rules: $CLAUDE_DIR\rules\" -ForegroundColor Gray
Write-Host "  - Skills: $CLAUDE_DIR\skills\" -ForegroundColor Gray
Write-Host "  - Config: $CLAUDE_DIR\CLAUDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Restart Claude Code" -ForegroundColor Gray
Write-Host "  2. Check that rules are loaded" -ForegroundColor Gray
Write-Host "  3. Customize rules for your needs" -ForegroundColor Gray
Write-Host ""
