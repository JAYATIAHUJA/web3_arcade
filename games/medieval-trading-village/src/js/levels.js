// Level Management System for Medieval Trading Village

class LevelManager {
    constructor() {
        this.levels = [
            {
                level: 1,
                title: "Basic Trading",
                description: "Learn the basics of blockchain trading with simple token exchanges.",
                requiredTrades: 1,
                difficulty: "Beginner",
                concepts: ["Smart Contracts", "Token Transfer", "Basic Trading"],
                badge: {
                    name: "Contract Coder",
                    icon: "📜",
                    description: "Mastered basic smart contract execution"
                },
                tutorial: {
                    title: "Welcome to Blockchain Trading!",
                    steps: [
                        "Smart contracts are like magical scrolls that automatically execute trades",
                        "Each trade requires you to give something and receive something in return",
                        "Click 'Sign & Execute' to approve the trade and watch it happen!"
                    ]
                }
            },
            {
                level: 2,
                title: "Gas Fees",
                description: "Understand how gas fees work in blockchain transactions.",
                requiredTrades: 2,
                difficulty: "Beginner",
                concepts: ["Gas Fees", "Transaction Costs", "Network Fees"],
                badge: {
                    name: "Gas Fee Guru",
                    icon: "⛏️",
                    description: "Learned to manage transaction costs"
                },
                tutorial: {
                    title: "Understanding Gas Fees",
                    steps: [
                        "Gas fees are like paying the village miners to process your trade",
                        "Higher gas fees mean faster processing, but cost more gold",
                        "Always check the gas fee before signing a transaction!"
                    ]
                }
            },
            {
                level: 3,
                title: "Multi-Token Trades",
                description: "Execute complex trades involving multiple token types.",
                requiredTrades: 3,
                difficulty: "Intermediate",
                concepts: ["Multi-Token Trading", "Complex Contracts", "Resource Management"],
                badge: {
                    name: "Token Trader",
                    icon: "🪙",
                    description: "Expert in multi-token transactions"
                },
                tutorial: {
                    title: "Multi-Token Trading",
                    steps: [
                        "Some trades involve multiple types of tokens",
                        "Make sure you have enough of each required token",
                        "Complex trades can be more profitable but also riskier"
                    ]
                }
            },
            {
                level: 4,
                title: "Smart Contract Conditions",
                description: "Learn about conditional logic in smart contracts.",
                requiredTrades: 4,
                difficulty: "Intermediate",
                concepts: ["Conditional Logic", "Require Statements", "Contract Validation"],
                badge: {
                    name: "Condition Master",
                    icon: "🔗",
                    description: "Mastered smart contract conditions"
                },
                tutorial: {
                    title: "Smart Contract Conditions",
                    steps: [
                        "Smart contracts use 'require' statements to check conditions",
                        "If conditions aren't met, the transaction fails",
                        "This prevents invalid trades and protects both parties"
                    ]
                }
            },
            {
                level: 5,
                title: "Scam Detection",
                description: "Identify and avoid fraudulent trading offers.",
                requiredTrades: 5,
                difficulty: "Advanced",
                concepts: ["Security", "Fraud Detection", "Risk Assessment"],
                badge: {
                    name: "Fraud Fighter",
                    icon: "🛡️",
                    description: "Expert at detecting scams"
                },
                tutorial: {
                    title: "Detecting Scams",
                    steps: [
                        "Some villagers may offer deals that are too good to be true",
                        "Look for unusual gas fees or suspicious resource ratios",
                        "Trust your instincts - if it seems suspicious, it probably is!"
                    ]
                }
            },
            {
                level: 6,
                title: "Consensus Validation",
                description: "Participate in the consensus mechanism as a validator.",
                requiredTrades: 6,
                difficulty: "Advanced",
                concepts: ["Consensus", "Validation", "Network Security"],
                badge: {
                    name: "Consensus Captain",
                    icon: "⚖️",
                    description: "Became a trusted validator"
                },
                tutorial: {
                    title: "Understanding Consensus",
                    steps: [
                        "The village judges must approve every transaction",
                        "At least 2 out of 3 judges must agree for a transaction to pass",
                        "This prevents fraud and ensures network security"
                    ]
                }
            },
            {
                level: 7,
                title: "Multi-Party Trades",
                description: "Execute trades involving multiple parties simultaneously.",
                requiredTrades: 7,
                difficulty: "Expert",
                concepts: ["Multi-Party Transactions", "Complex Deals", "Coordination"],
                badge: {
                    name: "Multi-Party Master",
                    icon: "🤝",
                    description: "Expert in complex multi-party trades"
                },
                tutorial: {
                    title: "Multi-Party Trading",
                    steps: [
                        "Some trades involve multiple villagers at once",
                        "All parties must agree for the trade to succeed",
                        "These trades can be very profitable but require careful coordination"
                    ]
                }
            },
            {
                level: 8,
                title: "Double-Spending Prevention",
                description: "Learn how blockchain prevents double-spending attacks.",
                requiredTrades: 8,
                difficulty: "Expert",
                concepts: ["Double-Spending", "Attack Prevention", "Blockchain Security"],
                badge: {
                    name: "Security Sentinel",
                    icon: "🔒",
                    description: "Mastered blockchain security"
                },
                tutorial: {
                    title: "Preventing Double-Spending",
                    steps: [
                        "Double-spending is when someone tries to spend the same tokens twice",
                        "The blockchain prevents this by tracking all transactions",
                        "Each transaction is verified against the entire transaction history"
                    ]
                }
            },
            {
                level: 9,
                title: "Supply & Demand",
                description: "Understand tokenomics and market dynamics.",
                requiredTrades: 9,
                difficulty: "Master",
                concepts: ["Tokenomics", "Market Dynamics", "Economic Principles"],
                badge: {
                    name: "Tokenomics Expert",
                    icon: "📊",
                    description: "Expert in economic principles"
                },
                tutorial: {
                    title: "Supply and Demand",
                    steps: [
                        "Token values change based on supply and demand",
                        "Rare tokens are worth more than common ones",
                        "Understanding market dynamics helps you make better trades"
                    ]
                }
            },
            {
                level: 10,
                title: "Decentralized Marketplace",
                description: "Master the complete decentralized trading system.",
                requiredTrades: 10,
                difficulty: "Master",
                concepts: ["Decentralization", "Marketplace", "Complete System"],
                badge: {
                    name: "Web3 Hero",
                    icon: "🏆",
                    description: "Mastered the art of blockchain trading"
                },
                tutorial: {
                    title: "The Decentralized Marketplace",
                    steps: [
                        "You've mastered all aspects of blockchain trading!",
                        "The village marketplace is now fully decentralized",
                        "You are a true Web3 hero - congratulations!"
                    ]
                }
            }
        ];
    }

