import { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Home, Calendar, User, PlusCircle } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
  activeTab?: 'today' | 'upcoming' | 'profile'
  onTabChange?: (tab: 'today' | 'upcoming' | 'profile') => void
  onAddTask?: () => void
}

const NAV_ITEMS = [
  { id: 'today' as const, label: 'Today', icon: Home },
  { id: 'upcoming' as const, label: 'Upcoming', icon: Calendar },
  { id: 'profile' as const, label: 'Profile', icon: User },
]

export function Layout({ children, activeTab = 'today', onTabChange, onAddTask }: LayoutProps) {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0 md:ml-64">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/10 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple">
            Productivity Dojo
          </h1>
          <p className="text-xs text-gray-500 mt-1">Train Your Focus</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map(item => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === item.id 
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Add Task Button */}
        {onAddTask && (
          <div className="p-4 border-t border-white/10">
            <motion.button
              onClick={onAddTask}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-neon-green/20 to-neon-purple/20 border border-neon-green/30 text-neon-green font-semibold hover:shadow-neon-green transition-shadow"
            >
              <PlusCircle className="w-5 h-5" />
              <span>New Kata</span>
            </motion.button>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 safe-area-inset-bottom z-50">
        <div className="flex items-center justify-between px-6 py-3">
          {NAV_ITEMS.map(item => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`
                flex flex-col items-center gap-1
                ${activeTab === item.id 
                  ? 'text-neon-green' 
                  : 'text-gray-500'}
              `}
            >
              <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'drop-shadow-neon-green' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </motion.button>
          ))}
          
          {/* Inline Add Button (if not already handled in NAV_ITEMS) */}
          {onAddTask && (
            <motion.button
              onClick={onAddTask}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 text-neon-purple"
            >
              <PlusCircle className="w-6 h-6" />
              <span className="text-[10px] font-medium">New</span>
            </motion.button>
          )}
        </div>
      </nav>
    </div>
  )
}
