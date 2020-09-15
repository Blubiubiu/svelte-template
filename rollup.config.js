import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import preprocess from './preprocess';
import serve from 'rollup-plugin-serve';

const production = process.env.NODE_ENV === 'production' ? true : false;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle' + '.js'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: sveltePreprocess(preprocess)
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && serve({
			open: false,
			contentBase: 'public',
			historyApiFallback: true,
			host: 'localhost',
			port: 10004,
		}),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
