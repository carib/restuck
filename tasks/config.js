// const proxy =

const paths = {
        site: {
              root: 'site',
              js: 'site/js',
              css: 'site/scss',
        },
        dest: {
              root: 'docs',
              js: 'docs/js',
              css: 'docs/css',
        }
}

const copyGlob = [
  `${paths.site.root}/**`,
  `!${paths.site.js}/**`,
  `!${paths.site.css}`, `!${paths.site.css}/**`,
]

module.exports = {
        paths, copyGlob
}
