const { src, dest } = require('gulp');

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const gulpif = require('gulp-if');

//Обработка JavaScript
const images = () => {
  return src(path.images.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'Images',
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.images.dest))
    .pipe(webp())
    .pipe(dest(path.images.dest))
    .pipe(src(path.images.src))
    .pipe(newer(path.images.dest))
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(dest(path.images.dest));
};

module.exports = images;
