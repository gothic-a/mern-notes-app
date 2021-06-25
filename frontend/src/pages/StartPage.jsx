import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../components/Loader'

const StartPage = () => {

    const { userData } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(userData && userData.token) {
            history.push(`/home/${userData.name}`)
        } else {
            history.push('/identity')
        }
    })

    return (
        <>
        </>
    )
}

export default StartPage