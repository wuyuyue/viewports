const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackLocalCachePlugin = require('./../portal/lib/html-webpack-local-cache-plugin');

//console.log(HtmlWebpackLocalCachePlugin,"HtmlWebpackLocalCachePlugin");

module.exports = {
  entry: {
    bundle: path.join(path.resolve(__dirname), 'ui/index_portal.jsx'),
  },
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.jsx$/,
        use: ['babel-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
          test: /\.(styl|css)$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },{
              loader: "stylus-loader"
            }],
          })
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'ui',
      'node_modules',
    ],
  },
  mode: 'production',
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: "bundle.min.css",
      allChunks: true
    }),

    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     warnings: false,
    //     output: {
    //       comments: false,
    //       beautify: false,
    //     }
    //   }
    // }),
    // new webpack.DefinePlugin({
    //   'argv.env': JSON.stringify('production'),
    // }),
    new HtmlWebpackPlugin({
      template: 'portal/lib/index.html',
      minify: true,
      hash: true,
      filename: 'index.html',
    }),
    new HtmlWebpackLocalCachePlugin({
      // cachePrefix:'',
      cacheSource: '(bundle\..*\.js)', // 通过正则校验需要缓存的文件
     // cacheEnsure: false, // 是否连ensure异步加载的js也缓存，默认false
      cssSync: true, // 是否使用document.write的方式加载，false则用xhr加载css，默认是false
      jsSync: true // 是否使用document.write的方式加载，false则用xhr加载js，默认是false
    })
  ],
  output: {
    path: path.join(path.resolve(__dirname), '../portal/'),
    filename: 'bundle.min.js',
  }
};
