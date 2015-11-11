"use strict";

var gulp = require('gulp'),
browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'src/js/app.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("src/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('compileSass', function() {
  return gulp.src("src/scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/css'));
});
gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/**/*.scss", "js/**/*.js", "images/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});


gulp.task("default", ["serve"], function() {
  gulp.start('build');
});
