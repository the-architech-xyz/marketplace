#!/bin/bash

# Drizzle Database Seeding Script
# This script seeds the database with initial data

set -e

echo "🌱 Seeding Drizzle database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Run seeding using Docker Compose
docker-compose -f docker-compose.drizzle.yml exec drizzle-db psql -U drizzle_user -d <%= project.name %>_drizzle -f /docker-entrypoint-initdb.d/drizzle-seed.sql

echo "✅ Database seeding completed successfully!"
