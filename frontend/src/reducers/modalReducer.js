import { SET_MODAL_VISABILITY } from "../constants/modalConstants"

export const modalReducer = (state = { isOpen: false }, action) => {
    switch(action.type) {
        case SET_MODAL_VISABILITY:
            const prev = state.isOpen
            return {
                isOpen: !prev
            }
        default:
            return state
    }
}