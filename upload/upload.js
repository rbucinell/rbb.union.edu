import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

(async ()=>{

    const copyFromTo = async function( fromDir, toDir )
    {
        // Our starting point
        try {
            // Get the files as an array
            const files = await fs.promises.readdir( fromDir );

            // Loop them all with the new for...of
            for( const file of files ) {

                // Get the full paths
                const fromPath = path.join( fromDir, file );
                const toPath   = path.join( toDir, file );

                // Stat the file to see if we have a file or dir
                const stat = await fs.promises.stat( fromPath );

                if( stat.isFile() )
                {
                    console.log( `${chalk.white.bgBlack('Uploading: ')} ${file}.`);
                    fs.copyFileSync(fromPath, toPath);
                }
            }
        }
        catch( e ) {
            console.error( chalk.red('Error'), e );
        }
    }

    const remoteDir = '\\\\minerva/bucinelr/';
    const buildDir = './docs/';

    if( !fs.existsSync(remoteDir) )
    {
        console.log( `${chalk.red('Error:')} Cannot reach remote destination`);
        process.exit(1);
    }

    console.log( `Processing ${chalk.green('root')} directories`);
    await copyFromTo( remoteDir, buildDir );

    console.log( `Processing ${chalk.green('courses')} directories`);
    const courses = await fs.promises.readdir( path.join( buildDir, 'courses' ) );
    for( const course of courses )
    {
        console.log( `Processing course ${chalk.green(course)} files.` );
        let courseSrcDir  = path.join( buildDir,  'courses', course );
        let courseDestDir = path.join( remoteDir, 'courses', course );
        await copyFromTo( courseSrcDir, courseDestDir );

        //copy manifest
        if( fs.existsSync( path.join(courseSrcDir, 'manifest.json')))
        {
            console.log( `Processing course ${course}. manifest.json` );
            fs.copyFileSync(path.join(courseSrcDir, 'manifest.json' ), path.join( courseDestDir, 'manifest.json'));
        }
        
        //copy nav.xml
        console.log( `Processing course ${course}. nav.xml` );
        fs.copyFileSync(path.join(courseSrcDir, 'content', 'data', 'nav.xml' ), path.join( courseDestDir, 'content', 'data', 'nav.xml'));
    }
    console.log( `Deploy ${chalk.blue('complete')}`);
    
})(); // Wrap in parenthesis and call now