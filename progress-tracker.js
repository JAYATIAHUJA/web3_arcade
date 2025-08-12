// Progress Tracker Utility
// Include this script in games to track player progress

(function() {
    'use strict';
    
    // Save game progress
    function saveProgress(gameName, level, score, isCompleted = false) {
        const username = localStorage.getItem("username");
        if (!username) return false;
        
        try {
            // Get current progress
            const progressKey = `gameProgress_${gameName}`;
            const currentProgress = parseInt(localStorage.getItem(progressKey) || "0");
            
            // Update progress (use the higher value)
            const newProgress = Math.max(currentProgress, level);
            localStorage.setItem(progressKey, newProgress.toString());
            
            // Update total score
            const currentTotalScore = parseInt(localStorage.getItem("totalScore") || "0");
            const scoreIncrease = score - (parseInt(localStorage.getItem(`gameScore_${gameName}`) || "0"));
            localStorage.setItem("totalScore", (currentTotalScore + scoreIncrease).toString());
            localStorage.setItem(`gameScore_${gameName}`, score.toString());
            
            // Update total games played
            if (isCompleted) {
                const currentGames = parseInt(localStorage.getItem("totalGames") || "0");
                localStorage.setItem("totalGames", (currentGames + 1).toString());
            }
            
            // Update achievements
            updateAchievements();
            
            console.log(`Progress saved for ${gameName}: Level ${level}, Score ${score}`);
            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    }
    
    // Load game progress
    function loadProgress(gameName) {
        const username = localStorage.getItem("username");
        if (!username) return null;
        
        try {
            const progress = parseInt(localStorage.getItem(`gameProgress_${gameName}`) || "0");
            const score = parseInt(localStorage.getItem(`gameScore_${gameName}`) || "0");
            
            return {
                level: progress,
                score: score,
                isCompleted: progress >= 100
            };
        } catch (error) {
            console.error('Error loading progress:', error);
            return null;
        }
    }
    
    // Update achievements based on total score
    function updateAchievements() {
        const totalScore = parseInt(localStorage.getItem("totalScore") || "0");
        const currentAchievements = parseInt(localStorage.getItem("achievements") || "0");
        let newAchievements = currentAchievements;
        
        // Award achievements based on score milestones
        if (totalScore >= 50 && currentAchievements < 1) {
            newAchievements = 1;
        }
        if (totalScore >= 100 && currentAchievements < 2) {
            newAchievements = 2;
        }
        if (totalScore >= 200 && currentAchievements < 3) {
            newAchievements = 3;
        }
        if (totalScore >= 500 && currentAchievements < 4) {
            newAchievements = 4;
        }
        
        if (newAchievements > currentAchievements) {
            localStorage.setItem("achievements", newAchievements.toString());
            console.log(`New achievement unlocked! Total: ${newAchievements}`);
        }
    }
    
    // Check if certificate is unlocked (totalScore >= 90)
    function isCertificateUnlocked() {
        const totalScore = parseInt(localStorage.getItem("totalScore") || "0");
        return totalScore >= 90;
    }
    
    // Get player stats
    function getPlayerStats() {
        return {
            username: localStorage.getItem("username"),
            totalScore: parseInt(localStorage.getItem("totalScore") || "0"),
            totalGames: parseInt(localStorage.getItem("totalGames") || "0"),
            achievements: parseInt(localStorage.getItem("achievements") || "0"),
            certificates: isCertificateUnlocked() ? 1 : 0
        };
    }
    
    // Export for use in games
    window.progressTracker = {
        saveProgress: saveProgress,
        loadProgress: loadProgress,
        getPlayerStats: getPlayerStats,
        isCertificateUnlocked: isCertificateUnlocked,
        updateAchievements: updateAchievements
    };
})();
