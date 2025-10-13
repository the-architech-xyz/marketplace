#!/bin/bash

# Drizzle Database Shell Script
# This script opens a PostgreSQL shell for the Drizzle database

set -e

echo "🐚 Opening Drizzle database shell..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if database container is running
if ! docker-compose -f docker-compose.drizzle.yml ps drizzle-db | grep -q "Up"; then
    echo "❌ Database container is not running. Starting it now..."
    docker-compose -f docker-compose.drizzle.yml up -d drizzle-db
fi

# Open database shell
docker-compose -f docker-compose.drizzle.yml exec drizzle-db psql -U drizzle_user -d <%= project.name %>_drizzle
