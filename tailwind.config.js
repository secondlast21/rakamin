/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#03959F',
          surface: '#F7FEFF',
          border: '#62BDC3',
          dark: '#007c85',
          hover: '#C2E2E4'
        },
        secondary: {
          default: '#FA980F',
          surface: '#FFFCF5',
          border: '#FEEABC',
        },
        danger: {
          default: '#E53141',
          surface: '#FFFAFA',
          border: '#F5B1B7',
          dark: '#c91022',
        },
        success: {
          default: '#43936C',
          surface: '#F8FBF9',
          border: '#B8DBCA',
        },
        neutral: {
          40: '#E0E0E0',
          70: '#757575',
          90: '#404040',
          100: '#1D1F20',
        },
      },
    },
  },
  plugins: [],
}

