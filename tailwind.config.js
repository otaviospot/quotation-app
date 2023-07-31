/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        'p-card': '380px',
        '50v': '50vh',
        '60v': '60vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v-h': 'calc(100vh - 80px)',
      },
      minHeight: {
        '100v-h': 'calc(100vh - 80px)',
      },
      flex: {
        '0-auto': '0 0 auto',
      },
    },
  },
  plugins: [],
};
