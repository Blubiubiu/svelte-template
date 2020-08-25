import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import serve from 'rollup-plugin-serve'
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle' + '.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			// https://github.com/sveltejs/svelte-preprocess
			preprocess: sveltePreprocess({
				sourceMap: !production,
				babel: {
					presets: [
						[
							'@babel/preset-env',
							{
								loose: true,
								// No need for babel to resolve modules
								modules: false,
								targets: {
									// ! Very important. Target es6+
									esmodules: true,
									browsers: ["ie >= 9", "chrome >= 62"]
								}
							},
						],
					],
				},
				postcss: {
					plugins: [require('autoprefixer')()]
				}
			})
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),
		!production && serve({
			open: false, // 是否打开浏览器
			contentBase: 'public', // 入口HTML 文件位置
			historyApiFallback: true, // Set to true to return index.html instead of 404
			host: 'localhost',
			port: 10001,
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
