/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E', // Primary Emerald
            600: '#16A34A', // Accent
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
          },
          dark: {
            950: '#090D14',
            900: '#111827', // Dark Charcoal
            800: '#1F2937',
            700: '#374151',
          },
          gold: {
            400: '#FACC15',
            500: '#EAB308',
            600: '#D97706',
          },
          grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
          }
        }
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 15px rgba(34, 197, 94, 0.08)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.15)',
        'emerald-glow': '0 0 25px rgba(34, 197, 94, 0.3)',
        'gold-glow': '0 0 25px rgba(234, 179, 8, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
