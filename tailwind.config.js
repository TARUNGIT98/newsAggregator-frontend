/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#FBA002", // cool teal
        ivory: "#313B2F", // ivory white
      },
      fontFamily: {
        sansation: ["Sansation"],
      },
    },
  },
  plugins: [],
};
