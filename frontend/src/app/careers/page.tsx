'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Briefcase, HardHat, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const jobs = [
  { title: 'Senior Civil Engineer', location: 'Mumbai, MH', type: 'Full-time', dept: 'Engineering' },
  { title: 'Project Manager', location: 'Hyderabad, TS', type: 'Full-time', dept: 'Management' },
  { title: 'Site Supervisor', location: 'Pune, MH', type: 'Full-time', dept: 'Operations' },
  { title: 'Quantity Surveyor', location: 'Delhi NCR', type: 'Full-time', dept: 'Finance' },
]

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null)
  const [track, setTrack] = useState<'professional' | 'labour'>('professional')

  return (
    <main className="pt-20 min-h-screen bg-navy">
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeader eyebrow="Join ATF" title="Build Your Career With Us" description="Whether you're an engineer, manager, or skilled worker — there's a place for you at ATF Projects." center />
          </div>

          {/* Track switcher */}
          <div className="flex rounded-xl bg-navy-light border border-slate-border p-1 mb-10 max-w-sm mx-auto">
            {(['professional', 'labour'] as const).map((t) => (
              <button key={t} onClick={() => setTrack(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${track === t ? 'bg-gold text-navy' : 'text-slate-secondary hover:text-white'}`}>
                {t === 'professional' ? '💼 Professional' : '👷 Labour / Contractor'}
              </button>
            ))}
          </div>

          {track === 'professional' ? (
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card">
                  <button className="w-full flex items-center justify-between" onClick={() => setOpenJob(openJob === i ? null : i)}>
                    <div className="text-left">
                      <h3 className="font-heading font-semibold text-white">{job.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-slate-secondary">
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-gold" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} className="text-gold" />{job.type}</span>
                        <span className="flex items-center gap-1"><Briefcase size={12} className="text-gold" />{job.dept}</span>
                      </div>
                    </div>
                    {openJob === i ? <ChevronUp size={18} className="text-gold shrink-0" /> : <ChevronDown size={18} className="text-slate-muted shrink-0" />}
                  </button>
                  {openJob === i && (
                    <div className="mt-5 pt-5 border-t border-slate-border">
                      <p className="text-slate-secondary text-sm mb-4">Join our growing team and work on landmark projects across India. Competitive salary, travel allowance, and growth opportunities.</p>
                      <button className="btn-primary text-sm">Apply Now</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card max-w-lg mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <HardHat size={24} className="text-gold" />
                <h3 className="font-heading font-semibold text-white text-lg">Labour / Contractor Registration</h3>
              </div>
              <form className="space-y-4">
                {[
                  { label: 'Full Name', placeholder: 'Ramesh Kumar', type: 'text' },
                  { label: 'Mobile Number', placeholder: '9876543210', type: 'tel' },
                  { label: 'State / District', placeholder: 'Bihar, Patna', type: 'text' },
                ].map(({ label, placeholder, type }) => (
                  <div key={label}>
                    <label className="block text-sm text-slate-secondary mb-1.5">{label}</label>
                    <input type={type} placeholder={placeholder} className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-slate-secondary mb-1.5">Primary Skill</label>
                  <select className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors">
                    <option>Mason</option><option>Carpenter</option><option>Welder</option>
                    <option>Electrician</option><option>Plumber</option><option>Painter</option>
                    <option>Bar Bender</option><option>Helper / General Labour</option><option>Contractor</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full">Submit Registration</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
