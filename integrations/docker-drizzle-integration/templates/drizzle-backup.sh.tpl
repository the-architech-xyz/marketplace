#!/bin/bash

# Drizzle Database Backup Script
# This script creates a backup of the Drizzle database

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="drizzle_backup_${TIMESTAMP}.sql"

echo "💾 Creating Drizzle database backup..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Create backup
docker-compose -f docker-compose.drizzle.yml exec -T drizzle-db pg_dump -U drizzle_user -d {{project.name}}_drizzle > "$BACKUP_DIR/$BACKUP_FILE"

echo "✅ Backup created: $BACKUP_DIR/$BACKUP_FILE"
