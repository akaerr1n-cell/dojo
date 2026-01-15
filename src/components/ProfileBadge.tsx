import { motion } from 'motion/react'
import { Trophy, Star } from 'lucide-react'
import type { Profile, RankTitle } from '@/types'

interface ProfileBadgeProps {
  profile: Profile | null
  compact?: boolean
}

const BELT_STYLES: Record<RankTitle, { bg: string; text: string; border: string; glow?: string }> = {
  'Initiate': {
    bg: 'bg-white/10',
    text: 'text-white',
    border: 'border-white/30',
  },
  'Disciple': {
    bg: 'bg-belt-blue/20',
    text: 'text-belt-blue',
    border: 'border-belt-blue/50',
  },
  'Warrior': {
    bg: 'bg-amber-500/20',
    text: 'text-amber-500',
    border: 'border-amber-500/50',
  },
  'Sensei': {
    bg: 'bg-black/80',
    text: 'text-neon-green',
    border: 'border-neon-green',
    glow: 'shadow-neon-green',
  },
}

export function ProfileBadge({ profile, compact = false }: ProfileBadgeProps) {
  if (!profile) {
    return (
      <div className="glass rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-obsidian-lighter rounded w-24" />
      </div>
    )
  }

  const beltStyle = BELT_STYLES[profile.rank_id]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`belt-badge ${beltStyle.bg} ${beltStyle.text} ${beltStyle.border} ${beltStyle.glow || ''}`}>
          {profile.rank_id}
        </span>
        <span className="font-mono text-sm text-neon-green">
          {profile.xp.toLocaleString()} XP
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-purple/20 flex items-center justify-center border-2 ${beltStyle.border} ${beltStyle.glow || ''}`}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {profile.username?.[0]?.toUpperCase() || '?'}
              </span>
            )}
          </div>
          {/* Belt Indicator */}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${beltStyle.bg} border ${beltStyle.border} flex items-center justify-center`}>
            <Trophy className={`w-3 h-3 ${beltStyle.text}`} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{profile.username}</h2>
          <p className="text-sm text-gray-400">{profile.full_name || 'Anonymous Warrior'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rank */}
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Rank</p>
          <span className={`belt-badge ${beltStyle.bg} ${beltStyle.text} ${beltStyle.border} ${beltStyle.glow || ''}`}>
            {profile.rank_id}
          </span>
        </div>

        {/* XP */}
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Experience</p>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-neon-green" />
            <span className="font-mono text-lg text-neon-green font-bold">
              {profile.xp.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
