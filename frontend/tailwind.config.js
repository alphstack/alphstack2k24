/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "darl", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              50: "#fff8ed",
              100: "#ffebc8",
              200: "#fedcaa",
              300: "#fdc374",
              400: "#fb9e3c",
              500: "#f98216",
              600: "#ea660c",
              700: "#c24d0c",
              800: "#9a3d12",
              900: "#7c3412",
              DEFAULT: "#fdc374",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}

