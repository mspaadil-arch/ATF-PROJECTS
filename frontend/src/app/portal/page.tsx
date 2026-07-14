'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Lock, Phone, User, Shield } from 'lucide-react'

export default function PortalLoginPage() {
  const [tab, setTab] = useState<'worker' | 'admin'>('worker')
  const [step, setStep] = useState<'id' | 'otp'>('id')
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onWorkerSubmit = async (data: any) => {
    if (step === 'id') {
      // Send OTP
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/worker/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId: data.workerId, phone: data.phone }),
      })
      setStep('otp')
    } else {
      // Verify OTP
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/worker/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) router.push('/portal/worker')
    }
  }

  const onAdminSubmit = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/portal/admin')
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-gold" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">Labour Payment Portal</h1>
          <p className="text-slate-secondary text-sm mt-1">Secure login for workers & admins</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-navy-light border border-slate-border p-1 mb-6">
          {(['worker', 'admin'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setStep('id') }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                tab === t ? 'bg-gold text-navy shadow' : 'text-slate-secondary hover:text-white'
              }`}
            >
              {t === 'worker' ? '👷 Worker Login' : '🔐 Admin Login'}
            </button>
          ))}
        </div>

        <div className="card">
          {tab === 'worker' ? (
            <form onSubmit={handleSubmit(onWorkerSubmit)} className="space-y-4">
              {step === 'id' ? (
                <>
                  <div>
                    <label className="block text-sm text-slate-secondary mb-1.5">Worker ID</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
                      <input
                        {...register('workerId', { required: true })}
                        placeholder="ATF-W-00001"
                        className="w-full bg-navy-light border border-slate-border rounded-lg pl-9 pr-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-secondary mb-1.5">Registered Mobile</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
                      <input
                        {...register('phone', { required: true })}
                        type="tel"
                        placeholder="9876543210"
                        className="w-full bg-navy-light border border-slate-border rounded-lg pl-9 pr-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full">Send OTP</button>
                </>
              ) : (
                <>
                  <p className="text-slate-secondary text-sm text-center">OTP sent to your registered number</p>
                  <div>
                    <label className="block text-sm text-slate-secondary mb-1.5">Enter OTP</label>
                    <input
                      {...register('otp', { required: true })}
                      type="text"
                      maxLength={6}
                      placeholder="------"
                      className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white text-center text-xl tracking-[0.5em] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Verify & Login</button>
                  <button type="button" onClick={() => setStep('id')} className="w-full text-slate-muted text-sm hover:text-white transition-colors">
                    ← Go back
                  </button>
                </>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit(onAdminSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Admin Email</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="admin@atfprojects.in"
                    className="w-full bg-navy-light border border-slate-border rounded-lg pl-9 pr-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Password</label>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Login to Admin Panel</button>
            </form>
          )}
        </div>

        <p className="text-center text-slate-muted text-xs mt-6">
          🔒 This portal is for ATF Projects employees only.<br />
          Unauthorized access is strictly prohibited.
        </p>
      </motion.div>
    </main>
  )
}
