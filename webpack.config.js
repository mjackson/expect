module.exports = {

  output: {
    library: 'expect',
    libraryTarget: 'umd'
  },

  node: {
    Buffer: false
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }

};
