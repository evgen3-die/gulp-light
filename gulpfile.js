var gulp = require('gulp'),
    pug = require('gulp-pug'),
    data = require('gulp-data'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    spritesmith = require('gulp.spritesmith'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    fs = require('fs');

var distPath = 'dist';

gulp.task('external', function () {

});

gulp.task('templates', function () {
    return gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync('src/pug/data/base.json'));
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('rebuildTemplates', ['templates'], function () {
    browserSync.reload();
});

gulp.task('styles', function () {

});

gulp.task('scripts', function () {

});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: distPath
        },
        notify: false
    });
});

gulp.task('watch', function () {
    gulp.watch('src/pug/**/*', ['rebuildTemplates']);
});

gulp.task('default', function () {
    return runSequence(
        ['templates'],
        ['browser-sync', 'watch']
    );
});