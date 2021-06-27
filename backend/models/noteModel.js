import mongoose from 'mongoose'

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
            default: ''
        },
        text: {
            type: String,
            required: false,
            default: ''
        },
        color: {
            type: String,
            required: true,
            default: '#fff'
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        pinned: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model('Note', noteSchema)

export default Note