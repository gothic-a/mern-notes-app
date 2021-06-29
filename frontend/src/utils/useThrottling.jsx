import { useState, useEffect } from "react";

const useThrottling = (fun) => {
    const [prevCall, setPrevCall] = useState(null)

    useEffect(() => {
        const time = new Date()

        if(time - prevCall > 100) {
            fun()
            setPrevCall(time)
        }
    }, [fun])

}

export default useThrottling