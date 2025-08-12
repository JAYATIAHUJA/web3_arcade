# Web3 Arcade - Game Setup Guide

## 🎮 Running the Games

### **Vanilla JS Games (Work Immediately)**
These games work by simply opening their HTML files:
- **Detective Case**: `games/detective-case/detective-game-v2.html`
- **Medieval Trading Village**: `games/medieval-trading-village/index.html`

### **React Games (Need Development Server)**

#### **Bakery Checkout Game**
1. Open terminal/command prompt
2. Navigate to the game directory:
   ```bash
   cd games/bakery-checkout
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the URL shown in terminal (usually `http://localhost:5173`)

#### **Island Token Traders Game**
1. Open terminal/command prompt
2. Navigate to the game directory:
   ```bash
   cd games/island-token-traders
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the URL shown in terminal (usually `http://localhost:5173`)

#### **Blockchain Museum Game**
1. Open terminal/command prompt
2. Navigate to the game directory:
   ```bash
   cd games/blockchain-museum
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the URL shown in terminal (usually `http://localhost:5173`)

## 🔧 Alternative: Build for Production

If you want the React games to work without a development server, you can build them:

### **For Bakery Checkout:**
```bash
cd games/bakery-checkout
npm install
npm run build
```

### **For Island Token Traders:**
```bash
cd games/island-token-traders
npm install
npm run build
```

### **For Blockchain Museum:**
```bash
cd games/blockchain-museum
npm install
npm run build
```

After building, the games will be in the `dist` folder and can be served by any web server.

## 🚀 Quick Start Script

Create a `start-games.bat` (Windows) or `start-games.sh` (Mac/Linux) file:

### **Windows (start-games.bat):**
```batch
@echo off
echo Starting Web3 Arcade Games...
echo.
echo Starting Bakery Checkout...
cd games/bakery-checkout
start cmd /k "npm install && npm run dev"
echo.
echo Starting Island Token Traders...
cd ../island-token-traders
start cmd /k "npm install && npm run dev"
echo.
echo Starting Blockchain Museum...
cd ../blockchain-museum
start cmd /k "npm install && npm run dev"
echo.
echo All games started! Check the terminal windows for URLs.
pause
```

### **Mac/Linux (start-games.sh):**
```bash
#!/bin/bash
echo "Starting Web3 Arcade Games..."
echo ""
echo "Starting Bakery Checkout..."
cd games/bakery-checkout
npm install && npm run dev &
echo ""
echo "Starting Island Token Traders..."
cd ../island-token-traders
npm install && npm run dev &
echo ""
echo "Starting Blockchain Museum..."
cd ../blockchain-museum
npm install && npm run dev &
echo ""
echo "All games started! Check the terminal output for URLs."
```

## 📝 Troubleshooting

### **Port Already in Use**
If you get a "port already in use" error:
1. Find the process using the port: `lsof -i :5173` (Mac/Linux) or `netstat -ano | findstr :5173` (Windows)
2. Kill the process or use a different port: `npm run dev -- --port 3000`

### **Node.js Not Found**
Make sure you have Node.js installed:
1. Download from: https://nodejs.org/
2. Install and restart your terminal
3. Verify with: `node --version` and `npm --version`

### **Permission Errors**
On Mac/Linux, you might need to make the script executable:
```bash
chmod +x start-games.sh
```

## 🎯 Next Steps

1. **Fix the navigation** - The script.js changes above will make the buttons work
2. **Start the development servers** for React games
3. **Test all game connections** from the main index.html
4. **Consider building for production** if you want to deploy without dev servers
