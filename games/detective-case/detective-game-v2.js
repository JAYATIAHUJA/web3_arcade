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
    "0x7777777777777777777777777777777777777777",
    "0x8888888888888888888888888888888888888888",
    "0x9999999999999999999999999999999999999999",
    "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "0xcccccccccccccccccccccccccccccccccccccccc",
    "0xdddddddddddddddddddddddddddddddddddddddd"
];

const realWallets = [
    "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "0x8ba1f109551bD432803012645Hac136c772c3c3",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xB0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xC0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xD0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xE0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xF0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xG0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xH0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xI0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xJ0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xK0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8",
    "0xL0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8"
];

const scamLinks = [
    "https://metamask-wallet.com",
    "https://uniswap-v2.com",
    "https://opensea-market.com",
    "https://coinbase-wallet.com",
    "https://binance-wallet.com",
    "https://trust-wallet.com",
    "https://phantom-wallet.com",
    "https://solana-wallet.com",
    "https://polygon-wallet.com",
    "https://avalanche-wallet.com",
    "https://ethereum-wallet.com",
    "https://bitcoin-wallet.com",
    "https://cardano-wallet.com",
    "https://polkadot-wallet.com",
    "https://chainlink-wallet.com"
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
    "https://polygon.technology",
    "https://avalanche.network",
    "https://ethereum.org",
    "https://bitcoin.org",
    "https://cardano.org",
    "https://polkadot.network",
    "https://chainlinklabs.com"
];

const scamQRCodes = [
    "QR_SCAM_001: Fake wallet address",
    "QR_SCAM_002: Phishing website",
    "QR_SCAM_003: Malicious contract",
    "QR_SCAM_004: Fake airdrop",
    "QR_SCAM_005: Scam giveaway",
    "QR_SCAM_006: Fake NFT mint",
    "QR_SCAM_007: Malicious dApp",
    "QR_SCAM_008: Fake staking pool",
    "QR_SCAM_009: Scam token swap",
    "QR_SCAM_010: Fake yield farm",
    "QR_SCAM_011: Malicious wallet",
    "QR_SCAM_012: Fake exchange",
    "QR_SCAM_013: Scam marketplace",
    "QR_SCAM_014: Fake protocol",
    "QR_SCAM_015: Malicious bridge"
];

const realQRCodes = [
    "QR_LEGIT_001: Official wallet",
    "QR_LEGIT_002: Verified website",
    "QR_LEGIT_003: Audited contract",
    "QR_LEGIT_004: Official airdrop",
    "QR_LEGIT_005: Verified giveaway",
    "QR_LEGIT_006: Official NFT mint",
    "QR_LEGIT_007: Verified dApp",
    "QR_LEGIT_008: Official staking pool",
    "QR_LEGIT_009: Verified token swap",
    "QR_LEGIT_010: Official yield farm",
    "QR_LEGIT_011: Verified wallet",
    "QR_LEGIT_012: Official exchange",
    "QR_LEGIT_013: Verified marketplace",
    "QR_LEGIT_014: Official protocol",
    "QR_LEGIT_015: Verified bridge"
];

// Level Configuration
const levelConfig = [
    { level: 1, timeLimit: 90, scamCount: 3, totalItems: 8, hints: 3 },
    { level: 2, timeLimit: 85, scamCount: 4, totalItems: 10, hints: 3 },
    { level: 3, timeLimit: 80, scamCount: 4, totalItems: 12, hints: 3 },
    { level: 4, timeLimit: 75, scamCount: 5, totalItems: 12, hints: 3 },
    { level: 5, timeLimit: 70, scamCount: 5, totalItems: 14, hints: 3 },
    { level: 6, timeLimit: 65, scamCount: 6, totalItems: 14, hints: 3 },
    { level: 7, timeLimit: 60, scamCount: 6, totalItems: 16, hints: 3 },
    { level: 8, timeLimit: 55, scamCount: 7, totalItems: 16, hints: 3 },
    { level: 9, timeLimit: 50, scamCount: 7, totalItems: 18, hints: 3 },
    { level: 10, timeLimit: 45, scamCount: 8, totalItems: 20, hints: 0 } // Boss level
];

// Game State
let gameState = {
    currentPage: 'landing',
    currentLevel: 1,
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
    levelResults: []
};

// DOM Elements
const pages = {
    landing: document.getElementById('landingPage'),
    backstory: document.getElementById('backstoryPage'),
    level: document.getElementById('levelPages'),
    end: document.getElementById('endScreen')
};

