const path = require('path');

module.exports = {
  watch: true,
  performance: { hints: false },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-filteredlist.js',
    library: 'reactfilteredlist',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"},// create style nodes from JS strings
          {loader: "css-loader"},// css into CommonJS
          {loader: "sass-loader"}// scss to css
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
};