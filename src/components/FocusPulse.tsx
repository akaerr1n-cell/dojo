import { motion } from 'motion/react'
import { useDojoTimer } from '@/hooks/useDojoTimer'

interface FocusPulseProps {
  endTime: Date
  onComplete?: () => void
}

export function FocusPulse({ endTime, onComplete }: FocusPulseProps) {
  const { hours, minutes, seconds, isExpired, totalSeconds } = useDojoTimer({ endTime, onComplete })

  // Calculate progress percentage (assuming max 2 hours = 7200 seconds)
  const maxDuration = 7200
  const progress = Math.min(100, (totalSeconds / maxDuration) * 100)
  
  // Color based on time remaining
  const getColor = () => {
    if (totalSeconds > 1800) return 'text-neon-green' // > 30 min
    if (totalSeconds > 600) return 'text-neon-purple' // > 10 min
    return 'text-neon-red' // < 10 min (danger zone)
  }

  const getGlowClass = () => {
    if (totalSeconds > 1800) return 'drop-shadow-neon-green'
    if (totalSeconds > 600) return 'drop-shadow-neon-purple'
    return 'drop-shadow-neon-red animate-pulse'
  }

  const formatNumber = (n: number) => n.toString().padStart(2, '0')

  if (isExpired) {
    return (
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-center"
      >
        <span className="font-mono text-4xl md:text-6xl text-neon-red drop-shadow-neon-red">
          00:00:00
        </span>
        <p className="mt-2 text-neon-red text-sm uppercase tracking-widest">Time's Up!</p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <motion.div 
        className={`font-mono text-4xl md:text-6xl ${getColor()} ${getGlowClass()} transition-colors duration-500`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mt-4 h-2 bg-obsidian-lighter rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-green via-neon-purple to-neon-red"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Status Label */}
      <p className="mt-2 text-xs text-gray-400 uppercase tracking-widest">
        Focus Mode Active
      </p>
    </div>
  )
}
