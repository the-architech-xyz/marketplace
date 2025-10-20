#!/bin/bash

# Drizzle Database Reset Script
# This script resets the Drizzle database to a clean state

set -e

echo "🔄 Resetting Drizzle database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Stop and remove containers
docker-compose -f docker-compose.drizzle.yml down

# Remove volumes
docker volume rm $(docker volume ls -q | grep drizzle) 2>/dev/null || true

# Start fresh
docker-compose -f docker-compose.drizzle.yml up -d drizzle-db

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until docker-compose -f docker-compose.drizzle.yml exec drizzle-db pg_isready -U drizzle_user -d <%= project.name %>_drizzle; do
    echo "   Database is unavailable - sleeping"
    sleep 2
done

# Run migrations
docker-compose -f docker-compose.drizzle.yml run --rm drizzle-migrate

echo "✅ Database reset completed successfully!"
