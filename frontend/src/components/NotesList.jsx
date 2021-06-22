import { useSelector } from 'react-redux'
import Masonry from 'react-masonry-css'

import Note from "./Note"

const NotesList = ({ title, children }) => {
    const { isOpen } = useSelector(state => state.sidebar)

    return (
        <div className="notes-list">
            <h2 className="notes-list__title" >{title}</h2>
            <Masonry
                breakpointCols={ isOpen ? 4 : 5 }
                className='notes-list__grid'
                columnClassName='notes-list__grid-column'
            >
                {
                    children.map(n => (
                        <Note note={n}/>
                    ))
                }
            </Masonry>
            
        </div>
    )
}

export default NotesList