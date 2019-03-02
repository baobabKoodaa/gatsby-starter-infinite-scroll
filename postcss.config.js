module.exports = ctx => ({
    plugins: {
      "postcss-easy-media-query": {
        breakpoints: {
          tablet: 600,
          desktop: 1024
        }
      },
      "postcss-nested": {}
    }
});