import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import del from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//JS

const js = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}
//Images

const imgBasic = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const imgWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({encodeOptions: {webp: {}}}))
    .pipe(gulp.dest('build/img'));
}

const imgCopy = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'));
}

//SVG

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

//Copy

const copy = (done) => {
  gulp.src(['source/fonts/*.{woff2,woff}', 'source/*.ico', 'source/*.webmanifest'], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Clean

export const clean =() => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(js));
  gulp.watch('source/*.html'), gulp.series(html, reload);
  // gulp.watch('source/*.html').on('change', browser.reload);
}
//Build

export const build = gulp.series(
  clean,
  copy,
  imgBasic,
  gulp.parallel (
    styles,
    html,
    js,
    svg,
    sprite,
    imgWebp
  )
);

//Default

export default gulp.series(
  clean,
  copy,
  imgCopy,
  gulp.parallel(
    styles,
    html,
    js,
    svg,
    sprite,
    imgWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

// export default gulp.series(html, styles, server, watcher);
