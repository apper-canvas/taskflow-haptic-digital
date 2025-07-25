/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'spring-bounce': 'spring-bounce 0.5s ease-out',
        'task-complete': 'task-complete 0.3s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        'spring-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'task-complete': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.95)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        }
      }
    },
  },
  plugins: [],
}