/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000F17',
        secondary: '#001E2E',
        tertiary: '#002D44',
        action: '#0095E4',
        border: "#89919B"
      },
      screens: {
        xs: '360px',      // celulares pequenos (ex: Galaxy S7)
        sm: '480px',      // celulares médios
        md: '768px',      // tablets
        lg: '1024px',     // notebooks
        xl: '1280px',     // desktops
        '2xl': '1536px',  // telas grandes
        '3xl': '1800px',  // monitores ultra-wide
      },
    },
  },
  plugins: [],
}

