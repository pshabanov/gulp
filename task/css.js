const { src, dest } = require('gulp');

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const gp = require('gulp-load-plugins')();

//Обработка CSS
const css = () => {
  return src(path.css.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError(error => ({
          title: 'CSS',
          message: error.message,
        })),
      })
    )
    .pipe(gp.concat('main.css'))
    .pipe(gp.cssimport())
    .pipe(gp.webpCss())
    .pipe(gp.autoprefixer())
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(gp.rename({ suffix: '.min' }))
    .pipe(gp.csso())
    .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
