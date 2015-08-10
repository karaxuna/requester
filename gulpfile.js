var gulp = require('gulp'),
    shell = require('gulp-shell'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    path = require('path'),
    fs = require('fs'),
    config = require('./config'),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    useref = require('gulp-useref');

gulp.task('build-ngpack', function () {
    return gulp.src('').pipe(shell('ngpack build'));
});

gulp.task('watch-ngpack', ['build-ngpack'], function () {
    var moduleJSFilesPath = path.join(config.publicPath, 'modules', './**/*.js');

    watch([moduleJSFilesPath, 'ngpack.json'], function () {
        gulp.start('build-ngpack');
    });
});

gulp.task('move-ngpack-html', function () {
    var moduleHTMLBasePath = path.join(config.publicPath, 'modules');
        moduleHTMLFilesPath = path.join(moduleHTMLBasePath, './**/*.html');

    return gulp
        .src(moduleHTMLFilesPath, { base: config.publicPath })
        .pipe(gulp.dest(config.buildPath));
});

gulp.task('move-shared', function () {
    return gulp.src('./shared/**', { base: './shared' })
        .pipe(gulp.dest(path.join(config.publicPath, 'shared_components')));
});

gulp.task('watch-shared', ['move-shared'], function () {
    watch(['./shared/**/*.js'], function () {
        gulp.start('move-shared');
    });
});

gulp.task('start-server', function () {
    return nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['node_modules/*', 'uis/*'],
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('install-bower-packages', function () {
    return gulp.src('').pipe(shell('bower install --allow-root'));
});

gulp.task('start', [
    'install-bower-packages',
    'watch-ngpack',
    'watch-shared',
    'start-server'
], function () {
    
});

// build
gulp.task('build-html-assets', ['install-bower-packages', 'build-ngpack', 'move-shared'], function () {
    var assets = useref.assets();
    
    return gulp.src(path.join(config.publicPath, 'index.html'))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({
            keepSpecialComments: 0
        })))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.buildPath)); 
});

gulp.task('move-custom-fonts', function () {
    return gulp.src(path.join(config.publicPath, 'fonts/**'))
        .pipe(gulp.dest(path.join(config.buildPath, 'fonts'))); 
});

gulp.task('move-images', function () {
    return gulp.src(path.join(config.publicPath, 'img/**'))
        .pipe(gulp.dest(path.join(config.buildPath, 'img')));
});

gulp.task('build', [
    'build-html-assets',
    'move-ngpack-html',
    'move-custom-fonts',
    'move-images'
], function (){

});