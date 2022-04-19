const colors = require('tailwindcss/colors');

module.exports = {
  import: true,
  // Active dark mode on class basis
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'blur-right': "url('../public/static/background-blur-right.png')",
        hero: "url('../public/static/hero.png')",
        'logo-pattern': "url('../public/static/hero_logo.png')",
        'logo-mobile-pattern': "url('../public/static/hero_logo_mobile.png')",
        'square-pattern': "url('../public/static/square_pattern.png')",
        'map-pattern': "url('../public/static/world_map.png')"
      },
      fontFamily: {
        sans: ['Inter']
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#2F80ED',
      'etny-button': {
        primary: '#2F80ED',
        hover: '#5AA5FA',
        focus: '#1E61C7'
      },
      'etny-blue': {
        100: '#ff0000'
      },
      etny: {
        100: '#051733',
        200: '#181466',
        300: '#5A8099',
        400: '#7DADCC',
        500: '#80CCFF',
        600: '#0891b2',
        700: '#80CCFF',
        800: '#155e75',
        900: '#164e63'
      },
      neutral: {
        50: '#FCFDFD',
        100: '#F7F8F9',
        200: '#F2F3F3',
        300: '#D9D9D9',
        400: '#BFBFBE',
        450: '#999DA3',
        500: '#8D8D8D',
        600: '#595959',
        700: '#434444',
        800: '#1E1F1F',
        900: '#131313',
        950: '1E1F1F'
      },
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue
    }
  },
  plugins: []
};
