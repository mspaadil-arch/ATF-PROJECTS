'use client'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast.success('Enquiry sent! We\'ll get back to you within 24 hours.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="pt-20 min-h-screen bg-navy">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Get In Touch" title="Contact ATF Projects" center />

          <div className="grid lg:grid-cols-2 gap-12 mt-14">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="space-y-6 mb-10">
                {[
                  { Icon: MapPin, label: 'Headquarters', value: 'ATF Projects HQ, Andheri East, Mumbai — 400069' },
                  { Icon: Phone, label: 'Phone', value: '+91 99999 99999' },
                  { Icon: Mail, label: 'Email', value: 'info@atfprojects.in' },
                  { Icon: Clock, label: 'Hours', value: 'Mon–Sat, 9:00 AM – 6:00 PM IST' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-slate-muted text-xs uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-slate-border h-56 bg-navy-card flex items-center justify-center">
                <p className="text-slate-muted text-sm">Google Maps Embed</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma' },
                  { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '9876543210' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rahul@example.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm text-slate-secondary mb-1.5">{label}</label>
                    <input
                      {...register(name as keyof FormData)}
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                    />
                    {errors[name as keyof FormData] && (
                      <p className="text-red-400 text-xs mt-1">{errors[name as keyof FormData]?.message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-sm text-slate-secondary mb-1.5">Project Type</label>
                  <select
                    {...register('projectType')}
                    className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select type...</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Infrastructure</option>
                    <option>Consulting</option>
                    <option>Labour Supply</option>
                    <option>Other</option>
                  </select>
                  {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm text-slate-secondary mb-1.5">Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-navy-light border border-slate-border rounded-lg px-4 py-3 text-white placeholder-slate-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                  {isSubmitting ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
