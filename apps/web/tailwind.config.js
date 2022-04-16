module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0fd102",
        secondary: "#f7e096",
        accent: "#22a562",
        neutral: "#31253C",
        "base-100": "#553F55",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
