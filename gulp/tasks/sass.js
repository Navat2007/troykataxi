module.exports = function () {
    $.gulp.task('sass', function () {
        return $.gulp.src('src/sass/*.sass')
            .pipe($.gp.concat('style.sass'))
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({browsers: ['last 4 versions']}))
            .on("error", $.gp.notify.onError({title: "style"}))
            .pipe($.gp.cssnano())
            .pipe($.gp.rename({suffix: '.min'}))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest('css'))
            .pipe($.bs.reload({stream: true}));
    });
};