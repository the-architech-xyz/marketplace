#!/bin/bash

# Drizzle Database Health Check Script
# This script checks the health of the Drizzle database

set -e

echo "🏥 Checking Drizzle database health..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running."
    exit 1
fi

# Check if database container is running
if ! docker-compose -f docker-compose.drizzle.yml ps drizzle-db | grep -q "Up"; then
    echo "❌ Database container is not running."
    exit 1
fi

# Check database connectivity
if docker-compose -f docker-compose.drizzle.yml exec drizzle-db pg_isready -U drizzle_user -d {{project.name}}_drizzle; then
    echo "✅ Database is healthy and accessible."
else
    echo "❌ Database is not accessible."
    exit 1
fi

# Check migration status
echo "📊 Migration status:"
docker-compose -f docker-compose.drizzle.yml exec drizzle-db psql -U drizzle_user -d {{project.name}}_drizzle -c "SELECT * FROM drizzle_migrations ORDER BY created_at DESC LIMIT 5;"

echo "✅ Health check completed successfully!"
