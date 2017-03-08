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

gulp.task('external', function (done) {
    gulp.src('src/external/**/*')
        .pipe(gulp.dest(distPath));

    browserSync.reload();
    done();
});

gulp.task('templates', function (done) {
    gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync('src/pug/data/base.json'));
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(distPath));

    done();
});

gulp.task('rebuildTemplates', ['templates'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('styles', function (done) {
    gulp.src("src/scss/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(distPath + '/css'))
        .pipe(browserSync.stream());

    done();
});

gulp.task('scripts', function (done) {
    done();
});

gulp.task('browser-sync', function (done) {
    browserSync.init({
        server: {
            baseDir: distPath
        },
        notify: false
    });

    done();
});

gulp.task('watch', function (done) {
    gulp.watch('src/pug/**/*', ['rebuildTemplates']);
    gulp.watch('src/external/**/*', ['external']);
    gulp.watch('src/scss/**/*.scss', ['styles']);

    done();
});

gulp.task('default', function (done) {
    runSequence(
        ['templates', 'external', 'styles'],
        ['browser-sync', 'watch'],
        done
    );
});