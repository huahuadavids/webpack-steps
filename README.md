## webpack


### 模块化 
> 开始是使用命名空间，后来是commonjs，


### webpack 功能
- 代码转换
- 文件优化
- 代码分割
- 文件合并
- 自动刷新
- 代码校验
- 自动发布 

### 安装
> 新版本要安装 webpack-cli 
```
npm i webpack webpack-cli -D 
```

### note
-  webpack 
> (amd cmd esm commonjs)
-  npx 局部执行包的命令 
> 回去找对应包的 一个cmd文件，eg webpack下的webpack.md 
-  打包
> npx webpack --mode=production 
- 配置
> 必须用commonjs 规范，

### SPA 多入口用数组
```
// 多文件 打包为一个dist 用数组 
// entry: ['./src/index.js', "./src/util.js"],
```

### 多页面打包
```
 // 入口 
 entry: {
        index: './src/index.js',
        util: './src/util.js',
 },

//  出口 
output: {
    filename: "[name]-[hash:10].js",
    // this must be absolute path
    path: path.resolve(__dirname, "./build")
},

new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'a.html',
    title: 'huahuadavids app',
    favicon: './assets/img/favicon.ico',
    // 把生成的js放在哪里，默认就是body下边
    inject: true,
    // 清缓存用, 给 .js 后边 加hash
    hash: true,
    minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    },
    chunks: ['index']
}),

new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'b.html',
    title: 'huahuadavids app',
    favicon: './assets/img/favicon.ico',
    // 把生成的js放在哪里，默认就是body下边
    inject: true,
    // 清缓存用, 给 .js 后边 加hash
    hash: true,
    minify: {
        collapseWhitespace: true
    },
    chunks: ['util']
}),

```
### 分别抽取css和less到不同的文件 

```
const ExtractText = require("extract-text-webpack-plugin"); 
const extraLess =  new ExtractText("css/less.css")
const extraCss =  new ExtractText("css/css.css")

plugins: [
    extraLess,
    extraCss 

]

{
    test: /\.css$/,
    use: extraLess.extract({
        use: [
            {loader: "css-loader"}
        ],
    })
},
{
    test: /\.less$/,
    use: extraCss.extract({
        use: [
            {loader: "css-loader"},
            {loader: "less-loader"}
        ],
    })
},

```
### extract-text-webpack-plugin 插件 提取css到文件中 不自动更新
```
new ExtractText({
    filename: "css/index.css",
    // 禁用 就是禁止抽离样式  
    // 开发的时候设置为true 
    // build时设置为false 
    disable: true  
}),

{
    test: /\.less$/,
    use: ExtractText.extract({
        fallback: 'style-loader',
        use: [
            {loader: "css-loader"},
            {loader: "less-loader"}
        ],
    })
},

```
### 删掉没有用的样式 
```
yarn add purifycss-webpack purify-css glob 


```