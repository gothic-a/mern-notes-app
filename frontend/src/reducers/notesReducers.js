import {
    NOTES_LIST_RESET,
    NOTES_GET_REQUEST,
    NOTES_GET_SUCCESS,
    NOTES_GET_FAIL,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAIL,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAIL,
    NOTE_UPDATE_RESET,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
    UPDATED_NOTE_SET,
    UPDATED_NOTE_RESET,
    NOTES_LIST_PAGE_INCREASE,
    SET_FILTER
} from '../constants/notesConstants'

const initialState = {
    notesList: {
        pinned: [],
        regular: []
    },
    page: 1,
    totalCount: null,
    pagesCount: null,
    filter: {
        name: 'all',
        id: 'all'
    },
    search: '',
    getNotes: {},
    createNote: {},
    updateNote: {},
    deleteNote: {}
}

const createNote = (state, action) => {
    const note = action.payload
    return [note].concat(state.notesList)
}

const getNotes = (state, action) => { 
    return {
        pinned: action.payload.pinned,
        regular: state.notesList.regular.concat(action.payload.notes)
    }
}

export const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTES_GET_REQUEST:
            return {
                ...state,
                getNotes: {
                    loading: true
                }
            }
        case NOTES_GET_SUCCESS:
            return {
                ...state,
                notesList: getNotes(state, action),
                totalCount: action.payload.count,
                pagesCount: action.payload.pagesCount,
                getNotes: {
                    loading: false,
                    success: true,
                }
            }
        case NOTES_GET_FAIL: 
            return {
                ...state,
                getNotes: {
                    loading: false,
                    error: action.payload,
                }
            }
        
        case NOTES_LIST_PAGE_INCREASE: 
            return {
                ...state,
                page: state.page + 1
            }

        case SET_FILTER: 
            return {
                ...state,
                notesList: {
                    pinned: [],
                    regular: []   
                },
                filter: {
                    name: action.payload.name,
                    id: action.payload.id
                },
                page: 1,
            }

        case NOTES_LIST_RESET:
            return initialState

        default: 
            return state
    }
}
