import { useState, useEffect } from "react";
import SocialIcon from "./SocialIcon";
import { loadXMLDoc } from '../../js/nav.js';

export default function Nav() {
    let [navXML, setNavXML ] = useState();

    useEffect( ()=>{
        async function fetchData(){
            const [xmlDoc, _] = await loadXMLDoc('/content/data/nav.xml');
            const navigationItems = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
                const name = item.getAttribute('name');
                const subItems = Array.from(item.querySelectorAll('subitem')).map(subitem => ({
                  subitemName: subitem.getAttribute('name'),
                  target: subitem.getAttribute('target'),
                  external: subitem.getAttribute('external') ?? 'true',
                }));
                return { name, subItems };
              });
              setNavXML(navigationItems);
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
                <ul id="mainNavigation" className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column" >
                {navXML?.map(item => (
                    <li key={item.name} className="nav-link px-2 text-wrap">
                        <a className="text-white">{item.name}</a>
                        <ul>
                            {item.subItems.map(subitem => (
                            <li key={subitem.subitemName}>
                                <a href={subitem.target} target={subitem.external ? '_blank' : '_self'}>
                                {subitem.subitemName}
                                </a>
                            </li>
                            ))}
                        </ul>
                    </li>
                ))}
                {navXML?.map(item => (
                    <NavItem props={item} >
                        
                    </NavItem>
                ))}
                </ul>
                <ul className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column mt-3" id="courseNameHeader">
                <li><span className="text-white px-2 lead font-weight-bold" id="courseNavName"></span></li>
                </ul>
                <ul id="courseNavigation" className="flex-fill align-self-start align-items-start navgroup navbar-collapse collapse navigation nav flex-column" ></ul>
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