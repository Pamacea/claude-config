# cleanup.ps1 — Purge du contexte local Claude Code
# Usage : pwsh -File "$HOME\.claude\cleanup.ps1" [-ArchiveHistory:$false]
# Chemins absolus ($MyInvocation) : fonctionne depuis n'importe quel répertoire.

param(
    [switch]$ArchiveHistory = $true,   # Archive history.jsonl dans backups/ avant purge
    [int]$HistoryKeepLines = 200       # Lignes conservées si -ArchiveHistory:$false
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backups = Join-Path $root "backups"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

# --- 1. Dossiers de contexte/session à purger ---
# (backups/ exclu : c'est la destination d'archive)
$targets = @(
    "todos", "teams", "tasks", "shell-snapshots",
    "session-env", "projects", "plans", "paste-cache", "file-history",
    "debug", "cache", ".strike", "sessions", "telemetry"
)

foreach ($folder in $targets) {
    $path = Join-Path $root $folder
    if (Test-Path $path) {
        Write-Host "Suppression : $folder" -ForegroundColor Cyan
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# --- 2. Rotation de history.jsonl (235K+ de commandes obsolètes) ---
$history = Join-Path $root "history.jsonl"
if (Test-Path $history) {
    $size = (Get-Item $history).Length
    if ($size -gt 1KB) {
        if (-not (Test-Path $backups)) { New-Item -ItemType Directory -Path $backups | Out-Null }
        if ($ArchiveHistory) {
            $archive = Join-Path $backups "history-$stamp.jsonl"
            Copy-Item $history $archive -Force
            try {
                Compress-Archive -Path $archive -DestinationPath "$archive.zip" -Force
                Remove-Item $archive -Force
                Write-Host "Archivé : history.jsonl ($([math]::Round($size/1KB,1)) KB) -> backups/history-$stamp.jsonl.zip" -ForegroundColor Yellow
            }
            catch {
                Write-Host "Archivé : history.jsonl -> $archive (compression impossible)" -ForegroundColor Yellow
            }
            # Purge complète (l'archive fait foi)
            Set-Content -Path $history -Value "" -NoNewline
        }
        else {
            $lines = Get-Content $history -Tail $HistoryKeepLines
            Set-Content -Path $history -Value $lines
            Write-Host "Élagué : history.jsonl -> $HistoryKeepLines dernières lignes" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "history.jsonl : rien à purger" -ForegroundColor DarkGray
    }
}

# --- 3. Rapport ---
Write-Host "Nettoyage terminé !" -ForegroundColor Green
