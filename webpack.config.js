'use strict'
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader?presets[]=es2015',
        exclude: /(node_modules|bower_components)/
      },
    ]
  }
};
