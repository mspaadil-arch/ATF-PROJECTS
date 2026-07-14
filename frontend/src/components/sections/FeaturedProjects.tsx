'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const featured = [
  {
    slug: 'mahaveer-residency-pune',
    title: 'Mahaveer Residency',
    location: 'Pune, Maharashtra',
    type: 'Residential',
    status: 'Completed',
    image: '/images/projects/residential/proj-res-1.png',
    area: '2.4 Lakh sq.ft',
  },
  {
    slug: 'skyline-tech-park-hyderabad',
    title: 'Skyline Tech Park',
    location: 'Hyderabad, Telangana',
    type: 'Commercial',
    status: 'Ongoing',
    image: '/images/projects/commercial/proj-com-1.png',
    area: '5.8 Lakh sq.ft',
  },
  {
    slug: 'nh48-expressway-rajasthan',
    title: 'NH-48 Expressway Segment',
    location: 'Jaipur, Rajasthan',
    type: 'Infrastructure',
    status: 'Completed',
    image: '/images/projects/infrastructure/proj-inf-1.png',
    area: '42 km stretch',
  },
]

const typeColors: Record<string, string> = {
  Residential: 'bg-blue-500/20 text-blue-300',
  Commercial: 'bg-purple-500/20 text-purple-300',
  Infrastructure: 'bg-orange-500/20 text-orange-300',
}

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Our Work"
            title="Featured Projects"
            description="A glimpse of what we've built across India — from homes to highways."
          />
          <Link href="/projects" className="btn-outline shrink-0 flex items-center gap-2 self-start sm:self-auto">
            All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold font-semibold flex items-center gap-2">
                      View Project <ArrowRight size={16} />
                    </span>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[project.type]}`}>
                      {project.type}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'Ongoing' ? 'bg-gold/20 text-gold' : 'bg-green-500/20 text-green-300'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-white group-hover:text-gold transition-colors mb-1">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-secondary">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-gold" /> {project.location}
                  </span>
                  <span>{project.area}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
