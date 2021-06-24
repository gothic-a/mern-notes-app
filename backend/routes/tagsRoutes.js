import { Router } from 'express'

import protect from '../middlewears/authMiddleware.js'
import { 
    createTag, 
    deleteTag, 
    getUserTags,
    updateTag 
} from '../controllers/tagControllers.js'

const router = Router()

router.route('/')
    .get(protect, getUserTags)
    .post(protect, createTag)

router.route('/:id')
    .put(protect, updateTag)
    .delete(protect, deleteTag)

export default router