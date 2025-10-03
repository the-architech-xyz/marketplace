#!/bin/bash

# Vercel Deployment Script
# This script helps deploy your application to Vercel

set -e

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g @vercel/cli
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Deploy based on environment
if [ "$1" = "production" ]; then
    echo "📦 Deploying to production..."
    vercel --prod
else
    echo "🧪 Deploying preview..."
    vercel
fi

echo "✅ Deployment complete!"
echo "🌐 Check your deployment at: https://your-app.vercel.app"
