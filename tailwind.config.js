/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#1a050c',
          900: '#350B18', // Deep Royal Maroon
          800: '#480f20',
          700: '#641B2B', // Burgundy
          600: '#7e2437',
        },
        burgundy: {
          DEFAULT: '#641B2B',
          deep: '#350B18',
          light: '#822438',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F5E6C8', // Champagne
          200: '#EBD2A0',
          300: '#E1BE78',
          400: '#D4AF65', // Antique Gold
          500: '#C29848',
          600: '#A37A30',
          700: '#7E5B1D',
          800: '#5A4012',
          DEFAULT: '#D4AF65',
          light: '#F5E6C8',
          rich: '#E8B923',
          bright: '#FFDF73',
        },
        ivory: {
          DEFAULT: '#FFF8E9', // Warm Ivory
          warm: '#FFF8E9',
          light: '#FFFDF9',
        },
        rose: {
          soft: '#D99BA8', // Soft Rose
          petal: '#E297A6',
          deep: '#B75D72',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'royal-gradient': 'radial-gradient(ellipse at 50% 20%, #641B2B 0%, #350B18 60%, #17040B 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #FFF3D6 0%, #D4AF65 50%, #9B7829 100%)',
        'gold-text': 'linear-gradient(135deg, #FFF6D8 0%, #E8C170 30%, #D4AF65 70%, #F5E6C8 100%)',
        'royal-card': 'linear-gradient(145deg, rgba(100, 27, 43, 0.6) 0%, rgba(53, 11, 24, 0.85) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 101, 0.25)',
        'gold-glow': '0 0 30px rgba(212, 175, 101, 0.45)',
        'gold-intense': '0 0 50px rgba(212, 175, 101, 0.7)',
        'diya-flame': '0 0 25px 8px rgba(255, 180, 50, 0.65)',
        'royal-card': '0 20px 50px rgba(15, 2, 6, 0.7), inset 0 1px 1px rgba(255, 230, 180, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
        'spin-very-slow': 'spin 40s linear infinite',
        'spin-reverse-slow': 'spinReverse 35s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1) skewX(0deg)' },
          '25%': { opacity: '1', transform: 'scale(1.05, 1.1) skewX(1deg)' },
          '50%': { opacity: '0.85', transform: 'scale(0.95, 0.98) skewX(-1deg)' },
          '75%': { opacity: '1', transform: 'scale(1.08, 1.05) skewX(0.5deg)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

