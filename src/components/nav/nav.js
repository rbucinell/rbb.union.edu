/**
    * @param {String} HTML representing a single element
    * @return {Element} a DOM element
    */
export function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

export async function loadXMLDoc(filename)
{
    let response = await fetch(filename);
    let txt = await response.text();
    return [new DOMParser().parseFromString( txt, 'application/xml'), response.headers.get('Last-Modified')];
}

export async function loadNavigation( filename, ulID )
{
    console.log( filename, ulID);
    let [xmlDoc, modified ] = await loadXMLDoc( filename );
    let ul = document.querySelector(`#${ulID}`);
    xmlDoc.querySelectorAll('item').forEach((item,i) =>
    {
        let li = document.createElement('li');
        let subitems = item.querySelectorAll('subitem');
        if( subitems )
        {
            li.classList = 'nav-link px-2 text-wrap';
            let menuName = item.getAttribute('name');
            let anchor = htmlToElement(`<a id="${ulID}_menu${i}" class="text-white" data-bs-parent="#${ulID}" data-bs-toggle='collapse' data-bs-target='#${ulID}_submenu${i}' aria-expanded='false'>${menuName}</a>`);
            let subul  = htmlToElement(`<ul id="${ulID}_submenu${i}" class="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate collapse" aria-labelledby="${ulID}_menu${i}"></ul>`);
            
            let expand = false;
            //Add all the sub-menu items to sub-menu
            item.querySelectorAll('subitem').forEach((sub,j)=>{
                
                let path = window.location.pathname.endsWith('/') ? 'index.html' : window.location.pathname;
                if( path.includes(sub.getAttribute('target'))) expand = true;

                let subli = document.createElement('li');
                subli.classList = 'my-1 px-2 text-truncate text-muted';
                let suba = htmlToElement(`<a class="text-white-50" href="${sub.getAttribute('target')}">${sub.getAttribute('name')}</a>`);
                if( sub.getAttribute('external') )
                {
                    suba.setAttribute('target', '_blank');
                    suba.appendChild(htmlToElement(`<i class="fa fa-external-link" style="padding-left:1rem;" aria-hidden="true"></i>`));
                }
                subli.appendChild(suba);
                subul.append( subli );
            });
            if( expand && window.innerWidth >= 768) subul.classList.add('show');
            li.appendChild(anchor);
            li.appendChild(subul);
        }
        ul.append(li);
    });
}