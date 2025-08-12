# 🏰 Medieval Trading Village – Blockchain Smart Contract Simulator

A fully playable educational game that teaches blockchain and smart contract basics through interactive trading in a medieval fantasy village setting.

## 🎮 Game Overview

Welcome to **Chainshire**, a mystical medieval village where all trades are recorded forever on the Village Ledger using magic scrolls (blockchain smart contracts). As a merchant, you'll learn blockchain concepts through hands-on trading with villagers.

## ✨ Features

### 🎯 Educational Content
- **10 Progressive Levels** teaching blockchain concepts from basic to advanced
- **Interactive Smart Contracts** with real Solidity-style pseudocode
- **Gas Fee System** demonstrating transaction costs
- **Consensus Mechanism** with 3-judge voting system
- **Scam Detection** teaching security awareness
- **Ledger Explorer** showing transaction history

### 🎨 Visual Design
- **Medieval Theme** with authentic fonts and textures
- **Responsive Design** optimized for desktop and mobile
- **Smooth Animations** for mining, consensus, and UI interactions
- **Professional UI** with parchment backgrounds and medieval styling

### 🔧 Technical Features
- **User Authentication** with localStorage persistence
- **Progress Tracking** across all levels
- **Badge System** rewarding achievements
- **Statistics Dashboard** with detailed metrics
- **Export/Import** functionality for game saves
- **Debug Mode** for testing and development

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Register a new account or login to start trading

### Quick Start
1. **Register** a new merchant account
2. **Complete Level 1** to learn basic trading
3. **Progress through levels** to unlock advanced concepts
4. **View your ledger** to see transaction history
5. **Earn badges** for completing levels

## 📚 How to Play

### Basic Trading
1. **Review the Contract**: Each villager offers a smart contract showing what you'll give and receive
2. **Check Your Wallet**: Ensure you have enough resources and gold for gas fees
3. **Sign & Execute**: Click to approve the trade
4. **Watch Mining**: See the transaction being processed
5. **Consensus Vote**: Watch the village judges approve your trade
6. **Receive Rewards**: Get your new resources and continue trading

### Game Mechanics

#### 🏦 Wallet System
- **WHEAT** 🌾 - Basic farming resource
- **IRON** ⛏️ - Crafting material
- **WOOL** 🐑 - Textile resource
- **SPICES** 🌶️ - Luxury goods
- **GOLD COINS** 🪙 - Currency for gas fees

#### ⛏️ Gas Fees
Every transaction requires a small gas fee (in GOLD COINS) to pay the village miners who process your trade.

#### 🏛️ Consensus System
Three village judges must approve each transaction:
- **Judge Aldric** 👨‍⚖️ - Most reliable (90%)
- **Judge Elara** 👩‍⚖️ - Balanced (85%)
- **Judge Thorne** 👨‍⚖️ - Conservative (80%)

At least 2 out of 3 judges must approve for the transaction to succeed.

#### 📜 Smart Contracts
Each trade is represented as a smart contract with conditions:
```solidity
contract Trade {
  function execute() public {
    require(playerWheat >= 5, "Not enough wheat");
    transfer(player, villager, 5 WHEAT);
    transfer(villager, player, 3 IRON);
  }
}
```

## 🎯 Level Progression

### Level 1: Basic Trading
- **Goal**: Learn smart contract execution
- **Badge**: Contract Coder 📜
- **Concepts**: Smart Contracts, Token Transfer, Basic Trading

### Level 2: Gas Fees
- **Goal**: Understand transaction costs
- **Badge**: Gas Fee Guru ⛏️
- **Concepts**: Gas Fees, Transaction Costs, Network Fees

### Level 3: Multi-Token Trades
- **Goal**: Execute complex multi-token exchanges
- **Badge**: Token Trader 🪙
- **Concepts**: Multi-Token Trading, Complex Contracts, Resource Management

### Level 4: Smart Contract Conditions
- **Goal**: Learn conditional logic in contracts
- **Badge**: Condition Master 🔗
- **Concepts**: Conditional Logic, Require Statements, Contract Validation

### Level 5: Scam Detection
- **Goal**: Identify and avoid fraudulent offers
- **Badge**: Fraud Fighter 🛡️
- **Concepts**: Security, Fraud Detection, Risk Assessment

### Level 6: Consensus Validation
- **Goal**: Participate in consensus mechanism
- **Badge**: Consensus Captain ⚖️
- **Concepts**: Consensus, Validation, Network Security

### Level 7: Multi-Party Trades
- **Goal**: Execute trades with multiple parties
- **Badge**: Multi-Party Master 🤝
- **Concepts**: Multi-Party Transactions, Complex Deals, Coordination

### Level 8: Double-Spending Prevention
- **Goal**: Learn blockchain security
- **Badge**: Security Sentinel 🔒
- **Concepts**: Double-Spending, Attack Prevention, Blockchain Security

### Level 9: Supply & Demand
- **Goal**: Understand tokenomics
- **Badge**: Tokenomics Expert 📊
- **Concepts**: Tokenomics, Market Dynamics, Economic Principles

