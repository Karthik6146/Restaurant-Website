module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#B23A48",
        secondary: "#F5E6E8",
        accent: "#53354A",
        'matte-black': '#1A1A1A',
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}; 