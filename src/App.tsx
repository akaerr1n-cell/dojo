import { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { KatasList } from './components/KatasList'
import { ProfileBadge } from './components/ProfileBadge'
import { FocusPulse } from './components/FocusPulse'
import { GongButton } from './components/GongButton'
import { AddKataModal } from './components/AddKataModal'
import { LandingPage } from './components/LandingPage'
import { AuthScreen } from './components/AuthScreen'
import { useTaskStore } from './store/useTaskStore'
import { useUserStore } from './store/useUserStore'
import { useAuth } from './hooks/useAuth'
import { motion } from 'motion/react'
import { LogOut } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'profile'>('today')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  
  const { tasks, activeTaskId, fetchTasks, strikeTheGong } = useTaskStore()
  const { profile } = useUserStore()
  const { isAuthenticated, isLoading, signIn, signUp, signInWithGoogle, signOut } = useAuth()

  // Fetch tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks()
    }
  }, [isAuthenticated, fetchTasks])

  const activeTask = tasks.find(t => t.id === activeTaskId)

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-neon-green/30 border-t-neon-green rounded-full"
        />
      </div>
    )
  }

  // Unauthenticated: Landing Page or Auth Screen
  if (!isAuthenticated) {
    if (showAuth) {
      return (
        <AuthScreen 
          onLogin={signIn}
          onSignUp={signUp}
          onGoogleLogin={signInWithGoogle}
          onBack={() => setShowAuth(false)}
        />
      )
    }
    return <LandingPage onStart={() => setShowAuth(true)} />
  }

  // Authenticated: Main App
  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onAddTask={() => setIsModalOpen(true)}
    >
      {/* Header with Profile */}
      <div className="flex items-center justify-between mb-6">
        <ProfileBadge profile={profile} compact />
        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-neon-red transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Active Task Focus Mode */}
      {activeTask && activeTab === 'today' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6 text-center border border-neon-green/30"
        >
          <p className="text-gray-400 text-sm mb-2">Currently Training:</p>
          <h3 className="text-xl font-bold text-white mb-4">{activeTask.title}</h3>
          
          <FocusPulse 
            endTime={new Date(activeTask.end_time)}
            onComplete={() => {}}
          />

          <div className="mt-6 flex justify-center">
            <GongButton onClick={() => strikeTheGong(activeTask.id)} />
          </div>
          <p className="mt-4 text-xs text-neon-green uppercase tracking-widest">
            Strike the Gong to Complete
          </p>
        </motion.div>
      )}

      {/* Content based on tab */}
      {activeTab === 'today' && (
        <KatasList tasks={tasks} view="daily" />
      )}

      {activeTab === 'upcoming' && (
        <KatasList tasks={tasks} view="upcoming" />
      )}

      {activeTab === 'profile' && (
        <ProfileBadge profile={profile} />
      )}

      {/* Add Kata Modal */}
      <AddKataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  )
}

export default App
