const del = require('del');

//Конфигурация
const path = require('../config/path.js');

//Очистка директории
const clear = () => {
  return del(['./b2b/*.html', './b2b/assets/css', './b2b/assets/js']);
};

module.exports = clear;
