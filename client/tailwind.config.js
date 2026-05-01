/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        primaryDark: "#4F46E5",
        primaryLight: "#8B5CF6",
        bgDark: "#020617",
        bgSlate: "#0F172A",
        textLight: "#F8FAFC",
        textMuted: "#CBD5E1",
        accentGreen: "#22C55E",
        accentRed: "#EF4444",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
