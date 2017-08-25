var gulp = require('gulp');
var sass = require('gulp-sass');
var initGulpTasks = require('./gulp-tasks');

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

var taskConfig = {

	//component: {
	//	name: 'FilteredList',
	//	dependencies: [
	//		'classnames',
	//		'react',
	//		'react-dom'
	//	],
	//	lib: 'lib'
	//},

	component: {
		name: 'FilteredList',
        lib:'lib',
		dependencies: [
			'classnames',
			// 'react',
			// 'react-dom',
			'react-dates',
			'bluebird'
		],
		scss: {
			entry: 'main.scss',
			path: 'style'
		}
	},

	//example: {
	//	src: 'example/src',
	//	dist: 'example/dist',
	//	files: [
	//		'index.html',
	//		'.gitignore',
	//		'*.json'
	//	],
	//	scripts: [
	//		'example.js'
	//	],
	//	//less: [
	//	//	'example.less'
	//	//]
	//	scss: [
	//		'main.scss'
	//	]
	//}

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'standalone.html'
		],
		scripts: [
			'example.js'
		],
		scss: [
			'main.scss'
		]
	}

};

initGulpTasks(gulp, taskConfig);/**
 * Adding gulp-sass
 */
//gulp.task('sass', function () {
//	return gulp.src('./src/style/**/main.scss')
//		.pipe(sass().on('error', sass.logError))
//		.pipe(gulp.dest('./example/dist'));
//});
//
//gulp.task('sass:watch', function () {
//	gulp.watch('./src/style/**/main.scss', ['sass']);
//});
