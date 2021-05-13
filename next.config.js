module.exports = {
  /* Our webpack config uses raw loader to load our .md file content from imports */
  webpack: function (config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: "raw-loader",
    });
    return config;
  },
};
