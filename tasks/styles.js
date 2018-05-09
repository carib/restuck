import gulp from 'gulp';
import sass from 'gulp-sass';
import prefixer from 'gulp-autoprefixer';
import bs from 'browser-sync';

import { paths } from './config'

const isProduction = (process.env.NODE_ENV === 'production');

export function styles() {
  let stylesTask = gulp.src(`${paths.site.css}/main.scss`)
        .pipe(sass())

  if (isProduction) stylesTask = stylesTask.pipe(prefixer())

  return stylesTask
        .pipe(bs.stream())
        .pipe(gulp.dest(paths.dest.css))
}
