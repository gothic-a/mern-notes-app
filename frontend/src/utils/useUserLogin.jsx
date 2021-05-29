import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useUserLogin = () => {

    const history = useHsitory()

    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userInfo && userInfo.login) {
            history.push(`/notes/${userInfo.login}`)
        } else {
            history.push()
        }

    }, [userInfo, history])

}

export default useUserLogin