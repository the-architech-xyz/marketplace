#!/bin/bash

# Drizzle Migration Script
# This script runs Drizzle migrations in the Docker environment

set -e

echo "🔄 Running Drizzle migrations..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Run migrations using Docker Compose
docker-compose -f docker-compose.drizzle.yml run --rm drizzle-migrate

echo "✅ Drizzle migrations completed successfully!"
