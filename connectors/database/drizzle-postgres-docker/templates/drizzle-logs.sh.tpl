#!/bin/bash

# Drizzle Database Logs Script
# This script shows logs from the Drizzle database container

set -e

echo "📋 Showing Drizzle database logs..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Show logs
docker-compose -f docker-compose.drizzle.yml logs -f drizzle-db
