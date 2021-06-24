import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/userConstants'

export const userLogin = ({ email, password }) => async (dispatch, getState) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    })

    const config = {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    try {
        const { data } = await axios.post('/api/users/login', { email, password }, config) 

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userData', JSON.stringify(getState().userLogin.userData))
    } catch(error) {
        const payload = (
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        )

        dispatch({
            type: USER_LOGIN_FAIL,
            payload
        })
    }       
}

export const userLogout = () => (dispatch) => {
    dispatch({type: USER_LOGOUT})

    localStorage.removeItem('userData')
}

export const userRegister = ({email, name, password, confirmPassword}) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })

    const config = {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    try {
        if(password !== confirmPassword) throw new Error('Passwords missmatch')

        const response = await axios.post('/api/users', {email, name, password, confirmPassword}, config)

        if(response.status === 201) {
            dispatch({
                type: USER_REGISTER_SUCCESS
            })

            dispatch(userLogin({email, password}))
        }

    } catch(error) {
        const payload = (
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        )

        dispatch({
            type: USER_REGISTER_FAIL,
            payload
        })
    }
}