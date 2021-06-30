import Note from "../models/noteModel.js"
import Tag from "../models/tagModel.js"
import User from "../models/userModel.js"
import asyncHandler from 'express-async-handler'

export const createNote = asyncHandler(async (req, res) => {
    const { _id: id } = req.user
    const data = { ...req.body } 

    try {
        const user = await User.findById(id)

        let tagsBelongToUser = true

        if(data.tags && data.tags.length !== 0) {
            data.tags.forEach(t => tagsBelongToUser = user.tags.includes(t))
        }

        if(tagsBelongToUser) {
            let note = await Note.create({
                ...data,
                user: id
            })

            user.notes.push(note._id)
            user.save()

            note = await note.populate('tags').execPopulate()
    
            res.status(200)
            res.json(note)
        } else {
            res.status(403)
            throw new Error('Tags do not belong to user')
        }

    } catch(error) {
        throw new Error(error.message)
    }
})

export const getNotes = asyncHandler(async (req, res) => {
    const page = +req.query.page || 1
    const pageSize = +req.query.pageSize || 5
    const filter = req.query.filter || ''
    const search = req.query.search || ''

    console.log(filter, search)

    const filterQuery = () => filter ? { tags: { $in: filter} } : ''

    const searchQuery = () => {
        if(!search) return ''
        const query = {
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: 'i',
                    }
                }, 
                {
                    text: {
                        $regex: search,
                        $options: 'i',
                    }
                }
            ]
        }
        return query
    }

    try {
        const count = await Note.find({user: req.user._id}).where({...filterQuery(), ...searchQuery()}).countDocuments()
        let notes = await Note.find({user: req.user._id, pinned: false})
            .where({...filterQuery(), ...searchQuery()})
            .sort({createdAt: -1})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .populate('tags')
            
        const pinned = await Note.find({user: req.user._id, pinned: true})
            .where({...filterQuery(), ...searchQuery()})
            .sort({updatedAt: -1})
            .populate('tags', ['_id', "name"])
        
        const pagesCount = Math.ceil((count - pinned.length) / pageSize)

        const pinnedCount = pinned.length

        res.status(200)
        res.json({count, pinnedCount, pinned, notes, page, pagesCount, pageSize})
    } catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const updateNote = asyncHandler(async (req, res) => {
    const { id } = req.params
    const note = { ...req.body }

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true, useFindAndModify: false })

        res.json(updatedNote)
    } catch(error) {
        res.status(400)
        throw new Error('Incorrect data')
    }
})

export const deleteNote = asyncHandler(async (req, res) => {
    let ids

    if(req.params.id) {
        ids = [req.params.id]
    } else {
        ids = req.body.ids
    }

    try {
        await Note.deleteMany({
            _id : {
                $in: ids
            }
        })

        const user = await User.findById(req.user._id)
        const newNotes = user.notes.filter(n => !ids.includes(n.toString()))
        user.notes = newNotes
        user.save()

        res.status(200)
        res.json('success')
    } catch(error) {
        res.status(404)
        throw new Error('Deleted notes not found')
    }
})