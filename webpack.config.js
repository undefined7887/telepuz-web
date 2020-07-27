const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let buildPath = path.join(__dirname, "build");

module.exports = {
    mode: process.env.BUILD_MODE,
    entry: "./src/index.tsx",
    output: {
        path: buildPath,
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            src: path.resolve(__dirname, 'src'),
            components: path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                type: 'text/css'
                            }
                        }
                    },
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
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ],
    devServer: {
        contentBase: buildPath,
        compress: true,
        port: 8080
    }
};