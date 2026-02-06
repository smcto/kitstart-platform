/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
