/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00ffff',
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s infinite',
        'text-glow': 'text-glow 3s infinite alternate',
      },
    },
  },
  plugins: [],
};

