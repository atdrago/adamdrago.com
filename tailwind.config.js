module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    fontFamily: {
      serif: [
        "Courier New",
        "Courier",
        "Lucida Sans Typewriter",
        "Lucida Typewriter",
        "monospace",
      ],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
