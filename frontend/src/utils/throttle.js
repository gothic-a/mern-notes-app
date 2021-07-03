const throttle = (fun, delay) => {
    let prevCall = new Date()
    let timeout

    return (...args) => {
        const time = new Date()
        clearTimeout(timeout)

        if((time - prevCall) > delay) {
            prevCall = time

            return fun(...args)
        } else {
            timeout = setTimeout(() => {
                prevCall = new Date()
                return fun(...args)
            }, (prevCall - time) + delay ) 
        }
    }
}

export default throttle