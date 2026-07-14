'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Filter } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const filters = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Ongoing', 'Completed']

const projects = [
  { slug: 'mahaveer-residency-pune', title: 'Mahaveer Residency', location: 'Pune, MH', type: 'Residential', status: 'Completed', image: '/images/projects/residential/proj-res-1.png', area: '2.4L sq.ft' },
  { slug: 'skyline-tech-park', title: 'Skyline Tech Park', location: 'Hyderabad, TS', type: 'Commercial', status: 'Ongoing', image: '/images/projects/commercial/proj-com-1.png', area: '5.8L sq.ft' },
  { slug: 'nh48-expressway', title: 'NH-48 Expressway', location: 'Jaipur, RJ', type: 'Infrastructure', status: 'Completed', image: '/images/projects/infrastructure/proj-inf-1.png', area: '42 km' },
  { slug: 'sunrise-apartments', title: 'Sunrise Apartments', location: 'Nagpur, MH', type: 'Residential', status: 'Ongoing', image: '/images/projects/residential/proj-res-2.png', area: '1.2L sq.ft' },
  { slug: 'metro-retail-hub', title: 'Metro Retail Hub', location: 'Delhi NCR', type: 'Commercial', status: 'Completed', image: '/images/projects/commercial/proj-com-2.png', area: '3.1L sq.ft' },
  { slug: 'rural-road-network', title: 'PMGSY Road Network', location: 'Bihar', type: 'Infrastructure', status: 'Ongoing', image: '/images/projects/infrastructure/proj-inf-2.png', area: '180 km' },
]

const typeColors: Record<string, string> = {
  Residential: 'bg-blue-500/20 text-blue-300',
  Commercial: 'bg-purple-500/20 text-purple-300',
  Infrastructure: 'bg-orange-500/20 text-orange-300',
}

export default function ProjectsPage() {
  const [active, setActive] = useState('All')

  const filtered = projects.filter((p) => {
    if (active === 'All') return true
    if (active === 'Ongoing' || active === 'Completed') return p.status === active
    return p.type === active
  })

  return (
    <main className="pt-20 min-h-screen bg-navy">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Our Projects"
            description="Explore our work spanning residential, commercial, and infrastructure sectors across India."
            center
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
            <Filter size={16} className="text-slate-muted self-center" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === f
                    ? 'bg-gold text-navy shadow-md'
                    : 'border border-slate-border text-slate-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block card p-0 overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[project.type]}`}>{project.type}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'Ongoing' ? 'bg-gold/20 text-gold' : 'bg-green-500/20 text-green-300'}`}>{project.status}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-white group-hover:text-gold transition-colors mb-2">{project.title}</h3>
                      <div className="flex items-center justify-between text-sm text-slate-secondary">
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-gold" />{project.location}</span>
                        <span>{project.area}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
