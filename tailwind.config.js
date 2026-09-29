/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a2342', // Government Navy Blue
        secondary: '#ffffff', // White
        accent: {
          saffron: '#FF9933', // Saffron/Orange
          green: '#138808', // India Green
          blue: '#000080', // Government Blue
          gold: '#FFD700', // Gold for highlights
        },
        background: '#f5f5f5', // Light gray background
        government: {
          dark: '#1a1a2e',
          medium: '#16213e',
          light: '#0f3460',
        }
      },
    },
  },
  plugins: [],
}
