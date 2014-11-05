var gulp = require('gulp')
  , gutil = require('gulp-util')
  , source = require('vinyl-source-stream')
  , watchify = require('watchify')
  , livereload = require('gulp-livereload')
  , connect = require('gulp-connect')
  , browserify = require('browserify')
  , xtend = require('xtend');

gulp.task('bundle', function () {

  var args = xtend(watchify.args, {debug: true})
    , b = watchify(browserify(args));

  b.on('update', bundle);
  b.add('<%= inputFilePath %>');

  function bundle() {
    return b.bundle()
      .on('error', function (e) {
        gutil.log(gutil.colors.red('Bundle error: ', e.message));
      })
      .pipe(source('<%= outputFile %>'))
      .pipe(gulp.dest('<%= outputDir %>'))
      .pipe(livereload());
  }
  return bundle();
});

gulp.task('watch', ['bundle'], function () {
  connect.server({
    port: 8000,
    root: './'
  });
  livereload.listen(35729);
});

gulp.task('default', ['watch']);
