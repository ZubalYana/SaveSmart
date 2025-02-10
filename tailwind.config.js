/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: '#1E3A8A',
        accentLightBlue: '#4672F1',
        defaultText: '#333',
        btnBgShade: {
          500: '#4672F1', 
        },
        customWhite: '#F6F6F6',
      },
      screens: {
        'xs': '320px',
        '2xs': '375px',
      },
    },
  },
  plugins: [],
}

