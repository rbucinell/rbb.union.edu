
export default function NavItem( { props }) {
    return( 
        <a className="text-white">
            <li className="nav-link px-2 text-wrap">{ props.name }</li>
        </a>
    )
}


{/* <li key={item.name} className="nav-link px-2 text-wrap">
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
</li> */}