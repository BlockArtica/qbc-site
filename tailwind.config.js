/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',           // catches anything else in src/
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
