// Authentication System for Medieval Trading Village

class Authentication {
    constructor() {
        this.currentUser = null;
        this.users = [];
        this.loadUsers();
        this.checkAuthStatus();
    }

    // Load users from localStorage
    loadUsers() {
        const savedUsers = localStorage.getItem('medievalTradingVillage_users');
        if (savedUsers) {
            try {
                this.users = JSON.parse(savedUsers);
            } catch (error) {
                console.error('Error loading users:', error);
                this.users = [];
            }
        }
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('medievalTradingVillage_users', JSON.stringify(this.users));
    }

    // Check if user is already logged in
    checkAuthStatus() {
        const savedUser = localStorage.getItem('medievalTradingVillage_currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateAuthUI(true);
                this.loadDashboard();
            } catch (error) {
                console.error('Error loading current user:', error);
                this.logout();
            }
        } else {
            this.updateAuthUI(false);
        }
    }

    // Register new user
    register(username, email, password) {
        // Validate input
        if (!username || !email || !password) {
            return { success: false, message: 'All fields are required' };
        }

        if (username.length < 3) {
            return { success: false, message: 'Username must be at least 3 characters' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        if (!this.isValidEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }

        // Check if user already exists
        if (this.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: 'Username already exists' };
        }

        if (this.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password, // In a real app, this would be hashed
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            gameProgress: {
                currentLevel: 1,
                inventory: {
                    wheat: 10,
                    iron: 5,
                    wool: 8,
                    spices: 3,
                    gold: 50
                },
                ledger: [],
                badges: [],
                stats: {
                    totalTrades: 0,
                    successfulTrades: 0,
                    totalGasFees: 0,
                    levelProgress: {}
                }
            }
        };

        // Add user to array
        this.users.push(newUser);
        this.saveUsers();

        // Log in the new user
        this.currentUser = newUser;
        localStorage.setItem('medievalTradingVillage_currentUser', JSON.stringify(newUser));

        // Update game state
        gameState.currentUser = newUser;
        gameState.currentLevel = newUser.gameProgress.currentLevel;
        gameState.inventory = { ...gameState.inventory, ...newUser.gameProgress.inventory };
        gameState.ledger = newUser.gameProgress.ledger;
        gameState.badges = newUser.gameProgress.badges;
        gameState.stats = { ...gameState.stats, ...newUser.gameProgress.stats };

        this.updateAuthUI(true);
        this.loadDashboard();

        return { 
            success: true, 
            message: `Welcome to Chainshire, ${username}! Your merchant journey begins now.`,
            user: newUser
        };
    }

    // Login user
    login(username, password) {
        // Validate input
        if (!username || !password) {
            return { success: false, message: 'Username and password are required' };
        }

        // Find user
        const user = this.users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === password
        );

        if (!user) {
            return { success: false, message: 'Invalid username or password' };
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Set current user
        this.currentUser = user;
        localStorage.setItem('medievalTradingVillage_currentUser', JSON.stringify(user));

        // Update game state
        gameState.currentUser = user;
        gameState.currentLevel = user.gameProgress.currentLevel;
        gameState.inventory = { ...gameState.inventory, ...user.gameProgress.inventory };
        gameState.ledger = user.gameProgress.ledger;
        gameState.badges = user.gameProgress.badges;
        gameState.stats = { ...gameState.stats, ...user.gameProgress.stats };

        this.updateAuthUI(true);
        this.loadDashboard();

        return { 
            success: true, 
            message: `Welcome back, ${username}! Ready to continue trading?`,
            user: user
        };
    }

    // Logout user
    logout() {
        // Save current game progress to user data
        if (this.currentUser) {
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex].gameProgress = {
                    currentLevel: gameState.currentLevel,
                    inventory: gameState.inventory,
                    ledger: gameState.ledger,
                    badges: gameState.badges,
                    stats: gameState.stats
                };
                this.saveUsers();
            }
        }

        // Clear current user
        this.currentUser = null;
        localStorage.removeItem('medievalTradingVillage_currentUser');

        // Reset game state
        gameState.currentUser = null;

        this.updateAuthUI(false);
        this.showLandingPage();

        return { success: true, message: 'You have left the village. Come back soon!' };
    }

    // Update authentication UI
    updateAuthUI(isLoggedIn) {
        const authButtons = document.querySelector('.nav-menu');
        const landingPage = document.getElementById('landingPage');
        const playerDashboard = document.getElementById('playerDashboard');

        if (isLoggedIn) {
            // Hide auth buttons
            if (authButtons) {
                authButtons.style.display = 'none';
            }
            
            // Hide landing page
            if (landingPage) {
                landingPage.classList.remove('active');
            }
            
            // Show dashboard
            if (playerDashboard) {
                playerDashboard.classList.add('active');
            }
        } else {
            // Show auth buttons
            if (authButtons) {
                authButtons.style.display = 'flex';
            }
            
            // Show landing page
            if (landingPage) {
                landingPage.classList.add('active');
            }
            
            // Hide dashboard
            if (playerDashboard) {
                playerDashboard.classList.remove('active');
            }
        }
    }

    // Load dashboard
    loadDashboard() {
        if (!this.currentUser) return;

        // Update player name
        const playerNameElement = document.getElementById('playerName');
        if (playerNameElement) {
            playerNameElement.textContent = this.currentUser.username;
        }

        // Update player level
        const playerLevelElement = document.getElementById('playerLevel');
        if (playerLevelElement) {
            playerLevelElement.textContent = gameState.currentLevel;
        }

        // Update inventory
        this.updateInventoryDisplay();

        // Load current trade
        this.loadCurrentTrade();

        // Add welcome message
        this.addStatusMessage(`Welcome back, ${this.currentUser.username}! Ready to trade?`);
    }

    // Update inventory display
    updateInventoryDisplay() {
        const inventory = gameState.inventory;
        
        const wheatElement = document.getElementById('wheatAmount');
        const ironElement = document.getElementById('ironAmount');
        const woolElement = document.getElementById('woolAmount');
        const spicesElement = document.getElementById('spicesAmount');
        const goldElement = document.getElementById('goldAmount');

        if (wheatElement) wheatElement.textContent = inventory.wheat;
        if (ironElement) ironElement.textContent = inventory.iron;
        if (woolElement) woolElement.textContent = inventory.wool;
        if (spicesElement) spicesElement.textContent = inventory.spices;
        if (goldElement) goldElement.textContent = inventory.gold;
    }

    // Load current trade
    loadCurrentTrade() {
        const villager = gameState.getCurrentVillager();
        const trade = gameState.getCurrentTrade();

        if (!villager || !trade) return;

        // Update villager info
        const villagerAvatar = document.getElementById('villagerAvatar');
        const villagerName = document.getElementById('villagerName');
        const villagerDialogue = document.getElementById('villagerDialogue');
        const contractCode = document.getElementById('contractCode');

        if (villagerAvatar) villagerAvatar.textContent = villager.avatar;
        if (villagerName) villagerName.textContent = villager.name;
        if (villagerDialogue) villagerDialogue.textContent = villager.dialogue;
        if (contractCode) contractCode.textContent = trade.contract;
    }

    // Add status message
    addStatusMessage(message) {
        const statusMessages = document.getElementById('statusMessages');
        if (!statusMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'status-message';
        messageElement.textContent = message;

        // Add timestamp
        const timestamp = new Date().toLocaleTimeString();
        const timestampElement = document.createElement('small');
        timestampElement.textContent = ` - ${timestamp}`;
        timestampElement.style.color = 'var(--secondary-brown)';
        messageElement.appendChild(timestampElement);

        statusMessages.appendChild(messageElement);

        // Keep only last 5 messages
        while (statusMessages.children.length > 5) {
            statusMessages.removeChild(statusMessages.firstChild);
        }

        // Scroll to bottom
        statusMessages.scrollTop = statusMessages.scrollHeight;
    }

    // Show landing page
    showLandingPage() {
        const landingPage = document.getElementById('landingPage');
        const playerDashboard = document.getElementById('playerDashboard');

        if (landingPage) {
            landingPage.classList.add('active');
        }
        
        if (playerDashboard) {
            playerDashboard.classList.remove('active');
        }
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Save user progress
    saveUserProgress() {
        if (!this.currentUser) return;

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex].gameProgress = {
                currentLevel: gameState.currentLevel,
                inventory: gameState.inventory,
                ledger: gameState.ledger,
                badges: gameState.badges,
                stats: gameState.stats
            };
            this.saveUsers();
        }
    }

    // Delete user account
    deleteAccount() {
        if (!this.currentUser) return false;

        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Remove user from array
            this.users = this.users.filter(u => u.id !== this.currentUser.id);
            this.saveUsers();

            // Logout
            this.logout();

            return true;
        }
        return false;
    }

    // Change password
    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) {
            return { success: false, message: 'No user logged in' };
        }

        if (this.currentUser.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }

        if (newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters' };
        }

        // Update password
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex].password = newPassword;
            this.currentUser.password = newPassword;
            this.saveUsers();
            localStorage.setItem('medievalTradingVillage_currentUser', JSON.stringify(this.currentUser));

            return { success: true, message: 'Password changed successfully' };
        }

        return { success: false, message: 'Error updating password' };
    }

    // Get user statistics
    getUserStats() {
        if (!this.currentUser) return null;

        return {
            username: this.currentUser.username,
            email: this.currentUser.email,
            createdAt: this.currentUser.createdAt,
            lastLogin: this.currentUser.lastLogin,
            gameStats: gameState.getPlayerStats()
        };
    }
}

