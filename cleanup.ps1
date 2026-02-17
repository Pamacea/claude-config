# Liste des dossiers à supprimer
$targets = @(
    "todos", "teams", "tasks", "shell-snapshots",
    "session-env", "projects", "plans", "paste-cache", "file-history", "debug"
)

foreach ($folder in $targets) {
    if (Test-Path $folder) {
        Write-Host "Suppression de : $folder" -ForegroundColor Cyan
        Remove-Item -Path $folder -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "Nettoyage terminé !" -ForegroundColor Green