import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StartPage = () => {

    const { userData } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(userData && userData.email) {
            history.push(`/notes/${userData.email}`)
        } else {
            history.push('/identity')
        }
    })

    return (
        <div className="start-page">loading...</div>
    )
}

export default StartPage