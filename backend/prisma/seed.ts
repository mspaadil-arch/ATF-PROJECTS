import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Admin user
  const hashed = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@atfprojects.in' },
    update: {},
    create: { name: 'ATF Admin', email: 'admin@atfprojects.in', password: hashed, role: 'SUPER_ADMIN' },
  })

  // Demo site
  const site = await prisma.site.upsert({
    where: { id: 'site-001' },
    update: {},
    create: { id: 'site-001', name: 'NH-48 Project, Rajasthan', location: 'Jaipur', state: 'Rajasthan' },
  })

  // Demo worker
  const worker = await prisma.worker.upsert({
    where: { workerId: 'ATF-W-00001' },
    update: {},
    create: { workerId: 'ATF-W-00001', name: 'Ramesh Kumar', phone: '9876543210', skill: 'Mason', dailyWage: 600, siteId: site.id },
  })

  // Demo payment
  await prisma.payment.create({
    data: { workerId: worker.id, amount: 15000, mode: 'UPI', status: 'PAID', paidAt: new Date(), reference: 'UPI20260701', remarks: 'July 1st fortnight' },
  })

  // Demo attendance
  const today = new Date()
  await prisma.attendance.upsert({
    where: { workerId_date: { workerId: worker.id, date: today } },
    update: {},
    create: { workerId: worker.id, siteId: site.id, date: today, status: 'PRESENT', hours: 9 },
  })

  console.log('Seed complete!')
  console.log('Admin login → email: admin@atfprojects.in | password: admin123')
  console.log('Worker login → ID: ATF-W-00001 | phone: 9876543210 (OTP logged to console in dev)')
}

main().catch(console.error).finally(() => prisma.$disconnect())
