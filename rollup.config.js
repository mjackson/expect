import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

const production = process.env.PRODUCTION === 'true';

export default {
  entry: 'modules/index.js',
  dest: 'umd/expect.js',
  moduleName: 'expect',
  format: 'umd',
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'define-properties': [ 'supportsDescriptors' ]
      }
    }),
    babel({
      presets: [
        [ 'es2015', { modules: false } ]
      ]
    }),
    replace({
      'process.env.NODE_DEBUG': !production
    })
  ]
}
