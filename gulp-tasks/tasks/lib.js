var babel = require('gulp-babel');
var del = require('del');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
const debug = require('gulp-debug');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

module.exports = function (gulp, config) {
	gulp.task('clean:lib', function () {
		return del([config.component.lib]);
	});

	gulp.task('build:lib', function () {
		return gulp.src([ config.component.src + '/**/*.js', '!**/__tests__/**/*' ])
			// .pipe(babel({ plugins: [require('babel-plugin-object-assign')] }))
			.pipe(babel({
                presets: ['react', 'es2015','stage-2'], 
                plugins: ['babel-plugin-transform-object-assign',"transform-object-rest-spread"] 
            }))  
			// .pipe(babel())
			.pipe(plumber({errorHandler:onError}))
			.pipe(gulp.dest(config.component.lib));
	});

	gulp.task('build:libscss', function () {
		return gulp.src([config.component.src + '/' + config.component.scss.path + '/' + config.component.scss.entry])
			.pipe(plumber({errorHandler:onError}))
			.pipe(sass())
			.pipe(gulp.dest(config.component.lib))
			.pipe(gulp.dest(config.example.dist))
            .pipe(rename({extname: ".scss"}))
			.pipe(gulp.dest(config.component.lib))
			.pipe(gulp.dest(config.example.dist))
			.pipe(livereload());
	});

	/**
	 * JSON passthrough
	 * */
	gulp.task('build:libjson', function () {
		return gulp.src([ config.component.src + '/**/*.json'])
			.pipe(gulp.dest(config.component.lib));
	});

	/**
	 * Img passthrough
	 * */
	gulp.task('build:libimg', function () {
		return gulp.src([ config.component.src + '/**/*.{gif,jpg,jpeg,png,bmp}'])
			.pipe(gulp.dest(config.component.lib));
	});

	gulp.task('watch:lib',['build:lib'], function () {
		return gulp.watch([config.component.src + '/**/*.{js,json,scss}', '!**/__tests__/**/*'], ['build:lib','build:libscss','build:libjson','build:libimg']);
	});
};

/**
 * Error handler/beeper
 * @param e
 */
function onError(e){
	console.log(e);
	this.emit('end')
}
