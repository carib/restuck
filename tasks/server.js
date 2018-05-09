import del from 'del';
import gulp from 'gulp';
import bs from 'browser-sync';
import webpack from 'webpack';
import wpDevMW from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

import { styles } from './styles';
import { copy } from './misc';

import { config as webpackConfig } from './webpack';
import { paths, copyGlob } from './config';

const browser = bs.create();
const bundler = webpack(webpackConfig);

export function server() {

  let middleware = [
    wpDevMW(bundler, { stats: webpackConfig.stats })
  ]

  let config = {
    open: false,
    proxy: false,
    files: [
      paths.dest.css + '/*.css',
    ],
    server: paths.dest.root,
    middleware,
  }

  browser.init(config)

  gulp.watch(`${paths.site.css}/**/*.scss`, styles)

  gulp.watch(`${paths.site.root}/*.html`).on('change', () => browser.reload())

  gulp.watch(`${paths.site.js}/**/*.js`).on('change', () => browser.reload())

  gulp.watch(copyGlob, copy)
      .on('change', path => browser.reload(path))
      .on('unlink', path => {
        del(path.replace(paths.site.root, paths.dest.root))
        browser.reload()
      })
}
