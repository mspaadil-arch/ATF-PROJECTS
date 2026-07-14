import { Router } from 'express'
import { protect, requireAdmin } from '../middleware/auth.middleware'
import {
  getWorkers, addWorker, recordPayment,
  recordAttendance, getReports, resolveDispute, generateSlip
} from '../controllers/admin.controller'

const router = Router()
router.use(protect, requireAdmin)

router.get('/workers', getWorkers)
router.post('/workers', addWorker)
router.post('/payments', recordPayment)
router.post('/attendance', recordAttendance)
router.get('/reports/:type', getReports)
router.patch('/disputes/:id/resolve', resolveDispute)
router.get('/payments/:id/slip', generateSlip)

export default router
