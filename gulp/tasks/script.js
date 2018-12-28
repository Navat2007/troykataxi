module.exports = function () {
    $.gulp.task('scripts:lib', function () {
        return $.gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
        ])
            .pipe($.gulp.dest('js/libs'))
            .pipe($.bs.reload({
                stream: true
            }));
        // .on('end', $.bs.reload);
    });

    $.gulp.task('scripts', function () {
        return $.gulp.src('js/script.js')
            .pipe($.gp.uglify())
            .pipe($.gp.rename({
             suffix: '.min'
            }))
            .pipe($.gulp.dest('js/'))
            .on('end', $.bs.reload);
    });
};