// Create global authentication instance
const auth = new Authentication();

// Event listeners for authentication
document.addEventListener('DOMContentLoaded', function() {
    // Login modal
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginClose = document.getElementById('loginClose');
    const registerClose = document.getElementById('registerClose');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Show modals
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'block';
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            if (registerModal) registerModal.style.display = 'block';
        });
    }

    // Close modals
    if (loginClose) {
        loginClose.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'none';
        });
    }

    if (registerClose) {
        registerClose.addEventListener('click', () => {
            if (registerModal) registerModal.style.display = 'none';
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Switch between modals
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'block';
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (registerModal) registerModal.style.display = 'none';
            if (loginModal) loginModal.style.display = 'block';
        });
    }

    // Handle form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const result = auth.login(username, password);
            
            if (result.success) {
                if (loginModal) loginModal.style.display = 'none';
                loginForm.reset();
                showNotification(result.message, 'success');
            } else {
                showNotification(result.message, 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            const result = auth.register(username, email, password);
            
            if (result.success) {
                if (registerModal) registerModal.style.display = 'none';
                registerForm.reset();
                showNotification(result.message, 'success');
            } else {
                showNotification(result.message, 'error');
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const result = auth.logout();
            showNotification(result.message, 'info');
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-family: 'MedievalSharp', cursive;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, var(--success-green), #66bb6a)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, var(--error-red), #ef5350)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, var(--primary-brown), var(--secondary-brown))';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Authentication;
}
