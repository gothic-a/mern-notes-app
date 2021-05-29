import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StartPage = () => {

    const { userInfo } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(userInfo && userInfo.login) {
            history.push(`/notes/${userInfo.login}`)
        } else {
            history.push('/identity')
        }
    })

    return (
        <div className="start-page">loading...</div>
    )
}

export default StartPage