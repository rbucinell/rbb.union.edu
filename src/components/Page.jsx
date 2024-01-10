import { useState, useEffect } from "react";
import Nav from './Nav/Nav'

export default function Page( props ){

    let [content, setLoaded ] = useState();
    let [lastMod, setLastMod] = useState('');

    useEffect( ()=>{
        async function fetchData(){
            let page = await fetch(props.contentURL);
            let lm = page.headers.get('Last-Modified');
            setLastMod(lm);
            setLoaded(await page.text());
        };
        fetchData();
    }, []);

    return(
        <div className="d-flex flex-column vh-100 overflow-hidden">
        <div className="d-flex flex-column flex-sm-row overflow-auto h-100">
          <div className="row">
            <Nav />
            <main id="main" className='col overflow-auto h-100'>
                
                <header className='page-header sticky-top mt-4 mb-2'>
                {props.course ?
                    <h1 className="dislay-5" id="pageheader"> { props.course }
                        <small className="text-muted fs-3">&nbsp;{props.courseName}</small>
                    </h1>
                    :
                    <h1 className="dislay-5" id="pageheader">{ props.name }</h1>
                }
                <ul className='breadcrumb bg-light p-2'>
                    { props.course ?
                        <>
                        <li className="breadcrumb-item"><a href="/courselisting.html">Courses</a></li>
                        <li className="breadcrumb-item"><a href="./">{ props.course }</a></li></>
                    : <></> }
                    <li className="breadcrumb-item">{ props.menu }</li>
                    <li className="breadcrumb-item active"><a href="#">{ props.name }</a></li>
                </ul>
                </header>
                <div className='px-3'>
                <section id="dadcontent"/>
                <div id="content" dangerouslySetInnerHTML={{__html: content}} />
                <section className='updated text-garnet fst-italic pull-right fw-light'>
                    { lastMod }
                    </section>
                </div>
            </main>
        </div>
        </div>
      </div>
    )
}