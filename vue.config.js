// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');
// console.log(path.resolve(__dirname, '../src/static'))
// module.exports = {
//     // context: path.join(__dirname, 'app'),
//     // devServer: {
//     //     // This is required for older versions of webpack-dev-server
//     //     // if you use absolute 'to' paths. The path should be an
//     //     // absolute path to your build destination.
//     //     outputPath: path.join(__dirname, 'build')
//     // },

//     plugins: [
//         new CopyWebpackPlugin([{
//             // from: 'from/file.txt'
//             //from: path.resolve(__dirname, '../src/static'),  // 一次性把static 里面的所有文件全部拷贝过来
//            // to: path.resolve(__dirname, '../dist/static/')
//             /* 如果static存在多个文件，就不需要把 static里面的文件一一写出来
//            {
//                             from: path.resolve(__dirname, '../src/static/images'),
//                             to: path.resolve(__dirname, '../dist/static/images')
//                         },
//                         {
//                             from: path.resolve(__dirname, '../src/static/icons'),
//                             to: path.resolve(__dirname, '../dist/static/icons')
//                         },
//                         */
//         }])
//     ]
// }

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
    // chainWebpack: config => {
    //   config.module
    //     .rule('images')
    //       .use('url-loader')
    //         .loader('url-loader')
    //         .tap(options => Object.assign(options, { limit: 1024 }))
    // }
  }