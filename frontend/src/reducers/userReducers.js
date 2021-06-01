import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/userConstants'

const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                error: false,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case USER_LOGIN_FAIL: 
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                error: false,
                loading: true
            }
        case USER_REGISTER_SUCCESS: 
            return {
                loading: false,
                succsess: true,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export {
    userLoginReducer,
    userRegisterReducer,
}