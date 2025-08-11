// Game Data Arrays
const scamWallets = [
    "0x1234567890abcdef1234567890abcdef12345678",
    "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    "0x1111111111111111111111111111111111111111",
    "0x2222222222222222222222222222222222222222",
    "0x3333333333333333333333333333333333333333",
    "0x4444444444444444444444444444444444444444",
    "0x5555555555555555555555555555555555555555",
    "0x6666666666666666666666666666666666666666",
];
const realWallets = [
    "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xD0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xE0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xF0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
];
const scamLinks = [
    "https://metamask-wallet.com",
    "https://uniswap-v2.com",
    "https://opensea-market.com",
    "https://coinbase-wallet.com",
    "https://binance-wallet.com",
    "https://trust-wallet.net",
    "https://phantom-wallet.org",
    "https://solana-wallet.com",
];
const realLinks = [
    "https://metamask.io",
    "https://uniswap.org",
    "https://opensea.io",
    "https://coinbase.com",
    "https://binance.com",
    "https://trustwallet.com",
    "https://phantom.app",
    "https://solana.com",
];
const scamQRCodes = [
    "QR_SCAM_001: Fake wallet address",
    "QR_SCAM_002: Phishing website",
    "QR_SCAM_003: Malicious contract",
    "QR_SCAM_004: Fake airdrop",
    "QR_SCAM_005: Scam giveaway",
    "QR_SCAM_006: Fake NFT mint",
    "QR_SCAM_007: Phony staking pool",
    "QR_SCAM_008: Scam DeFi protocol",
];
const realQRCodes = [
    "QR_LEGIT_001: Official wallet",
    "QR_LEGIT_002: Verified website",
    "QR_LEGIT_003: Audited contract",
    "QR_LEGIT_004: Official airdrop",
    "QR_LEGIT_005: Verified giveaway",
    "QR_LEGIT_006: Official NFT mint",
    "QR_LEGIT_007: Verified staking pool",
    "QR_LEGIT_008: Audited DeFi protocol",
];

// Difficulty Configuration
const difficultyConfig = {
    easy: {
        timeMultiplier: 1.3,
        scamCountMultiplier: 0.8,
        hintMultiplier: 1.5,
        mistakeTolerance: 3,
        bossLevelMistakeTolerance: 1
    },
    medium: {
        timeMultiplier: 1.0,
        scamCountMultiplier: 1.0,
        hintMultiplier: 1.0,
        mistakeTolerance: 2,
        bossLevelMistakeTolerance: 0 
    },
    hard: {
        timeMultiplier: 0.7,
        scamCountMultiplier: 1.2,
        hintMultiplier: 0.7,
        mistakeTolerance: 1,
        bossLevelMistakeTolerance: 0
    }
};

// Level Configuration
const levelConfig = [
    { level: 1, baseTimeLimit: 90, baseScamCount: 3, totalItems: 8, hints: 3 },
    { level: 2, baseTimeLimit: 85, baseScamCount: 4, totalItems: 10, hints: 3 },
    { level: 3, baseTimeLimit: 80, baseScamCount: 4, totalItems: 12, hints: 3 },
    { level: 4, baseTimeLimit: 75, baseScamCount: 5, totalItems: 12, hints: 3 },
    { level: 5, baseTimeLimit: 70, baseScamCount: 5, totalItems: 14, hints: 3 },
    { level: 6, baseTimeLimit: 65, baseScamCount: 6, totalItems: 14, hints: 3 },
    { level: 7, baseTimeLimit: 60, baseScamCount: 6, totalItems: 16, hints: 3 },
    { level: 8, baseTimeLimit: 55, baseScamCount: 7, totalItems: 16, hints: 3 },
    { level: 9, baseTimeLimit: 50, baseScamCount: 7, totalItems: 18, hints: 3 },
    { level: 10, baseTimeLimit: 45, baseScamCount: 8, totalItems: 20, hints: 0 } // Boss level
];

