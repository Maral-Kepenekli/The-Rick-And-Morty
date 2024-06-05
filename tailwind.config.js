module.exports = {
  purge: ['./docs/**/*.html,js'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('../assets/hero-image.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}