import { Router } from 'express'
import { workerSendOtp, workerVerifyOtp, adminLogin } from '../controllers/auth.controller'

const router = Router()

router.post('/worker/send-otp', workerSendOtp)
router.post('/worker/verify-otp', workerVerifyOtp)
router.post('/admin/login', adminLogin)

export default router
