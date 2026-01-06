/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#8B5CF6",
        background: "#0B0D12",
      },
      fontFamily: {
        sans: ["var(--font-oxanium)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
