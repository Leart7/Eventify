/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 0 40px 2px rgba(245, 245, 245 , 1)",
        cutomHower: "0 0 40px 2px rgba(220, 220, 220 , 1)",
        customHower1: "0 0 20px 3px rgba(180, 180, 180 , 1)"
      },
      backgroundImage: {
        'eventBg': "url('https://images.pexels.com/photos/7794362/pexels-photo-7794362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        
      }
    },
    screens: {
      xs: "455px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "960px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("flowbite/plugin")],
};
