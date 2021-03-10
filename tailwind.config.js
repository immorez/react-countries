const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./pages/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"]
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      emerald: colors.emerald,
      green: colors.green,
      cyan: colors.cyan,
      pink: colors.pink,
      rose: colors.rose,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      black: colors.black,
      orange: colors.orange,
      purple: colors.purple,
      darkBlue: "hsl(209, 23%, 22%)",
      primaryDarkBlue: "hsl(207, 26%, 17%)",
      secondaryDarkBlue: "hsl(200, 15%, 8%)",
      darkGray: "hsl(0, 0%, 52%)",
      lightGray: "hsl(0, 0%, 98%)",
      white: "hsl(0, 0%, 100%)"
    },
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"]
      },
      spacing: {
        28: "7rem",
        72: "18rem",
        80: "20rem",
        128: "32rem",
        168: "42rem",
        192: "48rem",
        "3/4": "75%"
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem"
      }
    }
  },
  variants: {},
  plugins: []
};
