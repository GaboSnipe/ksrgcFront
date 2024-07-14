/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    theme: {
      themes: ["dark", "winter"],
    },
    // themes: [
    //   {
    //     light: {
    //       "primary": "#570df8",
    //       "secondary": "#f000b8",
    //       "accent": "#37cdbe",
    //       "neutral": "#2b3440",
    //       "base-100": "#ffffff",
    //       "base-200": "#f2f2f2",
    //       "base-300": "#e5e6e6",
    //       "info": "#2094f3",
    //       "success": "#009485",
    //       "warning": "#ff9900",
    //       "error": "#ff5724",
    //       "txcol": "#ffffff",
    //     },
    //     dark: {
    //       "primary": "#6419e6",
    //       "secondary": "#d926a9",
    //       "accent": "#1fb2a6",
    //       "neutral": "#2a323c",
    //       "base-100": "#1d232a",
    //       "base-200": "#191e24",
    //       "base-300": "#15191e",
    //       "info": "#3abff8",
    //       "success": "#36d399",
    //       "warning": "#fbbd23",
    //       "error": "#f87272",
    //       "txcol": "#000000",
    //     },
    //   }
    // ],
  },
}
