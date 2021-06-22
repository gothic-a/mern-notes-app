const Tag = ({ children }) => {
    return (
        <li className="tags__item">
            <div className="tags__item-icon">
                <i className="fas fa-tag"></i>
            </div>
            <span className="tags__item-text">{ children }</span>
        </li>
    )
}

export default Tag