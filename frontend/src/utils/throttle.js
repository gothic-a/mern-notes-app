const throttle = (fun, delay) => {
    let prevCall = new Date()

    return (...args) => {
        const time = new Date()

        if((time - prevCall) > delay) {
            prevCall = time

            return fun(...args)
        }
    }
}

export default throttle