module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map'
    },

    webpackServer: {
      noInfo: true
    }

  });
};
