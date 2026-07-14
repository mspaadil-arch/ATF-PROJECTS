'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Building2, Home, BarChart3, Paintbrush, Users, CheckCircle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/sections/CTABanner'

const services = [
  {
    id: 'construction',
    icon: Building2,
    title: 'Construction',
    image: '/images/services/construction.jpg',
    description: 'End-to-end civil construction for residential, commercial, and industrial projects across India. We handle everything from foundation to finishing.',
    points: ['Structural engineering & civil works', 'RCC framing & masonry', 'Waterproofing & facade work', 'MEP (Mechanical, Electrical, Plumbing)', 'Safety & quality management (ISO 9001)'],
  },
  {
    id: 'real-estate',
    icon: Home,
    title: 'Real Estate Development',
    image: '/images/services/real-estate.jpg',
    description: 'Land acquisition, project planning, regulatory approvals (RERA), and delivery of premium residential and commercial spaces.',
    points: ['Land sourcing & due diligence', 'RERA registration & compliance', 'Architectural planning & approvals', 'Sales & handover management', 'Post-possession support'],
  },
  {
    id: 'consulting',
    icon: BarChart3,
    title: 'Project Consulting',
    image: '/images/services/consulting.jpg',
    description: 'Expert advisory for project owners, developers, and government bodies. We reduce risk, optimise cost, and keep timelines on track.',
    points: ['Feasibility & DPR preparation', 'BOQ estimation & tendering', 'Project management & supervision', 'Quality audits & third-party inspection', 'Dispute resolution & arbitration support'],
  },
  {
    id: 'interior',
    icon: Paintbrush,
    title: 'Interior Finishing',
    image: '/images/services/interior.jpg',
    description: 'Premium interior fit-outs for apartments, offices, hotels, and retail spaces — delivered on time with zero snags.',
    points: ['False ceilings & partition walls', 'Modular kitchens & wardrobes', 'Flooring (marble, vitrified, wooden)', 'Painting & wallcoverings', 'Bathroom & sanitary fit-outs'],
  },
  {
    id: 'labour',
    icon: Users,
    title: 'Labour Supply',
    image: '/images/services/labour.jpg',
    description: 'Skilled, semi-skilled, and unskilled workforce deployment for large-scale construction sites across India — with full compliance.',
    points: ['Masons, carpenters, welders, electricians', 'Pan-India mobilisation within 30 days', 'ESIC, PF & labour law compliance', 'Attendance & payment transparency system', 'On-site safety training included'],
  },
]

export default function ServicesPage() {
  return (
    <main className="pt-20 min-h-screen bg-navy">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeader
              eyebrow="What We Do"
              title="Our Services"
              description="Complete construction solutions — from the first brick to the final key handover."
              center
            />
          </div>

          <div className="space-y-24">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <svc.icon size={22} className="text-gold" />
                  </div>
                  <h2 className="font-heading font-bold text-3xl text-white mb-4">{svc.title}</h2>
                  <p className="text-slate-secondary leading-relaxed mb-6">{svc.description}</p>
                  <ul className="space-y-3">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-slate-secondary text-sm">
                        <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-72 lg:h-96 rounded-2xl overflow-hidden ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </main>
  )
}
