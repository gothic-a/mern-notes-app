const SideBarItem = ({text, children, id, active, onClickHandler}) => {
    
    return (
        <div 
            className={active ? "side-bar__item active" : 'side-bar__item'}
            data-id={id}
            data-name={text}
            onClick={onClickHandler}
        >
            <div className="side-bar__item-icon">
                {
                    children
                }
            </div>
            <span className="side-bar__item-text">
                {text}
            </span>
        </div>
    )
}

export default SideBarItem