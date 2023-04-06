const path = require('path') // импортируем переменную для получения текущего пути
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production' // создали переменные дял определения режима сборки dev/prod, для них доустановили пакет cross-env
const isDev = !isProd
// привязали переменные к поляем start и build в package json
// "start": "cross-env NODE_ENV=development webpack",
// "build": "cross-env NODE_ENV=production webpack --mode production"

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
        }
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'), // контекст позволяет определить директорию с исходниками
    mode: 'development', // режим разработки
    entry: './index.js', // входной файл
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'), 
        clean: true, // данное поле в значении true очищает папку dist от старых файлов после очередной сборки
    },
    resolve: {
        extensions: ['.js'], // определяем расширения по умолчанию, чтобы не дописывать их при импорте
        alias: { // функция позволяющая привязать к определенному символу определенный путь
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false, // добавляем sourcemap в режиме разработки
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({ // плагин позволяющий собирать html файл
            template: 'index.html',
            minify: { // минифицируем сборку html
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({ // плагин позволяющий копировать определенные файлы или папки в папку со сброкой
            patterns: [
              { from: path.resolve(__dirname, 'src/favicon.ico'), // в нашем случае копируем favicon
                to: path.resolve(__dirname, 'dist')
              },
            ],
          }),
          new MiniCssExtractPlugin({ // плагин позволяющий собирать css файл
            filename: filename('css')
          }),
          new webpack.DefinePlugin({ // плагин делает доступной переменную состояния сборки
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i, // модуль позволяющий подключать sass scss файлы к js файлу, нужен потому что вебпак не понимает css
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.m?js$/, // babel, позволяет переводить код из новых стандартов в старые для поддержки старых браузеров
            exclude: /node_modules/,
            use: jsLoaders()
          }
        ],
       },
}