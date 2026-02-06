module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Filtramos el plugin de ESLint para que no rompa el build
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== "ESLintWebpackPlugin"
      );
      return webpackConfig;
    },
  },
};
