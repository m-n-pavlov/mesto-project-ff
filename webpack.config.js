// `webpack.config.js` - главный конфигурационный файл Webpack

// Подключение необходимых модулей Node.js:
const path = require('path'); // модуль для работы с путями файловой системы
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин для работы с HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин для очистки папки сборки
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для извлечения CSS в отдельные файлы

// Основной объект конфигурации Webpack:
module.exports = {

  // Точка входа в приложение:
  entry: {
    main: './src/index.js' // ✅ главный JS-файл, с которого начинается сборка
  },

  // Настройки выходных файлов:
  output: {
    path: path.resolve(__dirname, 'dist'), // путь для выходных файлов (папка dist)
    filename: 'main.js', // имя основного выходного JS-файла
    publicPath: '', // базовый путь для всех ресурсов (пустая строка - относительные пути)
  },

  // Режим сборки:
  mode: 'development', // режим разработки (включает source maps и не минифицирует код)

  // Настройки dev-сервера:
  devServer: {
    static: path.resolve(__dirname, './dist'), // папка для статических файлов
    open: true, // автоматически открывать браузер при запуске
    compress: true, // включить gzip-сжатие
    port: 8080 // порт для dev-сервера
  },

  // Настройки модулей и правил обработки файлов:
  module: {
    rules: [
      // Правило для обработки JavaScript-файлов:
      {
        test: /\.js$/, // регулярное выражение для файлов .js
        use: 'babel-loader', // использовать babel-loader для транспиляции
        exclude: '/node_modules/' // исключить папку node_modules
      },
      // Правило для обработки статических файлов:
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярка для изображений и шрифтов
        type: 'asset/resource', // позволяет переносить исходные файлы в конечную сборку в том же формате, встроенный тип ресурса (Webpack 5+)
      },
      // Правило для обработки CSS-файлов:
      {
        test: /\.css$/, // регулярка для файлов .css
        use: [
          MiniCssExtractPlugin.loader, // извлекает CSS в отдельные файлы
          { loader: 'css-loader', // преобразует CSS в CommonJS
            options: { importLoaders: 1 } // указывает, сколько загрузчиков нужно применить до css-loader
          },
          'postcss-loader' // обработка PostCSS (автопрефиксы и другие плагины)
        ]
      },
    ]
  },

  // Массив используемых плагинов:
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }), // ✅ использовать указанный HTML-файл как шаблон
    new CleanWebpackPlugin(), // очищает папку dist перед каждой сборкой
    new MiniCssExtractPlugin(), // извлекает CSS в отдельные файлы
  ]
}