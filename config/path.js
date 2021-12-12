const json = require('../package.json');

const pathSrc = './src';
const pathDest = `./${json.name}`;

module.exports = {
  root: pathDest,

  html: {
    src: pathSrc + '/html/*.html',
    watch: pathSrc + '/html/**/*.html',
    dest: pathDest,
  },

  pug: {
    src: pathSrc + '/pug/*.pug',
    watch: pathSrc + '/pug/**/*.pug',
    dest: pathDest,
  },
  css: {
    src: pathSrc + '/assets/css/*.css',
    watch: pathSrc + '/assets/css/**/*.css',
    dest: pathDest + '/assets/css',
  },
  scss: {
    src: pathSrc + '/assets/scss/*.{scss,sass}',
    watch: pathSrc + '/assets/scss/**/*.{scss,sass}',
    dest: pathDest + '/assets/css',
  },
  js: {
    src: pathSrc + '/assets/js/*.js',
    watch: pathSrc + '/assets/js/**/*.js',
    dest: pathDest + '/assets/js',
  },
  images: {
    src: pathSrc + '/assets/images/**/*.{png,jpg,jpeg,gif,svg}',
    watch: pathSrc + '/assets/images/**/*.{png,jpg,jpeg,gif,svg}',
    dest: pathDest + '/assets/images',
  },
  fonts: {
    src: pathSrc + '/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    watch: pathSrc + '/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    dest: pathDest + '/assets/fonts',
  },
};
//Именование проекта и настройка папок
const path = require('path');
const settings = {
  project_name: json.name,
  project_dir: path.resolve(__dirname, json.name),
  public_dir: `./${json.name}`,
};
