/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['inter', 'sans-serif']
      },

      keyframes: {
        overlayshow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentshow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      
      animation: {
        overlayshow: 'overlayshow 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentshow: 'contentshow 350ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    },
  },
  plugins: [],
}

