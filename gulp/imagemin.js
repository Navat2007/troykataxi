/*ЭТИМ ФАЙЛОМ МЫ СЖИМАЕМ ИЗОБРАЖЕНИЯ */

const imagemin = require('gulp/imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

var png_array = [
    "src/img/*.png",
    "img/bg/sm/*.png",
    "img/bg/md/*.png",
    "img/bg/lg/*.png",
    "img/bg/xl/*.png",
    "img/cars/sm/*.png",
    "img/cars/md/*.png",
    "img/cars/lg/*.png",
    "img/cars/xl/*.png",
    "img/cars/mini/*.png",
    "img/icons/*.png",
    "img/pictures/*.png"
];
var jpg_array = [
    "src/img/*.jpg",
    "img/bg/sm/*.jpg",
    "img/bg/md/*.jpg",
    "img/bg/lg/*.jpg",
    "img/bg/xl/*.jpg",
    "img/cars/sm/*.png",
    "img/cars/md/*.png",
    "img/cars/lg/*.png",
    "img/cars/xl/*.png",
    "img/cars/mini/*.png",
    "img/icons/*.jpg",
    "img/pictures/*.jpg"
];
var output_array = [
    "img/",
    "img/bg/sm/",
    "img/bg/md/",
    "img/bg/lg/",
    "img/bg/xl/",
    "img/cars/sm/",
    "img/cars/md/",
    "img/cars/lg/",
    "img/cars/xl/",
    "img/cars/mini/",
    "img/icons/",
    "img/pictures/"
];

png_array.forEach(function (item, i, array) {
    imagemin([png_array[i]], output_array[i], {
        plugins: [
            imageminPngquant({quality: '65-80'})
        ],
    }).then(() => {
        console.log('png ' + i + ' optimized');
    });
});

jpg_array.forEach(function (item, i, array) {
    imagemin([jpg_array[i]], output_array[i], {
        plugins: [
            imageminMozjpeg({
                quality: 70,
            }),
        ],
    }).then(() => {
        console.log('jpg ' + i + ' optimized');
    });
});