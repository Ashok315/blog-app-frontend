/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         bgColor:'#D9D9D9',
         primary: '#E03E87',
         secondary: '#355DB6',
         lightPrimary: '#FF54A1',
         darkBorder: '#3B3A3A',
         lightBorder: '#6A6767',
         lightBg: '#F6F3F4',
         hoverColor: '#FF92C3',
         //dark theme
         dark:'#192e3d',
         darkText:'#ECECEC',
         darker:"#12202a"
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui']
      },
    },
  },
  plugins: [],
}

