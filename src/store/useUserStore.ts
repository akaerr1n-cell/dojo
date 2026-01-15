import { create } from 'zustand'
import type { Profile, RankTitle } from '@/types'
import { supabase } from '@/lib/supabaseClient'

interface UserState {
  profile: Profile | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchProfile: () => Promise<void>
  updateXP: (earnedXP: number, newRank: RankTitle) => void
  setProfile: (profile: Profile | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        set({ profile: null, isLoading: false })
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      set({ profile: data as Profile, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  // Optimistic UI: Update XP locally before server confirms
  updateXP: (earnedXP: number, newRank: RankTitle) => {
    const currentProfile = get().profile
    if (!currentProfile) return

    set({
      profile: {
        ...currentProfile,
        xp: currentProfile.xp + earnedXP,
        rank_id: newRank,
      }
    })
  },

  setProfile: (profile) => set({ profile }),

  logout: () => set({ profile: null }),
}))
