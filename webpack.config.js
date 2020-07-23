const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let buildPath = path.join(__dirname, 'build');

module.exports = {
    // Определяем режим сборки
    mode: process.env.BUILD_MODE,

    // Определяем путь главного входного файла
    entry: "./src/index.tsx",

    // Определяем путь главного выходного файла
    output: {
        path: buildPath,
        filename: "index.js",
    },

    // Говорим webpack какие пути мы будем обрабатывать
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    module: {
        rules: [
            // Все файлы с разрешениями '.ts' или '.tsx' будет обрабатывать 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },

            // Все файлы с разрешениями '.styl' будут обрабатывать 'stylus-loader', 'css-loader' и 'style-loader'
            {
                test: /\.styl$/,
                loader: "style-loader!css-loader!stylus-loader"
            }
        ]
    },

    // Включаем обработку главного html файла
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ],

    // Настройка dev-сервера
    devServer: {
        contentBase: buildPath,
        compress: true,
        port: 8080
    }
};