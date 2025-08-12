# Web3 Arcade Authentication Guide

## Overview

The Web3 Arcade now uses a simple localStorage-based authentication system that requires users to log in before accessing games. This ensures that only authenticated users can play and track their progress.

## Authentication Flow

### 1. Landing Page (index.html)
- **Non-logged-in users**: See a login prompt instead of game cards
- **Logged-in users**: See all 5 game cards with progress tracking

### 2. Login/Register Pages
- **login.html**: Simple email/password authentication
- **register.html**: Create new account with username/email/password
- Both redirect to dashboard.html upon successful authentication

### 3. Dashboard (dashboard.html)
- **Protected page**: Only accessible to logged-in users
- Shows player profile, stats, and all 5 games with progress
- Certificate section shows locked/unlocked status based on totalScore >= 90

### 4. Game Protection
- All games are protected and require authentication
- Non-authenticated users are redirected to login.html

## Implementation Details

### Authentication Storage
```javascript
// User authentication data
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("username", "player123");
localStorage.setItem("email", "player@example.com");

// Player stats
localStorage.setItem("totalScore", "0");
localStorage.setItem("totalGames", "0");
localStorage.setItem("achievements", "0");
localStorage.setItem("certificates", "0");

// Game progress (per game)
localStorage.setItem("gameProgress_museum-treasure-hunt", "25");
localStorage.setItem("gameScore_museum-treasure-hunt", "50");
```

### Protecting Game Pages

Include the authentication check script in each game:

```html
<!-- Add this to the head section of each game HTML file -->
<script src="../auth-check.js"></script>
```

### Tracking Progress in Games

Include the progress tracker script in each game:

```html
<!-- Add this to the head section of each game HTML file -->
<script src="../progress-tracker.js"></script>
```

Then use it in your game code:

```javascript
// Save progress when player completes a level
window.progressTracker.saveProgress("museum-treasure-hunt", 50, 75, false);

// Load progress when game starts
const progress = window.progressTracker.loadProgress("museum-treasure-hunt");
console.log(`Player is at level ${progress.level} with score ${progress.score}`);

// Check if certificate is unlocked
if (window.progressTracker.isCertificateUnlocked()) {
    console.log("Certificate unlocked!");
}

// Get player stats
const stats = window.progressTracker.getPlayerStats();
console.log(`Total score: ${stats.totalScore}`);
```

## Certificate System

The Web3 Hero Certificate is unlocked when:
- **Condition**: `totalScore >= 90`
- **Display**: Shows locked (🔒) or unlocked (🏆) status
- **Progress**: Visual progress bar showing current score vs 90 required

## Game Integration Checklist

For each game, ensure you have:

1. **Authentication Check**: Include `auth-check.js`
2. **Progress Tracking**: Include `progress-tracker.js`
3. **Save Progress**: Call `saveProgress()` when player makes progress
4. **Load Progress**: Call `loadProgress()` when game starts
5. **Update Stats**: Progress automatically updates total score and achievements

## Example Game Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Game</title>
    <script src="../auth-check.js"></script>
    <script src="../progress-tracker.js"></script>
</head>
<body>
    <div id="game">
        <!-- Your game content -->
    </div>
    
    <script>
        // Game initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Load player's previous progress
            const progress = window.progressTracker.loadProgress("my-game");
            
            // Initialize game with progress
            startGame(progress.level, progress.score);
        });
        
        // Save progress when player completes something
        function onLevelComplete(level, score) {
            window.progressTracker.saveProgress("my-game", level, score, level >= 100);
        }
    </script>
</body>
</html>
```

## Security Notes

- This is a client-side authentication system for demo purposes
- In production, implement proper server-side authentication
- localStorage can be manipulated by users (for demo/educational purposes only)
- Consider adding session timeouts and proper validation for production use

## Troubleshooting

### Common Issues

1. **Games not showing**: Check if user is logged in (`localStorage.getItem("isLoggedIn")`)
2. **Progress not saving**: Ensure `progress-tracker.js` is included
3. **Redirect loops**: Check that `auth-check.js` is properly included in games
4. **Certificate not unlocking**: Verify totalScore >= 90 in localStorage

### Debug Commands

Open browser console and run:
```javascript
// Check authentication status
console.log("Logged in:", localStorage.getItem("isLoggedIn"));
console.log("Username:", localStorage.getItem("username"));

// Check progress
console.log("Total score:", localStorage.getItem("totalScore"));
console.log("Game progress:", localStorage.getItem("gameProgress_museum-treasure-hunt"));

// Clear all data (for testing)
localStorage.clear();
```
