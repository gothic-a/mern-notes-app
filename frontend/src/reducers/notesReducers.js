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
    SET_FILTER,
    SET_SEARCH_QUERY
} from '../constants/notesConstants'

const initialState = {
    notesList: {
        pinned: [],
        regular: []
    },
    page: 1,
    regularCount: null,
    pinnedCount: null,
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
    return {
        pinned: state.notesList.pinned,
        regular: [note].concat(state.notesList.regular)
    }
}

const deleteNote = (state, action) => {
    const note = action.payload
    let pidx = state.notesList.pinned.findIndex(n => n._id === note)
    let ridx = state.notesList.regular.findIndex(n => n._id === note)

    if(pidx > -1) {
        return {
            notesList: {
                pinned: [...state.notesList.pinned.slice(0, pidx), ...state.notesList.pinned.slice(pidx + 1)],
                regular: state.notesList.regular
            },
            pinnedCount: state.pinnedCount - 1,
            regularCount: state.regularCount
        }
    } else {
        return {
            notesList: {
                pinned: state.notesList.pinned,
                regular: [...state.notesList.regular.slice(0, ridx), ...state.notesList.regular.slice(ridx + 1)]
            },
            regularCount: state.regularCount - 1,
            pinnedCount: state.pinnedCount
        }
    }
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
                regularCount: action.payload.count,
                pinnedCount: action.payload.pinnedCount,
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
        
        case NOTE_CREATE_REQUEST: 
            return {
                ...state,
                createNote: {
                    loading: true,
                }
            }
        case NOTE_CREATE_SUCCESS:
            return {
                ...state,
                regularCount: state.regularCount + 1,
                notesList: createNote(state, action),
                createNote: {
                    loading: false,
                    success: true,
                }
            }
        case NOTE_CREATE_FAIL:
            return {
                ...state,
                createNote: {
                    loading: false,
                    error: action.payload,
                }
            }
        
        case NOTE_DELETE_REQUEST:
            return {
                ...state,
                deleteNote: {
                    loading: true,
                }
            }
        case NOTE_DELETE_SUCCESS:
            const { notesList, pinnedCount, regularCount } = deleteNote(state, action)
            return {
                ...state,
                notesList: notesList,
                deleteNote: {
                    loading: false,
                    success: true,
                },
                pinnedCount,
                regularCount,
            }
        case NOTE_DELETE_FAIL: 
            return {
                ...state,
                deleteNote: {
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
                ...initialState,
                filter: {
                    name: action.payload.name,
                    id: action.payload.id
                }
            }

        case SET_SEARCH_QUERY: 
            return {
                ...initialState,
                search: action.payload,
            }

        case NOTES_LIST_RESET:
            return initialState

        default: 
            return state
    }
}
