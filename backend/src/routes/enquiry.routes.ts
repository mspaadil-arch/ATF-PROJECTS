import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(10),
})

router.post('/', async (req, res) => {
  try {
    const data = schema.parse(req.body)
    const enquiry = await prisma.enquiry.create({ data })
    res.status(201).json({ message: 'Enquiry received. We\'ll contact you within 24 hours.', id: enquiry.id })
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to submit enquiry' })
  }
})

export default router
