@echo off
title Web3 Arcade - React Games Launcher
color 0A

echo.
echo ========================================
echo    Web3 Arcade - React Games Launcher
echo ========================================
echo.

echo Starting React development servers...
echo.

echo [1/3] Starting Bakery Checkout...
cd games\bakery-checkout
start "Bakery Checkout Dev Server" cmd /k "npm install && npm run dev"
cd ..\..

echo [2/3] Starting Island Token Traders...
cd games\island-token-traders
start "Island Token Traders Dev Server" cmd /k "npm install && npm run dev"
cd ..\..

echo [3/3] Starting Blockchain Museum...
cd games\blockchain-museum
start "Blockchain Museum Dev Server" cmd /k "npm install && npm run dev"
cd ..\..

echo.
echo ========================================
echo    All React games are starting up!
echo ========================================
echo.
echo Please wait for the development servers to start...
echo You should see URLs like http://localhost:5173 in each terminal window.
echo.
echo Once the servers are running, you can:
echo 1. Go back to index.html and click the game buttons
echo 2. Or directly visit the redirect pages:
echo    - games/bakery-checkout/redirect.html
echo    - games/island-token-traders/redirect.html
echo.
echo Press any key to open the main arcade...
pause >nul

start index.html
