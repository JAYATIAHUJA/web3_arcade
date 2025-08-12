// Game Progress Utility for Web3 Arcade
// Include this script in your games to save progress

class GameProgressManager {
    constructor() {
        this.supabaseUrl = 'https://yxxytqwqpcuojdwdempa.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eHl0cXdxcGN1b2pkd2RlbXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTQ5MTksImV4cCI6MjA3MDU5MDkxOX0.7tICWVQ7DANyzPH9pEzhlgwR9NBvrpzKuGncbxO6kEw';
        this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
        this.currentUser = null;
    }

    // Initialize the progress manager
    async init() {
        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            if (error || !user) {
                console.warn('No authenticated user found for game progress');
                return false;
            }
            this.currentUser = user;
            return true;
        } catch (error) {
            console.error('Error initializing game progress:', error);
            return false;
        }
    }

    // Save game progress
    async saveProgress(gameName, gameTitle, level, score, isCompleted = false) {
        if (!this.currentUser) {
            console.warn('No authenticated user for saving progress');
            return false;
        }

        try {
            // Get current progress
            const { data: currentProgress, error: fetchError } = await this.supabase
                .from('game_progress')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .eq('game_name', gameName)
                .single();

            const progressData = {
                user_id: this.currentUser.id,
                game_name: gameName,
                game_title: gameTitle,
                current_level: level,
                current_score: score,
                best_score: Math.max(score, currentProgress?.best_score || 0),
                is_completed: isCompleted,
                play_count: (currentProgress?.play_count || 0) + 1,
                last_played: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            if (isCompleted && !currentProgress?.is_completed) {
                progressData.completion_date = new Date().toISOString();
            }

            let result;
            if (currentProgress) {
                // Update existing progress
                result = await this.supabase
                    .from('game_progress')
                    .update(progressData)
                    .eq('user_id', this.currentUser.id)
                    .eq('game_name', gameName);
            } else {
                // Insert new progress
                progressData.created_at = new Date().toISOString();
                result = await this.supabase
                    .from('game_progress')
                    .insert(progressData);
            }

            if (result.error) {
                console.error('Error saving game progress:', result.error);
                return false;
            }

            // Save game session
            await this.saveGameSession(gameName, level, score);

            // Check for certificate eligibility
            if (isCompleted) {
                await this.checkAndAwardCertificate(gameName, gameTitle, score);
            }

            console.log('Game progress saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving game progress:', error);
            return false;
        }
    }

    // Save game session
    async saveGameSession(gameName, level, score) {
        if (!this.currentUser) return;

        try {
            await this.supabase
                .from('game_sessions')
                .insert({
                    user_id: this.currentUser.id,
                    game_name: gameName,
                    session_score: score,
                    session_level: level,
                    completed_at: new Date().toISOString()
                });
        } catch (error) {
            console.error('Error saving game session:', error);
        }
    }

    // Check and award certificates
    async checkAndAwardCertificate(gameName, gameTitle, score) {
        if (!this.currentUser) return;

        try {
            // Check if certificate already exists
            const { data: existingCert } = await this.supabase
                .from('certificates')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .eq('certificate_type', gameName)
                .single();

            if (existingCert) {
                console.log('Certificate already awarded for this game');
                return;
            }

            // Award certificate based on score
            const certificateData = this.getCertificateData(gameName, gameTitle, score);
            
            if (certificateData) {
                await this.supabase
                    .from('certificates')
                    .insert({
                        user_id: this.currentUser.id,
                        certificate_type: gameName,
                        certificate_name: certificateData.name,
                        certificate_description: certificateData.description,
                        score_threshold: certificateData.threshold,
                        earned_score: score,
                        certificate_data: certificateData
                    });

                console.log('Certificate awarded:', certificateData.name);
            }
        } catch (error) {
            console.error('Error awarding certificate:', error);
        }
    }

    // Get certificate data based on game and score
    getCertificateData(gameName, gameTitle, score) {
        const certificates = {
            'museum-treasure-hunt': {
                name: 'Blockchain Foundation Certificate',
                description: 'Successfully completed the Blockchain Museum challenge',
                threshold: 100
            },
            'bakery-checkout': {
                name: 'Wallet Creation Master Certificate',
                description: 'Mastered the art of creating secure cryptocurrency wallets',
                threshold: 150
            },
            'medieval-trading': {
                name: 'Smart Contract Developer Certificate',
                description: 'Demonstrated proficiency in smart contract development',
                threshold: 200
            },
            'detective-case': {
                name: 'Crypto Security Expert Certificate',
                description: 'Proven ability to identify and prevent crypto scams',
                threshold: 120
            },
            'island-resource': {
                name: 'Tokenomics Specialist Certificate',
                description: 'Mastered token economics and resource management',
                threshold: 180
            }
        };

        const cert = certificates[gameName];
        if (cert && score >= cert.threshold) {
            return cert;
        }

        return null;
    }

    // Get current progress for a game
    async getProgress(gameName) {
        if (!this.currentUser) return null;

        try {
            const { data, error } = await this.supabase
                .from('game_progress')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .eq('game_name', gameName)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error getting progress:', error);
                return null;
            }

            return data || {
                current_level: 1,
                current_score: 0,
                best_score: 0,
                is_completed: false,
                play_count: 0
            };
        } catch (error) {
            console.error('Error getting progress:', error);
            return null;
        }
    }

    // Get user stats
    async getUserStats() {
        if (!this.currentUser) return null;

        try {
            const { data, error } = await this.supabase
                .from('user_stats')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error getting user stats:', error);
                return null;
            }

            return data || {
                total_games_played: 0,
                total_score: 0,
                achievements: [],
                certificates_earned: []
            };
        } catch (error) {
            console.error('Error getting user stats:', error);
            return null;
        }
    }
}

// Global instance
window.gameProgress = new GameProgressManager();

// Auto-initialize when script loads
window.gameProgress.init().then(success => {
    if (success) {
        console.log('Game progress manager initialized successfully');
    } else {
        console.log('Game progress manager initialized (no user)');
    }
});

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameProgressManager;
}
