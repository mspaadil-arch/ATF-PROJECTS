import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import PDFDocument from 'pdfkit'
import { AuthRequest } from '../middleware/auth.middleware'

const prisma = new PrismaClient()

// ─── WORKERS ─────────────────────────────────────────────────────────────────
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const { search, siteId, isActive, page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const where: any = {}
    if (search) where.OR = [
      { name: { contains: String(search), mode: 'insensitive' } },
      { workerId: { contains: String(search), mode: 'insensitive' } },
    ]
    if (siteId) where.siteId = String(siteId)
    if (isActive !== undefined) where.isActive = isActive === 'true'

    const [workers, total] = await Promise.all([
      prisma.worker.findMany({ where, skip, take: Number(limit), orderBy: { name: 'asc' }, include: { site: true } }),
      prisma.worker.count({ where }),
    ])
    res.json({ workers, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch {
    res.status(500).json({ error: 'Failed to fetch workers' })
  }
}

const addWorkerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  skill: z.string().min(2),
  dailyWage: z.number().positive(),
  siteId: z.string().optional(),
  aadhaarLast4: z.string().length(4).optional(),
})

export const addWorker = async (req: Request, res: Response) => {
  try {
    const data = addWorkerSchema.parse(req.body)
    const count = await prisma.worker.count()
    const workerId = `ATF-W-${String(count + 1).padStart(5, '0')}`
    const worker = await prisma.worker.create({ data: { ...data, workerId } })
    res.status(201).json({ message: 'Worker added', worker })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to add worker' })
  }
}

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
const paymentSchema = z.object({
  workerId: z.string().min(1),
  amount: z.number().positive(),
  mode: z.enum(['CASH', 'UPI', 'NEFT', 'IMPS', 'RTGS', 'CHEQUE']),
  paidAt: z.string().optional(),
  reference: z.string().optional(),
  remarks: z.string().optional(),
})

export const recordPayment = async (req: AuthRequest, res: Response) => {
  try {
    const data = paymentSchema.parse(req.body)
    const worker = await prisma.worker.findFirst({ where: { workerId: data.workerId } })
    if (!worker) return res.status(404).json({ error: 'Worker not found' })

    const payment = await prisma.payment.create({
      data: {
        workerId: worker.id,
        amount: data.amount,
        mode: data.mode,
        status: 'PAID',
        paidAt: data.paidAt ? new Date(data.paidAt) : new Date(),
        reference: data.reference,
        remarks: data.remarks,
        recordedBy: req.user?.id,
      },
    })
    res.status(201).json({ message: 'Payment recorded', payment })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to record payment' })
  }
}

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────
const attendanceSchema = z.array(z.object({
  workerId: z.string(),
  siteId: z.string(),
  date: z.string(),
  status: z.enum(['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE', 'HOLIDAY']),
  hours: z.number().optional(),
}))

export const recordAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const records = attendanceSchema.parse(req.body)
    const created = await Promise.all(records.map(async (r) => {
      const worker = await prisma.worker.findFirst({ where: { workerId: r.workerId } })
      if (!worker) return null
      return prisma.attendance.upsert({
        where: { workerId_date: { workerId: worker.id, date: new Date(r.date) } },
        update: { status: r.status, hours: r.hours, markedBy: req.user?.id },
        create: { workerId: worker.id, siteId: r.siteId, date: new Date(r.date), status: r.status, hours: r.hours, markedBy: req.user?.id },
      })
    }))
    res.json({ message: `${created.filter(Boolean).length} records saved` })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to record attendance' })
  }
}

// ─── REPORTS ─────────────────────────────────────────────────────────────────
export const getReports = async (req: Request, res: Response) => {
  try {
    const { type } = req.params
    const { siteId, workerId, month, year } = req.query

    if (type === 'site-payments') {
      const data = await prisma.payment.groupBy({
        by: ['workerId'],
        _sum: { amount: true },
        _count: { id: true },
      })
      return res.json({ data })
    }

    if (type === 'pending') {
      // Workers with unpaid wages — simplified
      const workers = await prisma.worker.findMany({
        where: { isActive: true },
        include: { payments: { where: { status: 'PENDING' } } },
      })
      return res.json({ workers: workers.filter(w => w.payments.length > 0) })
    }

    res.status(400).json({ error: 'Unknown report type' })
  } catch {
    res.status(500).json({ error: 'Failed to generate report' })
  }
}

// ─── DISPUTES ─────────────────────────────────────────────────────────────────
export const resolveDispute = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { resolution, status } = req.body
    const dispute = await prisma.dispute.update({
      where: { id },
      data: {
        status,
        resolution,
        resolvedAt: new Date(),
        resolvedBy: req.user?.id,
      },
    })
    res.json({ message: 'Dispute updated', dispute })
  } catch {
    res.status(500).json({ error: 'Failed to update dispute' })
  }
}

// ─── PAYMENT SLIP PDF ─────────────────────────────────────────────────────────
export const generateSlip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { worker: { include: { site: true } } },
    })
    if (!payment) return res.status(404).json({ error: 'Payment not found' })

    const doc = new PDFDocument({ size: 'A5', margin: 40 })
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=slip-${id}.pdf`)
    doc.pipe(res)

    // PDF content
    doc.fontSize(18).font('Helvetica-Bold').text('ATF PROJECTS', { align: 'center' })
    doc.fontSize(10).font('Helvetica').text('Payment Slip', { align: 'center' })
    doc.moveDown(1.5)
    doc.fontSize(10).font('Helvetica-Bold').text('Worker Details:')
    doc.font('Helvetica')
      .text(`Name: ${payment.worker.name}`)
      .text(`Worker ID: ${payment.worker.workerId}`)
      .text(`Site: ${payment.worker.site?.name || 'N/A'}`)
      .text(`Skill: ${payment.worker.skill}`)
    doc.moveDown()
    doc.font('Helvetica-Bold').text('Payment Details:')
    doc.font('Helvetica')
      .text(`Amount: ₹${payment.amount.toLocaleString('en-IN')}`)
      .text(`Mode: ${payment.mode}`)
      .text(`Date: ${payment.paidAt?.toLocaleDateString('en-IN')}`)
      .text(`Reference: ${payment.reference || 'N/A'}`)
    doc.moveDown(2)
    doc.fontSize(8).text('This is a computer-generated slip. No signature required.', { align: 'center' })

    doc.end()
  } catch {
    res.status(500).json({ error: 'Failed to generate slip' })
  }
}
