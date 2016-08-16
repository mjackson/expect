import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

const production = process.env.PRODUCTION === 'true';

export default {
	entry: 'modules/index.js',
	dest: 'umd/expect.js',
	format: 'umd',
	moduleName: 'expect',
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
		buble(),
		replace({
			'process.env.NODE_DEBUG': !production
		})
	]
}
