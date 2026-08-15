/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#0B5ED7',
          700: '#0b54c0',
          800: '#0c47a1',
          900: '#0d3d85',
        },
        navy: {
          50: '#f0f4fa',
          100: '#d9e2f1',
          200: '#b3c5e3',
          300: '#7d97c9',
          400: '#4a6bab',
          500: '#2a4d8a',
          600: '#1c3a6e',
          700: '#162f57',
          800: '#0D2B52',
          900: '#0a2242',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14B8A6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        slatey: {
          50: '#F8FAFC',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 10px 40px -12px rgba(13, 43, 82, 0.15)',
        'premium-lg': '0 25px 60px -15px rgba(13, 43, 82, 0.2)',
        glow: '0 0 30px rgba(11, 94, 215, 0.35)',
        'accent-glow': '0 0 30px rgba(20, 184, 166, 0.35)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(13,43,82,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,43,82,0.04) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(circle at 30% 20%, rgba(11,94,215,0.18), transparent 55%), radial-gradient(circle at 80% 60%, rgba(20,184,166,0.12), transparent 50%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};
