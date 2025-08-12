// Supabase Configuration
// Replace these with your actual Supabase project credentials

const SUPABASE_CONFIG = {
    url: 'https://yxxytqwqpcuojdwdempa.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eHl0cXdxcGN1b2pkd2RlbXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTQ5MTksImV4cCI6MjA3MDU5MDkxOX0.7tICWVQ7DANyzPH9pEzhlgwR9NBvrpzKuGncbxO6kEw'
};

// Initialize Supabase client
function initializeSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
        return window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    }
    return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, initializeSupabase };
}
