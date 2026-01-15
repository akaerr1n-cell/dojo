// Task Status Enum
export type TaskStatus = 'pending' | 'active' | 'completed' | 'failed'

// Rank Title Enum (Belt System)
export type RankTitle = 'Initiate' | 'Disciple' | 'Warrior' | 'Sensei'

// Priority Levels
export type Priority = 1 | 2 | 3

// User Profile
export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  xp: number
  rank_id: RankTitle
  last_active: string
  created_at: string
  updated_at: string
}

// Task (Kata)
export interface Task {
  id: string
  user_id: string
  title: string
  priority: Priority
  status: TaskStatus
  start_time: string
  end_time: string
  allocated_minutes: number
  created_at: string
}

// Rank Thresholds
export const RANK_THRESHOLDS: Record<RankTitle, number> = {
  'Initiate': 0,
  'Disciple': 501,
  'Warrior': 1501,
  'Sensei': 5000,
}

// Get rank from XP
export function getRankFromXP(xp: number): RankTitle {
  if (xp >= 5000) return 'Sensei'
  if (xp >= 1501) return 'Warrior'
  if (xp >= 501) return 'Disciple'
  return 'Initiate'
}

// Calculate XP for a task
export function calculateXP(priority: Priority, allocatedMinutes: number): number {
  return (priority * 10) + Math.floor(allocatedMinutes / 10)
}
