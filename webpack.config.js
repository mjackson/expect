var webpack = require('webpack');

module.exports = {

  node: {
    buffer: false
  },

  output: {
    library: 'expect',
    libraryTarget: 'var'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

};
