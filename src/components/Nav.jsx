import { useState, useEffect } from "react";
import SocialIcon from "./SocialIcon";
import { loadNavigation } from '../js/nav';

export default function Nav() {
    let [navXML, setNavXML ] = useState();

    useEffect( ()=>{
        async function fetchData(){
            // let xmlPage = await fetch('/content/data/nav.xml');
            // let xml = await xmlPage.text();
            // console.log( xml ) 
            // setNavXML(xml);
            setNavXML( await loadNavigation("/content/data/nav.xml"))
        };
        fetchData();
    }, []);

    return (
        <aside className="g-0 col-sm-3 flex-shrink-1 sticky-top pb-sm-0 pb-3" id="nav-aside">
            <div className="m-2" id="profile">
                <img className="img-thumbnail d-none d-sm-block" width="250px" height="250px"/>
                <div className="title text-center"><a href="/">
                    <h4 className="pt-2">Ronald B. Bucinell, Ph.D., P.E.</h4></a>
                <h4 className="lead">Union College</h4>
                </div>
            </div>
            <nav className="navbar navbar-expand-sm d-flex flex-column">
                <button className="navbar-toggler mb-4 text-white" id="navtogglebutton" type="button" data-bs-toggle="collapse" data-bs-target=".navgroup"><i className="fa fa-bars"></i></button>
                <ul className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column" id="mainNavigation"></ul>
                <ul className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column mt-3" id="courseNameHeader">
                <li><span className="text-white px-2 lead font-weight-bold" id="courseNavName"></span></li>
                </ul>
                <ul className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column" id="courseNavigation"></ul>
            </nav>
            <div className="social-icons">
                <div className="d-flex justify-content-center text-center">
                    <SocialIcon title="Outlook Contact Card" href="/content/data/PE_Ronald_B_Bucinell_PhD.zip" fa="fa-regular fa-address-book fa-sm" />
                    <SocialIcon title="LinkedIn Profile" href="https://www.linkedin.com/pub/ronald-bucinell/15/772/5a4" fa="fa-brands fa-linkedin-in fa-sm" />
                    <SocialIcon title="Research Gate Profile" href="http://www.researchgate.net/profile/Ronald_Bucinell" fa="fa-brands fa-researchgate fa-sm" />
                    <SocialIcon title="Phone Number" href="tel:+1518886023" fa="fa-solid fa-phone fa-sm" />
                    <SocialIcon title="Email" href="mailto:bucinelr@union.edu" fa="fa-regular fa-envelope fa-sm" />
                </div>
            </div>
        </aside>
    )
}