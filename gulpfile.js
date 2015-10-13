var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
  babelify = require('babelify');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['js']);

gulp.task('js', function() {
  return browserify('./src/js/index.js')
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('fo-scrollbar.js'))
    .pipe(gulp.dest('./dist/js'));

});


gulp.task('watch', function() {
  gulp.watch('./src/js/**/*', ['js']);
});
