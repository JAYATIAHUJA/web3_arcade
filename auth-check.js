// Authentication Check Script
// Include this script in all game pages to ensure only logged-in users can access them

(function() {
    'use strict';
    
    // Check if user is logged in
    function checkAuth() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const username = localStorage.getItem("username");
        
        if (!isLoggedIn || !username) {
            // Redirect to login page
            window.location.href = "../login.html";
            return false;
        }
        return true;
    }
    
    // Run check immediately
    checkAuth();
    
    // Also check when page becomes visible (in case user logs out in another tab)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            checkAuth();
        }
    });
    
    // Export for use in games
    window.authCheck = {
        checkAuth: checkAuth,
        isLoggedIn: function() {
            return localStorage.getItem("isLoggedIn") === "true";
        },
        getUsername: function() {
            return localStorage.getItem("username");
        },
        logout: function() {
            localStorage.clear();
            window.location.href = "../index.html";
        }
    };
})();
