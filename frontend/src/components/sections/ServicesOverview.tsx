'use client'
import { motion } from 'framer-motion'
import { Building2, Home, BarChart3, Paintbrush, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const services = [
  { icon: Building2, title: 'Construction', desc: 'End-to-end civil construction for residential, commercial, and industrial projects.' },
  { icon: Home, title: 'Real Estate Development', desc: 'Land acquisition, planning, and delivering premium housing & commercial spaces.' },
  { icon: BarChart3, title: 'Project Consulting', desc: 'Expert advisory on project planning, cost estimation, and timeline management.' },
  { icon: Paintbrush, title: 'Interior Finishing', desc: 'Premium interiors — flooring, false ceilings, modular kitchens, and more.' },
  { icon: Users, title: 'Labour Supply', desc: 'Skilled and semi-skilled workforce supply for large-scale construction sites pan-India.' },
]

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Services"
            description="From foundation to finishing — complete construction solutions under one roof."
            center
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <service.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">{service.title}</h3>
              <p className="text-slate-secondary text-sm leading-relaxed">{service.desc}</p>
              <Link
                href={`/services#${service.title.toLowerCase().replace(/ /g, '-')}`}
                className="inline-flex items-center gap-1.5 text-gold text-sm font-medium mt-4 hover:gap-2.5 transition-all"
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
