/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './public/index.html',
  ],
  theme: {
    extend: {
      height: {
        '80v': '80vh',
        '90v': '80vh',
      }
    },
  },
  plugins: [],
}

