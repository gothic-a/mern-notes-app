import { useState, useEffect, useRef } from "react"

const ProgressBar = ({progress, isFetching}) => {
    const progressLine = useRef(null)
    const [width, setWidth] = useState(0) 
    const [visible, setVisible] = useState(false)
    const [widthInterval, setWidthInterval] = useState(null)

    useEffect(() => {
        if(progress > 10) {
            setWidth(progress)
            clearInterval(widthInterval)
        }
    }, [progress])

    useEffect(() => {
        if(isFetching) {
            setVisible(true)
        } else if(isFetching === undefined) {
            setVisible(false)
            setWidth(0)
        }
    }, [isFetching])

    useEffect(() => {
        if(visible) {
            setWidthInterval(
                setInterval(() => {
                    if(width < 60) setWidth(w => w + 5)
                }, 100)
            )
        } else {
            setWidth(0)
        } 

    }, [visible])

    const transitionHandler = (e) => {
        setVisible(false)
    }

    return (
        <div 
            className="progress-bar"
        >
            {
                visible && (
                    <div 
                        className="progress-bar__line" 
                        style={{width: `${width}%`}}
                        onTransitionEnd={transitionHandler}
                        ref={progressLine}
                    >
                    </div>
                ) 
            }
            
        </div>
    )
}

export default ProgressBar