module.exports = {
  darkMode: 'class',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darken: {
          '10': 'rgba(0, 0, 0, 0.1)',
          '25': 'rgba(0, 0, 0, 0.25)',
          '50': 'rgba(0, 0, 0, 0.5)',
          '75': 'rgba(0, 0, 0, 0.75)',
        },
        lighten: {
          '10': 'rgba(255, 255, 255, 0.1)',
          '25': 'rgba(255, 255, 255, 0.25)',
          '50': 'rgba(255, 255, 255, 0.5)',
          '75': 'rgba(255, 255, 255, 0.75)',
        },
      },
      fontFamily: {
        sans: 'Quicksand, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
