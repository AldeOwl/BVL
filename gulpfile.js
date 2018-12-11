const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const env = require('gulp-env');
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');
const nested = require('postcss-nested');
const postcssShort = require('postcss-short');
const assets = require('postcss-assets');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const handlebars = require('gulp-compile-handlebars');
const rename = require("gulp-rename");
const glob = require("glob");
const eslint = require('gulp-eslint');
const styleLint = require('stylelint');
const reporter = require('postcss-reporter');
const filter = require('gulp-filter');

const text = require("./src/test.json");
const jsLint = require("./eslintrc.json");
const cssLint = require("./stylelintrc.json");

const paths = {
    src: {
        dir: 'src',
        styles: 'src/css/**/*css',
        scripts: 'src/scripts/*js'
    },
    build: {
        dir: 'prod',
        styles: 'prod/css/',
        scripts: 'prod/scripts'
    },
    buildNames: {
        styles: 'style.min.css',
        scripts: 'script.min.js'
    },
    lint: {
        scripts: ['**/*.js', '!node_modules/**/*', '!prod/**/*'],
        style: ['**/*.css', '!node_modules/**/*', '!prod/**/*']
        
    },
    templates: 'src/templates/**/*.hbs',
    assets: 'src/**/*.png',
    contextJson: 'src/test.json',
};

env({
    file: '.env',
    type: 'ini',
});

gulp.task('jslint', () => {
    gulp.src(paths.lint.scripts)
        .pipe(eslint(jsLint))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('csslint', () => {
    gulp.src(paths.lint.style)
        .pipe(postcss([
            styleLint(cssLint),
            reporter({
                clearAllMessages: true,
                throwError: true
            })
        ]));
});

gulp.task('lint', ['jslint', 'csslint']);


gulp.task('compile', () => {
    glob(paths.templates, (err, files) => {
        if (!err) {
            const option = {
                ignorePartials: true,
                batch: files.map(item => item.slice(0, item.lastIndexOf('/'))),
                helpers: {
                    
                }
            };

            return gulp.src(`${paths.src.dir}/index.hbs`)
            .pipe(handlebars(text, option))
            .pipe(rename('index.html'))
            .pipe(gulp.dest(paths.build.dir));
        }
    });
});

gulp.task('js', () => {
    return gulp.src([paths.src.scripts])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('css', () => {
    const plugins = [
        nested,
        postcssShort,
        postcssPresetEnv({ stage: 0}),
        autoprefixer({ browsers: ['last 2 version'] })
    ];
    return gulp.src([paths.src.styles])
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('assets', () => {
    glob(paths.assets, (err, files) => {
        if (!err) {
            gulp.src(files)
                .pipe(gulp.dest(`${paths.build.dir}/images`));
        } else {
            throw err;
        }
    });
});

gulp.task('fonts', () => {
    gulp.src('./src/fonts/**/*')
        // .pipe(filter(['*.woff', '*.woff2', '*.ttf', '*.otf'])) почему то не работает
        .pipe(gulp.dest(`${paths.build.dir}/fonts`));
});

gulp.task('sync', () => {
    browserSync.init({
        server: {
            baseDir: "./prod"
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(paths.templates, ['compile']);
    gulp.watch(paths.src.scripts, ['js']);
    gulp.watch(paths.src.styles, ['css']);
    gulp.watch(paths.contextJson)
        .on('change', browserSync.reload);
    gulp.watch(`${paths.build.dir}/**/*`)
        .on('change', browserSync.reload);
});

gulp.task('clean', () => {
    return gulp.src('prod', {read: false})
        .pipe(clean());
});

gulp.task('build', ['js', 'css', 'compile', 'fonts', 'assets']);

gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'watch', 'sync']);

