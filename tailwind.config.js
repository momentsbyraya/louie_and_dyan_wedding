/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg-custom': '992px',
      },
      colors: {
        /* Remapped: was nude brown — now Dusty Blue 600 for accent fills/buttons */
        'nude-brown': '#6F92AA',
        /* Remapped: was warm taupe — now Dusty Blue scale */
        'wedding': {
          50: '#F8FAFC',
          100: '#EEF4F7',
          200: '#DCE8EF',
          300: '#C5D7E2',
          400: '#A8C1D2',
          500: '#8DAEC4',
          600: '#6F92AA',
          700: '#55768E',
          800: '#415B6F',
          900: '#2D4251',
        },
        /* Remapped: was rose — soft dusty blue accents */
        'rose': {
          50: '#F8FAFC',
          100: '#EEF4F7',
          200: '#DCE8EF',
          300: '#C5D7E2',
          400: '#A8C1D2',
          500: '#8DAEC4',
          600: '#6F92AA',
          700: '#55768E',
          800: '#415B6F',
          900: '#2D4251',
        },
        /* Remapped: was amber gold — silver / dusty blue accents */
        'gold': {
          50: '#F8FAFC',
          100: '#EEF4F7',
          200: '#DCE8EF',
          300: '#C9D3DB',
          400: '#A8C1D2',
          500: '#8DAEC4',
          600: '#6F92AA',
          700: '#55768E',
          800: '#415B6F',
          900: '#2D4251',
        },
        ivory: '#F8F7F4',
        'off-white': '#FCFCFB',
        'soft-gray': '#E9ECEF',
        'border-gray': '#D6DDE3',
        'primary-text': '#27323B',
        'secondary-text': '#6B7682',
        'accent-silver': '#C9D3DB',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
        'antsvalley': ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
