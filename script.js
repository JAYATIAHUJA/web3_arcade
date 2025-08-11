// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeButtonHandlers();
    initializeParticleEffects();
    initializeFloatingShapes();
});

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.game-card, .section-header, .about-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Button Click Handlers
function initializeButtonHandlers() {
    // Start Learning Button
    const startLearningBtn = document.getElementById('startLearning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.querySelector('.button-text').textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.classList.remove('loading');
                this.querySelector('.button-text').textContent = 'Start Learning';
                
                // Scroll to games section
                const gamesSection = document.querySelector('#games');
                if (gamesSection) {
                    gamesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);
        });
    }
    
    // Play Now Buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const gameCard = this.closest('[data-game]');
            const gameName = gameCard ? gameCard.dataset.game : 'Unknown Game';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Loading...';
            this.classList.add('loading');
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
                this.classList.remove('loading');
                if (gameName === 'detective-case') {
                    window.location.href = 'games/detective-case/detective-game-v2.html';
                } else {
                    showGameLoadingAlert(gameName);
                }
            }, 600);
        });
    });

    // New 3D card "See More" buttons
    const seeMoreButtons = document.querySelectorAll('.games-grid .see-more');
    seeMoreButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('[data-game]');
            const gameName = parent ? parent.dataset.game : 'Unknown Game';
            this.style.transform = 'scale(0.95) translateZ(20px)';
            setTimeout(() => { this.style.transform = 'translateZ(20px)'; }, 150);
            if (gameName === 'detective-case') {
                window.location.href = 'games/detective-case/detective-game-v2.html';
            } else {
                showGameLoadingAlert(gameName);
            }
        });
    });
}

// Game Loading Alert
function showGameLoadingAlert(gameName) {
    // Create custom alert element
    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'game-alert-overlay';
    alertOverlay.innerHTML = `
        <div class="game-alert">
            <div class="alert-icon">🎮</div>
            <h3>Game Loading...</h3>
            <p>${gameName} is being prepared for you!</p>
            <button class="alert-close-btn">Got it!</button>
        </div>
    `;
    
    // Add styles
    alertOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease;
    `;
    
    const alertBox = alertOverlay.querySelector('.game-alert');
    alertBox.style.cssText = `
        background: linear-gradient(135deg, #1a1a3a, #2d1b69);
        border: 1px solid #8b5cf6;
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
        animation: slideUp 0.3s ease;
    `;
    
    const closeBtn = alertOverlay.querySelector('.alert-close-btn');
    closeBtn.style.cssText = `
        background: linear-gradient(45deg, #00d4ff, #8b5cf6);
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 25px;
        color: white;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    `;
    
    // Add hover effect
    closeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.6)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    // Close functionality
    closeBtn.addEventListener('click', function() {
        alertOverlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(alertOverlay);
        }, 300);
    });
    
    // Close on overlay click
    alertOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeBtn.click();
        }
    });
    
    // Add to page
    document.body.appendChild(alertOverlay);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Particle Effects
function initializeParticleEffects() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 200));
        
        // Add glow effect
        particle.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px #00d4ff';
            this.style.transform = 'scale(2)';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// Floating Shapes Animation
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add interactive hover effect
        shape.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1.2) rotate(180deg)';
            this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.opacity = '0.3';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click effect
        shape.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Parallax Effect for Hero Section
function initializeParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const rate = scrolled * (0.1 + index * 0.05);
            shape.style.transform = `translateY(${rate}px) rotate(${rate}deg)`;
        });
    });
}

// Initialize parallax effect
initializeParallaxEffect();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close any open alerts
    if (e.key === 'Escape') {
        const alertOverlay = document.querySelector('.game-alert-overlay');
        if (alertOverlay) {
            alertOverlay.querySelector('.alert-close-btn').click();
        }
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPreviousSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Helper functions for keyboard navigation
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    
    return sections[0];
}

function getNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex + 1] || null;
}

function getPreviousSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex - 1] || null;
}

// Add loading animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based animations can go here
}, 16)); // ~60fps

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function() {}, {passive: true});

// Console welcome message
console.log(`
🎮 Welcome to Web3 Learning Arcade! 🎮
🚀 Ready to learn blockchain through gaming?
💡 Try clicking on the floating shapes and particles!
⌨️  Use arrow keys to navigate between sections
`);
