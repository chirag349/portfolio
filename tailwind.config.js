/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Adding custom utilities for the card flips
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
      })
    },
  ],
};