    // Get level information
    getLevel(levelNumber) {
        return this.levels.find(l => l.level === levelNumber);
    }

    // Get current level
    getCurrentLevel() {
        return this.getLevel(gameState.currentLevel);
    }

    // Get next level
    getNextLevel() {
        return this.getLevel(gameState.currentLevel + 1);
    }

    // Check if level is unlocked
    isLevelUnlocked(levelNumber) {
        return levelNumber <= gameState.currentLevel;
    }

    // Check if level is completed
    isLevelCompleted(levelNumber) {
        const levelTrades = gameState.ledger.filter(t => t.level === levelNumber);
        const level = this.getLevel(levelNumber);
        return levelTrades.length >= level.requiredTrades;
    }

    // Get level progress
    getLevelProgress(levelNumber) {
        const levelTrades = gameState.ledger.filter(t => t.level === levelNumber);
        const level = this.getLevel(levelNumber);
        const progress = (levelTrades.length / level.requiredTrades) * 100;
        
        return {
            level: levelNumber,
            completed: levelTrades.length >= level.requiredTrades,
            progress: Math.min(100, progress),
            tradesCompleted: levelTrades.length,
            tradesRequired: level.requiredTrades,
            remaining: Math.max(0, level.requiredTrades - levelTrades.length)
        };
    }

    // Get all level progress
    getAllLevelProgress() {
        return this.levels.map(level => this.getLevelProgress(level.level));
    }

