/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColorText: "#F0ECE6",
        brown: "#C4B7A6",
        browndark: "#948B7E",
        background: "#353229",
        backgroundComponents: "#383530",
        title: "#3c2d23",
        brownlight: "#CCC8BC",
        graywhite: "#F5F5F5",
        graylight: "#7F7E7C",
        graydark: "#434343",
        graylight2: "#C3C3C3",
        graybrown: "#D3CDC5",
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      boxShadow: {
        opinions: "10px 10px 10px 0px rgba(0,0,0,0.25)",
        buttons: "5px 3px 5px 0px rgba(0,0,0,0.25)",
        expandModels: "5px 0px 15px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
