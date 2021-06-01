const errorMidd = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode
    res.status(status)
    res.json({
        message: err.message,
        stack: err.stack
    })
}

export default errorMidd