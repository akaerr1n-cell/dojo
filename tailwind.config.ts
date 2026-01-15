import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Obsidian background
        obsidian: {
          DEFAULT: '#0A0A0C',
          light: '#121216',
          lighter: '#1A1A1F',
        },
        // Neon accent colors
        neon: {
          green: '#00FFA3',
          purple: '#BC13FE',
          red: '#FF0055',
        },
        // Belt colors
        belt: {
          white: '#FFFFFF',
          blue: '#3B82F6',
          brown: '#92400E',
          black: '#000000',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 163, 0.5)',
        'neon-purple': '0 0 20px rgba(188, 19, 254, 0.5)',
        'neon-red': '0 0 20px rgba(255, 0, 85, 0.5)',
      },
      dropShadow: {
        'neon-green': '0 0 10px rgba(0, 255, 163, 0.8)',
        'neon-purple': '0 0 10px rgba(188, 19, 254, 0.8)',
        'neon-red': '0 0 10px rgba(255, 0, 85, 0.8)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gong-strike': 'gong-strike 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'gong-strike': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} satisfies Config