// Function to get the initial game state
const getInitialGameState = () => ({
    currentPage: 'landing',
    currentLevel: 1,
    startingLevel: 1,
    timeRemaining: 60,
    evidenceFound: 0,
    hintsLeft: 3,
    selectedItems: new Set(),
    evidenceBoard: [],
    mistakes: 0,
    totalScams: 0,
    correctScams: 0,
    gameItems: [],
    timerInterval: null,
    isGameActive: false,
    totalMistakes: 0,
    totalHintsUsed: 0,
    levelResults: [],
    selectedDifficulty: 'medium',
    bossLevelFailed: false
});

let gameState = getInitialGameState();

// DOM Elements - will be initialized after DOM loads
let pages = {};
let elements = {};

// Educational hint messages
const scamEducation = {
    wallet: [
        "This wallet address is all repeating characters, which is a common scam pattern.",
        "Scam wallets often use simple or predictable patterns to trick users.",
        "Legitimate wallets are usually a random mix of numbers and letters.",
        "Beware of wallets with all zeros, ones, or repeating sequences."
    ],
    link: [
        "This website uses a domain that looks similar to a real one, but is fake.",
        "Phishing links often add extra words or dashes to mimic real sites.",
        "Always check for .io, .org, or .com endings and beware of typos.",
        "Scam sites may use .net, .co, or other TLDs to appear legitimate."
    ],
    qr: [
        "This QR code links to a suspicious or unofficial source.",
        "Scam QR codes may promise free tokens or airdrops to lure you in.",
        "Always verify QR codes before scanning with your wallet app.",
        "Fake QR codes often promise unrealistic returns or free money."
    ]
};

// Event Listeners moved to DOMContentLoaded event

// Utility Functions
function selectDifficulty(difficulty) {
    // Remove previous selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select new difficulty
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('selected');
    gameState.selectedDifficulty = difficulty;
    
    // Update start button text based on difficulty
    const startBtn = document.getElementById('startGameBtn');
    const playText = startBtn.querySelector('.play');
    if (playText) {
        switch(difficulty) {
            case 'easy':
                playText.textContent = 'Easy Mode';
                break;
            case 'medium':
                playText.textContent = 'Medium Mode';
                break;
            case 'hard':
                playText.textContent = 'Hard Mode';
                break;
        }
    }
    
    // Update starting level based on difficulty
    switch(difficulty) {
        case 'easy':
            gameState.startingLevel = 1;
            break;
        case 'medium':
            gameState.startingLevel = 4;
            break;
        case 'hard':
            gameState.startingLevel = 8;
            break;
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showPage(pageName) {
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });
    pages[pageName].classList.add('active');
    gameState.currentPage = pageName;
}

function getDifficultyAdjustedConfig(level) {
    const baseConfig = levelConfig[level - 1];
    const difficulty = difficultyConfig[gameState.selectedDifficulty];
    
    return {
        level: baseConfig.level,
        timeLimit: Math.round(baseConfig.baseTimeLimit * difficulty.timeMultiplier),
        scamCount: Math.round(baseConfig.baseScamCount * difficulty.scamCountMultiplier),
        totalItems: baseConfig.totalItems,
        hints: Math.round(baseConfig.hints * difficulty.hintMultiplier),
        mistakeTolerance: level === 10 ? difficulty.bossLevelMistakeTolerance : difficulty.mistakeTolerance
    };
}

function generateLevelItems(level) {
    const config = getDifficultyAdjustedConfig(level);
    const items = [];
    
    const scamWalletsCount = Math.ceil(config.scamCount * 0.4);
    const scamLinksCount = Math.ceil(config.scamCount * 0.3);
    const scamQRCodesCount = config.scamCount - scamWalletsCount - scamLinksCount;
    
    const realWalletsCount = Math.ceil((config.totalItems - config.scamCount) * 0.4);
    const realLinksCount = Math.ceil((config.totalItems - config.scamCount) * 0.3);
    const realQRCodesCount = (config.totalItems - config.scamCount) - realWalletsCount - realLinksCount;
    
    items.push(...scamWallets.slice(0, scamWalletsCount).map(wallet => ({ text: wallet, type: 'wallet', isScam: true })));
    items.push(...scamLinks.slice(0, scamLinksCount).map(link => ({ text: link, type: 'link', isScam: true })));
    items.push(...scamQRCodes.slice(0, scamQRCodesCount).map(qr => ({ text: qr, type: 'qr', isScam: true })));
    
    items.push(...realWallets.slice(0, realWalletsCount).map(wallet => ({ text: wallet, type: 'wallet', isScam: false })));
    items.push(...realLinks.slice(0, realLinksCount).map(link => ({ text: link, type: 'link', isScam: false })));
    items.push(...realQRCodes.slice(0, realQRCodesCount).map(qr => ({ text: qr, type: 'qr', isScam: false })));
    
    return shuffleArray(items);
}

