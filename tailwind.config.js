module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        spinFast: "spin 700ms linear infinite",
      },
    },
    fontFamily: {
      body: ["Nunito"],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
