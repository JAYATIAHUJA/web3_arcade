// Ledger Management System for Medieval Trading Village

class LedgerManager {
    constructor() {
        this.currentFilter = 'all';
        this.initializeEventListeners();
    }

    // Initialize event listeners
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFilterButtons();
        });
    }

    // Setup filter buttons
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    // Set current filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        // Reload ledger with new filter
        this.loadLedger();
    }

    // Load ledger with current filter
    loadLedger() {
        const ledgerBlocks = document.getElementById('ledgerBlocks');
        if (!ledgerBlocks) return;

        ledgerBlocks.innerHTML = '';

        const ledger = gameState.getFilteredLedger(this.currentFilter);
        
        if (ledger.length === 0) {
            this.showEmptyLedger();
            return;
        }

        // Sort ledger by timestamp (newest first)
        ledger.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        ledger.forEach(transaction => {
            const blockElement = this.createLedgerBlock(transaction);
            ledgerBlocks.appendChild(blockElement);
        });

        // Add ledger statistics
        this.addLedgerStats(ledger);
    }

    // Show empty ledger message
    showEmptyLedger() {
        const ledgerBlocks = document.getElementById('ledgerBlocks');
        if (!ledgerBlocks) return;

        let message = '';
        switch (this.currentFilter) {
            case 'player':
                message = 'No personal transactions yet. Start trading to see your history!';
                break;
            case 'recent':
                message = 'No recent transactions. The village ledger is empty!';
                break;
            default:
                message = 'No transactions yet. Start trading to see the village ledger!';
        }

        ledgerBlocks.innerHTML = `
            <div class="text-center" style="padding: 2rem; color: var(--secondary-brown); font-style: italic;">
                ${message}
            </div>
        `;
    }

    // Create ledger block element
    createLedgerBlock(transaction) {
        const block = document.createElement('div');
        block.className = 'ledger-block';

        const giveText = this.formatResources(transaction.give);
        const receiveText = this.formatResources(transaction.receive);
        const timestamp = new Date(transaction.timestamp).toLocaleString();

        block.innerHTML = `
            <div class="block-header">
                <div class="block-number">Block #${transaction.blockNumber}</div>
                <div class="block-timestamp">${timestamp}</div>
            </div>
            <div class="block-details">
                <div class="block-detail">
                    <span class="block-detail-label">From:</span>
                    <span class="block-detail-value">${transaction.from}</span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">To:</span>
                    <span class="block-detail-value">${transaction.to}</span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">Give:</span>
                    <span class="block-detail-value">${giveText}</span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">Receive:</span>
                    <span class="block-detail-value">${receiveText}</span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">Gas Fee:</span>
                    <span class="block-detail-value">${transaction.gasFee} GOLD COINS</span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">Status:</span>
                    <span class="block-detail-value ${transaction.isScam ? 'error' : 'success'}">
                        ${transaction.isScam ? '❌ Scam' : '✅ Success'}
                    </span>
                </div>
                <div class="block-detail">
                    <span class="block-detail-label">Level:</span>
                    <span class="block-detail-value">${transaction.level}</span>
                </div>
            </div>
        `;

        // Add click event to show transaction details
        block.addEventListener('click', () => {
            this.showTransactionDetails(transaction);
        });

        return block;
    }

    // Format resources for display
    formatResources(resources) {
        return Object.entries(resources)
            .map(([resource, amount]) => `${amount} ${resource.toUpperCase()}`)
            .join(', ');
    }

    // Add ledger statistics
    addLedgerStats(ledger) {
        const ledgerBlocks = document.getElementById('ledgerBlocks');
        if (!ledgerBlocks) return;

        const stats = this.calculateLedgerStats(ledger);
        
        const statsElement = document.createElement('div');
        statsElement.className = 'ledger-stats';
        statsElement.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 230, 210, 0.8));
            border: 2px solid var(--primary-brown);
            border-radius: var(--border-radius);
            font-family: 'MedievalSharp', cursive;
        `;

        statsElement.innerHTML = `
            <h4 style="color: var(--primary-brown); margin-bottom: 0.5rem;">Ledger Statistics</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; font-size: 0.9rem;">
                <div><strong>Total Transactions:</strong> ${stats.totalTransactions}</div>
                <div><strong>Successful:</strong> ${stats.successful}</div>
                <div><strong>Scams:</strong> ${stats.scams}</div>
                <div><strong>Total Gas Fees:</strong> ${stats.totalGasFees.toFixed(1)}</div>
                <div><strong>Average Gas Fee:</strong> ${stats.averageGasFee.toFixed(2)}</div>
                <div><strong>Success Rate:</strong> ${stats.successRate}%</div>
            </div>
        `;

        ledgerBlocks.appendChild(statsElement);
    }

    // Calculate ledger statistics
    calculateLedgerStats(ledger) {
        const totalTransactions = ledger.length;
        const successful = ledger.filter(t => !t.isScam).length;
        const scams = ledger.filter(t => t.isScam).length;
        const totalGasFees = ledger.reduce((sum, t) => sum + t.gasFee, 0);
        const averageGasFee = totalTransactions > 0 ? totalGasFees / totalTransactions : 0;
        const successRate = totalTransactions > 0 ? Math.round((successful / totalTransactions) * 100) : 0;

        return {
            totalTransactions,
            successful,
            scams,
            totalGasFees,
            averageGasFee,
            successRate
        };
    }

    // Show transaction details modal
    showTransactionDetails(transaction) {
        // Create modal for transaction details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';

        const giveText = this.formatResources(transaction.give);
        const receiveText = this.formatResources(transaction.receive);
        const timestamp = new Date(transaction.timestamp).toLocaleString();

        modal.innerHTML = `
            <div class="modal-content medieval-modal">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>Transaction Details</h3>
                <div style="margin: 1rem 0;">
                    <div style="margin-bottom: 0.5rem;"><strong>Block Number:</strong> ${transaction.blockNumber}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Timestamp:</strong> ${timestamp}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>From:</strong> ${transaction.from}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>To:</strong> ${transaction.to}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Give:</strong> ${giveText}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Receive:</strong> ${receiveText}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Gas Fee:</strong> ${transaction.gasFee} GOLD COINS</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Level:</strong> ${transaction.level}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Status:</strong> 
                        <span style="color: ${transaction.isScam ? 'var(--error-red)' : 'var(--success-green)'}">
                            ${transaction.isScam ? '❌ Scam' : '✅ Success'}
                        </span>
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="action-btn primary-btn">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Export ledger to JSON
    exportLedger() {
        const ledger = gameState.ledger;
        const dataStr = JSON.stringify(ledger, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `chainshire-ledger-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Search ledger
    searchLedger(query) {
        if (!query.trim()) {
            this.loadLedger();
            return;
        }

        const ledgerBlocks = document.getElementById('ledgerBlocks');
        if (!ledgerBlocks) return;

        ledgerBlocks.innerHTML = '';

        const ledger = gameState.ledger.filter(transaction => {
            const searchText = query.toLowerCase();
            return (
                transaction.from.toLowerCase().includes(searchText) ||
                transaction.to.toLowerCase().includes(searchText) ||
                Object.keys(transaction.give).some(resource => 
                    resource.toLowerCase().includes(searchText)
                ) ||
                Object.keys(transaction.receive).some(resource => 
                    resource.toLowerCase().includes(searchText)
                )
            );
        });

        if (ledger.length === 0) {
            ledgerBlocks.innerHTML = `
                <div class="text-center" style="padding: 2rem; color: var(--secondary-brown); font-style: italic;">
                    No transactions found matching "${query}"
                </div>
            `;
            return;
        }

        ledger.forEach(transaction => {
            const blockElement = this.createLedgerBlock(transaction);
            ledgerBlocks.appendChild(blockElement);
        });
    }

    // Get ledger summary
    getLedgerSummary() {
        const ledger = gameState.ledger;
        const stats = this.calculateLedgerStats(ledger);
        
        return {
            ...stats,
            totalBlocks: ledger.length,
            firstTransaction: ledger.length > 0 ? new Date(ledger[0].timestamp) : null,
            lastTransaction: ledger.length > 0 ? new Date(ledger[ledger.length - 1].timestamp) : null,
            uniqueParticipants: new Set([
                ...ledger.map(t => t.from),
                ...ledger.map(t => t.to)
            ]).size
        };
    }

    // Validate transaction
    validateTransaction(transaction) {
        const errors = [];

        if (!transaction.from || !transaction.to) {
            errors.push('Missing sender or recipient');
        }

        if (!transaction.give || Object.keys(transaction.give).length === 0) {
            errors.push('No resources being given');
        }

        if (!transaction.receive || Object.keys(transaction.receive).length === 0) {
            errors.push('No resources being received');
        }

        if (transaction.gasFee < 0) {
            errors.push('Invalid gas fee');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Get transaction by ID
    getTransactionById(id) {
        return gameState.ledger.find(t => t.id === id);
    }

    // Get transactions by level
    getTransactionsByLevel(level) {
        return gameState.ledger.filter(t => t.level === level);
    }

    // Get transactions by participant
    getTransactionsByParticipant(participant) {
        return gameState.ledger.filter(t => 
            t.from.toLowerCase() === participant.toLowerCase() || 
            t.to.toLowerCase() === participant.toLowerCase()
        );
    }
}

// Create global ledger manager instance
const ledgerManager = new LedgerManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LedgerManager;
}