function createItemElement(item, index) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.textContent = item.text;
    itemDiv.dataset.index = index;
    itemDiv.dataset.isScam = item.isScam;
    itemDiv.dataset.type = item.type;
    
    itemDiv.addEventListener('click', () => handleItemClick(itemDiv, item, index));
    
    return itemDiv;
}

function handleItemClick(itemElement, item, index) {
    if (!gameState.isGameActive) return;
    
    const isSelected = gameState.selectedItems.has(index);
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);
    
    if (isSelected) {
        gameState.selectedItems.delete(index);
        itemElement.classList.remove('selected', 'wrong', 'hinted');
        
        if (item.isScam) {
            const evidenceIndex = gameState.evidenceBoard.findIndex(evidence => evidence.index === index);
            if (evidenceIndex !== -1) {
                gameState.evidenceBoard.splice(evidenceIndex, 1);
                gameState.evidenceFound--;
                gameState.correctScams--;
            }
        }
    } else {
        gameState.selectedItems.add(index);
        
        if (item.isScam) {
            itemElement.classList.add('selected');
            gameState.evidenceBoard.push({ ...item, index });
            gameState.evidenceFound++;
            gameState.correctScams++;
            playSound('correct');
            itemElement.classList.add('fade-in');
            
            // Add evidence to board with animation
            addEvidenceToBoard(item, index);
        } else {
            itemElement.classList.add('wrong');
            gameState.mistakes++;
            gameState.totalMistakes++;
            playSound('incorrect');
            itemElement.classList.add('shake');
            
            // Check if this mistake exceeds tolerance (especially for boss level)
            if (gameState.mistakes > config.mistakeTolerance) {
                if (gameState.currentLevel === 10) {
                    // Boss level - any mistake fails the level
                    gameState.bossLevelFailed = true;
                    setTimeout(() => processLevelEnd(false), 1000);
                } else if (gameState.mistakes > config.mistakeTolerance) {
                    // Regular level - too many mistakes
                    setTimeout(() => processLevelEnd(false), 1000);
                }
            }
        }
    }
    
    updateUI();
    if (gameState.evidenceFound >= gameState.totalScams) {
        setTimeout(() => processLevelEnd(true), 500);
    }
}

function addEvidenceToBoard(item, index) {
    const evidenceItem = document.createElement('div');
    evidenceItem.className = 'evidence-item new-evidence';
    evidenceItem.textContent = item.text;
    evidenceItem.dataset.type = item.type;
    
    // Add type-specific icon
    const icon = document.createElement('span');
    icon.className = 'evidence-icon';
    switch(item.type) {
        case 'wallet':
            icon.textContent = '🔐';
            break;
        case 'link':
            icon.textContent = '🌐';
            break;
        case 'qr':
            icon.textContent = '📱';
            break;
    }
    evidenceItem.prepend(icon);
    
    elements.evidenceBoard.appendChild(evidenceItem);
    
    // Trigger animation
    setTimeout(() => {
        evidenceItem.classList.remove('new-evidence');
    }, 100);
}

