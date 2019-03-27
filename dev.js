const path               = require("path");
const autoprefixer       = require('autoprefixer');
const htmlWebpackPlugin  = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {   
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, './dist')
  }, 
  module: {
    noParse: /jquert!lodash/,
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: ['style-loader',
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
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new htmlWebpackPlugin({
      title: 'huahua webpack',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
}


module.exports = config;