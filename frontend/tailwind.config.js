/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void: '#0a0a0f',
        surface: '#111118',
        panel: '#16161f',
        border: '#1e1e2e',
        accent: '#7c6aff',
        'accent-bright': '#9d8fff',
        'accent-dim': '#3d3480',
        cyan: '#00d4ff',
        'cyan-dim': '#0088aa',
        success: '#00e5a0',
        danger: '#ff4d6d',
        muted: '#4a4a6a',
        subtle: '#2a2a3a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 106, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 106, 255, 0.6)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(124, 106, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(124, 106, 255, 0.03) 1px, transparent 1px)`,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(124, 106, 255, 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
