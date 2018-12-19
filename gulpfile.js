var gulp        = require('gulp');
var pug         = require('gulp-pug');
var cleanCSS    = require('gulp-clean-css');
var concat      = require('gulp-concat');
var minify      = require('gulp-minify');

let source = "src/";
let scripts = [
    `${source}js/jquery-2.2.2.js`,
    `${source}js/bootstrap.min.js`,
    `${source}js/perfect-scrollbar-0.4.5.with-mousewheel.min.js`,
    `${source}js/TweenMax.min.js`,
    `${source}js/handlebars-v4.0.5.js`,
    `${source}js/picture-rotate.js`
];

function pugHTML()
{
    return gulp.src([
        source + "*.pug",
        `!${source}mixins/*.pug`,
        `!${source}components/*.pug`
    ])
        .pipe(pug())
        .pipe( gulp.dest('dist/'))
}
function img()
{
    return gulp.src( source + 'img/**/*').pipe(gulp.dest('dist/img/'));
}

function content()
{
    return gulp.src( source + 'content/').pipe(gulp.dest('dist/content/'));
}
function fonts()
{
    return gulp.src( source + 'fonts/').pipe( gulp.dest('dist/fonts/'));
}
function css() 
{
    gulp.src( source + 'css/rbb.css').pipe(gulp.dest('dist/css/'));
    return gulp.src([ source + 'css/*.css',
        `!${source}/css/rbb.css`
        ])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe( gulp.dest( 'dist/css/'))
};
function js()
{
    return gulp.src( scripts )
        .pipe( concat("scripts.js"))
        .pipe( minify({
            ext:{
                min: '.min.js'
            }
        }) )
        .pipe( gulp.dest( 'dist/js/'));
}

gulp.task( 'img', img);
gulp.task( 'css', css );
gulp.task( 'js', js);
exports.build = gulp.parallel( css, img, pugHTML, js, content, fonts)