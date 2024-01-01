const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#101010", // slightly lighter than design to make font less "bold"
      gray: "#A6A6A6",
      "gray-light": "#E5E5E5",
      white: "#ffffff",
      red: "#FF0000",
      blue: "#0000FF",
      yellow: "#FFEB00",
      green: "#00BE1E",
    },
    fontSize: {
      sm: ["14px", "18px"],
      base: ["18px", "24px"],
      lg: ["24px", "27px"],
      xl: ["40px", "46px"],
    },
    aspectRatio: {
      auto: "auto",
      ["1/1"]: "1/1",
      ["1/2"]: "1/2",
      ["2/1"]: "2/1",
      ["4/3"]: "4/3",
      ["3/4"]: "3/4",
      ["16/9"]: "16/9",
      ["9/16"]: "9/16",
    },
    screens: {
      sm: { max: "1023px" },
      lg: { min: "1280px" },
      xl: { min: "1680px" },
    },
    keyframes: {
      spin: { to: { transform: "rotate(360deg)" } },
      fade: {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
    },
    animation: {
      spin: "spin 3s linear infinite",
      fade: "fade 3s forwards 1 step-end",
    },
    transitionDuration: {
      0: "0ms",
      DEFAULT: "300ms",
    },
  },
  plugins: [
    // polyfill for future pseudo selector :enter that combines :hover and :focus
    ({ addVariant }) => addVariant("enter", ["&:hover", "&:focus"]),
    // lowers specifity to allow overrides
    ({ addVariant }) => addVariant("base", "html :where(&)"),
    // style direct children
    ({ addVariant }) => addVariant("children", "& > *"),
    // style last child
    ({ addVariant }) => addVariant("children-last", "& > *:last-child"),
  ],
}
