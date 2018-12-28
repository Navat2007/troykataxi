module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch("**/*.+(php|html)").on('change', $.bs.reload);
        $.gulp.watch(["js/script.js"], $.gulp.series('scripts'));
        $.gulp.watch(["src/sass/*.sass"], $.gulp.series('sass'));
    });
};