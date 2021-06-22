import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    userLoginReducer, 
    userRegisterReducer 
} from './reducers/userReducers'
import { sidebarReducer } from './reducers/sidebarReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,   
    sidebar: sidebarReducer,
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

