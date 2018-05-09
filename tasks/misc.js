import del from 'del';
import gulp from 'gulp';
import path from 'path';
import changed from 'gulp-changed';

import { paths, copyGlob } from './config';

export const DEL = path => del.bind(null, path);

export function copy() {
  return gulp.src(copyGlob, { dot: true })
      .pipe(changed(paths.dest.root))
      .pipe(gulp.dest(paths.dest.root))
}
