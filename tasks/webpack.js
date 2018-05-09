import path from 'path';
import webpack from 'webpack';
import process from 'process';

import { paths } from './config';

const isProduction = (process.env.NODE_ENV === 'production')

let config = {
  mode: 'development',
  entry: {
    main: [
      './js/main.js',
      // 'webpack/hot/dev-server',  // Remove for production
      // 'webpack-hot-middleware/client'  // Remove for production
    ]
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, '../', paths.dest.root)
  },
  context: path.resolve(__dirname, '../' + paths.site.root),
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.join(__dirname, '..', paths.site.js)
    }
  },
  stats: 'errors-only',
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [ ['env', { 'modules': false }] ]
      }
    }]
  }
  // plugins: isProduction ? [ new webpack.HotModuleReplacementPlugin() ] : []
}

function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err)

    console.log(stats.toString({
      assets: false,
      hash: false,
      timings: false,
      version: false,
      chunkModules: false,
    }),

    resolve(),

  )}))
}

module.exports = { config, scripts }
