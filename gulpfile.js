const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

//Конфигурация
const path = require('./config/path.js');
const app = require('./config/app.js');

//Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

//Задачи
const clear = require('./task/clear.js');
const html = require('./task/html.js');
const pug = require('./task/pug.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const images = require('./task/images.js');
const fonts = require('./task/fonts.js');

//Наблюдение
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.images.watch, images).on('all', browserSync.reload);
  watch(path.fonts.watch, fonts).on('all', browserSync.reload);
};
const watcher_pug = () => {
  watch(path.pug.watch, pug).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.images.watch, images).on('all', browserSync.reload);
  watch(path.fonts.watch, fonts).on('all', browserSync.reload);
};

const build = (clear, parallel(html, scss, js, images, fonts));
const dev = series(build, parallel(watcher, server));

//Задачи
exports.html = html;
exports.pug = pug;
exports.js = js;
exports.images = images;
exports.fonts = fonts;

//Сборки
exports.dev = dev;
exports.build = build;

//Сборка для HTML
exports.default = app.isProd ? build : dev;

//Сборка для Pug
exports.devpug = series(
  clear,
  parallel(pug, scss, js, images /*, fonts*/),
  parallel(watcher_pug, server)
);
console.log(process.argv);
