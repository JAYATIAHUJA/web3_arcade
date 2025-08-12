-- Database Setup for Web3 Arcade Player Progress
-- Run this in your Supabase SQL Editor

-- 1. User Stats Table
CREATE TABLE IF NOT EXISTS user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total_games_played INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    achievements TEXT[] DEFAULT '{}',
    certificates_earned TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Game Progress Table
CREATE TABLE IF NOT EXISTS game_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_name TEXT NOT NULL,
    game_title TEXT NOT NULL,
    current_level INTEGER DEFAULT 1,
    max_level INTEGER DEFAULT 1,
    current_score INTEGER DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date TIMESTAMP WITH TIME ZONE,
    play_count INTEGER DEFAULT 0,
    last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_name)
);

-- 3. Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_name TEXT NOT NULL,
    session_score INTEGER DEFAULT 0,
    session_level INTEGER DEFAULT 1,
    session_duration INTEGER DEFAULT 0, -- in seconds
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    certificate_type TEXT NOT NULL, -- 'game_completion', 'score_milestone', 'achievement'
    certificate_name TEXT NOT NULL,
    certificate_description TEXT,
    score_threshold INTEGER,
    earned_score INTEGER,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_data JSONB -- Store certificate details
);

-- Enable Row Level Security
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- User Stats Policies
CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Game Progress Policies
CREATE POLICY "Users can view own game progress" ON game_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own game progress" ON game_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game progress" ON game_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Game Sessions Policies
CREATE POLICY "Users can view own game sessions" ON game_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game sessions" ON game_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates Policies
CREATE POLICY "Users can view own certificates" ON certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates" ON certificates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Functions for Common Operations
CREATE OR REPLACE FUNCTION update_user_stats_after_game()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user stats when game progress is updated
    INSERT INTO user_stats (user_id, total_games_played, total_score)
    VALUES (NEW.user_id, 1, NEW.current_score)
    ON CONFLICT (user_id)
    DO UPDATE SET
        total_games_played = user_stats.total_games_played + 1,
        total_score = user_stats.total_score + NEW.current_score,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic stats updates
CREATE TRIGGER trigger_update_user_stats
    AFTER INSERT OR UPDATE ON game_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats_after_game();

-- Insert default game data
INSERT INTO game_progress (user_id, game_name, game_title, max_level) VALUES
    ('00000000-0000-0000-0000-000000000000', 'museum-treasure-hunt', 'BlockChain Museum', 5),
    ('00000000-0000-0000-0000-000000000000', 'bakery-checkout', 'Bakery Checkout', 3),
    ('00000000-0000-0000-0000-000000000000', 'medieval-trading', 'Medieval Trading Village', 4),
    ('00000000-0000-0000-0000-000000000000', 'detective-case', 'Detective Case', 3),
    ('00000000-0000-0000-0000-000000000000', 'island-resource', 'Island Resource Hunt', 5)
ON CONFLICT DO NOTHING;
