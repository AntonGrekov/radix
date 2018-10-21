var 	gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		del 				= require('del'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		imagemin 		= require('gulp-imagemin'),
		png_quant 		= require('imagemin-pngquant'),
		cache 			= require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");
		jade			   = require("gulp-jade"),
		imageop 			= require('gulp-image-optimization');



// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});


gulp.task('build_jquery', function() {
	return gulp.src('app/bower_components/jquery/dist/jquery.js')
				 .pipe(concat('jquery.min.js'))
				 .pipe(uglify())
				 .pipe(gulp.dest('app/js'))
				 .pipe(browserSync.reload({stream: true}));
})

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function() {
	return gulp.src('app/js/main.js') // Всегда в конце
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/bower_components/jquery/dist/jquery.js', ['build_jquery']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload)
});



gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'sass', 'js'], function () {
	var buildCss
		= gulp.src('app/css/*.css')
			.pipe(gulp.dest('dist/css'));

	var buildFonts
		= gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('dist/fonts'));

	var buildJs
		= gulp.src('app/js/**/*')
			.pipe(gulp.dest('dist/js'));

	var buildHtml
		= gulp.src('app/*.html')
			.pipe(gulp.dest('dist/'));

});


gulp.task('img', function () {
	return gulp.src('app/img/**/*')
			.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			une: [png_quant()]
			})))
			.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['watch']);
