import { useState } from 'react'
import { motion } from 'motion/react'
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react'

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<{ error: Error | null }>
  onSignUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>
  onGoogleLogin: () => Promise<{ error: Error | null }>
  onBack: () => void
}

// Google Icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export function AuthScreen({ onLogin, onSignUp, onGoogleLogin, onBack }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsLoading(true)

    try {
      if (authMode === 'login') {
        const { error } = await onLogin(email, password)
        if (error) setAuthError(error.message)
      } else {
        const { error } = await onSignUp(email, password, username)
        if (error) setAuthError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setAuthError('')
    setIsLoading(true)
    try {
      const { error } = await onGoogleLogin()
      if (error) setAuthError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-purple/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-2xl p-8 relative z-10 border border-white/10"
      >
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple">
            Productivity Dojo
          </h1>
          <p className="text-gray-400 mt-2">Enter the Dojo</p>
        </div>

        {/* Google Login Button */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 rounded-lg bg-white hover:bg-gray-100 text-gray-800 font-medium transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Auth Toggle */}
        <div className="flex gap-2 mb-6 bg-obsidian-lighter p-1 rounded-xl">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
              authMode === 'login'
                ? 'bg-obsidian text-neon-green shadow-lg shadow-neon-green/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4 inline mr-2" />
            Login
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
              authMode === 'signup'
                ? 'bg-obsidian text-neon-purple shadow-lg shadow-neon-purple/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <motion.div
            initial={false}
            animate={{ height: authMode === 'signup' ? 'auto' : 0, opacity: authMode === 'signup' ? 1 : 0 }}
            className="overflow-hidden"
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={authMode === 'signup'}
              className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition-all mb-4"
            />
          </motion.div>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white placeholder-gray-500 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-obsidian-lighter border border-white/10 text-white placeholder-gray-500 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-all"
          />

          {authError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-neon-red text-sm text-center bg-neon-red/10 py-2 rounded-lg border border-neon-red/20"
            >
              {authError}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg font-bold text-obsidian transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-neon-green to-emerald-400 hover:shadow-neon-green'
                : 'bg-gradient-to-r from-neon-purple to-pink-500 hover:shadow-neon-purple'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Processing...' : (authMode === 'login' ? 'Enter the Dojo' : 'Begin Training')}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
