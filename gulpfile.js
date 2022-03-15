const gulp      = require('gulp');
const cleanCSS  = require('gulp-clean-css');
const concat    = require('gulp-concat');
const debug     = require('gulp-debug');
const pug       = require('gulp-pug');
const uglify    = require('gulp-uglify');
const rename    = require('gulp-rename');
var log         = require('fancy-log');
const del       = require('del');
const fs        = require('fs');
const path      = require('path');

var src = 'src';
var dest = 'docs';

var paths = {
    scripts: {
        lib: {
            in: [
                `${src}/js/lib/**/*.js`
            ],
            out:`lib.min.js`
        },
        custom: {
            in: `${src}/js/rbb/**/*.js`,
            out:`rbb.min.js`
        }
    },
    css : {
        libraries : [`${src}/css/plugins/*.css`],
        custom : [
            `${src}/css/style.css`
        ],
        libmin:     `${dest}/css/lib.min.css`,
        stylemin:   `${dest}/css/style.min.css`
    },
    copy: [
        `${src}/fonts/*`, 
        `${src}/img/**/*`,
        `${src}/data/**/*`,
        `${src}/content/**/*`,
        `${src}/courses/**/*`,
        `!${src}/courses/**/*.pug`,
        `${src}/layouts/partials/page_template.pug`
    ],
    pug: [
        `${src}/layouts/**/*.pug`,
        `!${src}/layouts/mixins/*.pug`,
        `!${src}/layouts/partials/*.pug`, 
        `!${src}/layouts/partials/page_template.pug`
    ]
};

// Concats the libraries together
gulp.task('css-lib', gulp.series(
    function(){ return del([paths.css.libmin]) },
    () => gulp.src( paths.css.libraries )
            .pipe( concat('lib.min.css'))
            .pipe( gulp.dest( `${dest}/css/`))
));
gulp.task('minify-css', gulp.series(
    function(){ return del([paths.css.stylemin]) },
    () => gulp.src( paths.css.custom )
        .pipe( cleanCSS() )
        .pipe( concat('style.min.css'))
        .pipe( gulp.dest( `${dest}/css/`))
));

gulp.task('js-lib', gulp.series(
    () => del( paths.scripts.lib.out),
    () => gulp.src( paths.scripts.lib.in )
        .pipe( concat( paths.scripts.lib.out ))
        .pipe( uglify() )
        .pipe( gulp.dest( `${dest}/js/`))
));

gulp.task('js-custom', gulp.series(
    () => del( paths.scripts.custom.out),
    () => gulp.src( paths.scripts.custom.in )
        .pipe( concat( paths.scripts.custom.out ))
        .pipe( uglify() )
        .pipe( gulp.dest( `${dest}/js/`))
));

// Compile main pug pages into HTML
gulp.task('build-pug', function(){
    return gulp.src(paths.pug)
        .pipe(pug( { pretty: true } ))
        .pipe( gulp.dest( dest ));
});

gulp.task('build-course-pug', () =>{
    return gulp.src([`${src}/courses/**/*.pug`])
        .pipe(pug( { pretty: true } ))
        .pipe(rename((file) => file.dirname = file.dirname.split(path.sep).slice(0,-1).join() ))
        .pipe(gulp.dest(`${dest}/courses`));
});

gulp.task('copy',function(){
    return gulp.src( paths.copy, { base: src })
    .pipe( debug())
    .pipe( gulp.dest( dest ));
});
gulp.task('copy-layouts',function(){
    return gulp.src( `${src}/layouts/partials/page_template.pug`, { base: src })
    .pipe( debug())
    .pipe( gulp.dest( dest ));
});


function cleanDest()
{
    return del([`${dest}/*`]);
}
exports.cleanDest = cleanDest;

// Deletes destination fold for complete rebuild
gulp.task('cleanDest', cleanDest );

// Build replaces html/css/js in dest folder, not modifying assets
gulp.task( 'build-code',gulp.parallel('build-pug', 'build-course-pug', 'js-lib', 'js-custom', 'minify-css', 'css-lib'));

// Complete rebuild of the destination folder
gulp.task('rebuild',gulp.series( cleanDest, gulp.parallel('build-code','copy')));

//Default Task, will do a full clean and rebuild of Pug, JS, and CSS
gulp.task( 'default', gulp.parallel('build-code'));

/**
 * Watch Tasks
 */
gulp.task( 'watch:css',             ()=> gulp.watch( paths.css.custom, gulp.task('minify-css')));
gulp.task( 'watch:js-lib',          ()=> gulp.watch( paths.scripts.lib.in, gulp.task('js-lib')));
gulp.task( 'watch:js',              ()=> gulp.watch( paths.scripts.custom.in, gulp.task('js-custom')));
gulp.task( 'watch:pug',             ()=> gulp.watch( [`${src}/layouts/**/*.pug`], gulp.task('build-pug')));
gulp.task( 'watch:pug-course',      ()=> gulp.watch( [`${src}/courses/**/*.pug`], gulp.task('build-course-pug')));
gulp.task( 'watch', gulp.parallel('watch:css', 'watch:js-lib','watch:js', 'watch:pug', 'watch:pug-course'));