function useHint() {
    if (gameState.hintsLeft <= 0 || !gameState.isGameActive) return;
    
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);
    
    // Boss level has no hints
    if (gameState.currentLevel === 10) {
        return;
    }
    
    const unselectedScams = gameState.gameItems
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.isScam && !gameState.selectedItems.has(item.index));
    
    if (unselectedScams.length > 0) {
        const randomScam = unselectedScams[Math.floor(Math.random() * unselectedScams.length)];
        const itemElement = document.querySelector(`[data-index="${randomScam.index}"]`);
        
        if (itemElement) {
            itemElement.classList.add('hinted');
            setTimeout(() => {
                itemElement.classList.remove('hinted');
            }, 3000);
        }
        
        const hintMsgDiv = document.getElementById('hintMessage');
        if (gameState.currentLevel <= 3) {
            const pool = scamEducation[randomScam.type];
            if (pool) {
                const msg = pool[Math.floor(Math.random() * pool.length)];
                hintMsgDiv.textContent = msg;
                hintMsgDiv.classList.add('hint-active');
                setTimeout(() => { 
                    hintMsgDiv.textContent = '';
                    hintMsgDiv.classList.remove('hint-active');
                }, 4000);
            }
        } else {
            hintMsgDiv.textContent = '💡 Hint: Look for suspicious patterns!';
            hintMsgDiv.classList.add('hint-active');
            setTimeout(() => { 
                hintMsgDiv.textContent = '';
                hintMsgDiv.classList.remove('hint-active');
            }, 3000);
        }
    }
    
    gameState.hintsLeft--;
    gameState.totalHintsUsed++;
    updateUI();
}

function updateUI() {
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);
    
    elements.currentLevel.textContent = gameState.currentLevel;
    elements.levelProgress.textContent = `${gameState.currentLevel}/10`;
    elements.timer.textContent = gameState.timeRemaining;
    elements.evidenceCount.textContent = gameState.evidenceFound;
    elements.hintCount.textContent = gameState.hintsLeft;
    
    // Disable hint button for boss level or when no hints left
    elements.hintBtn.disabled = gameState.hintsLeft <= 0 || gameState.currentLevel === 10;
    
    // Update timer bar
    const timerBar = document.getElementById('timerBar');
    if (timerBar) {
        const timePercentage = (gameState.timeRemaining / config.timeLimit) * 100;
        timerBar.style.width = `${timePercentage}%`;
    }
    
    // Update evidence board
    elements.evidenceBoard.innerHTML = '';
    gameState.evidenceBoard.forEach(evidence => {
        const evidenceItem = document.createElement('div');
        evidenceItem.className = 'evidence-item';
        evidenceItem.textContent = evidence.text;
        evidenceItem.dataset.type = evidence.type;
        
        const icon = document.createElement('span');
        icon.className = 'evidence-icon';
        switch(evidence.type) {
            case 'wallet':
                icon.textContent = '🔐';
                break;
            case 'link':
                icon.textContent = '🌐';
                break;
            case 'qr':
                icon.textContent = '📱';
                break;
        }
        evidenceItem.prepend(icon);
        
        elements.evidenceBoard.appendChild(evidenceItem);
    });
    
    // Show boss level warning
    if (gameState.currentLevel === 10) {
        const bossWarning = document.querySelector('.boss-warning') || createBossWarning();
        if (bossWarning) {
            bossWarning.style.display = 'block';
        }
    }
}

function createBossWarning() {
    const warning = document.createElement('div');
    warning.className = 'boss-warning';
    warning.innerHTML = `
        <div class="warning-content">
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">BOSS LEVEL: No hints, no mistakes allowed!</span>
        </div>
    `;
    
    const levelHeader = document.querySelector('.level-header');
    levelHeader.appendChild(warning);
    
    return warning;
}

function startTimer() {
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);
    gameState.timeRemaining = config.timeLimit;
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        
        if (gameState.timeRemaining <= 0) {
            processLevelEnd(false);
        } else if (gameState.timeRemaining <= 10) {
            if (elements.timer) {
                elements.timer.style.color = '#ff0000';
                elements.timer.style.animation = 'pulse 1s ease-in-out infinite';
            }
        }
        
        updateUI();
    }, 1000);
}

function playSound(type) {
    try {
        const sound = elements[`${type}Sound`];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Show sound effect indicator
        showSoundIndicator(type);
    } catch (error) {
        console.log('Sound play error:', error);
    }
}

function showSoundIndicator(type) {
    const indicator = document.getElementById('soundIndicator');
    const soundText = document.getElementById('soundText');
    
    if (indicator && soundText) {
        // Remove previous classes
        indicator.className = 'sound-indicator';
        
        // Set appropriate text and class
        switch(type) {
            case 'correct':
                soundText.textContent = '✅ Correct!';
                indicator.classList.add('show', 'correct');
                break;
            case 'incorrect':
                soundText.textContent = '❌ Wrong!';
                indicator.classList.add('show', 'incorrect');
                break;
            case 'levelComplete':
                soundText.textContent = '🎉 Level Complete!';
                indicator.classList.add('show', 'level-complete');
                break;
            default:
                soundText.textContent = '🔊';
                indicator.classList.add('show');
        }
        
        // Hide after 2 seconds
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }
}

