/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1C3A",
        accent: "#1E6BFF",
        slate: "#F3F5F8",
      },
      boxShadow: {
        glow: "0 20px 60px -30px rgba(30, 107, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
