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
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                }
            },

            // Все файлы с разрешениями '.css' будет обрабатывать 'css-loader'
            {
                test: /\.css?$/,
                use: {
                    loader: 'css-loader'
                }
            }
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