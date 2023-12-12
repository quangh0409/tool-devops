/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: {  max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: {  max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: {  max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

    },
    extend: {
    
    },
  },
  plugins: [],
};
