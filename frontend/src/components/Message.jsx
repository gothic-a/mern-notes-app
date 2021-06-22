const Message = ({ children, type }) => {
    return (
        <div className={`message message_${type}`}>
            <span className="message__text">
                { children }
            </span>
        </div>
    )
}

export default Message