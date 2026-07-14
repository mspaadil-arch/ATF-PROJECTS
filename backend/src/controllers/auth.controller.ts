import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { generateOtp, sendSmsOtp } from '../services/otp.service'

const prisma = new PrismaClient()

const sendOtpSchema = z.object({
  workerId: z.string().min(1),
  phone: z.string().regex(/^[6-9]\d{9}$/),
})

const verifyOtpSchema = z.object({
  workerId: z.string().min(1),
  otp: z.string().length(6),
})

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const workerSendOtp = async (req: Request, res: Response) => {
  try {
    const { workerId, phone } = sendOtpSchema.parse(req.body)

    const worker = await prisma.worker.findFirst({
      where: { workerId, phone, isActive: true },
    })
    if (!worker) return res.status(404).json({ error: 'Worker not found or inactive' })

    // Invalidate old OTPs
    await prisma.otpCode.updateMany({
      where: { workerId: worker.id, used: false },
      data: { used: true },
    })

    const code = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

    await prisma.otpCode.create({
      data: { workerId: worker.id, code, expiresAt },
    })

    await sendSmsOtp(phone, code)

    res.json({ message: 'OTP sent successfully', expiresIn: 600 })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    console.error(err)
    res.status(500).json({ error: 'Failed to send OTP' })
  }
}

export const workerVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { workerId, otp } = verifyOtpSchema.parse(req.body)

    const worker = await prisma.worker.findFirst({
      where: { workerId, isActive: true },
    })
    if (!worker) return res.status(404).json({ error: 'Worker not found' })

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        workerId: worker.id,
        code: otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    })

    if (!otpRecord) return res.status(400).json({ error: 'Invalid or expired OTP' })

    // Mark as used
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { used: true },
    })

    const token = jwt.sign(
      { id: worker.id, role: 'WORKER' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      worker: {
        id: worker.id,
        workerId: worker.workerId,
        name: worker.name,
        skill: worker.skill,
        siteId: worker.siteId,
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    console.error(err)
    res.status(500).json({ error: 'Verification failed' })
  }
}

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = adminLoginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email, isActive: true } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
}
