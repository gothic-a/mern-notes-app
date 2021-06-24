import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {

        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const { id } = jwt.decode(token, process.env.JWT_SECRET)

            const user = await User.findById(id)

            req.user = user

            next()
        } catch(err) {
            res.status(401)
            throw new Error('Authorization error, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorizate, no token')
    }

}) 

export default protect