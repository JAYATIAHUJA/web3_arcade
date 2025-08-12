// Game State Management for Medieval Trading Village

class GameState {
    constructor() {
        this.currentLevel = 1;
        this.inventory = {
            wheat: 10,
            iron: 5,
            wool: 8,
            spices: 3,
            gold: 50,
            bread: 0,
            silk: 2,
            iron_sword: 0,
            wine_barrel: 0
        };
        this.ledger = [];
        this.badges = [];
        this.stats = {
            totalTrades: 0,
            successfulTrades: 0,
            totalGasFees: 0,
            levelProgress: {}
        };
        this.currentTradeIndex = 0;
        this.loadGameState();
    }

    // Load game state from localStorage
    loadGameState() {
        const savedState = localStorage.getItem('medievalTradingVillage_gameState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.currentLevel = state.currentLevel || 1;
                this.inventory = { ...this.inventory, ...state.inventory };
                this.ledger = state.ledger || [];
                this.badges = state.badges || [];
                this.stats = { ...this.stats, ...state.stats };
                this.currentTradeIndex = state.currentTradeIndex || 0;
            } catch (error) {
                console.error('Error loading game state:', error);
            }
        }
        this.updateInventoryDisplay();
    }

    // Save game state to localStorage
    saveGameState() {
        const state = {
            currentLevel: this.currentLevel,
            inventory: this.inventory,
            ledger: this.ledger,
            badges: this.badges,
            stats: this.stats,
            currentTradeIndex: this.currentTradeIndex
        };
        localStorage.setItem('medievalTradingVillage_gameState', JSON.stringify(state));
    }

    // Get current villager based on level
    getCurrentVillager() {
        const villagers = this.getVillagers();
        const levelVillagers = villagers.filter(v => v.level === this.currentLevel);
        
        if (levelVillagers.length === 0) {
            return null;
        }
        
        // Cycle through villagers for the current level
        const villagerIndex = this.currentTradeIndex % levelVillagers.length;
        return levelVillagers[villagerIndex];
    }

    // Get current trade
    getCurrentTrade() {
        const villager = this.getCurrentVillager();
        if (!villager) return null;

        // Parse the contract to extract trade details
        const tradeDetails = this.parseContract(villager.contract);
        
        return {
            villager: villager,
            give: tradeDetails.give,
            receive: tradeDetails.receive,
            gasFee: tradeDetails.gasFee || (Math.random() * 0.8 + 0.2).toFixed(1),
            isScam: villager.scam || false,
            level: this.currentLevel,
            contract: villager.contract
        };
    }

    // Parse contract to extract trade details
    parseContract(contract) {
        const trade = {
            give: {},
            receive: {},
            gasFee: 0.3 // default gas fee
        };

        // Extract gas fee
        const gasFeeMatch = contract.match(/payGasFee\(([\d.]+) GOLD\)/);
        if (gasFeeMatch) {
            trade.gasFee = parseFloat(gasFeeMatch[1]);
        }

        // Extract transfers
        const transferMatches = contract.match(/transfer\([^)]+\)/g);
        if (transferMatches) {
            transferMatches.forEach(transfer => {
                const match = transfer.match(/transfer\(([^,]+),\s*([^,]+),\s*(\d+)\s+([A-Z_]+)\)/);
                if (match) {
                    const [_, from, to, amount, resource] = match;
                    if (from.includes('player') && to.includes('villager')) {
                        trade.give[resource] = parseInt(amount);
                    } else if (from.includes('villager') && to.includes('player')) {
                        trade.receive[resource] = parseInt(amount);
                    }
                }
            });
        }

        return trade;
    }

    // Get all villagers with proper level structure
    getVillagers() {
        return [
            {
                id: 1,
                name: "Farmer Edric",
                avatar: "🧑‍🌾",
                level: 1,
                dialogue: "Greetings, traveler! I'll give you 3 sacks of wheat for 2 gold coins.",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerGold >= 2, "Not enough gold");
                            transfer(player, villager, 2 GOLD);
                            transfer(villager, player, 3 WHEAT);
                        }
                    }
                `
            },
            {
                id: 2,
                name: "Blacksmith Hilda",
                avatar: "🛠️",
                level: 2,
                dialogue: "I'll forge you an iron sword if you bring me 5 iron ingots. Gas fees apply.",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerIron >= 5, "Not enough iron");
                            payGasFee(0.4 GOLD);
                            transfer(player, villager, 5 IRON);
                            transfer(villager, player, 1 IRON_SWORD);
                        }
                    }
                `
            },
            {
                id: 3,
                name: "Baker Alric",
                avatar: "🍞",
                level: 3,
                dialogue: "Trade 3 sacks of wheat and 1 gold coin for 5 loaves of bread.",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerWheat >= 3 && playerGold >= 1, "Not enough goods");
                            payGasFee(0.2 GOLD);
                            transfer(player, villager, 3 WHEAT);
                            transfer(player, villager, 1 GOLD);
                            transfer(villager, player, 5 BREAD);
                        }
                    }
                `
            },
            {
                id: 4,
                name: "Painter Ysabel",
                avatar: "🎨",
                level: 4,
                dialogue: "Mint this unique tapestry NFT if you provide 2 silk rolls.",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerSilk >= 2, "Not enough silk");
                            payGasFee(0.3 GOLD);
                            mintNFT("Tapestry of Chainshire");
                        }
                    }
                `
            },
            {
                id: 5,
                name: "Merchant Gregor",
                avatar: "🪙",
                level: 5,
                dialogue: "I'll give you spices for iron — terms are locked in a contract.",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerIron >= 4, "Not enough iron");
                            payGasFee(0.5 GOLD);
                            transfer(player, villager, 4 IRON);
                            transfer(villager, player, 2 SPICES);
                        }
                    }
                `
            },
            {
                id: 6,
                name: "Shady Peddler",
                avatar: "🕵️",
                level: 6,
                dialogue: "Just send me 3 gold coins and I'll send you something nice…",
                contract: `
                    contract Trade {
                        function execute() public {
                            require(playerGold >= 3, "Not enough gold");
                            transfer(player, villager, 3 GOLD);
                            // No return transfer - SCAM!
                        }
                    }
                `,
                scam: true
            },
            {
                id: 7,
                name: "Judge Aldwin",
                avatar: "⚖️",
                level: 7,
                dialogue: "Help the village validate this large shipment trade.",
                contract: `
                    contract ConsensusTrade {
                        function approve() public {
                            vote(true);
                        }
                    }
                `
            },
            {
                id: 8,
                name: "Sailor Roderic",
                avatar: "⛵",
                level: 8,
                dialogue: "Prevent this merchant from double-spending gold.",
                contract: `
                    contract SafeTrade {
                        function execute() public {
                            require(!transactionAlreadyInLedger(hash), "Double spending attempt detected");
                            transfer(player, villager, 2 GOLD);
                        }
                    }
                `
            },
            {
                id: 9,
                name: "Trader Selene",
                avatar: "🏺",
                level: 9,
                dialogue: "Buy low, sell high — manage supply & demand of wine barrels.",
                contract: `
                    contract Trade {
                        function execute() public {
                            adjustPriceBasedOnSupplyDemand();
                            transfer(player, villager, agreedPrice GOLD);
                            transfer(villager, player, 1 WINE_BARREL);
                        }
                    }
                `
            },
            {
                id: 10,
                name: "Lord Cedric",
                avatar: "👑",
                level: 10,
                dialogue: "Establish the entire city's economy using blockchain trade rules.",
                contract: `
                    contract CityTrade {
                        function execute() public {
                            setupMarketEconomy();
                            enforceSmartContractLaws();
                            enableDecentralizedTrading();
                        }
                    }
                `
            }
        ];
    }

    // Check if player can execute trade
    canExecuteTrade(trade) {
        if (!trade) return false;

        // Check if player has enough of each resource to give
        for (const [resource, amount] of Object.entries(trade.give)) {
            const resourceKey = resource.toLowerCase();
            if (this.inventory[resourceKey] < amount) {
                return false;
            }
        }

        // Check if player has enough gold for gas fee
        if (this.inventory.gold < parseFloat(trade.gasFee)) {
            return false;
        }

        return true;
    }

    // Execute trade
    executeTrade(trade) {
        if (!this.canExecuteTrade(trade)) {
            return { success: false, message: 'Cannot execute trade: insufficient resources or gold' };
        }

        // Deduct resources
        for (const [resource, amount] of Object.entries(trade.give)) {
            const resourceKey = resource.toLowerCase();
            this.inventory[resourceKey] -= amount;
        }
        this.inventory.gold -= parseFloat(trade.gasFee);

        // Add received resources
        for (const [resource, amount] of Object.entries(trade.receive)) {
            const resourceKey = resource.toLowerCase();
            this.inventory[resourceKey] += amount;
        }

        // Create transaction record
        const transaction = {
            id: Date.now(),
            blockNumber: this.ledger.length + 1,
            timestamp: new Date().toISOString(),
            from: 'Merchant',
            to: trade.villager.name,
            give: trade.give,
            receive: trade.receive,
            gasFee: parseFloat(trade.gasFee),
            level: this.currentLevel,
            isScam: trade.isScam || false,
            status: 'success'
        };

        // Add to ledger
        this.ledger.push(transaction);

        // Update stats
        this.stats.totalTrades++;
        this.stats.totalGasFees += parseFloat(trade.gasFee);
        
        if (!trade.isScam) {
            this.stats.successfulTrades++;
        }

        // Update level progress
        if (!this.stats.levelProgress[this.currentLevel]) {
            this.stats.levelProgress[this.currentLevel] = 0;
        }
        this.stats.levelProgress[this.currentLevel]++;

        // Save game state
        this.saveGameState();
        this.updateInventoryDisplay();

        // Move to next trade
        this.nextTrade();

        return {
            success: true,
            message: `Trade successful! Received ${Object.entries(trade.receive).map(([r, a]) => `${a} ${r}`).join(', ')}`,
            transaction: transaction
        };
    }

    // Move to next trade
    nextTrade() {
        this.currentTradeIndex++;
        this.saveGameState();
    }

    // Check level completion
    checkLevelCompletion() {
        const levelTrades = this.ledger.filter(t => t.level === this.currentLevel);
        const requiredTrades = this.getLevelRequiredTrades();
        return levelTrades.length >= requiredTrades;
    }

    // Get required trades for current level
    getLevelRequiredTrades() {
        const levelRequirements = {
            1: 2, 2: 2, 3: 2, 4: 2, 5: 2,
            6: 1, 7: 2, 8: 2, 9: 2, 10: 2
        };
        return levelRequirements[this.currentLevel] || 2;
    }

    // Complete current level
    completeLevel() {
        const levelInfo = this.getLevelInfo();
        if (levelInfo && !this.badges.find(b => b.level === this.currentLevel)) {
            this.badges.push({
                level: this.currentLevel,
                name: levelInfo.badge,
                icon: levelInfo.badgeIcon || '🏆',
                earnedAt: new Date().toISOString()
            });
        }
        this.saveGameState();
    }

    // Move to next level
    nextLevel() {
        if (this.currentLevel < 10) {
            this.completeLevel();
            this.currentLevel++;
            this.currentTradeIndex = 0;
            this.saveGameState();
            return true;
        }
        return false;
    }

    // Get current level info
    getLevelInfo() {
        const levels = [
            { title: "Basic Trading", badge: "Contract Coder", badgeIcon: "📜", description: "Master basic smart contracts" },
            { title: "Gas Fees", badge: "Gas Fee Guru", badgeIcon: "⛏️", description: "Understand transaction costs" },
            { title: "Multi-Token Trades", badge: "Token Trader", badgeIcon: "🪙", description: "Execute complex exchanges" },
            { title: "Smart Contract Conditions", badge: "Condition Master", badgeIcon: "🔗", description: "Learn conditional logic" },
            { title: "Scam Detection", badge: "Fraud Fighter", badgeIcon: "🛡️", description: "Identify fraudulent offers" },
            { title: "Consensus Validation", badge: "Consensus Captain", badgeIcon: "⚖️", description: "Participate in consensus" },
            { title: "Multi-Party Trades", badge: "Multi-Party Master", badgeIcon: "🤝", description: "Execute complex deals" },
            { title: "Double-Spending Prevention", badge: "Security Sentinel", badgeIcon: "🔒", description: "Learn blockchain security" },
            { title: "Supply & Demand", badge: "Tokenomics Expert", badgeIcon: "📊", description: "Understand tokenomics" },
            { title: "Decentralized Marketplace", badge: "Web3 Hero", badgeIcon: "🏆", description: "Master the complete system" }
        ];
        return levels[this.currentLevel - 1];
    }

    // Get player statistics
    getPlayerStats() {
        const successRate = this.stats.totalTrades > 0 
            ? Math.round((this.stats.successfulTrades / this.stats.totalTrades) * 100) 
            : 0;

        return {
            currentLevel: this.currentLevel,
            totalTrades: this.stats.totalTrades,
            successfulTrades: this.stats.successfulTrades,
            totalGasFees: this.stats.totalGasFees.toFixed(1),
            successRate: successRate,
            badges: this.badges,
            inventory: this.inventory
        };
    }

    // Reset game
    resetGame() {
        this.currentLevel = 1;
        this.inventory = {
            wheat: 10,
            iron: 5,
            wool: 8,
            spices: 3,
            gold: 50,
            bread: 0,
            silk: 2,
            iron_sword: 0,
            wine_barrel: 0
        };
        this.ledger = [];
        this.badges = [];
        this.stats = {
            totalTrades: 0,
            successfulTrades: 0,
            totalGasFees: 0,
            levelProgress: {}
        };
        this.currentTradeIndex = 0;
        this.saveGameState();
        this.updateInventoryDisplay();
    }

    // Add status message
    addStatusMessage(message) {
        const statusMessages = document.getElementById('statusMessages');
        if (statusMessages) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const messageDiv = document.createElement('div');
            messageDiv.className = 'status-message';
            messageDiv.innerHTML = `
                <span class="status-time">${time}</span>
                <span class="status-text">${message}</span>
            `;
            statusMessages.appendChild(messageDiv);
            statusMessages.scrollTop = statusMessages.scrollHeight;
        }
    }

    // Get filtered ledger
    getFilteredLedger(filter = 'all') {
        switch (filter) {
            case 'successful':
                return this.ledger.filter(t => !t.isScam);
            case 'failed':
                return this.ledger.filter(t => t.isScam);
            case 'current':
                return this.ledger.filter(t => t.level === this.currentLevel);
            default:
                return this.ledger;
        }
    }

    // Simulate consensus
    simulateConsensus(transaction) {
        const judges = [
            { name: 'Judge Aldric', reliability: 0.9 },
            { name: 'Judge Elara', reliability: 0.85 },
            { name: 'Judge Thorne', reliability: 0.8 }
        ];

        const votes = judges.map(judge => {
            const vote = Math.random() < judge.reliability;
            return {
                judge: judge.name,
                vote: vote,
                delay: Math.random() * 2000 + 1000
            };
        });

        const approvedVotes = votes.filter(v => v.vote).length;
        const consensus = approvedVotes >= 2;

        return {
            votes: votes,
            consensus: consensus,
            approvedVotes: approvedVotes
        };
    }

    // Get success rate
    getSuccessRate() {
        if (this.stats.totalTrades === 0) return 0;
        return Math.round((this.stats.successfulTrades / this.stats.totalTrades) * 100);
    }

    // Check if game is complete
    isGameComplete() {
        return this.currentLevel >= 10 && this.checkLevelCompletion();
    }

    // Get completion percentage
    getCompletionPercentage() {
        const totalLevels = 10;
        const completedLevels = this.badges.length;
        return Math.round((completedLevels / totalLevels) * 100);
    }

    // Update inventory display
    updateInventoryDisplay() {
        const wheatAmount = document.getElementById('wheatAmount');
        const ironAmount = document.getElementById('ironAmount');
        const woolAmount = document.getElementById('woolAmount');
        const spicesAmount = document.getElementById('spicesAmount');
        const goldAmount = document.getElementById('goldAmount');
        const breadAmount = document.getElementById('breadAmount');
        const silkAmount = document.getElementById('silkAmount');
        const ironSwordAmount = document.getElementById('ironSwordAmount');
        const wineBarrelAmount = document.getElementById('wineBarrelAmount');
        const playerLevel = document.getElementById('playerLevel');

        if (wheatAmount) wheatAmount.textContent = this.inventory.wheat;
        if (ironAmount) ironAmount.textContent = this.inventory.iron;
        if (woolAmount) woolAmount.textContent = this.inventory.wool;
        if (spicesAmount) spicesAmount.textContent = this.inventory.spices;
        if (goldAmount) goldAmount.textContent = this.inventory.gold;
        if (breadAmount) breadAmount.textContent = this.inventory.bread;
        if (silkAmount) silkAmount.textContent = this.inventory.silk;
        if (ironSwordAmount) ironSwordAmount.textContent = this.inventory.iron_sword;
        if (wineBarrelAmount) wineBarrelAmount.textContent = this.inventory.wine_barrel;
        if (playerLevel) playerLevel.textContent = this.currentLevel;
    }

    // Get current level
    getCurrentLevel() {
        return this.currentLevel;
    }

    // Get badges
    getBadges() {
        return this.badges;
    }

    // Get game state for export
    getGameState() {
        return {
            currentLevel: this.currentLevel,
            inventory: this.inventory,
            ledger: this.ledger,
            badges: this.badges,
            stats: this.stats,
            currentTradeIndex: this.currentTradeIndex
        };
    }

    // Load game state from data
    loadGameState(data) {
        if (data) {
            this.currentLevel = data.currentLevel || 1;
            this.inventory = { ...this.inventory, ...data.inventory };
            this.ledger = data.ledger || [];
            this.badges = data.badges || [];
            this.stats = { ...this.stats, ...data.stats };
            this.currentTradeIndex = data.currentTradeIndex || 0;
            this.saveGameState();
            this.updateInventoryDisplay();
        }
    }

    // Add resource (for debug/testing)
    addResource(resource, amount) {
        const resourceKey = resource.toLowerCase();
        if (this.inventory.hasOwnProperty(resourceKey)) {
            this.inventory[resourceKey] += amount;
            this.saveGameState();
            this.updateInventoryDisplay();
        }
    }

    // Set level (for debug/testing)
    setLevel(level) {
        if (level >= 1 && level <= 10) {
            this.currentLevel = level;
            this.saveGameState();
            this.updateInventoryDisplay();
        }
    }
}

// Initialize game state
window.gameState = new GameState();