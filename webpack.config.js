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

    // Определяем файлы которые мы будем обрабатывать
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
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]_[local]_[hash:base64:5]"
                            },
                        }
                    },
                    "stylus-loader"
                ]
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