var gulp        = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('html', function () {
    return gulp.src('*html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['html'], browserSync.reload);

gulp.task('serve', ['html'], function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html", ['watch']);
});