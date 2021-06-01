import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,   
})

const middlewares = [thunk]

const userInfoFromLocalStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null 

const initialState = {
    userLogin: {
        userData: userInfoFromLocalStorage
    }
}

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
)

export default store

