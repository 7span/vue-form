module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "material-colors/dist/colors.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  }
};
