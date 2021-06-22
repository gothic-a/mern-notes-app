import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../components/Loader'

const StartPage = () => {

    const { userData } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(userData && userData.token) {
            history.push(`/notes/${userData.name}`)
        } else {
            history.push('/identity')
        }
    })

    return (
        <div className="start-page"><Loader/></div>
    )
}

export default StartPage