const gulp = require('gulp')
const less = require('gulp-less')
const sass = require('gulp-sass')(require('sass'));
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require("gulp-plumber")
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const del = require('del')

//Путь
const paths = {
	html: {
		src: 'src/*.html',
		dest: 'dist/'
	},
	styles: {
		src: 'src/styles/*.+(scss|css|min.css)',
		dest: 'dist/css/',
		watch: 'src/styles/**/*.(scss|css|min.css)'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/js/'
	},
	images: {
		src: 'src/img/**',
		dest: 'dist/img/'
	},
	fonts: {
		src: 'src/fonts/**',
		dest: 'dist/fonts'
	},
	libs: {
		src: 'src/libs/**',
		dest: 'dist/libs'
	}
}

function clean() {
	return del(['dist/*', '!dist/img'])
}

//Задача для обработки html
function html() {
	return gulp.src(paths.html.src)
	.pipe(plumber())
	.pipe(gulp.dest(paths.html.dest))
	.pipe(browserSync.stream())
}

//Задача для обработки стилей

function styles() {
	return gulp.src(paths.styles.src)
	.pipe(sourcemaps.init())
	.pipe(sass())					
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 8 versions'],
		cascade: false
}))	
	.pipe(plumber())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(paths.styles.dest))
	.pipe(browserSync.stream())
}

//Задача для обработки скриптов

function scripts() {
	return gulp.src(paths.scripts.src)
	.pipe(sourcemaps.init()) 					
	.pipe(plumber())
    .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browserSync.stream())
}

// Задача для обработки изображений
function img() {
	return gulp.src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest(paths.images.dest))
	.pipe(browserSync.stream())
}

//Задача для обработки шрифтов

function fonts() {
	return gulp.src(paths.fonts.src)
	.pipe(gulp.dest(paths.fonts.dest))
	.pipe(browserSync.stream())
}

//Задача для обработки библиотек

function libs() {
	return gulp.src(paths.libs.src)
	.pipe(gulp.dest(paths.libs.dest))
	.pipe(browserSync.stream())
}

//Отслеживание
function watch() {
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	})
	gulp.watch(paths.html.src).on('change', browserSync.reload)
	gulp.watch(paths.html.src, html)
	gulp.watch(paths.styles.watch, styles)
	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.images.src, img)
	gulp.watch(paths.fonts.src, fonts)
	gulp.watch(paths.libs.src, libs)
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts, img, fonts, libs), watch)

exports.clean = clean,
exports.img = img,
exports.html = html,
exports.styles = styles,
exports.scripts = scripts,
exports.fonts = fonts,
exports.libs = libs,
exports.watch = watch,
exports.build = build,
exports.default = build