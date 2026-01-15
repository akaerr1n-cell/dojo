import { create } from 'zustand'
import type { Task, TaskStatus, Priority } from '@/types'
import { supabase } from '@/lib/supabaseClient'
import { calculateXP, getRankFromXP } from '@/types'
import { useUserStore } from './useUserStore'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  activeTaskId: string | null
  
  // Actions
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'allocated_minutes'>) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  strikeTheGong: (taskId: string) => Promise<void>
  setActiveTask: (taskId: string | null) => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  activeTaskId: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true })

      if (error) throw error

      set({ tasks: data as Task[], isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addTask: async (task) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      console.log('[TaskStore] Adding task for user:', user.id)

      // Optimistic: Add temporary task locally
      const tempId = `temp-${Date.now()}`
      const tempTask: Task = {
        id: tempId,
        user_id: user.id,
        ...task,
        allocated_minutes: Math.floor(
          (new Date(task.end_time).getTime() - new Date(task.start_time).getTime()) / 60000
        ),
        created_at: new Date().toISOString(),
      }

      set(state => ({ tasks: [...state.tasks, tempTask] }))

      // Direct INSERT - no profile check needed (DB has FK constraint that will fail if profile missing)
      console.log('[TaskStore] Inserting task...')
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: task.title,
          priority: task.priority,
          status: task.status,
          start_time: task.start_time,
          end_time: task.end_time,
        })
        .select()
        .single()

      if (error) {
        console.error('[TaskStore] Insert error:', error)
        // Remove temp task on error
        set(state => ({
          tasks: state.tasks.filter(t => t.id !== tempId),
          error: error.message
        }))
        throw new Error(`${error.message}`)
      }

      console.log('[TaskStore] Task created:', data)
      
      // Replace temp task with real one
      set(state => ({
        tasks: state.tasks.map(t => t.id === tempId ? (data as Task) : t)
      }))
    } catch (error) {
      console.error('[TaskStore] addTask failed:', error)
      set({ error: (error as Error).message })
      throw error
    }
  },

  updateTask: async (id, updates) => {
    // Optimistic update
    set(state => ({
      tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }))

    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      set({ error: (error as Error).message })
      // Revert on error
      get().fetchTasks()
    }
  },

  deleteTask: async (id) => {
    // Optimistic: Remove locally
    const previousTasks = get().tasks
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      set({ error: (error as Error).message, tasks: previousTasks })
    }
  },

  // Strike the Gong: Mark task as completed, trigger XP update
  strikeTheGong: async (taskId) => {
    const task = get().tasks.find(t => t.id === taskId)
    if (!task) return

    const earnedXP = calculateXP(task.priority as Priority, task.allocated_minutes)
    const userStore = useUserStore.getState()
    const currentXP = userStore.profile?.xp || 0
    const newRank = getRankFromXP(currentXP + earnedXP)

    // Optimistic UI updates
    set(state => ({
      tasks: state.tasks.map(t => 
        t.id === taskId ? { ...t, status: 'completed' as TaskStatus } : t
      ),
      activeTaskId: null,
    }))

    // Update user XP optimistically
    userStore.updateXP(earnedXP, newRank)

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId)

      if (error) throw error
      // The DB trigger handles profile XP update
    } catch (error) {
      set({ error: (error as Error).message })
      get().fetchTasks()
      userStore.fetchProfile()
    }
  },

  setActiveTask: (taskId) => set({ activeTaskId: taskId }),
}))
