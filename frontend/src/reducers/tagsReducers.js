import {
    TAGS_GET_REQUEST,
    TAGS_GET_SUCCESS,
    TAGS_GET_FAIL,
    TAG_CREATE_REQUEST,
    TAG_CREATE_SUCCESS,
    TAG_CREATE_FAIL,
    TAG_UPDATE_REQUEST,
    TAG_UPDATE_SUCCESS,
    TAG_UPDATE_FAIL,
    TAG_UPDATE_RESET,
    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_DELETE_FAIL,
} from '../constants/tagsConstants'

const initialState = {
    tagsList: [],
    tagsGet: {},
    tagsUpdate: {},
    tagsCreate: {},
    tagsDelete: {},
}

const addTag = ({tagsList}, action) => {
    return [action.payload].concat(tagsList)
}

const deleteTag = ({tagsList}, action) => {
    const idx = tagsList.findIndex(t => t._id === action.payload)

    return [
        ...tagsList.slice(0, idx),
        ...tagsList.slice(idx + 1)
    ]
} 

const updateTag = ({tagsList}, action) => {
    const { payload } = action

    const idx = tagsList.findIndex(t => t._id === payload._id)

    return [
        ...tagsList.slice(0, idx), 
        payload, 
        ...tagsList.slice(idx + 1)
    ]
}

export const tagsReducer = (state = initialState, action) => {
    switch(action.type) {

        case TAGS_GET_REQUEST: 
            return {
                ...state,
                tagsGet: {
                    loading: true
                }
            }
        case TAGS_GET_SUCCESS: 
            return {
                ...state,
                tagsList: action.payload,
                tagsGet: {
                    success: true,
                    loading: false 
                }
            }
        case TAGS_GET_FAIL: 
            return {
                ...state,
                tagsGet: {
                    loading: false,
                    error: action.payload
                }
            }

        case TAG_CREATE_REQUEST:
            return {
                ...state,
                tagsCreate: {
                    loading: true 
                }
            }
        case TAG_CREATE_SUCCESS:
            return {
                ...state,
                tagsList: addTag(state, action),
                tagCreate: {
                    loading: false,
                    success: true,
                }
            }
        case TAG_CREATE_FAIL: 
            return {
                ...state,
                tagsCreate: {
                    loading: false,
                    error: action.payload
                }
            }

        case TAG_UPDATE_REQUEST:
            return {
                ...state,
                tagsUpdate: {
                    loading: true
                }
            }
        case TAG_UPDATE_SUCCESS:
            return {
                ...state,
                tagsList: updateTag(state, action),
                tagsUpdate: {
                    loading: false,
                    success: true
                }
            }
        case TAG_UPDATE_FAIL:
            return {
                ...state, 
                tagsUpdate: {
                    loading: false,
                    error: action.payload
                }
            }
        case TAG_UPDATE_RESET:
            return {
                ...state,
                tagsUpdate: {}
            }

        case TAG_DELETE_REQUEST:
            return {
                ...state,
                tagsDelete: {
                    loading: true,
                }
            }
        case TAG_DELETE_SUCCESS: 
            return {
                ...state,
                tagsList: deleteTag(state, action),
                tagsDelete: {
                    loading: false,
                    success: true,
                }
            }
        case TAG_DELETE_FAIL: 
            return {
                ...state,
                tagsDelete: {
                    loading: false,
                    error: action.payload
                }
            }
        
        default: 
            return state
    }
}

