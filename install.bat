@echo off
echo 🚀 Setting up AyGoub's Cybersecurity Portfolio...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete! You can now run:
echo    npm run dev     # Start development server
echo    npm run build   # Build for production
echo    npm run export  # Export static site
echo.
echo 🌐 Your portfolio will be available at http://localhost:3000
echo.
echo 📝 Don't forget to update your personal information in the components!
pause


