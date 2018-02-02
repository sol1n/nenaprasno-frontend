var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function() {
    return gulp.src('./less/style.less')
        .pipe(sourcemaps.init())
            .pipe(less().on('error', function(err) {
                console.log(err);
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cssmin().on('error', function(err) {
                console.log(err);
            }))
            .pipe(rename({
                suffix: '.min'
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
});

gulp.task('profilaktika-media-less', function() {
    return gulp.src('./less/sites/profilaktika-media/style.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(err) {
            console.log(err);
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin().on('error', function(err) {
            console.log(err);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/profilaktika-media'));
});

var jsFiles = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bxslider/dist/jquery.bxslider.js',
        './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        './node_modules/jquery-mask-plugin/dist/jquery.mask.js',
        './node_modules/flatpickr/dist/flatpickr.js',
        './node_modules/flatpickr/dist/l10n/ru.js',
        './node_modules/tippy.js/dist/tippy.js',
        './js/components/**/*.js',
        './js/scripts.js'
    ],
    jsDest = './build';

var profilaktikaMediajsFiles = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/inputmask//dist/jquery.inputmask.bundle.js',
        './js/sites/profilaktika-media/components/**/*.js',
        './js/sites/profilaktika-media/scripts.js'
    ],
    profilaktikaMediajsDest = './build/profilaktika-media';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(rename('scripts.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDest));
});

gulp.task('profilaktika-media-scripts', function() {
    return gulp.src(profilaktikaMediajsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(profilaktikaMediajsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(profilaktikaMediajsDest));
});

gulp.task('default', ['less', 'profilaktika-media-less', 'scripts', 'profilaktika-media-scripts'], function() {
    gulp.watch('./less/**/*.less', ['less', 'profilaktika-media-less']);
    gulp.watch('./js/**/*.js', ['scripts', 'profilaktika-media-scripts']);
});