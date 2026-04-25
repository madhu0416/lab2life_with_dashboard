/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ enables manual dark/light toggle
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue
        secondary: "#6366f1", // indigo
        medical: "#0ea5e9", // healthcare theme
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};