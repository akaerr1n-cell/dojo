import { motion } from 'motion/react'
import { ArrowRight, Trophy, Zap, Target, Shield, Rocket, Activity, Users } from 'lucide-react'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-obsidian text-white overflow-x-hidden selection:bg-neon-green/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">🥋</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple text-lg tracking-tight">
                Productivity Dojo
              </span>
            </div>
            <button
              onClick={onStart}
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all hover:scale-105 hover:border-neon-green/50"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-neon-green/5 to-neon-purple/5 rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/5 text-neon-green border border-neon-green/20 text-sm font-semibold mb-8 backdrop-blur-sm"
                >
                  <Rocket className="w-4 h-4" />
                  <span>The Ultimate Focus System</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Train Like a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-purple animate-gradient-x">
                    Productivity Warrior
                  </span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Stop managing tasks. Start training. Turn your daily grind into a gamified martial art and ascend from Initiate to Sensei.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <motion.button
                    onClick={onStart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 rounded-xl bg-neon-green text-obsidian font-bold text-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out skew-x-[-20deg]" />
                    <span className="relative flex items-center gap-2">
                      Start Training Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                  
                  <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl glass border border-white/10 hover:bg-white/5 transition-colors font-medium text-gray-300 hover:text-white">
                    Explore Features
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Abstract Graphic / Dashboard Preview */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateX: 20, rotateY: -20 }}
                animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="relative"
              >
                {/* Decorative Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-12 w-24 h-24 bg-neon-purple/20 rounded-2xl blur-xl"
                />
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-12 -left-12 w-32 h-32 bg-neon-green/20 rounded-full blur-xl"
                />

                {/* Main Card */}
                <div className="relative rounded-2xl border border-white/10 bg-obsidian/80 backdrop-blur-xl shadow-2xl overflow-hidden p-6 lg:p-8 group hover:border-neon-green/30 transition-colors duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 flex items-center justify-center text-obsidian font-bold text-xl shadow-lg shadow-neon-green/20">
                        Sensei
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="h-full bg-neon-green"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">XP: 4,850 / 5,000</p>
                      </div>
                    </div>
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-neon-red animate-pulse' : 'bg-gray-600'}`} />
                        <div className="flex-1">
                          <div className={`h-2.5 rounded-full w-3/4 mb-2 ${i === 1 ? 'bg-white' : 'bg-gray-600'}`} />
                          <div className="h-2 rounded-full w-1/2 bg-gray-700" />
                        </div>
                        <div className="text-xs font-mono text-gray-500">
                          {i === 1 ? '00:24:59' : '--:--:--'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Action Button */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute bottom-8 right-8 w-14 h-14 bg-neon-purple rounded-full flex items-center justify-center text-white shadow-lg shadow-neon-purple/40 hover:scale-110 cursor-pointer transition-transform"
                  >
                    <Zap className="w-6 h-6 fill-current" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative bg-obsidian-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Enter the <span className="text-neon-green">Flow State</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Designed for high-performers who need more than just a checkbox.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-neon-green" />}
              title="Focus Pulse"
              description="High-frequency visual timers synced to your flow. Watch your progress in real-time."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Trophy className="w-8 h-8 text-neon-purple" />}
              title="Gamified Growth"
              description="Earn XP for every Kata. Climb the ranks from Initiate to Sensei with visual rewards."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-neon-red" />}
              title="Ironclad Data"
              description="Built on Supabase with Row Level Security. Your training data is yours alone."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How it Works / Steps */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The Path to Mastery</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-neon-green/20 via-neon-purple/20 to-neon-green/20" />

            <StepCard 
              number={1}
              icon={<Users className="w-6 h-6" />}
              title="Join the Dojo"
              description="Create your profile and receive your Initiate white belt."
            />
            <StepCard 
              number={2}
              icon={<Target className="w-6 h-6" />}
              title="Execute Katas"
              description="Set prioritized tasks with strict time blocks and execute."
            />
            <StepCard 
              number={3}
              icon={<Trophy className="w-6 h-6" />}
              title="Rise in Rank"
              description="Accumulate XP to unlock new belts and status."
            />
          </div>

          <div className="mt-20 text-center">
            <motion.button 
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-xl bg-white text-obsidian font-bold text-xl hover:bg-neon-green hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
            >
              Begin Your Journey
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <span className="text-2xl">🥋</span>
            <span className="font-bold">Productivity Dojo</span>
          </div>
          <p className="text-gray-600">
            &copy; 2026. Code like a warrior.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="glass p-8 rounded-3xl border border-white/5 hover:border-neon-green/20 hover:bg-white/[0.02] transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="mb-6 w-16 h-16 rounded-2xl bg-obsidian border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-neon-green/50 transition-all duration-300 shadow-xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-green transition-colors">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

function StepCard({ number, icon, title, description }: { number: number, icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative z-10 flex flex-col items-center text-center p-6"
    >
      <div className="w-24 h-24 rounded-full bg-obsidian border-4 border-obsidian-light shadow-xl shadow-black/50 flex items-center justify-center mb-6 relative group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-green to-neon-purple opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neon-green text-obsidian font-bold flex items-center justify-center text-sm border-2 border-obsidian">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 max-w-xs">{description}</p>
    </motion.div>
  )
}