    // Show level tutorial
    showLevelTutorial(levelNumber) {
        const level = this.getLevel(levelNumber);
        if (!level || !level.tutorial) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';

        modal.innerHTML = `
            <div class="modal-content medieval-modal">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>${level.tutorial.title}</h3>
                <div class="tutorial-steps">
                    ${level.tutorial.steps.map((step, index) => `
                        <div class="tutorial-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">${step}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="tutorial-concepts">
                    <h4>Key Concepts:</h4>
                    <div class="concept-tags">
                        ${level.concepts.map(concept => `
                            <span class="concept-tag">${concept}</span>
                        `).join('')}
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="action-btn primary-btn">Got it!</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles for tutorial
        const style = document.createElement('style');
        style.textContent = `
            .tutorial-steps {
                margin: 1.5rem 0;
            }
            .tutorial-step {
                display: flex;
                align-items: flex-start;
                margin-bottom: 1rem;
                padding: 0.75rem;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 230, 210, 0.8));
                border: 1px solid var(--primary-brown);
                border-radius: var(--border-radius);
            }
            .step-number {
                background: var(--primary-brown);
                color: var(--light-brown);
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-right: 0.75rem;
                flex-shrink: 0;
            }
            .step-content {
                flex-grow: 1;
                line-height: 1.5;
            }
            .tutorial-concepts {
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 2px solid var(--primary-brown);
            }
            .concept-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            .concept-tag {
                background: linear-gradient(135deg, var(--gold), #ffed4e);
                color: var(--dark-brown);
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
                border: 1px solid var(--primary-brown);
            }
        `;
        document.head.appendChild(style);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Get level statistics
    getLevelStats(levelNumber) {
        const levelTrades = gameState.ledger.filter(t => t.level === levelNumber);
        const successfulTrades = levelTrades.filter(t => !t.isScam);
        const totalGasFees = levelTrades.reduce((sum, t) => sum + t.gasFee, 0);
        const averageGasFee = levelTrades.length > 0 ? totalGasFees / levelTrades.length : 0;
        const successRate = levelTrades.length > 0 ? (successfulTrades.length / levelTrades.length) * 100 : 0;

        return {
            level: levelNumber,
            totalTrades: levelTrades.length,
            successfulTrades: successfulTrades.length,
            failedTrades: levelTrades.length - successfulTrades.length,
            totalGasFees,
            averageGasFee,
            successRate,
            completionTime: this.calculateCompletionTime(levelTrades)
        };
    }

    // Calculate level completion time
    calculateCompletionTime(levelTrades) {
        if (levelTrades.length < 2) return null;

        const firstTrade = new Date(levelTrades[0].timestamp);
        const lastTrade = new Date(levelTrades[levelTrades.length - 1].timestamp);
        const timeDiff = lastTrade - firstTrade;

        return {
            totalMinutes: Math.round(timeDiff / (1000 * 60)),
            totalSeconds: Math.round(timeDiff / 1000),
            formatted: this.formatTime(timeDiff)
        };
    }

    // Format time duration
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    // Get difficulty color
    getDifficultyColor(difficulty) {
        const colors = {
            'Beginner': 'var(--success-green)',
            'Intermediate': 'var(--warning-orange)',
            'Advanced': 'var(--error-red)',
            'Expert': '#9c27b0',
            'Master': 'var(--gold)'
        };
        return colors[difficulty] || 'var(--secondary-brown)';
    }

    // Get level rewards
    getLevelRewards(levelNumber) {
        const level = this.getLevel(levelNumber);
        if (!level) return null;

        return {
            badge: level.badge,
            experience: levelNumber * 100,
            gold: levelNumber * 10,
            unlockNextLevel: levelNumber < this.levels.length
        };
    }

    // Check if all levels are completed
    isGameComplete() {
        return this.levels.every(level => this.isLevelCompleted(level.level));
    }

    // Get game completion percentage
    getGameCompletionPercentage() {
        const completedLevels = this.levels.filter(level => this.isLevelCompleted(level.level)).length;
        return Math.round((completedLevels / this.levels.length) * 100);
    }

    // Get total game statistics
    getTotalGameStats() {
        const allStats = this.levels.map(level => this.getLevelStats(level.level));
        
        return {
            totalLevels: this.levels.length,
            completedLevels: allStats.filter(s => s.totalTrades > 0).length,
            totalTrades: allStats.reduce((sum, s) => sum + s.totalTrades, 0),
            totalSuccessfulTrades: allStats.reduce((sum, s) => sum + s.successfulTrades, 0),
            totalGasFees: allStats.reduce((sum, s) => sum + s.totalGasFees, 0),
            averageSuccessRate: allStats.length > 0 ? 
                allStats.reduce((sum, s) => sum + s.successRate, 0) / allStats.length : 0,
            completionPercentage: this.getGameCompletionPercentage()
        };
    }

    // Reset all levels
    resetAllLevels() {
        gameState.currentLevel = 1;
        gameState.ledger = [];
        gameState.badges = [];
        gameState.stats = {
            totalTrades: 0,
            successfulTrades: 0,
            totalGasFees: 0,
            levelProgress: {}
        };
        gameState.saveGameState();
    }

    // Unlock specific level (for testing)
    unlockLevel(levelNumber) {
        if (levelNumber > gameState.currentLevel) {
            gameState.currentLevel = levelNumber;
            gameState.saveGameState();
        }
    }
}

// Create global level manager instance
const levelManager = new LevelManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelManager;
}
