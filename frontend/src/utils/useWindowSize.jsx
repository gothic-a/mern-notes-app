import { useState, useEffect } from 'react'

const getWindowSize = () => {
    const { innerHeight: height, innerWidth: width } = window
    return {
        height,
        width
    }
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({})  

    useEffect(() => {
        const resizeHandler = () => {
            setWindowSize(getWindowSize())
        }

        window.addEventListener('onresize', resizeHandler)

        return () => window.removeEventListener('onresize', resizeHandler)
    }, [])

    return windowSize
}

export default useWindowSize