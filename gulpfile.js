'use strict';

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    del: require('del'),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('clear', function () {
    return $.gp.cache.clearAll()
});

// // -------------E-MAIL LETTER
// var options = {
//         encodeSpecialChars: false,
//     },
//     builder = emailBuilder(options);
//
// gulp.task('email', function () {
//     return gulp.src(['mail_template/*.html'])
//         .pipe(builder.build())
//         .pipe(gulp.dest('mail_template/ready_to_send'));
// });

$.gulp.task('default', $.gulp.series(
    // $.gulp.parallel('sass', 'scripts:lib', 'scripts'),
    $.gulp.parallel('watch', 'server')
));