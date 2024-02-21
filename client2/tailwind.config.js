/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        "nebula-hollow": ["Nebula-Hollow", "sans-serif"],
        "nebula-refular": ["Nebula-Regular", "sans-serif"],
      },
      dropShadow: {
        "line-shadow": "0px 0px 22.6px rgba(0, 0, 0, 0.85)",
        "text-shadow": "0px 0px 15.7px rgba(255, 220, 132, 0.65)",
      },
      backgroundColor: {
        "form-bg": "rgba(255, 255, 255, 0.19)",
        "gradient-screen":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);",
      },
      
      // backgroundImage: {
      //   cats: "url(assets/images/bg-image.png), lightgray 50% / cover no-repeat",
      // },
    },
  },
  plugins: [],
};
