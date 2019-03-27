const  path           = require("path");
const  autoprefixer   = require('autoprefixer');
const  extractCss     = require("mini-css-extract-plugin");
const  optimizeCss    = require("optimize-css-assets-webpack-plugin");
const  uglifyjs       = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: "main-[hash].js",
    path: path.resolve(__dirname, './dist')
  },
  module: {
    noParse: /jquert!lodash/,
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          extractCss.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                autoprefixer({
                  browsers: ['> 0.15% in CN']
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new htmlWebpackPlugin({
      // title: 'huahua webpack',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html')
    }),
    new extractCss({
      filename: '[name].[hash:8].css',// 每次build会有一个hash值，是一样的
      chunkFilename: '[id].[hash:8].css'
    })
  ],
  optimization :{
    minimizer: [
      new optimizeCss({}),
      new uglifyjs({
        cache: true,
        parallel: true,
        // sourceMap: true
      })
    ]
  }
}


module.exports = config;