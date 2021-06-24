import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../actions/userActions'
import { sidebarToggle } from '../actions/sidebarAction'

import SearchBar from './SearchBar'

const Header = () => {
    const history = useHistory()

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userLogin)

    const burgerClickHandler = () => {
        dispatch(sidebarToggle())
    }

    const logoutClickHandler = () => {
        dispatch(userLogout())
        history.push('/identity')
    }

    return (
        <div className="notes-page__header">
            <div 
                className="burger"
                onClick={burgerClickHandler}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <SearchBar />
            <div className="profile">
                <span className="profile__name">
                    { userData.name }
                </span>
                <div 
                    className="profile__logout" 
                    onClick={logoutClickHandler}
                >
                    <i className="far fa-sign-out"></i>
                </div>
            </div>
        </div>
    )
}

export default Header