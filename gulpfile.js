var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  rename = require('gulp-rename');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['js']);

gulp.task('js', function() {
  return browserify('./src/js/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(rename('fo-scrollbar.js'))
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function() {
  gulp.watch('./src/js/**/*', ['js']);
});
