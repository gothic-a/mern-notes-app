import { Router } from 'express' 

import protect from '../middlewears/authMiddleware.js'
import {
    createNote, 
    deleteNote,
    updateNote,
    getNotes
} from '../controllers/noteControllers.js'

const router = Router()

router.route('/')
    .get(protect, getNotes)
    .post(protect, createNote)
    .delete(protect, deleteNote)
router.route('/:id')
    .put(protect, updateNote)
    .delete(protect, deleteNote)

export default router