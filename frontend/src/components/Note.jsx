const Note = ({ note }) => {

    const deleteOverHandler = (e) => {
        e.target.classList.remove('far')
        e.target.classList.add('fas')
    }

    const pinOverHandler = () => {

    }

    return (
        <div className="note" style={{backgroundColor: note.color}} data-pinned={note.pinned} >
            <div className="note__header">
                <h4 className="note__header-title" >{note.title}</h4>
                <div className="note__header-controls">
                    <i 
                        className="far fa-trash delete"
                        onMouseOver={deleteOverHandler}
                    ></i>
                    <i 
                        className={ note.pinned ? "fa fa-thumbtack pin" : "far fa-thumbtack pin"}
                        onMouseOver={pinOverHandler}
                    ></i>
                </div>
            </div>

            
            <p className="note__text" >{note.text}</p>
        </div>
    )
}

export default Note