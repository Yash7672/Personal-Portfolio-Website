@echo off
REM Personal Portfolio Website - Quick Start Script (Windows)

echo Starting Personal Portfolio Website Setup...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version

REM Navigate to backend directory
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed
)

REM Check if .env file exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Please update .env with your configuration
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Start the backend server: npm run dev
echo 2. Open frontend/index.html in your browser
echo 3. Visit http://localhost:5000/api/health to test the API
echo.
echo Documentation:
echo - Getting Started: GETTING_STARTED.md
echo - API Docs: backend/API_DOCUMENTATION.md
echo - Deployment: DEPLOYMENT.md
echo - Testing: TESTING.md
echo.

pause
