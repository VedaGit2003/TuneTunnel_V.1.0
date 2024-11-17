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
        "2/10":"20vh",
        "7/10":"70vh",
        "9/10":"90vh",
        "8/10":"80vh"
      },
    },
  },
  plugins: [],
}

