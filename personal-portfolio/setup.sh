#!/bin/bash

# Personal Portfolio Website - Quick Start Script

echo "🚀 Starting Personal Portfolio Website Setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration"
fi

# Seed database (optional)
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run seed
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the backend server: npm run dev"
echo "2. Open frontend/index.html in your browser"
echo "3. Visit http://localhost:5000/api/health to test the API"
echo ""
echo "📚 Documentation:"
echo "- Getting Started: GETTING_STARTED.md"
echo "- API Docs: backend/API_DOCUMENTATION.md"
echo "- Deployment: DEPLOYMENT.md"
echo "- Testing: TESTING.md"
echo ""
