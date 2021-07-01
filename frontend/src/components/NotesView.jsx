import { useState, useEffect, useRef, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import throttle from '../utils/throttle'

import { 
    getNotes,
    pageEncrease,
    deleteNote,
    updateNote
} from "../actions/notesActions"

import NotesList from "./NotesList"
import NoteEditor from './NoteEditor'
import Modal from "./Modal"
import { toggleModal } from "../actions/modalActions"

const NotesView = () => {
    const [updatedNote, setUpdatedNote] = useState(null)
    const [modal, setModal] = useState({
        isOpen: false,
        content: ''
    })

    const closeModalHandler = () => {
        setModal({
            isOpen: false,
            content: ''
        })
    }

    const notesView = useRef(null)
    const { isOpen } = useSelector(state => state.sidebar)
    const { 
        notesList,
        page,
        pagesCount, 
        filter: {
            name: filterName,
            id: filterId
        }, 
        search, 
        regularCount,
        pinnedCount,
        getNotes: {
            loading: getNotesLoading,
            success: getNotesSuccess,
        } 
    } = useSelector(state => state.notes)
    const pinned = useMemo(() => notesList.filter(n => n.pinned), [notesList])
    const regular = useMemo(() => notesList.filter(n => !n.pinned), [notesList])

    const dispatch = useDispatch() 

    const pageUp = (e) => {
        if(e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 200) {
            if(!getNotesLoading && (page < pagesCount)) dispatch(pageEncrease())
        }
    }
    const viewScrollHandler = throttle(pageUp, 200)

    useEffect(() => {
        notesView.current.addEventListener('scroll', viewScrollHandler)
        return () => notesView.current.removeEventListener('scroll', viewScrollHandler)
    }, [page, pagesCount])

    useEffect(() => {
        dispatch(getNotes(page, filterId, search))
    }, [page, filterId, search])

    const notesListClickHandler = (e) => {
        if(e.target.dataset.type === 'delete-note-icon') {
            dispatch(deleteNote(e.target.closest('.note').dataset.id))
            return
        }

        if(e.target.dataset.type === 'pin-note-icon') {
            const { id, pinned } = e.target.closest('.note').dataset
            dispatch(updateNote(id, { pinned: pinned === 'false'}))
            return
        }

        if(e.target.closest('.note')) {
            setUpdatedNote(e.target.closest('.note').dataset.id)
            setModal({
                isOpen: true,
                content: 'update note'
            })
        }
    }

    return (
        <>
        <div 
            className={isOpen ? 'notes-view' : 'notes-view sidebar_hidden'}
            ref={notesView}
            onClick={notesListClickHandler}
        >
            {
                pinned.length !== 0 && <NotesList title="pinned" count={pinned.length}>{pinned}</NotesList>
            }
            {
                pinned.length !== 0 && regular.length === 0 
                ? (
                    null
                ) : (
                    <NotesList 
                        title={filterName}
                        count={regularCount}
                    >
                        { 
                            regular.length !== 0 ? regular : []
                        }
                    </NotesList>
                )
            }
        </div>
        {
            <Modal 
                title={modal.content}
                isOpen={modal.isOpen}
                onClose={closeModalHandler}
            >
                {
                    <NoteEditor 
                        variant="update" 
                        id={updatedNote}
                    />
                }
            </Modal>
        }
        </>
    )
}

export default NotesView