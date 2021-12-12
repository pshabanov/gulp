const { src, dest } = require('gulp');
// const settings = require('../settings.js');

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const gp = require('gulp-load-plugins')();

//Обработка HTML
const html = () => {
  return src(path.html.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError(error => ({
          title: 'HTML',
          message: error.message,
        })),
      })
    )
    .pipe(gp.fileInclude())
    .pipe(gp.webpHtml())
    .pipe(gp.if(app.isProd, gp.htmlmin(app.htmlmin)))
    .pipe(dest(path.html.dest));
};

module.exports = html;
