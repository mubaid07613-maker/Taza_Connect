/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',      // Dark slate/navy
          primary: '#059669',   // Emerald agricultural primary
          primaryHover: '#047857',
          lightGreen: '#ECFDF5',
          accent: '#10B981',
          navy: '#1E293B',
          softBg: '#F8FAFC',
          borderSubtle: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
