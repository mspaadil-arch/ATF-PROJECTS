import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CONTRACTOR' | 'WORKER'
}

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Not authorized — no token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

export const requireWorker = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'WORKER') {
    return res.status(403).json({ error: 'Worker access required' })
  }
  next()
}
