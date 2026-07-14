import { Router } from 'express'
import { protect, requireWorker } from '../middleware/auth.middleware'
import { getMyPayments, getMyAttendance, raiseDispute } from '../controllers/worker.controller'

const router = Router()

router.use(protect, requireWorker)
router.get('/payments', getMyPayments)
router.get('/attendance', getMyAttendance)
router.post('/disputes', raiseDispute)

export default router
