/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily:{
       poppins:['Poppins','sans-serif']
      },
      height:{
        "1/10":"10vh",
        "9/10":"90vh"
      },
    },
  },
  plugins: [],
}

