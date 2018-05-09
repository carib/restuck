import del from 'del';
import gulp from 'gulp';
import process from 'process';

import { styles } from './styles';
import { scripts } from './webpack';
import { server } from './server';

import { copy, DEL } from './misc';
import { paths } from './config';

export const dev   = gulp.series(
                          DEL(paths.dest.root),
                          gulp.parallel(copy, styles),
                          server
                        );
export const css   = gulp.series(DEL(paths.dest.css), styles);
export const js    = gulp.series(DEL(paths.dest.js), scripts);
export const build = gulp.series(
                          DEL([paths.dest.css, paths.dest.js]),
                          styles,
                          scripts
                        );

export default dev;
