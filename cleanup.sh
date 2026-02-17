#!/bin/bash

# Liste des dossiers à supprimer
TARGETS=(
    "todos" "teams" "tasks" "shell-snapshots" 
    "session-env" "projects" "plans" "paste-cache" "file-history" "debug"
)

echo "Nettoyage en cours..."

for folder in "${TARGETS[@]}"; do
    if [ -d "$folder" ]; then
        echo "Suppression de : $folder"
        rm -rf "$folder"
    fi
done

echo "Nettoyage terminé !"