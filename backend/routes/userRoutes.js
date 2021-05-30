import { Router } from 'express'
import { userRegister, userLogin } from '../controllers/userControllers.js'

const router = Router()

router.route('/').post(userRegister)
router.route('/login').post(userLogin)

export default router