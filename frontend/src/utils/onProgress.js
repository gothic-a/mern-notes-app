export const upload = (callback) => {
    return (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(progressEvent)
        callback(percentCompleted)
    }
    
}

export const download = (callback) => {
    return (progressEvent) => {

        const total = progressEvent.srcElement.getResponseHeader('x-content-length')
        const percentCompleted = Math.round((progressEvent.loaded * 100) / total || progressEvent.total)

        console.log(progressEvent.loaded)
        console.log(total)

        callback(percentCompleted)
    }
}
