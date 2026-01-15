-- ============================================
-- Productivity Dojo: Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Custom Types (Enums)
-- ============================================

-- Task Status: Tracks the lifecycle of a Kata
CREATE TYPE task_status AS ENUM ('pending', 'active', 'completed', 'failed');

-- Rank Titles: Based on the belt system defined in the PRD
CREATE TYPE rank_title AS ENUM ('Initiate', 'Disciple', 'Warrior', 'Sensei');

-- ============================================
-- 2. Profiles Table (User Identity)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0 CHECK (xp >= 0),
  rank_id rank_title DEFAULT 'Initiate',
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for leaderboard performance
CREATE INDEX idx_profiles_xp ON profiles (xp DESC);

-- ============================================
-- 3. Tasks Table (The Training Log / Katas)
-- ============================================

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 3),
  status task_status DEFAULT 'pending',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  allocated_minutes INTEGER GENERATED ALWAYS AS (
    EXTRACT(EPOCH FROM (end_time - start_time)) / 60
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure end time is after start time
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Index for fast retrieval of a user's tasks
CREATE INDEX idx_tasks_user_status ON tasks (user_id, status);

-- ============================================
-- 4. XP & Rank Trigger Function
-- ============================================

-- Function to calculate XP and update Rank on task completion
CREATE OR REPLACE FUNCTION handle_task_completion()
RETURNS TRIGGER AS $$
DECLARE
  earned_xp INTEGER;
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Calculate XP: (Priority * 10) + (Minutes / 10)
    earned_xp := (NEW.priority * 10) + (NEW.allocated_minutes / 10);
    
    UPDATE profiles
    SET 
      xp = xp + earned_xp,
      -- Dynamic Rank Update based on PRD Ranking Tiers
      rank_id = CASE 
        WHEN xp + earned_xp >= 5000 THEN 'Sensei'::rank_title
        WHEN xp + earned_xp >= 1501 THEN 'Warrior'::rank_title
        WHEN xp + earned_xp >= 501  THEN 'Disciple'::rank_title
        ELSE 'Initiate'::rank_title
      END,
      last_active = NOW(),
      updated_at = NOW()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run on task update
CREATE TRIGGER on_task_completed
  AFTER UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION handle_task_completion();

-- ============================================
-- 5. Profile Creation Trigger
-- ============================================

-- Automatically create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'dojo_' || LEFT(NEW.id::text, 8)),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 6. Row Level Security (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all (for leaderboard) but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tasks: Users can only see/edit their own Katas
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 7. Real-Time Setup
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
