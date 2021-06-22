import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import IdentityToggle from '../components/IdentityToggle'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginPage = () => {
    const [selected, setSelected] = useState('register') 

    const history = useHistory()
    const { userData } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userData && userData.token) {
            history.push(`/notes/${userData.name}`)
        }
    }, [history, userData])

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