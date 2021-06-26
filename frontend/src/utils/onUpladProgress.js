const onUploadProgress = (progressEvent) => {
    const total = progressEvent.srcElement.getResponseHeader('x-content-length')
    const percentCompleted = Math.round((progressEvent.loaded * 100) / total)
}

export default onUploadProgress