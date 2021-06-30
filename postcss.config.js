module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  syntax: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'autoprefixer': {},
    cssnano: ctx.env === 'production' ? {} : false
  }
})