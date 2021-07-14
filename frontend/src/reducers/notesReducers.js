import {
    NOTES_LIST_RESET,
    NOTES_GET_REQUEST,
    NOTES_GET_SUCCESS,
    NOTES_GET_FAIL,
    NOTES_GET_FETCHING_PROGRESS,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAIL,
    NOTE_CREATE_FETCHING_PROGRESS,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAIL,
    NOTE_UPDATE_FETCHING_PROGRESS,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
    NOTE_DELETE_FETCHING_PROGRESS,
    NOTES_LIST_PAGE_INCREASE,
    SET_FILTER,
    SET_SEARCH_QUERY,
    EDITING_NOTE_SET,
    EDITING_NOTE_RESET,
    NOTES_FETCHING_PROGRESS
} from '../constants/notesConstants'

const initialState = {
    notesList: [],
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
    deleteNote: {},
    fetching: {}
}

const getNotes = (state, action) => {
    if(state.notesList.length > 0) {
        return state.notesList.concat(action.payload.notes)
    } else {
        return action.payload.pinned.concat(action.payload.notes)
    }
}

const updateNote = (state, action) => {
    const idx = state.notesList.findIndex(n => n._id === action.payload._id)

    return [
        ...state.notesList.slice(0, idx),
        action.payload,
        ...state.notesList.slice(idx + 1)
    ]
}

const createNote = (state, action) => {
    const note = action.payload
    return [note].concat(state.notesList)
}

const deleteNote = (state, action) => {
    const note = action.payload
    const idx = state.notesList.findIndex(n => n._id === note)

   return [
       ...state.notesList.slice(0, idx),
       ...state.notesList.slice(idx + 1)
   ]
}

export const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        // GET NOTES CASES
        case NOTES_GET_REQUEST:
            return {
                ...state,
                getNotes: {
                    loading: true,
                },
                fetching: {
                    loading: true,
                    progress: 0
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
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTES_GET_FAIL: 
            return {
                ...state,
                getNotes: {
                    loading: false,
                    error: action.payload,
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTES_GET_FETCHING_PROGRESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    progress: action.payload,
                }
            }

        // CREATE NOTES CASES
        case NOTE_CREATE_REQUEST: 
            return {
                ...state,
                createNote: {
                    loading: true,
                },
                fetching: {
                    loading: true,
                    progress: 0
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
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTE_CREATE_FAIL:
            return {
                ...state,
                createNote: {
                    loading: false,
                    error: action.payload,
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTE_CREATE_FETCHING_PROGRESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    progress: action.payload,
                }
            }

        // UPDATE NOTES CASES
        case EDITING_NOTE_SET:  
            return {
                ...state,
                editingNote: action.payload,
            }
        case EDITING_NOTE_RESET: 
            return {
                ...state,
                editingNote: null,
            }
        case NOTE_UPDATE_REQUEST:
            return {
                ...state,
                updateNote: {
                    loading: true,
                },
                fetching: {
                    loading: true,
                    progress: 0
                }
            }
        case NOTE_UPDATE_SUCCESS:
            return {
                ...state,
                notesList: updateNote(state, action),
                updateNote: {
                    loading: false,
                    success: true,
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTE_UPDATE_FAIL:
            return {
                ...state,
                updateNote: {
                    loading: false,
                    error: action.payload,
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTE_UPDATE_FETCHING_PROGRESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    progress: action.payload,
                }
            }
        
        // DELETE NOTES CASES
        case NOTE_DELETE_REQUEST:
            return {
                ...state,
                deleteNote: {
                    loading: true,
                },
                fetching: {
                    loading: true,
                    progress: 0
                }
            }
        case NOTE_DELETE_SUCCESS:
            const notesList = deleteNote(state, action)
            return {
                ...state,
                notesList: notesList,
                deleteNote: {
                    loading: false,
                    success: true,
                },
                fetching: {
                    loading: false,
                    progress: 100
                },
                regularCount: state.regularCount - 1 
            }
        case NOTE_DELETE_FAIL: 
            return {
                ...state,
                deleteNote: {
                    loading: false,
                    error: action.payload,
                },
                fetching: {
                    loading: false,
                    progress: 100
                }
            }
        case NOTE_DELETE_FETCHING_PROGRESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    progress: action.payload,
                }
            }

        // FILTERING, SEARCHING, PAGE SET
        case NOTES_FETCHING_PROGRESS: 
            return {
                ...state,
                fetching: {
                    progress: action.payload,
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
