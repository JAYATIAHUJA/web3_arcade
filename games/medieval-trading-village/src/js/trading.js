// Trading System for Medieval Trading Village

class TradingSystem {
    constructor() {
        this.currentTrade = null;
        this.isProcessing = false;
        this.initializeEventListeners();
    }

    // Initialize event listeners
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTradingButtons();
            this.setupLandingButtons();
            this.setupModalButtons();
            this.setupNavigationButtons();
        });
    }

    // Setup trading action buttons
    setupTradingButtons() {
        const signTransactionBtn = document.getElementById('signTransactionBtn');
        const rejectTradeBtn = document.getElementById('rejectTradeBtn');

        if (signTransactionBtn) {
            signTransactionBtn.addEventListener('click', () => {
                this.executeTrade();
            });
        }

        if (rejectTradeBtn) {
            rejectTradeBtn.addEventListener('click', () => {
                this.rejectTrade();
            });
        }
    }

    // Setup landing page buttons
    setupLandingButtons() {
        const startGameBtn = document.getElementById('startGameBtn');
        const howToPlayBtn = document.getElementById('howToPlayBtn');
        const viewLedgerBtn = document.getElementById('viewLedgerBtn');
        const viewLedgerBtn2 = document.getElementById('viewLedgerBtn2');

        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                this.startGame();
            });
        }

        if (howToPlayBtn) {
            howToPlayBtn.addEventListener('click', () => {
                this.showHowToPlay();
            });
        }

        if (viewLedgerBtn) {
            viewLedgerBtn.addEventListener('click', () => {
                this.showLedger();
            });
        }

        if (viewLedgerBtn2) {
            viewLedgerBtn2.addEventListener('click', () => {
                this.showLedger();
            });
        }
    }

    // Setup navigation buttons
    setupNavigationButtons() {
        const howToPlayNavBtn = document.getElementById('howToPlayNavBtn');
        const viewLedgerNavBtn = document.getElementById('viewLedgerNavBtn');
        const backToLandingBtn = document.getElementById('backToLandingBtn');

        if (howToPlayNavBtn) {
            howToPlayNavBtn.addEventListener('click', () => {
                this.showHowToPlay();
            });
        }

        if (viewLedgerNavBtn) {
            viewLedgerNavBtn.addEventListener('click', () => {
                this.showLedger();
            });
        }

        if (backToLandingBtn) {
            backToLandingBtn.addEventListener('click', () => {
                this.showLandingPage();
            });
        }
    }

    // Setup modal buttons
    setupModalButtons() {
        const howToPlayClose = document.getElementById('howToPlayClose');
        const ledgerClose = document.getElementById('ledgerClose');
        const transactionClose = document.getElementById('transactionClose');
        const consensusClose = document.getElementById('consensusClose');
        const levelCompleteClose = document.getElementById('levelCompleteClose');
        const gameCompleteClose = document.getElementById('gameCompleteClose');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const continueTradingBtn = document.getElementById('continueTradingBtn');
        const playAgainBtn = document.getElementById('playAgainBtn');
        const backToArcadeBtn = document.getElementById('backToArcadeBtn');

        if (howToPlayClose) {
            howToPlayClose.addEventListener('click', () => {
                this.closeModal('howToPlayModal');
            });
        }

        if (ledgerClose) {
            ledgerClose.addEventListener('click', () => {
                this.closeModal('ledgerModal');
            });
        }

        if (transactionClose) {
            transactionClose.addEventListener('click', () => {
                this.closeModal('transactionModal');
            });
        }

        if (consensusClose) {
            consensusClose.addEventListener('click', () => {
                this.closeModal('consensusModal');
            });
        }

        if (levelCompleteClose) {
            levelCompleteClose.addEventListener('click', () => {
                this.closeModal('levelCompleteModal');
            });
        }

        if (gameCompleteClose) {
            gameCompleteClose.addEventListener('click', () => {
                this.closeModal('gameCompleteModal');
            });
        }

        if (nextLevelBtn) {
            nextLevelBtn.addEventListener('click', () => {
                this.nextLevel();
            });
        }

        if (continueTradingBtn) {
            continueTradingBtn.addEventListener('click', () => {
                this.continueTrading();
            });
        }

        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.playAgain();
            });
        }

        if (backToArcadeBtn) {
            backToArcadeBtn.addEventListener('click', () => {
                this.backToArcade();
            });
        }
    }

    // Start the game (go to dashboard)
    startGame() {
        // Initialize game state if not already done
        if (window.gameState) {
            window.gameState.loadGameState();
        }
        
        // Show dashboard
        this.showPage('playerDashboard');
        
        // Load current trade
        this.loadCurrentTrade();
        
        // Add welcome message
        this.addStatusMessage('Welcome to Chainshire! Your trading journey begins...');
    }

    // Show landing page
    showLandingPage() {
        this.showPage('landingPage');
    }

    // Show how to play modal
    showHowToPlay() {
        this.showModal('howToPlayModal');
    }

    // Show ledger modal
    showLedger() {
        if (window.ledgerManager) {
            window.ledgerManager.loadLedger();
        }
        this.showModal('ledgerModal');
    }

    // Load current trade
    loadCurrentTrade() {
        if (window.gameState) {
            const currentTrade = window.gameState.getCurrentTrade();
            if (currentTrade) {
                this.currentTrade = currentTrade;
                this.updateTradeDisplay();
            }
        }
    }

    // Execute trade
    rejectTrade() {
        if (this.isProcessing) return;
        let msg = 'Trade rejected. Looking for new offers...';
        if (this.currentTrade) {
            if (this.currentTrade.isScam) {
                window.gameState.applySmartDecisionBonus();
                msg = 'Scam contract rejected! Smart decision bonus awarded.';
                window.gameState.logLedgerEntry(this.currentTrade, 'rejected', 'User declined (scam detected)');
            } else {
                window.gameState.applyMissedOpportunityPenalty();
                msg = 'Legit contract rejected. Missed opportunity penalty applied.';
                window.gameState.logLedgerEntry(this.currentTrade, 'rejected', 'User declined (missed opportunity)');
            }
        }
        this.addStatusMessage(msg);
        setTimeout(() => {
            if (window.gameState) {
                window.gameState.nextTrade();
                this.loadCurrentTrade();
            }
        }, 2000);
    }

        this.isProcessing = true;
        this.showTransactionModal();
    }

    // Reject trade
    rejectTrade() {
        if (this.isProcessing) {
            return;
        }

        this.addStatusMessage('Trade rejected. Looking for new offers...');
        
        // Generate new trade after a short delay
        setTimeout(() => {
            if (window.gameState) {
                window.gameState.nextTrade();
                this.loadCurrentTrade();
            }
        }, 2000);
    }

    // Show transaction modal
    showTransactionModal() {
        const modal = document.getElementById('transactionModal');
        const transactionDetails = document.getElementById('transactionDetails');
        const gasFeeAmount = document.getElementById('gasFeeAmount');

        if (this.currentTrade && transactionDetails) {
            const giveText = Object.entries(this.currentTrade.give)
                .map(([resource, amount]) => `${amount} ${resource}`)
                .join(', ');
            const receiveText = Object.entries(this.currentTrade.receive)
                .map(([resource, amount]) => `${amount} ${resource}`)
                .join(', ');
            
            const details = `
                <p><strong>From:</strong> Merchant</p>
                <p><strong>To:</strong> ${this.currentTrade.villager.name}</p>
                <p><strong>Give:</strong> ${giveText}</p>
                <p><strong>Receive:</strong> ${receiveText}</p>
            `;
            transactionDetails.innerHTML = details;
        }

        // Use the gas fee from the contract or generate random
        const gasFee = this.currentTrade.gasFee || (Math.random() * 0.8 + 0.2).toFixed(1);
        if (gasFeeAmount) {
            gasFeeAmount.textContent = `${gasFee} GOLD COINS`;
        }

        this.showModal('transactionModal');
        this.simulateMining();
    }

    // Simulate mining process
    async simulateMining() {
        const progressBar = document.getElementById('miningProgress');
        const miningStatus = document.getElementById('miningStatus');
        
        if (!progressBar || !miningStatus) return;

        const steps = [
            'Validating transaction...',
            'Checking wallet balance...',
            'Calculating gas fees...',
            'Broadcasting to network...',
            'Waiting for confirmation...',
            'Transaction mined!'
        ];

        for (let i = 0; i <= 100; i += 2) {
            progressBar.style.width = `${i}%`;
            
            const stepIndex = Math.floor((i / 100) * (steps.length - 1));
            if (miningStatus && steps[stepIndex]) {
                miningStatus.textContent = steps[stepIndex];
            }
            
            await this.sleep(50);
        }

        // Close transaction modal and show consensus
        setTimeout(() => {
            this.closeModal('transactionModal');
            this.showConsensusModal();
        }, 1000);
    }

    // Show consensus modal
    showConsensusModal() {
        this.showModal('consensusModal');
        
        if (window.consensusSystem) {
            window.consensusSystem.simulateConsensus(this.currentTrade);
        }
    }

    // Check level completion
    checkLevelCompletion() {
        if (window.gameState && window.gameState.checkLevelCompletion()) {
            this.showLevelCompleteModal();
        }
    }

    // Show level complete modal
    showLevelCompleteModal() {
        const modal = document.getElementById('levelCompleteModal');
        const badgeTitle = document.getElementById('badgeTitle');
        const badgeIcon = document.getElementById('badgeIcon');
        const badgeDescription = document.getElementById('badgeDescription');
        const levelStats = document.getElementById('levelStats');

        if (window.gameState) {
            const currentLevel = window.gameState.getCurrentLevel();
            const levelInfo = window.gameState.getLevelInfo();
            
            if (badgeTitle && levelInfo) {
                badgeTitle.textContent = levelInfo.badge;
            }
            
            if (badgeIcon && levelInfo) {
                badgeIcon.textContent = levelInfo.badgeIcon || '🏆';
            }
            
            if (badgeDescription && levelInfo) {
                badgeDescription.textContent = levelInfo.description;
            }
            
            if (levelStats) {
                const stats = window.gameState.getPlayerStats();
                levelStats.innerHTML = `
                    <p><strong>Trades Completed:</strong> ${stats.totalTrades}</p>
                    <p><strong>Success Rate:</strong> ${stats.successRate}%</p>
                    <p><strong>Gas Fees Paid:</strong> ${stats.totalGasFees} GOLD</p>
                `;
            }
        }

        this.showModal('levelCompleteModal');
    }

    // Next level
    nextLevel() {
        if (window.gameState) {
            window.gameState.nextLevel();
            this.closeModal('levelCompleteModal');
            this.loadCurrentTrade();
            this.addStatusMessage('Welcome to the next level! New challenges await...');
        }
    }

    // Continue trading
    continueTrading() {
        this.closeModal('levelCompleteModal');
        this.loadCurrentTrade();
    }

    // Show game complete modal
    showGameCompleteModal() {
        const modal = document.getElementById('gameCompleteModal');
        const finalStats = document.getElementById('finalStats');
        const allBadges = document.getElementById('allBadges');

        if (window.gameState && finalStats) {
            const stats = window.gameState.getPlayerStats();
            finalStats.innerHTML = `
                <p><strong>Total Trades:</strong> ${stats.totalTrades}</p>
                <p><strong>Successful Trades:</strong> ${stats.successfulTrades}</p>
                <p><strong>Total Gas Fees:</strong> ${stats.totalGasFees} GOLD</p>
                <p><strong>Badges Earned:</strong> ${stats.badges.length}</p>
            `;
        }

        if (window.gameState && allBadges) {
            const badges = window.gameState.getBadges();
            const badgeHtml = badges.map(badge => 
                `<div class="badge-item">${badge.icon} ${badge.name}</div>`
            ).join('');
            allBadges.innerHTML = badgeHtml;
        }

        this.showModal('gameCompleteModal');
    }

    // Play again
    playAgain() {
        if (window.gameState) {
            window.gameState.resetGame();
        }
        this.closeModal('gameCompleteModal');
        this.showLandingPage();
    }

    // Back to arcade
    backToArcade() {
        // This would typically redirect to the main arcade
        this.closeModal('gameCompleteModal');
        this.showLandingPage();
    }

    // Load ledger
    loadLedger() {
        if (window.ledgerManager) {
            window.ledgerManager.loadLedger();
        }
    }

    // Create ledger block
    createLedgerBlock(transaction) {
        if (window.ledgerManager) {
            window.ledgerManager.createLedgerBlock(transaction);
        }
    }

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Show page
    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    // Sleep utility
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Update trade display
    updateTradeDisplay() {
        if (!this.currentTrade) return;

        const villagerAvatar = document.getElementById('villagerAvatar');
        const villagerName = document.getElementById('villagerName');
        const villagerDialogue = document.getElementById('villagerDialogue');
        const contractCode = document.getElementById('contractCode');

        if (villagerAvatar) {
            villagerAvatar.textContent = this.currentTrade.villager.avatar;
        }

        if (villagerName) {
            villagerName.textContent = this.currentTrade.villager.name;
        }

        if (villagerDialogue) {
            villagerDialogue.textContent = this.currentTrade.villager.dialogue;
        }

        if (contractCode) {
            contractCode.textContent = this.currentTrade.contract;
        }
    }

    // Get current trade info
    getCurrentTradeInfo() {
        return this.currentTrade;
    }

    // Check if trade is processing
    isTradeProcessing() {
        return this.isProcessing;
    }

    // Add status message
    showTransactionModal() {
        const modal = document.getElementById('transactionModal');
        const transactionDetails = document.getElementById('transactionDetails');
        const gasFeeAmount = document.getElementById('gasFeeAmount');

        if (this.currentTrade && transactionDetails) {
            const giveText = Object.entries(this.currentTrade.give)
                .map(([resource, amount]) => `${amount} ${resource}`)
                .join(', ');
            const receiveText = Object.entries(this.currentTrade.receive)
                .map(([resource, amount]) => `${amount} ${resource}`)
                .join(', ');
            
            const details = `
                <p><strong>From:</strong> Merchant</p>
                <p><strong>To:</strong> ${this.currentTrade.villager.name}</p>
                <p><strong>Give:</strong> ${giveText}</p>
                <p><strong>Receive:</strong> ${receiveText}</p>
            `;
            transactionDetails.innerHTML = details;
        }

        // Use the gas fee from the contract or generate random
        const gasFee = this.currentTrade.gasFee || (Math.random() * 0.8 + 0.2).toFixed(1);
        if (gasFeeAmount) {
            gasFeeAmount.textContent = `${gasFee} GOLD COINS`;
        }

        this.showModal('transactionModal');
        this.simulateMining();
    }
}

// Initialize trading system
window.tradingSystem = new TradingSystem();
