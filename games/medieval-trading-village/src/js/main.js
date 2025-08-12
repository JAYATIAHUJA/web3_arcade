// Main Application for Medieval Trading Village

class MedievalTradingVillage {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    // Initialize the application
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupGame();
        });
    }

    // Setup the game
    setupGame() {
        if (this.isInitialized) return;

        try {
            this.initializeSystems();
            this.setupGlobalEventListeners();
            this.setupKeyboardShortcuts();
            this.setupPerformanceMonitoring();
            this.loadInitialState();
            this.showWelcomeMessage();

            this.isInitialized = true;
            console.log('Medieval Trading Village initialized successfully');
        } catch (error) {
            console.error('Error initializing Medieval Trading Village:', error);
            this.showErrorMessage('Failed to initialize the game. Please refresh the page.');
        }
    }

    // Initialize all game systems
    initializeSystems() {
        // Initialize game state
        if (!window.gameState) {
            window.gameState = new GameState();
        }

        // Initialize trading system
        if (!window.tradingSystem) {
            window.tradingSystem = new TradingSystem();
        }

        // Initialize ledger manager
        if (!window.ledgerManager) {
            window.ledgerManager = new LedgerManager();
        }

        // Initialize consensus system
        if (!window.consensusSystem) {
            window.consensusSystem = new ConsensusSystem();
        }

        // Initialize level manager
        if (!window.levelManager) {
            window.levelManager = new LevelManager();
        }
    }

    // Setup global event listeners
    setupGlobalEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.handleWindowResize.bind(this));

        // Page visibility change handler
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Before unload handler
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

        // Global error handler
        window.addEventListener('error', this.handleGlobalError.bind(this));

        // Click outside modal to close
        window.addEventListener('click', (event) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(event) {
        // Only handle shortcuts when not in input fields
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const isCtrlOrCmd = event.ctrlKey || event.metaKey;

        if (isCtrlOrCmd) {
            switch (event.key.toLowerCase()) {
                case 'h':
                    event.preventDefault();
                    this.showHowToPlay();
                    break;
                case 'l':
                    event.preventDefault();
                    this.showLedger();
                    break;
                case 'r':
                    event.preventDefault();
                    this.resetGame();
                    break;
                case 'd':
                    event.preventDefault();
                    this.toggleDebugMode();
                    break;
            }
        }
    }

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    // Load initial game state
    loadInitialState() {
        if (window.gameState) {
            window.gameState.loadGameState();
        }
    }

    // Show welcome message
    showWelcomeMessage() {
        console.log('🏰 Welcome to Medieval Trading Village!');
        console.log('📖 Press Ctrl/Cmd + H for How to Play');
        console.log('📜 Press Ctrl/Cmd + L to view the Ledger');
        console.log('🔄 Press Ctrl/Cmd + R to reset the game');
        console.log('🐛 Press Ctrl/Cmd + D for debug mode');
    }

    // Handle window resize
    handleWindowResize() {
        // Trigger any responsive updates
        const event = new CustomEvent('windowResize');
        window.dispatchEvent(event);
    }

    // Handle visibility change
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, pause any animations or timers
            console.log('Page hidden - pausing game activity');
        } else {
            // Page is visible again, resume activity
            console.log('Page visible - resuming game activity');
        }
    }

    // Handle before unload
    handleBeforeUnload(event) {
        // Save game state before leaving
        if (window.gameState) {
            window.gameState.saveGameState();
        }
    }

    // Handle global errors
    handleGlobalError(error) {
        console.error('Global error caught:', error);
        this.showErrorMessage('An unexpected error occurred. Please refresh the page.');
    }

    // Show error message
    showErrorMessage(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Show how to play
    showHowToPlay() {
        if (window.tradingSystem) {
            window.tradingSystem.showHowToPlay();
        }
    }

    // Show ledger
    showLedger() {
        if (window.tradingSystem) {
            window.tradingSystem.showLedger();
        }
    }

    // Close all modals
    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Show help
    showHelp() {
        const helpText = `
🏰 Medieval Trading Village - Help

🎮 Basic Controls:
• Click "Sign & Execute" to approve trades
• Click "Reject Trade" to decline offers
• Use navigation buttons to explore

⌨️ Keyboard Shortcuts:
• Ctrl/Cmd + H: How to Play
• Ctrl/Cmd + L: View Ledger
• Ctrl/Cmd + R: Reset Game
• Ctrl/Cmd + D: Debug Mode
• Escape: Close modals

💰 Resources:
• WHEAT 🌾 - Basic farming resource
• IRON ⛏️ - Crafting material
• WOOL 🐑 - Textile resource
• SPICES 🌶️ - Luxury goods
• GOLD COINS 🪙 - Currency for gas fees

📜 Smart Contracts:
Each trade is a smart contract that automatically executes when you sign it.

⛏️ Gas Fees:
Every transaction requires a small gas fee to pay the village miners.

🏛️ Consensus:
Three village judges must approve each transaction (2 out of 3 required).

🎯 Levels:
Complete trades to advance through 10 levels and earn badges!
        `;
        
        alert(helpText);
    }

    // Get game statistics
    getGameStats() {
        if (window.gameState) {
            return window.gameState.getPlayerStats();
        }
        return null;
    }

    // Export game data
    exportGameData() {
        if (window.gameState) {
            const data = {
                gameState: window.gameState.getGameState(),
                timestamp: new Date().toISOString(),
                version: this.getVersion()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `medieval-trading-village-save-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    // Import game data
    importGameData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (window.gameState && data.gameState) {
                    window.gameState.loadGameState(data.gameState);
                    this.showErrorMessage('Game data imported successfully!');
                }
            } catch (error) {
                this.showErrorMessage('Invalid save file format.');
            }
        };
        reader.readAsText(file);
    }

    // Reset game
    resetGame() {
        if (confirm('Are you sure you want to reset the game? This will clear all progress.')) {
            if (window.gameState) {
                window.gameState.resetGame();
            }
            this.showErrorMessage('Game reset successfully!');
        }
    }

    // Get version
    getVersion() {
        return '1.0.0';
    }

    // Check if game is initialized
    isGameInitialized() {
        return this.isInitialized;
    }

    // Toggle debug mode
    toggleDebugMode() {
        const debugMode = !window.debugMode;
        window.debugMode = debugMode;
        
        if (debugMode) {
            console.log('🐛 Debug mode enabled');
            this.showErrorMessage('Debug mode enabled. Check console for commands.');
            
            // Add debug commands to window
            window.debugCommands = {
                addResources: (resource, amount) => {
                    if (window.gameState) {
                        window.gameState.addResource(resource, amount);
                        console.log(`Added ${amount} ${resource}`);
                    }
                },
                setLevel: (level) => {
                    if (window.gameState) {
                        window.gameState.setLevel(level);
                        console.log(`Set level to ${level}`);
                    }
                },
                completeLevel: () => {
                    if (window.gameState) {
                        window.gameState.completeLevel();
                        console.log('Level completed');
                    }
                },
                showStats: () => {
                    if (window.gameState) {
                        console.log('Game Stats:', window.gameState.getPlayerStats());
                    }
                },
                clearData: () => {
                    localStorage.clear();
                    console.log('All data cleared');
                    location.reload();
                }
            };
            
            console.log('Available debug commands:', Object.keys(window.debugCommands));
        } else {
            console.log('🐛 Debug mode disabled');
            this.showErrorMessage('Debug mode disabled.');
            delete window.debugCommands;
        }
    }
}

// Initialize the application
window.medievalTradingVillage = new MedievalTradingVillage();

// Global utility functions
window.showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
};

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedievalTradingVillage;
}