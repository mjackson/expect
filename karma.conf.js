module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha' ],

    files: [
      'modules/__tests__/browser/tests.js'
    ],

    preprocessors: {
      'modules/__tests__/browser/tests.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map'
    }

  });
};
