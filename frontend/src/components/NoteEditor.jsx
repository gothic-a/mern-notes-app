import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const NoteEditor = ({variant}) => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [noteTagsList, setNoteTagsList] = useState([])
    const [color, setColor] = useState('#fff')

    const [tagsListOpen, setTagsListOpen] = useState(false)

    const { tagsList: userTagsList } = useSelector(state => state.tags)

    const colorClickHandler = (e) => {
        if(e.target.dataset.color) setColor(e.target.dataset.color)
    }

    const noteTagsClickHandler = (e) => {
        if(e.target.classList.contains('delete-icon')) {
            const deletedTagId = e.target.closest('.note-tags-list__item').dataset.id 
            const tags = noteTagsList
            const idx = noteTagsList.findIndex(t => t._id === deletedTagId)
            
            setNoteTagsList([
                ...tags.slice(0, idx),
                ...tags.slice(idx + 1)
            ])
        }
    }

    const userTagsClickHandler = (e) => {
        if(e.target.dataset.name) {
            const tag = userTagsList.find(t => t._id === e.target.dataset.id)
            const tags = [tag].concat(noteTagsList)
            setNoteTagsList(tags)
        }
    }

    const editorClickHandler = (e) => {

        if(!e.target.closest('.tags-add') ) {
            setTagsListOpen(false)
        }

    }

    const noteColors = [
        '#FFB4B4',
        '#E79AFF',
        '#f2c2df',
        '#B3D9FF',
        '#CAF7E3',
        '#FEF8DD',
        '#fff',
        '#dedede'
    ]

    return (
        <div 
            className='note-editor'
            onClick={editorClickHandler}
        >
            <div className="note-editor__header">
                <textarea 
                    className="note-editor__header-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter note title"
                ></textarea>
                <div className="note-editor__header-controls">

                </div>
            </div>
            <div className={ !tagsListOpen ? "note-editor__body" : "note-editor__body close"}>
                <textarea
                    className="note-editor__body-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter note text"
                ></textarea>
            </div>
            <div className="note-editor__note-tags">
                {
                    noteTagsList.length !== 0 && (
                        <ul 
                            className="note-tags-list"
                            onClick={noteTagsClickHandler}
                        >
                            {
                                noteTagsList.map(t => (
                                    <li className="note-tags-list__item" data-id={t._id}>
                                        <i className="fas fa-tag tag-icon"></i>
                                        <span>{t.name}</span>
                                        <i className="fal fa-times delete-icon"></i>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="note-editor__user-tags">
                <div 
                    className={ tagsListOpen ? "tags-add" : "tags-add close"}
                >
                    <div 
                        className="tags-add__header"
                        onClick={() => {
                            setTagsListOpen(true)
                            console.log('click')
                        }}
                    >
                        {
                            tagsListOpen ? (
                                <input 
                                    type="text" 
                                    className="tags-add__header-search"
                                    placeholder="Enter to search"
                                />
                            ) : (
                                <div className="tags-add__header-button">
                                    add tag
                                </div>
                            )
                        }
                        <i className="far fa-chevron-down"></i>
                    </div>
                    <ul 
                        className="user-tags-list"
                        onClick={userTagsClickHandler}
                    >
                        {
                            userTagsList.map(t => <li className="user-tags-list__item" data-name={t.name} data-id={t._id}>{t.name}</li>)
                        }
                    </ul>
                </div>
            </div>
            <div className="note-editor__send">
                <button
                    className="note-editor__send-button"
                >
                    <i className="fal fa-check add-tag__done"></i>
                    {
                        variant === 'create' 
                        ? 'create' 
                        : 'edit'
                    }
                </button>
            </div>
            <div className="note-editor__colors">
                <ul 
                    className="colors-list"
                    onClick={colorClickHandler}
                >
                    {
                        noteColors.map(c => (
                            <li 
                                className={ color === c ? "colors-list__item active" : "colors-list__item" }
                                style={{backgroundColor: c}}
                                data-color={c}
                            ></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default NoteEditor 