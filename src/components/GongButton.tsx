import { motion } from 'motion/react'
import { Bell } from 'lucide-react'

interface GongButtonProps {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

export function GongButton({ onClick, disabled = false, isLoading = false }: GongButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative group
        w-24 h-24 md:w-32 md:h-32
        rounded-full
        bg-gradient-to-br from-neon-green/20 to-neon-purple/20
        border-2 border-neon-green
        flex items-center justify-center
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 hover:shadow-neon-green
        active:scale-95
      `}
      whileTap={{ scale: 0.9 }}
      whileHover={{ 
        boxShadow: '0 0 40px rgba(0, 255, 163, 0.6)',
      }}
    >
      {/* Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-neon-green/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={isLoading ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
      >
        <Bell 
          className={`w-10 h-10 md:w-12 md:h-12 text-neon-green drop-shadow-neon-green ${isLoading ? 'animate-pulse' : ''}`}
        />
      </motion.div>

      {/* Shimmer Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.button>
  )
}

// Gong Strike Animation Wrapper
export function GongStrikeEffect({ children, trigger }: { children: React.ReactNode; trigger: boolean }) {
  return (
    <motion.div
      animate={trigger ? {
        scale: [1, 1.5, 1],
        opacity: [1, 0.8, 1],
      } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
