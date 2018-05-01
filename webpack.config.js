//path哪来的，是在nodejs里的
var path = require('path');
//这个插件是用来将HTML移到打包目录下
const HtmlWebpackPlugin = require('html-webpack-plugin');
//抽离CSS
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin")

module.exports = {
  // entry:'./src/index.js',	//入口文件 配置一个

  //入口文件 配置多个
  entry: {
    build: './src/index.js', // MPA(多页面|分块|片打包)
    build2: './src/index2.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),//出口路径，要是一个绝对路径
    publicPath: '/',//基准路径，虚拟路径，webpack-dev-server使用的
    // filename:'./js/build.js' 一个出口
    filename: 'js/[name].js' //多出口
  },
  mode: 'development',//区别环境  开发development  生产production
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },//这个顺序很重要
      { 
        test: /\.css$/, 
        use: ExtractTextWebapckPlugin.extract({
          use: 'css-loader'
        }) //不再需要style-loader 
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/, //排除
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']//那个es2015已弃用
          }
        }]
      },
      {
        test:/\.(png|jpe?g|gif|eot)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images/', //5000意思大于5M,存到images，反之，转化成base64
          }
        }]
      }
    ]
  },
  /* devServer: {//和module同级。在pakeage.json里面可以直接配
    port: 8001,//打开端口
    open:true,//自动打开
    hot:true//热重载
  } */
  // devtool:'source-map',
  resolve: {
    extensions: ['.js', '.css', '.json', '.jsx', '.jpg']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',//默认到output目录
      hash: true,//防止缓存,也就是版本监听，会给文件后面加入hash
       /*minify: {
        removeAttributeQuotes: true//压缩HTML 去掉引号，暂时不用压缩。
      } */
    }),
    new ExtractTextWebapckPlugin('css/[name][hash:6].css')
  ]
}