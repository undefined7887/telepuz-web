const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let distPath = path.join(__dirname, 'dist');

module.exports = {
  // Определяем режим сборки
  mode: process.env.BUILD_MODE,

  // Определяем путь главного входного файла
  entry: './src/index.js',

  // Определяем путь главного выходного файла
  output: {
    path: distPath,
    filename: 'index.js',
  },

  module: {
    rules: [
      // Все файлы с разрешениями '.js' или '.jsx' будет обрабатывать 'babel-loader'
      {
        test: /\.js$/,
        use: ['babel-loader']
      },

      // Все файлы с разрешениями '.css' будут обрабатывать 'css-loader' и 'style-loader'
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },

      // Файлы с разрешениями '.woff' '.woff2' '.eof' '.ttf' '.otf' будет обрабатывать 'file-loader'
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
    ]
  },

  // Включаем обработку главного html файла
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // Настройка dev-сервера
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 8080
  }
};