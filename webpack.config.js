const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  watch: true,
  performance: { hints: false },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-filteredlist.js',
    library: '',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
		react: 'react',
		'react-dom': 'react-dom'
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'main.css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};