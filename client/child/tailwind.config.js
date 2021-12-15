module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'activity-#f44336': '#f44336',
        'activity-#e91e63': '#e91e63',
        'activity-#9c27b0': '#9c27b0',
        'activity-#673ab7': '#673ab7',
        'activity-#3f51b5': '#3f51b5',
        'activity-#2196f3': '#2196f3',
        'activity-#03a9f4': '#03a9f4',
        'activity-#00bcd4': '#00bcd4',
        'activity-#009688': '#009688',
        'activity-#4caf50': '#4caf50',
        'activity-#8bc34a': '#8bc34a',
        'activity-#cddc39': '#cddc39',
        'activity-#ffeb3b': '#ffeb3b',
        'activity-#ffc107': '#ffc107',
        'activity-#ff9800': '#ff9800',
        'activity-#ff5722': '#ff5722',
        'activity-#795548': '#795548',
        'activity-#607d8b': '#607d8b',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
