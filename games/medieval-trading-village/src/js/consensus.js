// Consensus System for Medieval Trading Village

class ConsensusSystem {
    constructor() {
        this.judges = [
            { name: 'Judge Aldric', reliability: 0.9, avatar: '👨‍⚖️' },
            { name: 'Judge Elara', reliability: 0.85, avatar: '👩‍⚖️' },
            { name: 'Judge Thorne', reliability: 0.8, avatar: '👨‍⚖️' }
        ];
        this.consensusThreshold = 2; // 2 out of 3 judges must approve
    }

    // Simulate consensus voting
    async simulateConsensus(trade) {
        if (!trade) return;

        const judgeElements = [
            document.getElementById('judge1Vote'),
            document.getElementById('judge2Vote'),
            document.getElementById('judge3Vote')
        ];

        const consensusResult = document.getElementById('consensusResult');

        // Reset judge votes
        judgeElements.forEach(element => {
            if (element) {
                element.textContent = 'Thinking...';
                element.className = 'judge-vote';
            }
        });

        if (consensusResult) {
            consensusResult.innerHTML = '<h4>Voting in progress...</h4>';
        }

        // Simulate voting process
        const votes = [];
        for (let i = 0; i < this.judges.length; i++) {
            const judge = this.judges[i];
            const vote = this.calculateJudgeVote(judge, trade);
            
            votes.push({
                judge: judge.name,
                vote: vote,
                delay: Math.random() * 2000 + 1000
            });

            // Animate judge vote
            await this.sleep(votes[i].delay);
            
            if (judgeElements[i]) {
                judgeElements[i].textContent = vote ? '✅ Approved' : '❌ Rejected';
                judgeElements[i].className = `judge-vote ${vote ? 'approved' : 'rejected'}`;
            }
        }

        // Calculate consensus
        const approvedVotes = votes.filter(v => v.vote).length;
        const consensus = approvedVotes >= this.consensusThreshold;

        // Show consensus result
        await this.sleep(1000);
        
        if (consensusResult) {
            if (consensus) {
                consensusResult.innerHTML = '<h4 class="success">✅ Transaction Approved!</h4>';
            } else {
                consensusResult.innerHTML = '<h4 class="failure">❌ Transaction Rejected!</h4>';
            }
        }

        // Execute trade if consensus is reached
        if (consensus && window.gameState && window.tradingSystem) {
            const result = window.gameState.executeTrade(trade);
            
            if (result.success) {
                // Add transaction to ledger
                if (window.ledgerManager) {
                    window.ledgerManager.createLedgerBlock(result.transaction);
                }
                
                // Update status
                if (window.tradingSystem) {
                    window.tradingSystem.addStatusMessage(result.message);
                }
                
                // Check level completion
                setTimeout(() => {
                    if (window.tradingSystem) {
                        window.tradingSystem.checkLevelCompletion();
                    }
                }, 2000);
            }
        } else if (!consensus) {
            // Trade rejected
            if (window.tradingSystem) {
                window.tradingSystem.addStatusMessage('Trade rejected by village consensus. Try again with a different offer.');
            }
        }

        // Reset processing state
        if (window.tradingSystem) {
            window.tradingSystem.isProcessing = false;
        }

        // Close consensus modal after delay
        setTimeout(() => {
            if (window.tradingSystem) {
                window.tradingSystem.closeModal('consensusModal');
            }
        }, 3000);
    }

    // Calculate individual judge vote
    calculateJudgeVote(judge, trade) {
        let baseReliability = judge.reliability;

        // Adjust reliability based on trade characteristics
        if (trade.isScam) {
            baseReliability -= 0.3; // Judges are more likely to reject scams
        }

        // Check for suspicious patterns
        if (this.isSuspiciousPattern(trade)) {
            baseReliability -= 0.2;
        }

        // Check for potential double-spending
        if (this.isPotentialDoubleSpend(trade)) {
            baseReliability -= 0.4;
        }

        // Ensure reliability is between 0 and 1
        baseReliability = Math.max(0, Math.min(1, baseReliability));

        return Math.random() < baseReliability;
    }

    // Validate transaction
    validateTransaction(trade) {
        if (!trade) return false;

        // Check if player has sufficient resources
        if (window.gameState && !window.gameState.canExecuteTrade(trade)) {
            return false;
        }

        // Check for obvious scams
        if (trade.isScam) {
            return false;
        }

        // Check for suspicious patterns
        if (this.isSuspiciousPattern(trade)) {
            return false;
        }

        return true;
    }

    // Check for potential double-spending
    isPotentialDoubleSpend(trade) {
        if (!window.gameState) return false;

        const recentTrades = window.gameState.ledger
            .filter(t => t.from === 'Merchant')
            .slice(-5);

        // Check if player is trying to spend more than they have
        const resourceKey = trade.give.resource.toLowerCase();
        const totalSpent = recentTrades.reduce((sum, t) => {
            if (t.give.resource === trade.give.resource) {
                return sum + t.give.amount;
            }
            return sum;
        }, 0);

        const currentBalance = window.gameState.inventory[resourceKey];
        return (totalSpent + trade.give.amount) > currentBalance;
    }

    // Check for suspicious patterns
    isSuspiciousPattern(trade) {
        // Check for unusually high gas fees
        if (parseFloat(trade.gasFee) > 2.0) {
            return true;
        }

        // Check for extremely favorable trades (likely scams)
        const giveValue = this.estimateResourceValue(trade.give.resource) * trade.give.amount;
        const receiveValue = this.estimateResourceValue(trade.receive.resource) * trade.receive.amount;
        
        if (receiveValue > giveValue * 3) {
            return true;
        }

        return false;
    }

    // Estimate resource value (for scam detection)
    estimateResourceValue(resource) {
        const values = {
            'WHEAT': 1,
            'IRON': 2,
            'WOOL': 1.5,
            'SPICES': 3,
            'GOLD': 5
        };
        return values[resource] || 1;
    }

    // Animate consensus process
    async animateConsensus() {
        const judges = document.querySelectorAll('.judge');
        
        for (let judge of judges) {
            judge.classList.add('voting');
            await this.sleep(500);
        }

        await this.sleep(1000);

        for (let judge of judges) {
            judge.classList.remove('voting');
        }
    }

    // Get consensus statistics
    getConsensusStats() {
        return {
            totalJudges: this.judges.length,
            consensusThreshold: this.consensusThreshold,
            judgeReliability: this.judges.map(j => ({
                name: j.name,
                reliability: j.reliability
            }))
        };
    }

    // Simulate network delay
    async simulateNetworkDelay() {
        const delay = Math.random() * 1000 + 500;
        await this.sleep(delay);
    }

    // Sleep utility
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get judge information
    getJudgeInfo(judgeIndex) {
        return this.judges[judgeIndex] || null;
    }

    // Update judge reliability
    updateJudgeReliability(judgeIndex, newReliability) {
        if (this.judges[judgeIndex]) {
            this.judges[judgeIndex].reliability = Math.max(0, Math.min(1, newReliability));
        }
    }

    // Corrupt a judge (for testing)
    corruptJudge(judgeIndex) {
        if (this.judges[judgeIndex]) {
            this.judges[judgeIndex].reliability = 0.1;
        }
    }

    // Get consensus history
    getConsensusHistory() {
        // This would track historical consensus decisions
        return [];
    }

    // Calculate consensus efficiency
    calculateConsensusEfficiency() {
        const totalReliability = this.judges.reduce((sum, judge) => sum + judge.reliability, 0);
        return totalReliability / this.judges.length;
    }
}

// Initialize consensus system
window.consensusSystem = new ConsensusSystem();