const elements = {
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

// Educational hint messages
const scamEducation = {
    wallet: [
        "This wallet address is all repeating characters, which is a common scam pattern.",
        "Scam wallets often use simple or predictable patterns to trick users.",
        "Legitimate wallets are usually a random mix of numbers and letters."
    ],
    link: [
        "This website uses a domain that looks similar to a real one, but is fake.",
        "Phishing links often add extra words or dashes to mimic real sites.",
        "Always check for .io, .org, or .com endings and beware of typos."
    ],
    qr: [
        "This QR code links to a suspicious or unofficial source.",
        "Scam QR codes may promise free tokens or airdrops to lure you in.",
        "Always verify QR codes before scanning with your wallet app."
    ]
};

// Event Listeners
document.getElementById('startGameBtn').addEventListener('click', () => showPage('backstory'));
document.getElementById('beginInvestigationBtn').addEventListener('click', startLevel);
document.getElementById('hintBtn').addEventListener('click', useHint);
document.getElementById('endLevelBtn').addEventListener('click', endLevel);
document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
document.getElementById('playAgainBtn').addEventListener('click', resetGame);
document.getElementById('backToMenuBtn').addEventListener('click', () => showPage('landing'));

// Utility Functions
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

function generateLevelItems(level) {
    const config = levelConfig[level - 1];
    const items = [];
    
    // Calculate item distribution based on level
    const scamWalletsCount = Math.ceil(config.scamCount * 0.4);
    const scamLinksCount = Math.ceil(config.scamCount * 0.3);
    const scamQRCodesCount = config.scamCount - scamWalletsCount - scamLinksCount;
    
    const realWalletsCount = Math.ceil((config.totalItems - config.scamCount) * 0.4);
    const realLinksCount = Math.ceil((config.totalItems - config.scamCount) * 0.3);
    const realQRCodesCount = (config.totalItems - config.scamCount) - realWalletsCount - realLinksCount;
    
    // Add scam items
    items.push(...scamWallets.slice(0, scamWalletsCount).map(wallet => ({ text: wallet, type: 'wallet', isScam: true })));
    items.push(...scamLinks.slice(0, scamLinksCount).map(link => ({ text: link, type: 'link', isScam: true })));
    items.push(...scamQRCodes.slice(0, scamQRCodesCount).map(qr => ({ text: qr, type: 'qr', isScam: true })));
    
    // Add real items
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
    
    if (isSelected) {
        // Unselect item
        gameState.selectedItems.delete(index);
        itemElement.classList.remove('selected', 'wrong', 'hinted');
        
        if (item.isScam) {
            // Remove from evidence board
            const evidenceIndex = gameState.evidenceBoard.findIndex(evidence => evidence.index === index);
            if (evidenceIndex !== -1) {
                gameState.evidenceBoard.splice(evidenceIndex, 1);
                gameState.evidenceFound--;
                gameState.correctScams--;
            }
        }
    } else {
        // Select item
        gameState.selectedItems.add(index);
        
        if (item.isScam) {
            // Correct scam detection
            itemElement.classList.add('selected');
            gameState.evidenceBoard.push({ ...item, index });
            gameState.evidenceFound++;
            gameState.correctScams++;
            playSound('correct');
            itemElement.classList.add('fade-in');
        } else {
            // Wrong selection
            itemElement.classList.add('wrong');
            gameState.mistakes++;
            gameState.totalMistakes++;
            playSound('incorrect');
            itemElement.classList.add('shake');
        }
    }
    
    updateUI();
    checkLevelComplete();
}

function useHint() {
    if (gameState.hintsLeft <= 0 || !gameState.isGameActive) return;
    
    // Find an unselected scam item
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
        // Show educational message for levels 1-3
        const hintMsgDiv = document.getElementById('hintMessage');
        if (gameState.currentLevel <= 3) {
            const pool = scamEducation[randomScam.type];
            if (pool) {
                const msg = pool[Math.floor(Math.random() * pool.length)];
                hintMsgDiv.textContent = msg;
                // Clear after 4 seconds
                setTimeout(() => { hintMsgDiv.textContent = ''; }, 4000);
            }
        } else {
            hintMsgDiv.textContent = '';
        }
    }
    
    gameState.hintsLeft--;
    gameState.totalHintsUsed++;
    updateUI();
}

function updateUI() {
    // Update level info
    elements.currentLevel.textContent = gameState.currentLevel;
    elements.levelProgress.textContent = `${gameState.currentLevel}/10`;
    
    // Update timer
    elements.timer.textContent = gameState.timeRemaining;
    
    // Update evidence count
    elements.evidenceCount.textContent = gameState.evidenceFound;
    
    // Update hint count and button
    elements.hintCount.textContent = gameState.hintsLeft;
    elements.hintBtn.disabled = gameState.hintsLeft <= 0;
    
    // Update evidence board
    elements.evidenceBoard.innerHTML = '';
    gameState.evidenceBoard.forEach(evidence => {
        const evidenceItem = document.createElement('div');
        evidenceItem.className = 'evidence-item';
        evidenceItem.textContent = evidence.text;
        elements.evidenceBoard.appendChild(evidenceItem);
    });
}

function startTimer() {
    const config = levelConfig[gameState.currentLevel - 1];
    gameState.timeRemaining = config.timeLimit;
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        
        if (gameState.timeRemaining <= 0) {
            endLevel();
        } else if (gameState.timeRemaining <= 10) {
            elements.timer.style.color = '#ff0000';
            elements.timer.style.animation = 'pulse 1s ease-in-out infinite';
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
    } catch (error) {
        console.log('Sound play error:', error);
    }
}

