import Tag from './Tag' 

const Note = ({ note }) => {

    const toggleIcon = (e) => {
        if(e.target.classList.contains('fas')) {
            e.target.classList.remove('fas')
            e.target.classList.add('far')
        } else {
            e.target.classList.remove('far')
            e.target.classList.add('fas')
        }
    }

    const noteStyles = {
        backgroundColor: note.color,
    }

    return (
        <div 
            className="note" 
            style={noteStyles} 
            data-pinned={note.pinned} 
        >
            <div className="note__header">
                <h4 className="note__header-title">{note.title}</h4>
                <div className="note__header-controls">
                    <i 
                        className="far fa-trash delete"
                        onMouseOver={toggleIcon}
                        onMouseOut={toggleIcon}
                    ></i>
                    <i 
                        className={ note.pinned ? "fas fa-thumbtack pin" : "far fa-thumbtack pin"}
                        onMouseOver={toggleIcon}
                        onMouseOut={toggleIcon}
                    ></i>
                </div>
            </div>

            <p className="note__text" >{note.text}</p>

            <div className="note__tags">
                {
                    note.tags.map(t => (
                        <Tag key={t}>{t.name}</Tag> 
                    ))
                }
            </div>
        </div>
    )
}

export default Note