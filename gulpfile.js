var gulp = require('gulp');
var dest = gulp.dest;
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {  
  gulp.src(['frontend/**'])
      .pipe(dest('./build/frontend'));
      
  gulp.src(['frontend/index.js'])
      .pipe(browserify({
          noparse: true,
          shim: {
            //codemirror: {path: './node_modules/codemirror/lib/codemirror.js', exports: 'CodeMirror'},
            //texteditor: {path: './frontend/modules/texteditor.js', exports: ''}
            angular: {path: './node_modules/angular/lib/angular.min.js', exports: 'angular'}
            //param: {path: './frontend/modules/param.js', exports: ''}
          } 
        }
      ))
      .pipe(dest('./build/frontend'));
});
gulp.task('vendor', function() {
  gulp.src('node_modules/codemirror/**')
      .pipe(dest('./build/frontend/vendor/codemirror'));
});
gulp.task('default', function() {

});