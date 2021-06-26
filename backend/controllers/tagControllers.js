import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Tag from '../models/tagModel.js'

export const createTag = asyncHandler(async (req, res) => {

    try {
        const { _id } = req.user
        const tagName = req.body.tagName 

        const user = await User.findById(_id)

        const tag = await Tag.create({
            name: tagName,
            user: _id
        })

        if(tag) {
            user.tags.push(tag._id)
            user.save()

            res.status(201)
            res.json({tag})
        } else {
            res.status(400)
            throw new Error('Incorrect recieved data')
        }
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export const getUserTags = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const tags = await Tag.find({user: _id}).sort({createdAt: -1})

    if(tags) {
        const length = JSON.stringify(tags).length

        res.set('x-content-length', length)
        res.status(200)
        res.json({tags})
    } else {
        res.status(403)
        throw new Error('Access fail')
    }
}) 

export const updateTag = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { newName } = req.body 

    try {
        const tag = await Tag.findByIdAndUpdate(id, { name: newName }, {new: true, useFindAndModify: false}) 

        if(tag) {
            res.status(200)
            res.json({tag}) 
        } else {
            res.status(404)
            throw new Error('Updated tag not find')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Incorrect tag id')
    }
}) 

export const deleteTag = asyncHandler(async (req, res) => {
    const { id } = req.params 

    try {
        const result = await Tag.findByIdAndDelete(id) 

        if(result) {
            res.status(200)
            res.json('success')
        } else {
            res.status(404)
            throw new Error('Deleted tag not find')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Incorrect tag id')
    }
})