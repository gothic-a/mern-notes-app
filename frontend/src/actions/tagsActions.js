import axios from 'axios'
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
    TAGS_RESET
} from '../constants/tagsConstants'

const getConfig = ({ userLogin }, isContent = false) => {
    const { userData: { token } } = userLogin

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }

    return config
}

const getError = (error) => {
    return (
        error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
    )
}

export const getTags = () => async (dispatch, getState) => {
    request()
    const config = getConfig(getState())

    try {
        const { data: { tags }} = await axios.get('/api/tags', config)
        success(tags)
    } catch(error) {  
        const payload = getError(error)
        fail(payload)
    }

    function request() {dispatch({type: TAGS_GET_REQUEST})}
    function success(tags) {dispatch({type: TAGS_GET_SUCCESS, payload: tags})}
    function fail(error) {dispatch({type: TAGS_GET_FAIL, payload: error})}
} 

export const createTag = (tagName) => async (dispatch, getState) => {
    request()
    const config = getConfig(getState(), 'content')

    try {
        const { data: { tag } } = await axios.post('/api/tags', { tagName }, config)
        success(tag)
    } catch(error) {
        const payload = getError(error)

        fail(payload)
    }

    function request() {dispatch({type: TAG_CREATE_REQUEST})}
    function success(tag) {dispatch({type: TAG_CREATE_SUCCESS, payload: tag})}
    function fail(error) {dispatch({type: TAG_CREATE_FAIL, payload: error})}
}

export const deleteTag = (id) => async (dispatch, getState) => {
    request()
    const config = getConfig(getState())

    try {
        const { status } = await axios.delete(`/api/tags/${id}`, config)
        if(status === 200) success(id)
    } catch(error) {
        const payload = getError(error)
        fail(payload)
    }

    function request() {dispatch({type: TAG_DELETE_REQUEST})}
    function success(id) {dispatch({type: TAG_DELETE_SUCCESS, payload: id})}
    function fail(error) {dispatch({type: TAG_DELETE_FAIL, payload: error})}
}

export const updateTag = ({id, newName}) => async (dispatch, getState) => {
    request()
    const config = getConfig(getState(), 'content')

    try {
        const { data: { tag } } = await axios.put(`/api/tags/${id}`, { newName }, config)
        success(tag)
    } catch(error) {
        const payload = getError(error)

        fail(payload)
    }

    function request() {dispatch({type: TAG_UPDATE_REQUEST})}
    function success(tag) {dispatch({type: TAG_UPDATE_SUCCESS, payload: tag})}
    function fail(error) {dispatch({type: TAG_UPDATE_FAIL, payload: error})}
}

export const resetUpdate = () => ({type: TAG_UPDATE_RESET})

export const resetTags = () => {
    console.log('logout')
    return { type: TAGS_RESET }
}
