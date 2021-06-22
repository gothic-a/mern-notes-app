import { 
    SET_SIDEBAR_CLOSE, 
    SET_SIDEBAR_OPEN 
} from "../constants/sidebarConstants"

export const sidebarReducer = (state = { isOpen: true }, action) => {
    switch (action.type) {
        case SET_SIDEBAR_CLOSE: 
            return {
                isOpen: false
            }
        case SET_SIDEBAR_OPEN:
            return {
                isOpen: true
            }
        default:
            return state
    }
}