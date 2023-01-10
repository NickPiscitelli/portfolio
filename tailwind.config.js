/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,ts,tsx}", "./components/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dracula": "#282a36",
        "dracula-dark": "#1d1f27",
        "dracula-light": "#333545"
      }
    },
  },
  plugins: [],
}
