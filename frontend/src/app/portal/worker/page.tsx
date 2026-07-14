'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const mockPayments = [
  { date: '2026-07-01', amount: 15000, mode: 'UPI', status: 'Paid', ref: 'UPI20260701' },
  { date: '2026-06-15', amount: 15000, mode: 'Bank Transfer', status: 'Paid', ref: 'NEFT20260615' },
  { date: '2026-06-01', amount: 12000, mode: 'Cash', status: 'Paid', ref: 'CASH20260601' },
  { date: '2026-07-10', amount: 5000, mode: 'UPI', status: 'Pending', ref: 'UPI20260710' },
]

const mockAttendance = [
  { date: '2026-07-12', status: 'Present', hours: 9 },
  { date: '2026-07-11', status: 'Present', hours: 9 },
  { date: '2026-07-10', status: 'Half Day', hours: 4 },
  { date: '2026-07-09', status: 'Absent', hours: 0 },
  { date: '2026-07-08', status: 'Present', hours: 9 },
]

export default function WorkerDashboard() {
  const [tab, setTab] = useState<'payments' | 'attendance' | 'dispute'>('payments')

  return (
    <main className="min-h-screen bg-navy pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Worker Header */}
        <div className="card mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xl font-bold">R</div>
            <div>
              <h2 className="font-heading font-bold text-white text-lg">Ramesh Kumar</h2>
              <p className="text-slate-secondary text-sm">Worker ID: ATF-W-00142 · Site: NH-48 Project, Rajasthan</p>
              <p className="text-gold text-xs mt-0.5">Skill: Mason · Joined: Jan 2024</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-muted text-xs">Monthly Wage</p>
            <p className="font-heading font-bold text-2xl text-gold">₹15,000</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Earned', value: '₹1,87,000', icon: CreditCard, color: 'text-green-400' },
            { label: 'Attendance (July)', value: '10/13 Days', icon: Calendar, color: 'text-blue-400' },
            { label: 'Pending Payment', value: '₹5,000', icon: Clock, color: 'text-gold' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card text-center p-4">
              <Icon size={20} className={`${color} mx-auto mb-2`} />
              <p className={`font-heading font-bold text-lg ${color}`}>{value}</p>
              <p className="text-slate-secondary text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-navy-light border border-slate-border p-1 mb-6">
          {([
            { key: 'payments', label: '💰 Payments' },
            { key: 'attendance', label: '📅 Attendance' },
            { key: 'dispute', label: '⚠️ Raise Dispute' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-gold text-navy' : 'text-slate-secondary hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-heading font-semibold text-white">Payment History</h3>
              <button className="text-sm text-gold flex items-center gap-1.5 hover:text-gold-light transition-colors">
                <Download size={14} /> Download All
              </button>
            </div>
            <div className="space-y-3">
              {mockPayments.map((p) => (
                <div key={p.ref} className="flex items-center justify-between py-3 border-b border-slate-border last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{p.date}</p>
                    <p className="text-slate-secondary text-xs">{p.mode} · {p.ref}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₹{p.amount.toLocaleString('en-IN')}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Paid' ? 'bg-green-500/20 text-green-300' : 'bg-gold/20 text-gold'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'attendance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
            <h3 className="font-heading font-semibold text-white mb-5">Attendance Record — July 2026</h3>
            <div className="space-y-3">
              {mockAttendance.map((a) => (
                <div key={a.date} className="flex items-center justify-between py-3 border-b border-slate-border last:border-0">
                  <div className="flex items-center gap-3">
                    {a.status === 'Present' ? <CheckCircle size={16} className="text-green-400" />
                      : a.status === 'Half Day' ? <Clock size={16} className="text-gold" />
                      : <AlertCircle size={16} className="text-red-400" />}
                    <span className="text-white text-sm">{a.date}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${a.status === 'Present' ? 'text-green-400' : a.status === 'Half Day' ? 'text-gold' : 'text-red-400'}`}>
                      {a.status}
                    </span>
                    {a.hours > 0 && <p className="text-slate-muted text-xs">{a.hours} hrs</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'dispute' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
            <h3 className="font-heading font-semibold text-white mb-2">Raise a Payment Dispute</h3>
            <p className="text-slate-secondary text-sm mb-6">If you believe there's an error in your payment or attendance record, submit a dispute below. Our HR team will respond within 2 business days.</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Dispute Type</label>
                <select className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors">
                  <option>Wrong payment amount</option>
                  <option>Payment not received</option>
                  <option>Incorrect attendance marked</option>
                  <option>Advance deduction dispute</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Payment Date in Question</label>
                <input type="date" className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Description</label>
                <textarea rows={4} placeholder="Describe the issue clearly..." className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">Submit Dispute</button>
            </form>
          </motion.div>
        )}
      </div>
    </main>
  )
}
