import { 
    SET_MODAL_OPEN, 
    SET_MODAL_CLOSE 
} from "../constants/modalConstants"

export const toggleModal = (visability, content) => (dispatch) => {
    if (visability === 'open') {
        dispatch({type: SET_MODAL_OPEN, payload: content})
    } else {
        dispatch({type: SET_MODAL_CLOSE})
    }
}