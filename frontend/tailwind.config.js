/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF5',
        beige: '#F5E6D3',
        latte: '#B89F81',
        mocha: '#8E735B',
        caramel: '#D4A373',
        'off-white': '#FAF9F6',
        dark: '#2D2926',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slow-parallax': 'parallax 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'smooth-zoom': 'zoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        parallax: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(184, 159, 129, 0.2)',
        'soft-lg': '0 20px 50px -15px rgba(184, 159, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
