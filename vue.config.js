module.exports = {
  transpileDependencies: true,
  publicPath: '/online-shop-on-vue',
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') },
    },
  },
};
