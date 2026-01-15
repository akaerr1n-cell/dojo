import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import type { Priority } from '@/types'
import { useTaskStore } from '@/store/useTaskStore'

interface AddKataModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddKataModal({ isOpen, onClose }: AddKataModalProps) {
  const { addTask } = useTaskStore()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>(1)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !startTime || !endTime) return

    setIsSubmitting(true)
    setError('')
    
    console.log('[AddKataModal] Submitting:', { title, priority, startTime, endTime })

    if (new Date(startTime) >= new Date(endTime)) {
      setError('End time must be after start time')
      setIsSubmitting(false)
      return
    }
    
    try {
      await addTask({
        title,
        priority,
        status: 'pending',
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
      })
      console.log('[AddKataModal] Success!')
      onClose()
      // Reset form
      setTitle('')
      setPriority(1)
      setStartTime('')
      setEndTime('')
    } catch (err) {
      console.error('[AddKataModal] Error:', err)
      setError((err as Error).message || 'Failed to create task')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl p-6 border border-neon-green/20 w-full max-w-md mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">New Kata</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Kata Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What will you accomplish?"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white placeholder-gray-500 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-colors"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Priority Level</label>
                  <div className="flex gap-2">
                    {([1, 2, 3] as Priority[]).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`
                          flex-1 py-2 rounded-lg border transition-all
                          ${priority === p 
                            ? p === 3 
                              ? 'bg-neon-red/20 border-neon-red text-neon-red' 
                              : p === 2 
                                ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                                : 'bg-neon-green/20 border-neon-green text-neon-green'
                            : 'bg-obsidian-lighter border-white/10 text-gray-400 hover:border-white/30'
                          }
                        `}
                      >
                        {p === 1 ? 'Low' : p === 2 ? 'Medium' : 'High'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">End Time</label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !title || !startTime || !endTime}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-green to-neon-purple text-obsidian font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neon-green transition-shadow"
                >
                  {isSubmitting ? 'Creating...' : 'Add to Training Log'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
