#!/bin/bash

# Make script exit on first error
set -e

echo "🧹 Cleaning project..."

# Remove build directories
echo "📁 Removing build directories..."
rm -rf .next
rm -rf dist
rm -rf build
rm -rf out

# Remove dependency directories
echo "📦 Removing dependency directories..."
rm -rf node_modules
rm -rf .turbo

# Remove cache directories
echo "🗑️  Removing cache directories..."
rm -rf .cache
rm -rf .eslintcache
rm -rf .tsbuildinfo
rm -rf tsconfig.tsbuildinfo

# Remove environment files if they exist
echo "🌍 Removing environment files..."
rm -f .env.local
rm -f .env.development.local
rm -f .env.test.local
rm -f .env.production.local

# Remove logs
echo "📝 Removing log files..."
rm -f npm-debug.log*
rm -f yarn-debug.log*
rm -f yarn-error.log*
rm -f .pnpm-debug.log*

# Remove OS specific files
echo "💻 Removing OS specific files..."
rm -rf .DS_Store
rm -rf Thumbs.db

echo "✨ Project cleaned successfully!"
echo "🔍 Run 'npm install' to reinstall dependencies" 