function processLevelEnd(isWin) {
    if (!gameState.isGameActive) return;

    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.isGameActive = false;
    
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);
    
    // Check if boss level was failed due to mistakes
    if (gameState.currentLevel === 10 && gameState.bossLevelFailed) {
        isWin = false;
        playSound('incorrect');
    } else if (isWin) {
        playSound('levelComplete');
    }

    const accuracy = gameState.totalScams > 0 ? 
        Math.round((gameState.correctScams / gameState.totalScams) * 100) : 0;
    const timeBonus = Math.max(0, gameState.timeRemaining * 10);
    
    gameState.levelResults.push({
        level: gameState.currentLevel,
        accuracy,
        timeBonus,
        evidenceFound: gameState.evidenceFound,
        mistakes: gameState.mistakes,
        hintsUsed: config.hints - gameState.hintsLeft,
        difficulty: gameState.selectedDifficulty
    });
    
    showLevelCompletePopup(accuracy, timeBonus, gameState.evidenceFound);
}

function showLevelCompletePopup(accuracy, timeBonus, evidenceFound) {
    elements.completedLevel.textContent = gameState.currentLevel;
    elements.levelAccuracy.textContent = `${accuracy}%`;
    elements.levelTimeBonus.textContent = `+${timeBonus}`;
    elements.levelEvidence.textContent = evidenceFound;
    
    // Add difficulty indicator
    const difficultyBadge = document.createElement('div');
    difficultyBadge.className = 'difficulty-badge';
    difficultyBadge.textContent = gameState.selectedDifficulty.toUpperCase();
    difficultyBadge.style.background = getDifficultyColor(gameState.selectedDifficulty);
    
    const popupHeader = document.querySelector('.popup-header');
    const existingBadge = popupHeader.querySelector('.difficulty-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    popupHeader.appendChild(difficultyBadge);
    
    // Populate review list
    const reviewList = document.getElementById('reviewList');
    if (reviewList) {
        reviewList.innerHTML = '';
        gameState.evidenceBoard.forEach(evidence => {
            const li = document.createElement('li');
            li.textContent = evidence.text;
            li.className = 'review-item';
            reviewList.appendChild(li);
        });
    }
    
    elements.levelCompletePopup.classList.remove('hidden');
}

function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': return '#4CAF50';
        case 'medium': return '#FF9800';
        case 'hard': return '#F44336';
        default: return '#FF9800';
    }
}

function nextLevel() {
    elements.levelCompletePopup.classList.add('hidden');
    
    if (gameState.currentLevel >= 10) {
        showFinalResults();
    } else {
        gameState.currentLevel++;
        startLevel();
    }
}

function showFinalResults() {
    const totalEvidence = gameState.levelResults.reduce((sum, result) => sum + result.evidenceFound, 0);
    const totalMistakes = gameState.totalMistakes;
    const totalHintsUsed = gameState.totalHintsUsed;
    
    const totalScams = gameState.levelResults.reduce((sum, result) => sum + result.evidenceFound, 0);
    const overallAccuracy = totalScams > 0 ? 
        Math.round((totalScams / (totalScams + totalMistakes)) * 100) : 0;
    
    elements.finalAccuracy.textContent = `${overallAccuracy}%`;
    elements.totalEvidence.textContent = totalEvidence;
    elements.totalMistakes.textContent = totalMistakes;
    elements.totalHints.textContent = totalHintsUsed;
    
    // Only show certificate for hard mode completion with 90%+ accuracy
    if (gameState.selectedDifficulty === 'hard' && overallAccuracy >= 90) {
        elements.badgeSection.classList.remove('hidden');
    }
    
    showPage('end');
}

