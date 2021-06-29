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
import { modalReducer } from './reducers/modalReducer'
import { tagsReducer } from './reducers/tagsReducers'
import { notesReducer } from './reducers/notesReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,   
    sidebar: sidebarReducer,
    modal: modalReducer,
    tags: tagsReducer,
    notes: notesReducer,
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

