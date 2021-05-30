const errorMidd = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode
    res.status(status)
    res.json({
        error: err.message,
        stack: err.stack
    })
}

export default errorMidd