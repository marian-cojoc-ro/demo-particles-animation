var
  gulp       = require('gulp'),
  rollup     = require('gulp-rollup'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');

gulp.task('bundle', function(){
    console.log('bundle');
    gulp.src('src/scripts/index.js', {read: false})
      .pipe(rollup({
        // any option supported by rollup can be set here, including sourceMap
        sourceMap: true
      }))
      .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  //gulp.watch('src/**/*.js', ['bundle']);
  watch('src/**/*.js', function(){
    gulp.src('src/scripts/index.js', {read: false})
      .pipe(rollup({
        // any option supported by rollup can be set here, including sourceMap
        sourceMap: true,
        format: 'iife'
      }))
      .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
      .pipe(gulp.dest('dist'));
  });
});


gulp.task('build', function(){
  gulp.src('src/index.js', {read: false})
    .pipe(rollup({
      // any option supported by rollup can be set here, including sourceMap
      sourceMap: true
    }))
    .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
    .pipe(gulp.dest('dist'));
});