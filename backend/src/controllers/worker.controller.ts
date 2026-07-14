import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AuthRequest } from '../middleware/auth.middleware'

const prisma = new PrismaClient()

export const getMyPayments = async (req: AuthRequest, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { workerId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    res.json({ payments })
  } catch {
    res.status(500).json({ error: 'Failed to fetch payments' })
  }
}

export const getMyAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { month, year } = req.query
    const now = new Date()
    const y = Number(year) || now.getFullYear()
    const m = Number(month) || now.getMonth() + 1

    const start = new Date(y, m - 1, 1)
    const end = new Date(y, m, 0)

    const records = await prisma.attendance.findMany({
      where: {
        workerId: req.user!.id,
        date: { gte: start, lte: end },
      },
      orderBy: { date: 'desc' },
    })
    res.json({ records, month: m, year: y })
  } catch {
    res.status(500).json({ error: 'Failed to fetch attendance' })
  }
}

const disputeSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(10),
  paymentDate: z.string().optional(),
})

export const raiseDispute = async (req: AuthRequest, res: Response) => {
  try {
    const data = disputeSchema.parse(req.body)
    const dispute = await prisma.dispute.create({
      data: {
        workerId: req.user!.id,
        type: data.type,
        description: data.description,
        paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
      },
    })
    res.status(201).json({ message: 'Dispute submitted', dispute })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to raise dispute' })
  }
}
