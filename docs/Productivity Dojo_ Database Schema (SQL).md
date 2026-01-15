## **Productivity Dojo: Database Schema (SQL)**

### **1\. Extensions & Custom Types**

We define custom ENUM types to ensure data integrity for task statuses and the martial arts-themed ranking system.

SQL  
\-- Enable UUID extension  
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\-- Task Status: Tracks the lifecycle of a Kata  
CREATE TYPE task\_status AS ENUM ('pending', 'active', 'completed', 'failed');

\-- Rank Titles: Based on the belt system defined in the PRD  
CREATE TYPE rank\_title AS ENUM ('Initiate', 'Disciple', 'Warrior', 'Sensei');

---

### **2\. Profiles Table**

This table extends the Supabase Auth metadata. It tracks the user's "Dojo Identity," including their belt rank and total experience points (XP).

SQL  
CREATE TABLE profiles (  
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,  
  username TEXT UNIQUE NOT NULL,  
  full\_name TEXT,  
  avatar\_url TEXT,  
  xp INTEGER DEFAULT 0 CHECK (xp \>= 0),  
  rank\_id rank\_title DEFAULT 'Initiate',  
  last\_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- Index for leaderboard performance  
CREATE INDEX idx\_profiles\_xp ON profiles (xp DESC);

---

### **3\. Tasks Table (The Training Log)**

This table stores the "Katas." It includes priority levels for the scoring engine and timestamps for the countdown logic.

SQL  
CREATE TABLE tasks (  
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
  user\_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,  
  title TEXT NOT NULL,  
  priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 3),  
  status task\_status DEFAULT 'pending',  
  start\_time TIMESTAMP WITH TIME ZONE NOT NULL,  
  end\_time TIMESTAMP WITH TIME ZONE NOT NULL,  
  allocated\_minutes INTEGER GENERATED ALWAYS AS (  
    EXTRACT(EPOCH FROM (end\_time \- start\_time)) / 60  
  ) STORED,  
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  
    
  \-- Ensure end time is after start time  
  CONSTRAINT valid\_time\_range CHECK (end\_time \> start\_time)  
);

\-- Index for fast retrieval of a user's daily tasks  
CREATE INDEX idx\_tasks\_user\_status ON tasks (user\_id, status);

---

### **4\. Automated XP & Rank Logic**

Instead of calculating XP purely on the frontend, this Trigger ensures that when a user "Strikes the Gong" (sets a task to completed), their profile is updated according to the formula: $XP \= (P \\times 10\) \+ (T\_{allocated} / 10)$.

SQL  
\-- Function to calculate XP and update Rank  
CREATE OR REPLACE FUNCTION handle\_task\_completion()  
RETURNS TRIGGER AS $$  
DECLARE  
  earned\_xp INTEGER;  
BEGIN  
  IF NEW.status \= 'completed' AND OLD.status \!= 'completed' THEN  
    \-- Calculate XP: (Priority \* 10\) \+ (Minutes / 10\)  
    earned\_xp := (NEW.priority \* 10\) \+ (NEW.allocated\_minutes / 10);  
      
    UPDATE profiles  
    SET   
      xp \= xp \+ earned\_xp,  
      \-- Dynamic Rank Update based on PRD Ranking Tiers  
      rank\_id \= CASE   
        WHEN xp \+ earned\_xp \>= 5000 THEN 'Sensei'::rank\_title  
        WHEN xp \+ earned\_xp \>= 1501 THEN 'Warrior'::rank\_title  
        WHEN xp \+ earned\_xp \>= 501  THEN 'Disciple'::rank\_title  
        ELSE 'Initiate'::rank\_title  
      END,  
      last\_active \= NOW()  
    WHERE id \= NEW.user\_id;  
  END IF;  
  RETURN NEW;  
END;  
$$ LANGUAGE plpgsql;

\-- Trigger to run the function on task update  
CREATE TRIGGER on\_task\_completed  
  AFTER UPDATE ON tasks  
  FOR EACH ROW  
  EXECUTE FUNCTION handle\_task\_completion();

---

### **5\. Row Level Security (RLS)**

To keep the Dojo secure, users should only be able to view and edit their own Katas.

SQL  
\-- Enable RLS  
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;  
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

\-- Profiles: Users can read all (for leaderboard) but only update their own  
CREATE POLICY "Public profiles are viewable by everyone" ON profiles  
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles  
  FOR UPDATE USING (auth.uid() \= id);

\-- Tasks: Users can only see/edit their own Katas  
CREATE POLICY "Users can manage their own tasks" ON tasks  
  FOR ALL USING (auth.uid() \= user\_id);

---

### **6\. Real-Time Setup**

To support the **"instant XP syncing"** mentioned in the stack configuration, we must add these tables to the Supabase Realtime publication.

SQL  
ALTER PUBLICATION supabase\_realtime ADD TABLE tasks;  
ALTER PUBLICATION supabase\_realtime ADD TABLE profiles;

