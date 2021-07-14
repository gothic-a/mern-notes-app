const EmptyScreen = ({children}) => {
    return (
        <div className="empty-screen">
            <h4 className="empty-screen__text">
                {
                    children
                }
            </h4>
        </div>
    )
}

export default EmptyScreen 