function checkLevelComplete() {
    if (gameState.evidenceFound >= gameState.totalScams) {
        setTimeout(() => {
            completeLevel();
        }, 500);
    }
}

function completeLevel() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.isGameActive = false;
    playSound('levelComplete');
    
    // Calculate level results
    const accuracy = gameState.totalScams > 0 ? 
        Math.round((gameState.correctScams / gameState.totalScams) * 100) : 0;
    const timeBonus = Math.max(0, gameState.timeRemaining * 10);
    
    // Store level results
    gameState.levelResults.push({
        level: gameState.currentLevel,
        accuracy,
        timeBonus,
        evidenceFound: gameState.evidenceFound,
        mistakes: gameState.mistakes,
        hintsUsed: 3 - gameState.hintsLeft
    });
    
    // Show level complete popup
    showLevelCompletePopup(accuracy, timeBonus, gameState.evidenceFound);
}

function showLevelCompletePopup(accuracy, timeBonus, evidenceFound) {
    elements.completedLevel.textContent = gameState.currentLevel;
    elements.levelAccuracy.textContent = `${accuracy}%`;
    elements.levelTimeBonus.textContent = `+${timeBonus}`;
    elements.levelEvidence.textContent = evidenceFound;
    
    elements.levelCompletePopup.classList.remove('hidden');
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
    
    // Calculate overall accuracy
    const totalScams = gameState.levelResults.reduce((sum, result) => sum + result.evidenceFound, 0);
    const overallAccuracy = totalScams > 0 ? 
        Math.round((totalScams / (totalScams + totalMistakes)) * 100) : 0;
    
    elements.finalAccuracy.textContent = `${overallAccuracy}%`;
    elements.totalEvidence.textContent = totalEvidence;
    elements.totalMistakes.textContent = totalMistakes;
    elements.totalHints.textContent = totalHintsUsed;
    
    // Show badge if accuracy >= 90%
    if (overallAccuracy >= 90) {
        elements.badgeSection.classList.remove('hidden');
    }
    
    showPage('end');
}

function resetGame() {
    gameState = {
        currentPage: 'landing',
        currentLevel: 1,
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
        levelResults: []
    };
    
    // Reset UI
    elements.timer.style.color = '';
    elements.timer.style.animation = '';
    elements.badgeSection.classList.add('hidden');
    
    showPage('landing');
}

// Game Functions
function startLevel() {
    const config = levelConfig[gameState.currentLevel - 1];
    
    // Reset level state
    gameState.evidenceFound = 0;
    // Hints: 3 for 1-3, 3 for 4-6, 3 for 7-9, 1 for 10
    if (gameState.currentLevel <= 3) gameState.hintsLeft = 3;
    else if (gameState.currentLevel <= 6) gameState.hintsLeft = 3;
    else if (gameState.currentLevel <= 9) gameState.hintsLeft = 3;
    else gameState.hintsLeft = 1;
    gameState.selectedItems = new Set();
    gameState.evidenceBoard = [];
    gameState.mistakes = 0;
    gameState.correctScams = 0;
    gameState.gameItems = [];
    gameState.timerInterval = null;
    gameState.isGameActive = false;
    
    // Generate game items
    gameState.gameItems = generateLevelItems(gameState.currentLevel);
    gameState.totalScams = gameState.gameItems.filter(item => item.isScam).length;
    
    // Create item elements
    elements.itemsGrid.innerHTML = '';
    gameState.gameItems.forEach((item, index) => {
        const itemElement = createItemElement(item, index);
        elements.itemsGrid.appendChild(itemElement);
    });
    
    // Start game
    gameState.isGameActive = true;
    showPage('level');
    startTimer();
    updateUI();
    // Clear hint message
    const hintMsgDiv = document.getElementById('hintMessage');
    if (hintMsgDiv) hintMsgDiv.textContent = '';
}

function endLevel() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.isGameActive = false;
    
    // Calculate level results
    const accuracy = gameState.totalScams > 0 ? 
        Math.round((gameState.correctScams / gameState.totalScams) * 100) : 0;
    const timeBonus = Math.max(0, gameState.timeRemaining * 10);
    
    // Store level results
    gameState.levelResults.push({
        level: gameState.currentLevel,
        accuracy,
        timeBonus,
        evidenceFound: gameState.evidenceFound,
        mistakes: gameState.mistakes,
        hintsUsed: 3 - gameState.hintsLeft
    });
    
    if (gameState.currentLevel >= 10) {
        showFinalResults();
    } else {
        gameState.currentLevel++;
        startLevel();
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    showPage('landing');
    
    // Add fade-in animation to landing page
    pages.landing.classList.add('fade-in');
});

// Console welcome message
console.log(`
🕵️ Welcome to Detective Case: Scam & Security Awareness! 🕵️
🔍 Your mission: Complete 10 levels of increasing difficulty
💡 Use hints wisely - you only get 3 per level (except boss level!)
🏆 Earn the Fraud Fighter NFT Badge with 90%+ overall accuracy!
⚡ Boss level (Level 10) has no hints and requires perfect accuracy!
`);
