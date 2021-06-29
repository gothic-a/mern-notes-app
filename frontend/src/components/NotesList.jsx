import { useSelector } from 'react-redux'
import Masonry from 'react-masonry-css'

import Note from "./Note"

const NotesList = ({ title, children }) => {
    const { isOpen } = useSelector(state => state.sidebar)

    const breakpointColumns = {
        default: isOpen ? 4 : 5,
        1200: isOpen ? 3 : 4,
        992: 3,
        768: 2,
        576: 1,
    }

    return (
        <div className="notes-list">
            <h2 className="notes-list__title" >{title}</h2>
            <Masonry
                breakpointCols={ breakpointColumns }
                className='notes-list__grid'
                columnClassName='notes-list__grid-column'
            >
                {
                    children.map(n => (
                        <Note key={n._id} note={n}/>
                    ))
                }
            </Masonry>
            
        </div>
    )
}

export default NotesList