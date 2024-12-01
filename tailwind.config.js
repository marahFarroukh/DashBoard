/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/auth-bg.png')",
      },
    },
  },
  plugins: [],
};