function resetGame() {
    gameState = getInitialGameState();
    
    elements.timer.style.color = '';
    elements.timer.style.animation = '';
    elements.badgeSection.classList.add('hidden');
    
    // Reset difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector('[data-difficulty="medium"]').classList.add('selected');
    
    // Set default starting level
    gameState.startingLevel = 1;
    
    // Hide boss warning
    const bossWarning = document.querySelector('.boss-warning');
    if (bossWarning) {
        bossWarning.style.display = 'none';
    }
    
    showPage('landing');
}

function startLevel() {
    const config = getDifficultyAdjustedConfig(gameState.currentLevel);

    gameState.evidenceFound = 0;
    gameState.hintsLeft = config.hints;
    gameState.selectedItems = new Set();
    gameState.evidenceBoard = [];
    gameState.mistakes = 0;
    gameState.correctScams = 0;
    gameState.timerInterval = null;
    gameState.bossLevelFailed = false;

    gameState.gameItems = generateLevelItems(gameState.currentLevel);
    gameState.totalScams = gameState.gameItems.filter(item => item.isScam).length;

    elements.itemsGrid.innerHTML = '';
    gameState.gameItems.forEach((item, index) => {
        const itemElement = createItemElement(item, index);
        elements.itemsGrid.appendChild(itemElement);
    });

    showPage('level');
    updateUI();

    // Start game immediately - no tutorial
    gameState.isGameActive = true;
    startTimer();
}

function startGameFromDifficulty() {
    // Set starting level based on selected difficulty
    gameState.currentLevel = gameState.startingLevel;
    startLevel();
}

// Tutorial removed - game starts immediately

// Tutorial close event listener
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements after DOM is loaded
    pages = {
        landing: document.getElementById('landingPage'),
        backstory: document.getElementById('backstoryPage'),
        level: document.getElementById('levelPages'),
        end: document.getElementById('endScreen')
    };

    elements = {
        currentLevel: document.getElementById('currentLevel'),
        levelProgress: document.getElementById('levelProgress'),
        timer: document.getElementById('timer'),
        evidenceCount: document.getElementById('evidenceCount'),
        hintCount: document.getElementById('hintCount'),
        hintBtn: document.getElementById('hintBtn'),
        itemsGrid: document.getElementById('itemsGrid'),
        evidenceBoard: document.getElementById('evidenceBoard'),
        levelCompletePopup: document.getElementById('levelCompletePopup'),
        completedLevel: document.getElementById('completedLevel'),
        levelAccuracy: document.getElementById('levelAccuracy'),
        levelTimeBonus: document.getElementById('levelTimeBonus'),
        levelEvidence: document.getElementById('levelEvidence'),
        finalAccuracy: document.getElementById('finalAccuracy'),
        totalEvidence: document.getElementById('totalEvidence'),
        totalMistakes: document.getElementById('totalMistakes'),
        totalHints: document.getElementById('totalHints'),
        badgeSection: document.getElementById('badgeSection'),
        correctSound: document.getElementById('correctSound'),
        incorrectSound: document.getElementById('incorrectSound'),
        levelCompleteSound: document.getElementById('levelCompleteSound')
    };

    // Event Listeners
    document.getElementById('startGameBtn').addEventListener('click', () => showPage('backstory'));
    document.getElementById('beginInvestigationBtn').addEventListener('click', startGameFromDifficulty);
    document.getElementById('hintBtn').addEventListener('click', useHint);
    document.getElementById('endLevelBtn').addEventListener('click', () => processLevelEnd(false));
    document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
    document.getElementById('backToMenuBtn').addEventListener('click', () => showPage('landing'));

    // Difficulty selection event listeners
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty));
    });
    
    // Set default difficulty
    selectDifficulty('medium');
    
    showPage('landing');
    pages.landing.classList.add('fade-in');
});

console.log(`
🕵️ Welcome to Detective Case: Scam & Security Awareness! 🕵️
🔍 Your mission: Complete 10 levels of increasing difficulty
💡 Use hints wisely - you only get 3 per level (except boss level!)
🏆 Earn the Fraud Fighter NFT Badge with 90%+ overall accuracy!
⚡ Boss level (Level 10) has no hints and requires perfect accuracy!
🎯 Choose your difficulty: Easy, Medium, or Hard!
`);