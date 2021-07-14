import { useState, useEffect, useRef, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import throttle from '../utils/throttle'

import { 
    getNotes,
    pageEncrease,
    deleteNote,
    updateNote,
    setEditingNote
} from "../actions/notesActions"
import { toggleModal } from "../actions/modalActions"

import NotesList from "./NotesList"
import EmptyScreen from "./EmptyScreen"

const NotesView = () => {

    const notesView = useRef('')
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
        getNotes: {
            loading: getNotesLoading,
            progress: getNotesProgress
        },
        fetching 
    } = useSelector(state => state.notes)
    const pinned = useMemo(() => notesList.filter(n => n.pinned), [notesList])
    const regular = useMemo(() => notesList.filter(n => !n.pinned), [notesList])

    const dispatch = useDispatch() 

    const pageUp = (e) => {
        if(e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 200) {
            if(!getNotesLoading && (page < pagesCount)) dispatch(pageEncrease())
        }
    }

    const viewScrollHandler = throttle(pageUp, 500)

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
            dispatch(setEditingNote(e.target.closest('.note').dataset.id))
            dispatch(toggleModal('open', 'edit note'))
        }
    }

    return (
        <>
        <div 
            className={isOpen ? 'notes-view' : 'notes-view sidebar_hidden'}
            ref={notesView}
            onClick={notesListClickHandler}
            onScroll={viewScrollHandler}
        >
            {
                pinned.length !== 0 || regular.length !== 0 && !getNotesLoading
                    ? <>
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
                    </>
                    : !getNotesLoading && <EmptyScreen>you can add new notes!</EmptyScreen>
            }
            
        </div>
        </>
    )
}

export default NotesView