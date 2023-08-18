export default function SocialIcon( props ) {
    return (
        <span className="fs-3 flex-fill">
            <a title={props.title} href={props.href}><i className={props.fa}></i></a>
        </span>
    )
}