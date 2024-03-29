module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slideIn': 'slideIn 0.3s forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { left: '-100%' },
          '100%': { left: '0' },
        },
      },
    },
  },
  plugins: [],  
}
