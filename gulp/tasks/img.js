module.exports = function () {

    $.gp.imagemin.mozjpeg = require('imagemin-mozjpeg');
    $.gp.imagemin.pngquant = require('imagemin-pngquant');
    $.gp.imagemin.webp = require('imagemin-webp');

    $.gulp.task('img:big', function (done) {
        var imgFolder = [
            'img/bg'
        ];
        var imgSrc = [
            'src/img/bg/*.*'
        ];
        var imgSize = [
            576,
            768,
            992,
            1200
        ];
        var imgOutput = [
            '/sm',
            '/md',
            '/lg',
            '/xl',
        ];
        imgFolder.forEach(function (itemX, x, arrayX) {
            imgSize.forEach(function (itemY, y, arrayY) {
                $.gulp.src(imgSrc[x])
                    .pipe($.gp.responsive({
                        '*': [{
                            width: imgSize[y],
                            rename: {
                                extname: '.jpg',
                            },
                            format: 'jpeg'
                        }, {
                            width: imgSize[y] * 2,
                            rename: {
                                suffix: '_@2x',
                                extname: '.jpg',
                            },
                            format: 'jpeg',
                        }],
                    }, {
                        progressive: true,
                        withMetadata: false,
                        errorOnEnlargement: false,
                    }))
                    .pipe($.gp.imagemin([
                        $.gp.imagemin.gifsicle({interlaced: true}),
                        $.gp.imagemin.jpegtran({progressive: true}),
                        $.gp.imagemin.mozjpeg({
                            progressive: true,
                            quality: 70,
                        }),
                        $.gp.imagemin.optipng({optimizationLevel: 5}),
                        $.gp.imagemin.pngquant({quality: '65-80'}),
                        $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                    ]))
                    .pipe($.gulp.dest(imgFolder[x] + imgOutput[y]));
            });
            done();
        })
    });

    $.gulp.task('img:png', function (done) {
        var imgFolder = [
            'img/icons',
            'img/pictures',
        ];
        var imgSrc = [
            'src/img/icons/*.{png, tif}',
            'src/img/pictures/*.{png, tif}',
        ];
        var imgSize = [
            60,
            200,
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        width: imgSize[i],
                        rename: {extname: '.png'},
                        format: 'png'
                    }, {
                        width: imgSize[i] * 2,
                        rename: {
                            suffix: '_@2x',
                            extname: '.png',
                        },
                        format: 'png',
                        withoutEnlargement: true,
                    }],
                }, {
                    progressive: true,
                    withMetadata: false,
                    errorOnEnlargement: false,
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.gifsicle({interlaced: true}),
                    $.gp.imagemin.jpegtran({progressive: true}),
                    $.gp.imagemin.mozjpeg({
                        progressive: true,
                        quality: 70,
                    }),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                    $.gp.imagemin.pngquant({quality: '65-80'}),
                    $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe($.gulp.dest(imgFolder[i]));
            done();
        })
    });

    $.gulp.task('img:noresize-png', function (done) {
        var imgFolder = [
            'img/',
            'автотур/img/',
        ];
        var imgSrc = [
            'src/img/*.{png, tif}',
            'src/автотур/img/*.{png, tif}',
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        rename: {extname: '.png'},
                        format: 'png'
                    }],
                }, {
                    progressive: true,
                    withMetadata: false,
                    errorOnEnlargement: false,
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.gifsicle({interlaced: true}),
                    $.gp.imagemin.jpegtran({progressive: true}),
                    $.gp.imagemin.mozjpeg({
                        progressive: true,
                        quality: 70,
                    }),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                    $.gp.imagemin.pngquant({quality: '65-80'}),
                    $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe($.gulp.dest(imgFolder[i]));
            done();
        })
    });

    $.gulp.task('img:jpg', function (done) {
        var imgFolder = [
            'img/cars/mini',
        ];
        var imgSrc = [
            'src/img/cars/*.{jpg, jpeg}',
        ];
        var imgSize = [
            400,
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        width: imgSize[i],
                        rename: {extname: '.jpg'},
                        format: 'jpeg',
                    }, {
                        width: imgSize[i] * 2,
                        rename: {
                            suffix: '_@2x',
                            extname: '.jpg',
                        },
                        format: 'jpeg',
                        withoutEnlargement: true,
                    }],
                }, {
                    progressive: true,
                    withMetadata: false,
                    errorOnEnlargement: false,
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.gifsicle({interlaced: true}),
                    $.gp.imagemin.jpegtran({progressive: true}),
                    $.gp.imagemin.mozjpeg({
                        progressive: true,
                        quality: 70,
                    }),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                    $.gp.imagemin.pngquant({quality: '65-80'}),
                    $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe($.gulp.dest(imgFolder[i]));
            done();
        })
    });

    $.gulp.task('img:noresize-jpg', function (done) {
        var imgFolder = [
            'img/',
            'автотур/img/',
        ];
        var imgSrc = [
            'src/img/*.{jpg, jpeg}',
            'src/автотур/img/*.{jpg, jpeg}',
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        rename: {extname: '.jpg'},
                        format: 'jpeg',
                    }],
                }, {
                    progressive: true,
                    withMetadata: false,
                    errorOnEnlargement: false,
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.gifsicle({interlaced: true}),
                    $.gp.imagemin.jpegtran({progressive: true}),
                    $.gp.imagemin.mozjpeg({
                        progressive: true,
                        quality: 70,
                    }),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                    $.gp.imagemin.pngquant({quality: '65-80'}),
                    $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe($.gulp.dest(imgFolder[i]));
            done();
        })
    });

    $.gulp.task('webp', function (done) {
        var imgFolder = [
            'img/bg',
            'img/cars/mini',
        ];
        var imgSrc = [
            'src/img/bg/*.*',
            'src/img/cars/*.*',
        ];
        var imgSize = [
            2400,
            800,
        ];
        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        width: imgSize[i],
                        rename: {
                            extname: '.webp',
                        },
                    }],
                }, {
                    // Global configuration for all images
                    // The output quality for JPEG, WebP and TIFF output formats
                    quality: 50,
                    // Use progressive (interlace) scan for JPEG and PNG output
                    progressive: true,
                    // Strip all metadata
                    withMetadata: false,
                    // Do not emit the error when image is enlarged.
                    errorOnEnlargement: false
                }))
                .pipe($.gulp.dest(imgFolder[i] + '/webp/'));
            done();
        })
    });

    $.gulp.task('webp:noresize', function (done) {
        var imgFolder = [
            'img/',
            'автотур/img',
        ];
        var imgSrc = [
            'src/img/*.*',
            'src/автотур/img/*.*',
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.responsive({
                    '*': [{
                        rename: {extname: '.webp'},
                    }],
                }, {
                    // Global configuration for all images
                    // The output quality for JPEG, WebP and TIFF output formats
                    quality: 50,
                    // Use progressive (interlace) scan for JPEG and PNG output
                    progressive: true,
                    // Strip all metadata
                    withMetadata: false,
                    // Do not emit the error when image is enlarged.
                    errorOnEnlargement: false
                }))
                .pipe($.gulp.dest(imgFolder[i] + '/webp/'));
            done();
        })
    });

    $.gulp.task('img:svg', function (done) {
        var imgFolder = [
            'img/svg/'
        ];
        var imgSrc = [
            'src/img/svg/*.svg'
        ];

        imgFolder.forEach(function (item, i, array) {
            $.gulp.src(imgSrc[i])
                .pipe($.gp.imagemin([
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                    $.gp.imagemin.pngquant({quality: '65-80'}),
                    $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
                ]))
                .pipe($.gulp.dest(imgFolder[i]));
            done();
        })
    });
};