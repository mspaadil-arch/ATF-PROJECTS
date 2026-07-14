'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Director, Sharma Developers',
    photo: '/images/testimonials/client-1.jpg',
    quote: "ATF Projects delivered our 500-unit residential township 3 months ahead of schedule. The quality of construction and transparency throughout the project was exceptional.",
    project: 'Green Valley Township, Lucknow',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'CFO, TechSpace Realty',
    photo: '/images/testimonials/client-2.jpg',
    quote: "We entrusted ATF with our flagship commercial tower. Their labour payment transparency system gave us full confidence in their operations. Outstanding professionalism.",
    project: 'TechSpace Tower, Bengaluru',
  },
  {
    id: 3,
    name: 'Arvind Kumar',
    role: 'Sr. Engineer, NHAI',
    photo: '/images/testimonials/client-3.jpg',
    quote: "For the NH-48 expansion project, ATF mobilised 2,000+ workers across 3 states within 30 days. Remarkable execution and zero safety incidents throughout.",
    project: 'NH-48 Expressway, Rajasthan',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className="py-24 bg-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionHeader
            eyebrow="Client Stories"
            title="What Our Clients Say"
            center
          />
        </div>

        <div className="relative bg-navy-card border border-slate-border rounded-2xl p-8 lg:p-12">
          <Quote size={48} className="text-gold/20 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed italic mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 bg-navy-light shrink-0">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white">{t.name}</p>
                  <p className="text-slate-secondary text-sm">{t.role}</p>
                  <p className="text-gold text-xs mt-0.5">{t.project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-border flex items-center justify-center text-slate-secondary hover:text-gold hover:border-gold transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-gold' : 'w-3 bg-slate-border'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-border flex items-center justify-center text-slate-secondary hover:text-gold hover:border-gold transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
