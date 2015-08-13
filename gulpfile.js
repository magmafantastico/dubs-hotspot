var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gls = require('gulp-live-server'),
	tinypng = require('gulp-tinypng');

var cssFiles = 'css/*.css',
	imgfiles = 'img/*',
	jsFiles = 'js/villa.js';

gulp.task('css', function() {
	gulp.src(cssFiles)
		.pipe(minifycss())
		.pipe(concat('villa.css'))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('tinypng', function () {
	gulp.src(imgfiles)
		.pipe(tinypng('8eNoFlUv4wHzam_8GleKHdhH2YFk9xAd'))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('serve', function() {
	//1. serve with default settings
	//var server = gls.static(); //equals to gls.static('public', 3000);
	//server.start();

	//2. serve at custom port
	var server = gls.static('/', 8808);
	server.start();

	//3. serve multi folders
	//var server = gls.static(['/'], 8888);
	//server.start();

	//use gulp.watch to trigger server actions(notify, start or stop)
	gulp.watch(['index.html', 'clean/*.html'], function () {
		server.notify.apply(server, arguments);
	});
});

gulp.task('default', function() {
	var villa = ['css', 'js'];
	gulp.watch(villa);
});