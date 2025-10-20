#!/bin/bash

# Drizzle Database Restore Script
# This script restores a backup of the Drizzle database

set -e

BACKUP_DIR="./backups"

if [ -z "$1" ]; then
    echo "❌ Please provide a backup file name."
    echo "Usage: $0 <backup_file.sql>"
    echo "Available backups:"
    ls -la "$BACKUP_DIR"/*.sql 2>/dev/null || echo "  No backups found"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_DIR/$BACKUP_FILE"
    exit 1
fi

echo "🔄 Restoring Drizzle database from: $BACKUP_FILE"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Restore backup
docker-compose -f docker-compose.drizzle.yml exec -T drizzle-db psql -U drizzle_user -d <%= project.name %>_drizzle < "$BACKUP_DIR/$BACKUP_FILE"

echo "✅ Database restored successfully!"
