#!/bin/bash

# Drizzle Database Cleanup Script
# This script cleans up old backups and temporary files

set -e

BACKUP_DIR="./backups"
DAYS_TO_KEEP=7

echo "🧹 Cleaning up Drizzle database files..."

# Clean up old backups
if [ -d "$BACKUP_DIR" ]; then
    echo "🗑️  Removing backups older than $DAYS_TO_KEEP days..."
    find "$BACKUP_DIR" -name "drizzle_backup_*.sql" -mtime +$DAYS_TO_KEEP -delete
    echo "✅ Old backups cleaned up"
else
    echo "ℹ️  No backup directory found"
fi

# Clean up Docker volumes (optional)
read -p "Do you want to remove Docker volumes? This will delete all data! (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing Docker volumes..."
    docker volume rm $(docker volume ls -q | grep drizzle) 2>/dev/null || true
    echo "✅ Docker volumes cleaned up"
fi

echo "✅ Cleanup completed successfully!"
