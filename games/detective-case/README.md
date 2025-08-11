# Detective Case: Scam & Security Awareness 🕵️

A comprehensive browser-based game designed to educate players about Web3 scams and security awareness through interactive gameplay.

## 🎮 Game Overview

**Detective Case: Scam & Security Awareness** is an educational game that challenges players to identify fraudulent items across 10 increasingly difficult levels. Players must distinguish between legitimate and scam wallet addresses, websites, and QR codes while racing against the clock.

## ✨ Features

### 🎯 Core Gameplay
- **10 Progressive Levels**: Increasing difficulty with unique challenges
- **Mixed Item Types**: Wallet addresses, websites, and QR codes
- **Evidence Board**: Corkboard-style display for collected evidence
- **Countdown Timer**: Time pressure adds excitement
- **Hint System**: Educational hints for levels 1-9

### 🎲 Difficulty System
- **Easy Mode**: More time, fewer scams, more hints, higher mistake tolerance, starts from Level 1
- **Medium Mode**: Balanced gameplay (default), starts from Level 4
- **Hard Mode**: Less time, more scams, fewer hints, strict mistake limits, starts from Level 8

### 🏆 Boss Challenge (Level 10)
- **No Hints**: Players must rely on their detective skills
- **Zero Tolerance**: Any mistake fails the level
- **All Scam Types**: Comprehensive final test
- **Certificate Requirement**: Only available after completing Hard Mode with 90%+ accuracy

### 🎨 Visual Enhancements
- **Dark Detective Theme**: Mysterious atmosphere with yellow accents
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Works on all device sizes
- **Typewriter Fonts**: Authentic detective feel
- **Interactive Tutorial**: Alert-style tutorial that appears before starting each difficulty level

### 🔊 Audio & Feedback
- **Sound Effects**: Correct/incorrect item feedback
- **Visual Indicators**: Sound effect notifications
- **Haptic-like Feedback**: Visual cues for all actions

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Download or clone the repository
2. Open `detective-game-v2.html` in your browser
3. Start playing immediately!

### How to Play
1. **Select Difficulty**: Choose Easy, Medium, or Hard
2. **Read Backstory**: Understand your mission
3. **Investigate Items**: Click on suspicious items
4. **Collect Evidence**: Add scams to your evidence board
5. **Beat the Timer**: Find all scams before time runs out
6. **Progress**: Complete levels to unlock the boss challenge

## 🎯 Game Mechanics

### Item Types
- **🔐 Wallet Addresses**: Look for suspicious patterns
- **🌐 Websites**: Identify phishing domains
- **📱 QR Codes**: Spot malicious content

### Scoring System
- **Correct Scam**: +1 evidence, moves to board
- **Incorrect Guess**: +1 mistake, item stays
- **Time Bonus**: Remaining time × 10 points
- **Accuracy**: (Correct Scams / Total Scams) × 100%

### Hint System
- **Levels 1-3**: Educational explanations
- **Levels 4-9**: General guidance
- **Level 10**: No hints available

## 🏅 Achievements

### Badges
- **Fraud Fighter NFT Badge**: 90%+ overall accuracy
- **Perfect Detective**: 100% accuracy on any level
- **Speed Demon**: Complete levels with significant time remaining

### Statistics Tracked
- Overall accuracy percentage
- Total evidence collected
- Total mistakes made
- Hints used
- Time bonuses earned

## 🎨 Technical Features

### Frontend Technologies
- **HTML5**: Semantic structure
- **CSS3**: Advanced animations and responsive design
- **JavaScript ES6+**: Modern game logic and state management

### Key Features
- **Progressive Web App**: Works offline
- **Local Storage**: Saves game progress
- **Responsive Grid**: Adapts to any screen size
- **CSS Animations**: Smooth 60fps animations
- **Accessibility**: ARIA labels and keyboard navigation

### Performance Optimizations
- **Efficient Rendering**: Minimal DOM manipulation
- **Smooth Animations**: Hardware-accelerated CSS
- **Memory Management**: Proper cleanup and garbage collection

## 🔧 Customization

### Adding New Items
```javascript
// Add to scam arrays
scamWallets.push("0xNEW_SCAM_ADDRESS");
scamLinks.push("https://new-scam-site.com");
scamQRCodes.push("QR_NEW_SCAM: Description");

// Add to real arrays
realWallets.push("0xNEW_LEGIT_ADDRESS");
realLinks.push("https://new-legit-site.com");
realQRCodes.push("QR_NEW_LEGIT: Description");
```

### Modifying Difficulty
```javascript
const difficultyConfig = {
    custom: {
        timeMultiplier: 1.2,
        scamCountMultiplier: 0.9,
        hintMultiplier: 1.3,
        mistakeTolerance: 2,
        bossLevelMistakeTolerance: 0
    }
};
```

### Styling Changes
- Modify CSS variables in `:root`
- Adjust animations in keyframes
- Customize colors and fonts

## 📱 Browser Compatibility

- **Chrome**: 80+ ✅
- **Firefox**: 75+ ✅
- **Safari**: 13+ ✅
- **Edge**: 80+ ✅
- **Mobile Browsers**: Full support ✅

## 🐛 Known Issues & Solutions

### Audio Not Playing
- **Issue**: Sound effects don't work
- **Solution**: Check browser autoplay settings, ensure page is user-interacted

### Performance Issues
- **Issue**: Slow animations on older devices
- **Solution**: Reduce animation complexity in CSS

### Mobile Layout
- **Issue**: Items grid too small on mobile
- **Solution**: Adjust grid-template-columns in responsive CSS

## 🚀 Future Enhancements

### Planned Features
- [ ] Multiplayer mode
- [ ] Leaderboards
- [ ] Custom level creator
- [ ] More item types
- [ ] Advanced difficulty algorithms
- [ ] Social sharing
- [ ] Achievement system

### Community Contributions
- [ ] New scam patterns
- [ ] Additional languages
- [ ] Theme variations
- [ ] Sound effect packs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@detectivecase.com

## 🙏 Acknowledgments

- **Fonts**: Google Fonts (Crimson Text, UnifrakturMaguntia)
- **Icons**: Unicode emojis and symbols
- **Inspiration**: Real-world Web3 security challenges
- **Community**: Beta testers and feedback providers

---

**🎯 Ready to become a Web3 Security Detective? Start playing now!**

*Remember: In the real world, always verify before you trust!*
