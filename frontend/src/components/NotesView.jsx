import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import throttle from '../utils/throttle'

import { 
    getNotes,
    pageEncrease
} from "../actions/notesActions"

import NotesList from "./NotesList"

const NotesView = () => {
    const notesView = useRef(null)
    const { isOpen } = useSelector(state => state.sidebar)
    const { 
        notesList: { pinned, regular }, 
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

    return (
        <div 
            className={isOpen ? 'notes-view' : 'notes-view sidebar_hidden'}
            ref={notesView}
        >
            {
                pinned.length !== 0 && <NotesList title="pinned" count={pinnedCount}>{pinned}</NotesList>
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
    )
}

export default NotesView