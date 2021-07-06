import { 
    SET_MODAL_OPEN,
    SET_MODAL_CLOSE 
} from "../constants/modalConstants"

export const modalReducer = (state = { isOpen: false }, action) => {
    switch(action.type) {
        case SET_MODAL_OPEN:
            return {
                isOpen: true,
                modalContent: action.payload,
            }
        case SET_MODAL_CLOSE:
            return {
                ...state,
                isOpen: false
            }
        default:
            return state
    }
}