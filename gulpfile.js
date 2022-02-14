const gulp      = require('gulp');
const concat    = require('gulp-concat');
const uglify    = require('gulp-uglify');
const cleanCSS  = require('gulp-clean-css');
const del       = require('del');
const pug       = require('gulp-pug');
const fs        = require('fs');

var src = 'src';
var dest = 'docs';

var paths = {
    scripts: [`${src}/js/**/*.js`],
    css : {
        libraries : [`${src}/css/plugins/*.css`],
        custom : [
            `${src}/css/style.css`,
            `${src}/css/videomenu.css`
        ],
        libmin:     `${dest}/css/lib.min.css`,
        stylemin:   `${dest}/css/style.min.css`
    },
    copy: [
        `${src}/fonts/*`, 
        `${src}/img/**/*`,
        `${src}/data/**/*`,
        `${src}/content/**/*`,
    ]
};

// Concats the libraries together
gulp.task('css-lib', gulp.series(
    function(){ return del([paths.css.libmin]) },
    () => gulp.src( paths.css.libraries )
            .pipe( concat('lib.min.css'))
            .pipe( gulp.dest( `${dest}/css/`))
));

// Compile main pug pages into HTML
gulp.task('build-pug', function(){
    return gulp.src([`${src}/layouts/**/*.pug`,`!${src}/layouts/mixins/*.pug`])
        .pipe(pug( { pretty: true } ))
        .pipe( gulp.dest( dest ));
});

gulp.task('copy',function(){
    return gulp.src( paths.copy, { base: src })
        .pipe( gulp.dest( dest ));
});
  
gulp.task('projectlist', function(done){
    
    let projects = { "_comments": "DO NOT Modify, this file is dynamically generated"};
    let path = `${src}/projects/`;
    fs.readdirSync(path).filter( function(file)
    {
        let isDir = fs.statSync(path+file).isDirectory();
        if( isDir )
        {
            var projPath = path+file+"/";
            projects[file] =  { name: file, path: `projects${file}/`, hasIndex: false };
            try
            {
                var hasIndex = fs.statSync( `${projPath}index.html`).isFile();
                projects[file].hasIndex = hasIndex;
            }
            catch(e){};
        }
    });
    fs.writeFile( `${path}projects.json${JSON.stringify(projects,null,4)}`, (err)=>{
        if( err ) throw err;
        console.log( 'projects.json has been saved.');
    });
    done();
})

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

gulp.task('cleanjs', done => {
    return del([dest+'js/']);
});

gulp.task('compile-js', done =>
{
    return gulp.src( paths.scripts )
        .pipe( uglify() )
        .pipe( gulp.dest( `${dest}/js/`));
});

gulp.task('minify-js', gulp.series( 'cleanjs','compile-js'));

function cleanDest()
{
    return del([`${dest}/*`]);
}
exports.cleanDest = cleanDest;

// Deletes destination fold for complete rebuild
gulp.task('cleanDest', cleanDest );

// Build replaces html/css/js in dest folder, not modifying assets
gulp.task( 'build-code',gulp.parallel('build-pug', 'minify-js', 'minify-css', 'css-lib'));

// Complete rebuild of the destination folder
gulp.task('rebuild',gulp.series( cleanDest, gulp.parallel('build-code','copy')));

//Default Task, will do a full clean and rebuild of Pug, JS, and CSS
gulp.task( 'default', gulp.parallel('build-code'));

/**
 * Watch Tasks
 */

gulp.task('watch:css', function(){
    gulp.watch( paths.css.custom, gulp.task('minify-css'));
});

gulp.task( 'watch:js', function(){
    gulp.watch( src + 'js/**/*.js', gulp.task('minify-js'));
});

gulp.task( 'watch:pug' , function(){
    gulp.watch( [`${src}/layouts/**/*.pug`], gulp.task('build-pug') );
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:js', 'watch:pug'));

/**
 * Automated bulids
 */
gulp.task( 'travis' , gulp.series('build-code'), ()=> process.exit(0) );