import { useSelector, useDispatch } from 'react-redux'
import Masonry from 'react-masonry-css'

import Note from "./Note"

const NotesList = ({ title, children, count }) => {
    const { isOpen } = useSelector(state => state.sidebar)

    const dispatch = useDispatch()

    const breakpointColumns = {
        default: isOpen ? 4 : 5,
        1200: isOpen ? 3 : 4,
        992: 3,
        768: 2,
        576: 1,
    }

    return (
        <div 
            className="notes-list"
        >

            <div className="notes-list__header">
                <h2 className="notes-list__header-title">{title}</h2>
                <span className="notes-list__header-count">{count}</span>
            </div>
            
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