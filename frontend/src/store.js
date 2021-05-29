import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer 
})

const middlewares = [thunk]

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 

const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage
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

