/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff9827',
        secondary: '#9c6ade',
        accent: '#ff6d92',
        'bg-dark': '#0e0918',
        'text-dark': '#ffffff',
        'sidebar-bg': '#110a20',
        'card-bg': 'rgba(156, 106, 222, 0.1)',
        'border-color': 'rgba(156, 106, 222, 0.1)',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, #ff9827, #ff6d92)',
        'gradient-2': 'linear-gradient(135deg, #9c6ade, #4f43e8)',
        'card-gradient': 'linear-gradient(135deg, rgba(156, 106, 222, 0.1), rgba(79, 67, 232, 0.1))',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'n8n': '0 20px 40px rgba(156, 106, 222, 0.3)',
        'n8n-hover': '0 25px 50px rgba(156, 106, 222, 0.4)',
      },
    },
  },
  plugins: [],
}