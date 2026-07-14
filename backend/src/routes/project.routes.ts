import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { type, status, state } = req.query
    const where: any = { isPublished: true }
    if (type) where.type = String(type).toUpperCase()
    if (status) where.status = String(status).toUpperCase()
    if (state) where.state = String(state)

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: { id: true, slug: true, title: true, type: true, status: true, location: true, state: true, area: true, images: true },
    })
    res.json({ projects })
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug, isPublished: true },
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

export default router
