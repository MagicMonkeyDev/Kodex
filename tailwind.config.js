/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          neon: '#00ff8c',
          white: '#ffffff',
          gray: '#8b8b8b',
        },
        background: {
          dark: '#111111',
          darker: '#0a0a0a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        breathe: 'breathe 4s ease-in-out infinite',
        scan: 'scan 15s linear infinite',
        'scan-vertical': 'scan-vertical 20s linear infinite',
        'orb-float': 'orb-float 20s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 15s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.1)',
          },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scan-vertical': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'orb-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(2%, -2%) scale(1.02)' },
          '50%': { transform: 'translate(0, -3%) scale(1)' },
          '75%': { transform: 'translate(-2%, -1%) scale(0.98)' },
        },
        'orb-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.7',
          },
        },
      },
    },
  },
  plugins: [],
};
