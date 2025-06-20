// postcss.config.js - файл для настроек PostCSS

const autoprefixer = require('autoprefixer'); // подключение плагина autoprefixer для PostCSS, учит PostCSS добавлять вендорные префиксы
const cssnano = require('cssnano'); // подключение плагина cssnano для PostCSS, учит PostCSS минифицировать CSS-код

// экспорт конфигурации:
module.exports = {
  plugins: [
    autoprefixer, // подключение плагина autoprefixer
    cssnano({ preset: 'default' }) // подключение плагина cssnano, дополнительно передаем объект опций { preset: default } который говорит о том, что нужно использовать стандартные настройки минификации
  ]
};
