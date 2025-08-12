# Supabase Authentication Setup Guide

## 🚀 Getting Started with Supabase

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `web3-arcade` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
6. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Update Configuration Files

Replace the placeholder values in these files:

#### `supabase-config.js`
```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-anon-key-here'
};
```

#### `login.html`
```javascript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key-here';
```

#### `register.html`
```javascript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key-here';
```

#### `script.js`
```javascript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key-here';
```

### 4. Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following:

#### Site URL
- Set to your domain (e.g., `https://yourdomain.com`)
- For local development: `http://localhost:3000`

#### Redirect URLs
Add these URLs for password reset and email confirmation:
- `http://localhost:3000/login.html`
- `http://localhost:3000/register.html`
- `https://yourdomain.com/login.html`
- `https://yourdomain.com/register.html`

#### Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Reset password
   - Magic link

### 5. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings if needed

### 6. Create Database Tables (Optional)

If you want to store user game data, create these tables in your Supabase database:

#### User Stats Table
```sql
CREATE TABLE user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total_games INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    achievements TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own stats
CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to update their own stats
CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own stats
CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Game Progress Table
```sql
CREATE TABLE game_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_name TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own game progress" ON game_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own game progress" ON game_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game progress" ON game_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 7. Test the Integration

1. Open `index.html` in your browser
2. Click "Register" to create a new account
3. Check your email for the confirmation link
4. Click the confirmation link
5. Try logging in with your credentials

### 8. Environment Variables (Production)

For production, use environment variables instead of hardcoding credentials:

```javascript
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your site URL is correctly configured in Supabase
2. **Email Not Sending**: Check your email provider settings in Supabase
3. **Authentication Fails**: Verify your project URL and anon key are correct

### Debug Mode

Add this to your browser console to debug Supabase:
```javascript
localStorage.setItem('supabase.debug', 'true');
```

## 📚 Additional Features

### Social Authentication
You can add social login providers (Google, GitHub, etc.) in the Supabase dashboard under **Authentication** → **Providers**.

### Real-time Features
Supabase provides real-time subscriptions for features like:
- Live game progress updates
- Multiplayer game state
- Chat functionality

### Database Functions
Create PostgreSQL functions for complex game logic:
```sql
CREATE OR REPLACE FUNCTION update_user_score(
    user_uuid UUID,
    game_name TEXT,
    new_score INTEGER
)
RETURNS void AS $$
BEGIN
    INSERT INTO game_progress (user_id, game_name, score, progress)
    VALUES (user_uuid, game_name, new_score, 100)
    ON CONFLICT (user_id, game_name)
    DO UPDATE SET 
        score = GREATEST(game_progress.score, new_score),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
```

## 🎯 Next Steps

1. **Customize Email Templates**: Make them match your brand
2. **Add Social Login**: Enable Google, GitHub, or other providers
3. **Implement User Profiles**: Add profile pictures and additional user data
4. **Add Game Analytics**: Track user engagement and game completion rates
5. **Implement Leaderboards**: Use Supabase's real-time features for live rankings
