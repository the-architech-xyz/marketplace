#!/bin/bash

# Drizzle Database Setup Script
# This script sets up the Drizzle database environment

set -e

echo "🐘 Setting up Drizzle database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start the Drizzle database
echo "🚀 Starting Drizzle database..."
docker-compose -f docker-compose.drizzle.yml up -d drizzle-db

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until docker-compose -f docker-compose.drizzle.yml exec drizzle-db pg_isready -U drizzle_user -d {{project.name}}_drizzle; do
    echo "   Database is unavailable - sleeping"
    sleep 2
done

echo "✅ Drizzle database is ready!"

# Run migrations
echo "🔄 Running Drizzle migrations..."
docker-compose -f docker-compose.drizzle.yml run --rm drizzle-migrate

echo "🎉 Drizzle setup complete!"
echo "   Database URL: postgresql://drizzle_user:drizzle_password@localhost:5433/{{project.name}}_drizzle"
echo "   Adminer: http://localhost:8080 (if enabled)"
