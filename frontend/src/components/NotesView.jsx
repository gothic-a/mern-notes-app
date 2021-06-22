import { useSelector } from "react-redux"

import { notes } from "../dummydata"

import NotesList from "./NotesList"

const NotesView = () => {
    const { isOpen } = useSelector(state => state.sidebar)

    return (
        <div className={isOpen ? 'notes-view' : 'notes-view sidebar_hidden'}>
            <NotesList title="all">{notes}</NotesList>
        </div>
    )
}

export default NotesView