import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

export const userLogin = asyncHandler( async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email}) 

    if(user && await user.comparePassword(password)) {
        res.json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw Error('Incorrect email or password')
    }
})

export const userRegister = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error('User alredy exist')
    }

    try {
        const user = await User.create({
            name,
            email,
            password,
        }) 

        if(user) {
            res.status(201)
            res.json({
                name: user.name, 
                email: user.email,
            })
        }

    } catch(err) {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

export default userRegister

