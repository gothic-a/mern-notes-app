import { useState, useEffect } from "react"

const useDebounce = (value) => {
    const [debouncedValue, setDebauncedValue] = useState('') 

    useEffect(() => {

        const timeout = setTimeout(() => {
            return setDebauncedValue(value)
        }, 400)

        return () => clearTimeout(timeout)
    })

    return debouncedValue
}

export default useDebounce