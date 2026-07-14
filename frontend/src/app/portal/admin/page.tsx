'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, IndianRupee, Calendar, AlertCircle, Plus, Download, Search, Filter } from 'lucide-react'

const mockWorkers = [
  { id: 'ATF-W-00001', name: 'Ramesh Kumar', site: 'NH-48, Rajasthan', skill: 'Mason', status: 'Active', wage: 15000, pending: 5000 },
  { id: 'ATF-W-00002', name: 'Suresh Yadav', site: 'Skyline Tech Park, Hyderabad', skill: 'Welder', status: 'Active', wage: 18000, pending: 0 },
  { id: 'ATF-W-00003', name: 'Manoj Verma', site: 'Mahaveer Residency, Pune', skill: 'Electrician', status: 'Inactive', wage: 16000, pending: 0 },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState<'workers' | 'payments' | 'reports'>('workers')
  const [search, setSearch] = useState('')

  const filtered = mockWorkers.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-navy pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl text-white">Admin Dashboard</h1>
            <p className="text-slate-secondary text-sm mt-1">ATF Projects — Labour Management Panel</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline flex items-center gap-2 text-sm"><Download size={15} /> Export Report</button>
            <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={15} /> Add Worker</button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Workers', value: '1,248', icon: Users, color: 'text-blue-400' },
            { label: 'Disbursed (July)', value: '₹1.2 Cr', icon: IndianRupee, color: 'text-green-400' },
            { label: 'Pending Wages', value: '₹14.2L', icon: Calendar, color: 'text-gold' },
            { label: 'Open Disputes', value: '3', icon: AlertCircle, color: 'text-red-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex justify-between items-start mb-3">
                <p className="text-slate-secondary text-xs uppercase tracking-widest">{label}</p>
                <Icon size={16} className={color} />
              </div>
              <p className={`font-heading font-bold text-2xl ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-navy-light border border-slate-border p-1 mb-6 w-fit">
          {([
            { key: 'workers', label: '👷 Workers' },
            { key: 'payments', label: '💰 Record Payment' },
            { key: 'reports', label: '📊 Reports' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-gold text-navy' : 'text-slate-secondary hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'workers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="w-full bg-navy-light border border-slate-border rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-slate-muted focus:border-gold focus:outline-none text-sm transition-colors"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-border rounded-lg text-slate-secondary hover:text-gold hover:border-gold transition-colors text-sm">
                <Filter size={14} /> Filter by Site
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-border text-slate-muted text-xs uppercase tracking-widest">
                    <th className="text-left pb-3">Worker ID</th>
                    <th className="text-left pb-3">Name</th>
                    <th className="text-left pb-3 hidden md:table-cell">Site</th>
                    <th className="text-left pb-3 hidden lg:table-cell">Skill</th>
                    <th className="text-right pb-3">Monthly Wage</th>
                    <th className="text-right pb-3">Pending</th>
                    <th className="text-center pb-3">Status</th>
                    <th className="text-center pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-border">
                  {filtered.map((w) => (
                    <tr key={w.id} className="hover:bg-navy-light/50 transition-colors">
                      <td className="py-4 text-gold font-mono text-xs">{w.id}</td>
                      <td className="py-4 text-white font-medium">{w.name}</td>
                      <td className="py-4 text-slate-secondary hidden md:table-cell">{w.site}</td>
                      <td className="py-4 text-slate-secondary hidden lg:table-cell">{w.skill}</td>
                      <td className="py-4 text-right text-white">₹{w.wage.toLocaleString('en-IN')}</td>
                      <td className={`py-4 text-right font-semibold ${w.pending > 0 ? 'text-gold' : 'text-green-400'}`}>
                        {w.pending > 0 ? `₹${w.pending.toLocaleString('en-IN')}` : '✓ Clear'}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${w.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-slate-border text-slate-muted'}`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button className="text-gold text-xs hover:text-gold-light transition-colors">View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card max-w-lg">
            <h3 className="font-heading font-semibold text-white mb-5">Record Payment</h3>
            <form className="space-y-4">
              {[
                { label: 'Worker ID', placeholder: 'ATF-W-00001' },
                { label: 'Amount (₹)', placeholder: '15000', type: 'number' },
              ].map(({ label, placeholder, type = 'text' }) => (
                <div key={label}>
                  <label className="block text-sm text-slate-secondary mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Payment Mode</label>
                <select className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors">
                  <option>UPI</option>
                  <option>Bank Transfer (NEFT/IMPS)</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Payment Date</label>
                <input type="date" className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-slate-secondary mb-1.5">Remarks (optional)</label>
                <input type="text" placeholder="e.g. July 1st week wages" className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors" />
              </div>
              <button type="submit" className="btn-primary w-full">Record & Generate Slip</button>
            </form>
          </motion.div>
        )}

        {tab === 'reports' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'Site-wise Payment Report', desc: 'Total wages disbursed per construction site', icon: '🏗️' },
              { title: 'Worker-wise Statement', desc: 'Full payment history for individual workers', icon: '👷' },
              { title: 'Monthly Attendance Summary', desc: 'Attendance % and absenteeism analysis', icon: '📅' },
              { title: 'Pending Wages Report', desc: 'Workers with outstanding payment dues', icon: '⏳' },
            ].map((r) => (
              <button key={r.title} className="card text-left hover:border-gold transition-colors group">
                <span className="text-3xl mb-4 block">{r.icon}</span>
                <h3 className="font-heading font-semibold text-white group-hover:text-gold transition-colors mb-1">{r.title}</h3>
                <p className="text-slate-secondary text-sm">{r.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-gold text-sm mt-3">
                  Download CSV <Download size={13} />
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
