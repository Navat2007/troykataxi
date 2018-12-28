module.exports = function () {
    $.gulp.task('server', function () {
        $.bs.init({
            proxy: 'localhost/troykataxi/'
        });
    });
};
