/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f0fe',
          100: '#e4e2fd',
          200: '#cbc7fc',
          300: '#aca4fa',
          400: '#8c7ff6',
          500: '#6C5CE7',
          600: '#5a48d8',
          700: '#4c3bc0',
          800: '#3e309b',
          900: '#352b7d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(20, 20, 43, 0.05)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        slideIn: 'slideIn .25s ease-out',
        fadeIn: 'fadeIn .2s ease-out',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-14': 'span 14 / span 14',
      },
    },
  },
  plugins: [],
}
