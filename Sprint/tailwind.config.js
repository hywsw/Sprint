/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        night: "rgb(var(--night) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentStrong: "rgb(var(--accent-strong) / <alpha-value>)",
        slate: "rgb(var(--slate) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 30px 70px -35px rgba(45, 212, 255, 0.7)",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Segoe UI"', '"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
