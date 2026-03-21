const config = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: '[name].bundle.js',
  }
};
module.exports = config;
