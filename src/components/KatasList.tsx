import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AnimatePresence } from 'motion/react'
import { KataCard } from './KataCard'
import type { Task } from '@/types'
import { useTaskStore } from '@/store/useTaskStore'
import { Swords, CalendarDays } from 'lucide-react'

interface KatasListProps {
  tasks: Task[]
  view: 'daily' | 'upcoming'
}

export function KatasList({ tasks, view }: KatasListProps) {
  const [parent] = useAutoAnimate()
  const { activeTaskId, setActiveTask, strikeTheGong, deleteTask } = useTaskStore()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.start_time)
    if (view === 'daily') {
      return taskDate >= today && taskDate < tomorrow
    } else {
      return taskDate >= tomorrow
    }
  })

  const Icon = view === 'daily' ? Swords : CalendarDays

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-400">
        <Icon className="w-5 h-5" />
        <h2 className="text-lg font-semibold">
          {view === 'daily' ? "Today's Katas" : 'Upcoming Training'}
        </h2>
        <span className="ml-auto text-sm font-mono bg-obsidian-lighter px-2 py-0.5 rounded">
          {filteredTasks.length}
        </span>
      </div>

      {/* Task List */}
      <div ref={parent} className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-gray-500">
                {view === 'daily' 
                  ? 'No Katas scheduled for today. Add one to begin training!' 
                  : 'No upcoming Katas scheduled.'}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <KataCard
                key={task.id}
                task={task}
                isActive={task.id === activeTaskId}
                onActivate={() => setActiveTask(task.id)}
                onComplete={() => strikeTheGong(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
