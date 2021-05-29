import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import IdentityToggle from '../components/IdentityToggle'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginPage = () => {
    const [selected, setSelected] = useState('register') 

    const history = useHistory()
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userInfo && userInfo.login) {
            history.push(`/notes/${userInfo.login}`)
        }
    }, [history, userInfo])

    const onToggleHandler = (value) => {
        setSelected(value)
    }

    return (
        <div className="identity-page">
            
            <div className="identity-page__container">

                <IdentityToggle onToggleHandler={onToggleHandler} active={selected}/>
                <div className="form-container">
                    {
                        selected === 'register' 
                            ? <Register /> 
                            : <Login />
                    }
                </div>
                
            </div>
            
        </div>
    )
}

export default LoginPage