import {
    SET_SIDEBAR_CLOSE,
    SET_SIDEBAR_OPEN
} from '../constants/sidebarConstants'

export const sidebarToggle = () => (dispatch, getState) => {
    const { isOpen } = getState().sidebar

    if(isOpen) {
        dispatch({type: SET_SIDEBAR_CLOSE})
    } else {
        dispatch({type: SET_SIDEBAR_OPEN})
    }
}