import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Header from '../components/Header'
import SideBar from '../components/SideBar'
import NotesView from '../components/NotesView'

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
            {
                userData && (
                    <>
                        <Header />
                        <div className="notes-page__content-wrapper">
                            <SideBar />
                            <NotesView />
                        </div>
                    </>
                )
            }
                
        </div>
    )
}

export default NotesPage