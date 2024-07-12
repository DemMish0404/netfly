const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}
function fonts() {
  // переносим все изображения из папки с исходниками в папку с проектом приемлемым для браузера
  return gulp.src('src/fonts/**/*.{css,scss,ttf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts')).pipe(browserSync.reload({ stream: true }));
}
function videos() {
  // переносим все изображения из папки с исходниками в папку с проектом приемлемым для браузера
  return gulp.src('src/videos/**/*.{mp4,avi,wmv,mov,flv,mkv,webm,3gp}')
    .pipe(gulp.dest('dist/videos')).pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*.{css,scss,ttf,woff,woff2}'], fonts);
  gulp.watch(['src/videos/**/*.{mp4,avi,wmv,mov,flv,mkv,webm,3gp}'], videos);
}

const build = gulp.series(clean, gulp.parallel(html, css, images,fonts,videos));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean;
exports.fonts = fonts;
exports.videos = videos;

exports.build = build;
exports.watchapp = watchapp;


// Чтобы стало совсем хорошо, можете добавить в конец gulpfile.js строчку
exports.default = watchapp;
// Теперь функция watchapp будет вызываться из терминала просто по команде gulp