### Level 10: Decentralized Marketplace
- **Goal**: Master the complete system
- **Badge**: Web3 Hero 🏆
- **Concepts**: Decentralization, Marketplace, Complete System

## 🎮 Controls

### Keyboard Shortcuts
- **Ctrl/Cmd + H**: How to Play
- **Ctrl/Cmd + L**: View Ledger
- **Escape**: Close Modals
- **F1**: Help & Controls

### Mouse Controls
- **Click**: Interact with buttons and UI elements
- **Hover**: See tooltips and additional information
- **Scroll**: Navigate through ledgers and modals

## 🛠️ Technical Architecture

### File Structure
```
medieval-trading-village/
├── index.html                 # Main game page
├── src/
│   ├── css/
│   │   ├── styles.css         # Main styles
│   │   ├── modal.css          # Modal styles
│   │   └── animations.css     # Animation styles
│   └── js/
│       ├── gameState.js       # Game state management
│       ├── authentication.js  # User authentication
│       ├── trading.js         # Trading system
│       ├── ledger.js          # Ledger management
│       ├── consensus.js       # Consensus system
│       ├── levels.js          # Level management
│       └── main.js           # Main application
└── README.md                 # This file
```

### Core Systems

#### Game State Management (`gameState.js`)
- Manages player inventory, progress, and game data
- Handles localStorage persistence
- Tracks statistics and achievements

#### Authentication System (`authentication.js`)
- User registration and login
- Session management
- Progress synchronization

#### Trading System (`trading.js`)
- Trade execution and validation
- Transaction simulation
- UI interaction handling

#### Ledger Management (`ledger.js`)
- Transaction history display
- Blockchain explorer functionality
- Data filtering and search

#### Consensus System (`consensus.js`)
- Judge voting simulation
- Transaction validation
- Security checks

#### Level Management (`levels.js`)
- Level progression tracking
- Educational content delivery
- Achievement system

### Data Persistence
- **localStorage**: User accounts, game progress, settings
- **Session Management**: Automatic save/load functionality
- **Export/Import**: Save file functionality for backup

## 🎨 Design System

### Color Palette
- **Primary Brown**: `#8b5a2b` - Main theme color
- **Secondary Brown**: `#a0522d` - Accent color
- **Light Brown**: `#f0e6d2` - Background color
- **Dark Brown**: `#3b2a1e` - Text color
- **Gold**: `#ffd700` - Highlight color
- **Success Green**: `#4caf50` - Success states
- **Error Red**: `#f44336` - Error states

### Typography
- **Uncial Antiqua**: Main headings and titles
- **MedievalSharp**: UI elements and buttons
- **Crimson Text**: Body text and descriptions

### Responsive Design
- **Desktop**: Full-featured layout with side panels
- **Tablet**: Optimized grid layout
- **Mobile**: Single-column layout with touch-friendly controls

## 🐛 Debug Features

### Debug Mode
Enable debug mode in the browser console:
```javascript
window.debug.toggleDebug()
```

### Debug Commands
```javascript
// Unlock all levels
window.debug.unlockAllLevels()

// Add resources
window.debug.addResources()

// Export game data
window.debug.exportData()

// Toggle debug mode
window.debug.toggleDebug()
```

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Resources loaded on demand
- **Efficient Rendering**: Optimized DOM updates
- **Memory Management**: Proper cleanup of event listeners
- **Frame Rate Monitoring**: Performance tracking

### Browser Compatibility
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🔒 Security

### Data Protection
- **Client-Side Only**: No server communication
- **localStorage**: Secure browser storage
- **Input Validation**: All user inputs validated
- **XSS Prevention**: Sanitized content rendering

### Privacy
- **No Tracking**: No analytics or tracking code
- **Local Storage**: All data stays on user's device
- **Optional Export**: Users can export their data

## 🚀 Future Enhancements

### Planned Features
- **Multiplayer Mode**: Real-time trading with other players
- **Advanced Contracts**: More complex smart contract examples
- **NFT Integration**: Collectible trading cards
- **DeFi Concepts**: Yield farming and liquidity pools
- **Mobile App**: Native mobile application

### Educational Expansions
- **More Blockchain Concepts**: Layer 2, sharding, etc.
- **Interactive Tutorials**: Step-by-step learning paths
- **Assessment System**: Knowledge testing and certification
- **Community Features**: Discussion forums and leaderboards

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **ES6+**: Modern JavaScript features
- **Modular Design**: Separate concerns in different files
- **Documentation**: Comment complex functions
- **Error Handling**: Graceful error management

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Fonts**: Medieval and classic typography
- **Emoji**: Unicode emoji for visual elements
- **CSS Grid/Flexbox**: Modern layout techniques
- **localStorage API**: Client-side data persistence

## 📞 Support

For questions, issues, or suggestions:
1. Check the browser console for error messages
2. Review the debug features for troubleshooting
3. Export your game data before making changes
4. Clear browser cache if experiencing issues

---

**Happy Trading in Chainshire!** 🏰✨

*Master the art of blockchain trading in the mystical village where every transaction tells a story.*