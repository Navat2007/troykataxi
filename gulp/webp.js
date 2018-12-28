/*ЭТИМ ФАЙЛОМ МЫ КОНВЕРТИРУЕМ В WEBP*/
const imagemin = require('gulp/imagemin');
const imageminWebp = require('imagemin-webp');

var img_array = [
    "src/img/*.*",
    "src/img/bg/webp/*.*",
    "src/img/cars/webp/*.*",
    "src/img/cars/mini/webp/*.*",
    "src/img/icons/webp/*.*",
    "src/img/pictures/webp/*.*",
];
var output_array = [
    "img/webp/",
    "img/bg/webp/",
    "img/cars/webp/",
    "img/cars/mini/webp/",
    "img/icons/webp/",
    "img/pictures/webp/",
];

img_array.forEach(function (item, i, array) {
    imagemin([img_array[i]], output_array[i], {
        use: [
            imageminWebp({quality: 50})
        ]
    }).then(() => {
        console.log('Images ' + i + ' optimized');
    });
});


