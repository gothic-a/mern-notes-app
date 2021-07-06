import axios from 'axios'
import {
    NOTES_GET_REQUEST,
    NOTES_GET_SUCCESS,
    NOTES_GET_FAIL,
    NOTES_GET_FETCHING_PROGRESS,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAIL,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAIL,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
    NOTES_LIST_PAGE_INCREASE,
    SET_FILTER,
    SET_SEARCH_QUERY,
    EDITING_NOTE_SET,
    EDITING_NOTE_RESET
} from '../constants/notesConstants'
import { download, upload } from '../utils/onProgress'

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

export const getNotes = (page = 1, filter = '', search = '') => async (dispatch, getState) => {
    request()

    filter = filter === 'all' ? '' : filter  

    try {
        const config = getConfig(getState())
        config.onDownloadProgress = download(progress)

        const { data } = await axios.get(`/api/notes?page=${page}&filter=${filter}&search=${search}`, config)
        success(data)
    } catch(error) {
        const payload = getError(error)
        fail(payload)
    }

    function request() {dispatch({type: NOTES_GET_REQUEST})}
    function success(data) {dispatch({type: NOTES_GET_SUCCESS, payload: data})}
    function fail(error) {dispatch({type: NOTES_GET_FAIL, payload: error})}
    function progress(percent) {dispatch({type: NOTES_GET_FETCHING_PROGRESS, payload: percent})}
}

export const createNote = (note) => async (dispatch, getState) => {
    request()

    try {
        const config = getConfig(getState(), 1)

        const { data } = await axios.post(`/api/notes`, note, config)
        return success(data)
    } catch(error) {
        const payload = getError(error)
        return fail(payload)
    }

    function request() {return dispatch({type: NOTE_CREATE_REQUEST})}
    function success(note) {return dispatch({type: NOTE_CREATE_SUCCESS, payload: note})}
    function fail(error) {return dispatch({type: NOTE_CREATE_FAIL, payload: error})}
}

export const updateNote = (id, note) => async(dispatch, getState) => {

    request()

    try {
        const config = getConfig(getState(), 1)

        const { data } = await axios.put(`/api/notes/${id}`, note, config)
        return success(data)
    } catch(error) {
        const payload = getError(error)
        fail(payload)
    }

    function request() { return dispatch({type: NOTE_UPDATE_REQUEST})}
    function success(note) { return dispatch({type: NOTE_UPDATE_SUCCESS, payload: note})}
    function fail(error) { return dispatch({type: NOTE_UPDATE_FAIL, payload: error})}
}

export const setEditingNote = (id) => {
    if (id) return { type: EDITING_NOTE_SET, payload: id }
    else return { type: EDITING_NOTE_RESET }
}

export const deleteNote = (id) => async(dispatch, getState) => {
    request()

    try {
        const config = getConfig(getState())

        await axios.delete(`/api/notes/${id}`, config)
        success(id)
    } catch(error) {
        const payload = getError(error)
        fail(payload)
    }

    function request() {dispatch({type: NOTE_DELETE_REQUEST})}
    function success(id) {dispatch({type: NOTE_DELETE_SUCCESS, payload: id})}
    function fail(error) {dispatch({type: NOTE_DELETE_FAIL, payload: error})}
}

export const pageEncrease = () => {
    return { type: NOTES_LIST_PAGE_INCREASE }
}

export const setSearchQuery = (query) => {
    return { type: SET_SEARCH_QUERY, payload: query }
}

export const setFilter = (filter) => {
    return { type: SET_FILTER, payload: filter }
}