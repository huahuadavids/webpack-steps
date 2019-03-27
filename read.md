1. npx webpack 执行
```
// 指定执行文件 
npx webpack -c config.js

```
2. load css
```
module :{
   rules:[
     {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
     }
   ]
}
yarn add style-loader css-loader --save 

```
3. sass
```
// 解析完sass后，会以style标签的形式插入页面，如果想知道源代码在哪里，需要开启sourceMap，

yarn add node-sass sass-loader --save 

```
4. 添加css前缀 
```
yarn add postcss-loader 
yarn add autoprefixer  
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
  }
```
5. 抽取css到单独文件
```
const  extractCss     = require("mini-css-extract-plugin");
extractCss.loader 替换style-loader

 plugins:[
    new extractCss({
      filename: '[name].[hash:8].css',// 每次build会有一个hash值，是一样的
      chunkFilename: '[id].[hash:8].css'
    })
  ]

```
6. 压缩css/js 
```
const  optimizeCss    = require("optimize-css-assets-webpack-plugin");
const  uglifyjs       = require("uglifyjs-webpack-plugin");
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
```
7. html插件，可以引入打包好的js文件
```
 plugins: [
    new htmlWebpackPlugin({
      title: 'huahua webpack',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
```
8. 清理dist文件夹，在打包之前
```
npm i clean-webpack-plugin --save-dev

new CleanWebpackPlugin(['dist']),
```