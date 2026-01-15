import { motion } from 'motion/react'
import { Clock, Flame, CheckCircle, XCircle, Play } from 'lucide-react'
import type { Task, TaskStatus } from '@/types'

interface KataCardProps {
  task: Task
  isActive?: boolean
  onActivate?: () => void
  onComplete?: () => void
  onDelete?: () => void
}

export function KataCard({ task, isActive, onActivate, onComplete, onDelete }: KataCardProps) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 3: return 'text-neon-red border-neon-red/30'
      case 2: return 'text-neon-purple border-neon-purple/30'
      default: return 'text-neon-green border-neon-green/30'
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-neon-green" />
      case 'failed': return <XCircle className="w-5 h-5 text-neon-red" />
      case 'active': return <Play className="w-5 h-5 text-neon-purple animate-pulse" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isCompleted = task.status === 'completed'
  const isFailed = task.status === 'failed'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: isCompleted ? 1 : 1.02 }}
      className={`
        glass rounded-xl p-4 
        border ${isActive ? 'border-neon-green glow-green' : 'border-white/10'}
        ${isCompleted ? 'opacity-60' : ''}
        ${isFailed ? 'opacity-40 line-through' : ''}
        transition-all duration-300
      `}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Status & Title */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-0.5">
            {getStatusIcon(task.status)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-white truncate ${isCompleted ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatTime(task.start_time)} - {formatTime(task.end_time)}</span>
              <span className="text-gray-600">•</span>
              <span className="font-mono">{task.allocated_minutes}m</span>
            </div>
          </div>
        </div>

        {/* Right: Priority & Actions */}
        <div className="flex flex-col items-end gap-2">
          {/* Priority Badge */}
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${getPriorityColor()}`}>
            {Array.from({ length: task.priority }).map((_, i) => (
              <Flame key={i} className="w-3 h-3" />
            ))}
          </div>

          {/* Action Buttons */}
          {!isCompleted && !isFailed && (
            <div className="flex gap-1">
              {!isActive && onActivate && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onActivate}
                  className="px-2 py-1 text-xs bg-neon-purple/20 text-neon-purple rounded hover:bg-neon-purple/30 transition-colors"
                >
                  Start
                </motion.button>
              )}
              {isActive && onComplete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onComplete}
                  className="px-2 py-1 text-xs bg-neon-green/20 text-neon-green rounded hover:bg-neon-green/30 transition-colors font-semibold"
                >
                  Gong!
                </motion.button>
              )}
              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onDelete}
                  className="px-2 py-1 text-xs bg-neon-red/10 text-neon-red/70 rounded hover:bg-neon-red/20 transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* XP Preview */}
      {!isCompleted && !isFailed && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-gray-500">Potential XP:</span>
          <span className="font-mono text-neon-green">
            +{(task.priority * 10) + Math.floor(task.allocated_minutes / 10)} XP
          </span>
        </div>
      )}
    </motion.div>
  )
}
