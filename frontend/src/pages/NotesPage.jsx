import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const NotesPage = () => {

    const { userData } = useSelector(state => state.userLogin)
    const history = useHistory()

    useEffect(() => {
        if(!userData) {
            history.push('/identity')
        } 
    }, [userData, history])

    return (
        <div className="notes-page">
            notes
        </div>
    )
}

export default NotesPage