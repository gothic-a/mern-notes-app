import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginPage = () => {

    const history = useHistory()

    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userInfo && userInfo.login) {
            history.push(`/notes/${userInfo.login}`)
        }
    }, [history, userInfo])

    return (
        <div className="login-page">
            login
        </div>
    )
}

export default LoginPage