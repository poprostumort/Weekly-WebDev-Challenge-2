var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('./scss/style_big.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
})

gulp.task('autoprefixer', function () {
    return gulp.src('./css/style_big.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify', function() {
  return gulp.src('./css/style_big.css')
    .pipe(csso())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
  runSequence('sass', 'autoprefixer', 'minify')
});
