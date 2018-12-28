module.exports = function () {
    $.gulp.task('del_img', function() {
        return $.del([
            'img',
        ]);
    });
}