"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    browsersync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

var paths = {
    styles: {
        src: "app/scss/**/*.scss",
        dest: "dist/css"
    },
    images: {
        src: "app/images/*.+(png|jpg|jpeg|gif|svg)",
        dest: "dist/images"
    },
    scripts: {
        src: "app/js/*.js",
        dest: "dist/js"
    },
    pages: {
        src: "app/*.html",
        dest: "dist"
    }
};

sass.compiler = require('node-sass');

// Cleanup
function clean() {
    return del(['dist/**', '!dist']);
}

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        port: 3000
    });
    done();
}

// Styles
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

// Images
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Lint scripts
function scriptsLint() {
    return gulp
        .src([paths.scripts.src, "./gulpfile.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Scripts
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browsersync.stream());
};

// Gulp task to minify HTML files
function pages() {
    return gulp.src(paths.pages.src)
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest(paths.pages.dest));
}
  
// Watch files
function watchFiles() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, gulp.series(scriptsLint, scripts));
    gulp.watch(paths.pages.src, pages);
    gulp.watch(
        [
            paths.pages.src,
            paths.scripts.src,
            paths.styles.src
        ],
        browserSyncReload
    );
    gulp.watch(paths.images.src, images);
    
}
  
// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(styles, images, js, pages));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// export tasks
exports.pages = pages;
exports.images = images;
exports.styles = styles;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.clean = clean;
