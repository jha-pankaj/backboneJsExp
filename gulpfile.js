const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const clean = require('gulp-clean');

// File paths
const paths = {
    scripts: {
        src: 'src/app.js',  // Entry point for your app
        dest: 'dist/js',
        all: 'src/**/*.js' 
    },
    html: {
        src: 'src/index.html',
        dest: 'dist/'
    }
};

// Task to copy HTML to dist
gulp.task('copy-html', function () {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest)); // Copy index.html to dist folder
});

// Task to bundle, transpile, minify and copy JS
gulp.task('scripts', function () {
    return browserify({
        entries: paths.scripts.src,  // Entry point for your app
        debug: true
    })
        .transform(babelify, { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('bundle.js'))  // Output to bundle.js
        .pipe(buffer())  // Convert from stream to buffer
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())  // Minify the JS
        .pipe(sourcemaps.write('./'))  // Write sourcemaps
        .pipe(gulp.dest(paths.scripts.dest));  // Save to the dist/js folder
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(paths.scripts.all, gulp.series('scripts'));  // Watch app scripts
    gulp.watch(paths.html.src, gulp.series('copy-html'));  // Watch index.html
});

// Task to clean the dist folder before build
gulp.task('clean', function () {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

// Default task to run everything
gulp.task('default', gulp.series('clean', 'copy-html', 'scripts', 'watch'));
