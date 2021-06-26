const SideBarItem = ({text, children, onClickHandler}) => {
    
    return (
        <div 
            className="side-bar__item"
            onClick={onClickHandler ? onClickHandler : ''}
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