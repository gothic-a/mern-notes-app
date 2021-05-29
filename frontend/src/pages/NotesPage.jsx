import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const NotesPage = () => {

    const { userInfo } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(!userInfo) {
            history.push('/identity')
        }
    })

    return (
        <div className="notes-page">
            notes
        </div>
    )
}

export default NotesPage