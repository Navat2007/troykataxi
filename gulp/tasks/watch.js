module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch(["*.+(php|html)", "view/*.+(php|html)", "view/main/*.+(php|html)"]).on('change', $.bs.reload);
        $.gulp.watch(["js/script.js"], $.gulp.series('scripts'));
        $.gulp.watch(["src/sass/*.sass"], $.gulp.series('sass'));
    });
};