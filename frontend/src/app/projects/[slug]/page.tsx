'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Maximize2, ArrowLeft, CheckCircle } from 'lucide-react'

const projectData: Record<string, any> = {
  'mahaveer-residency-pune': {
    title: 'Mahaveer Residency', location: 'Pune, Maharashtra', type: 'Residential', status: 'Completed',
    area: '2.4 Lakh sq.ft', timeline: 'Jan 2022 – Dec 2023',
    description: 'A premium residential township in the heart of Pune featuring 2BHK and 3BHK apartments with world-class amenities, landscaped gardens, and a clubhouse.',
    images: ['/images/projects/residential/proj-res-1.png'],
    highlights: ['RERA Registered', 'Zero pending handovers', 'Delivered 45 days ahead of schedule', '320 happy families'],
  },
  'skyline-tech-park-hyderabad': {
    title: 'Skyline Tech Park', location: 'Hyderabad, Telangana', type: 'Commercial', status: 'Ongoing',
    area: '5.8 Lakh sq.ft', timeline: 'Mar 2024 – Dec 2026',
    description: 'A state-of-the-art IT/ITES commercial park in HITEC City designed to LEED Gold standards with advanced infrastructure for tech companies.',
    images: ['/images/projects/commercial/proj-com-1.png'],
    highlights: ['LEED Gold target', '2,000+ workstations', '5-level basement parking', 'Fiber-ready infrastructure'],
  },
  'nh48-expressway-rajasthan': {
    title: 'NH-48 Expressway Segment', location: 'Jaipur, Rajasthan', type: 'Infrastructure', status: 'Completed',
    area: '42 km stretch', timeline: 'Jun 2021 – Nov 2022',
    description: "Widening and strengthening of 42 km of NH-48 under NHAI Bharatmala, completed 3 months early with zero fatalities.",
    images: ['/images/projects/infrastructure/proj-inf-1.png'],
    highlights: ['2,000+ workers deployed', '42 km in 17 months', 'Zero fatal accidents', 'NHAI appreciation award'],
  },
}

export default function ProjectDetailPage() {
  const { slug } = useParams() as { slug: string }
  const project = projectData[slug]

  if (!project) return (
    <main className="pt-28 min-h-screen bg-navy text-center py-20">
      <p className="text-slate-secondary text-lg">Project not found.</p>
      <Link href="/projects" className="text-gold mt-4 inline-block hover:underline">Back to Projects</Link>
    </main>
  )

  return (
    <main className="pt-20 min-h-screen bg-navy">
      <div className="relative h-72 lg:h-[480px]">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-slate-secondary hover:text-gold text-sm mb-3 transition-colors">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <div className="flex gap-2 mb-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-gold/20 text-gold font-medium">{project.type}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>{project.status}</span>
          </div>
          <h1 className="font-heading font-bold text-3xl lg:text-5xl text-white">{project.title}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-slate-secondary leading-relaxed text-lg mb-8">{project.description}</p>
            <h3 className="font-heading font-semibold text-white mb-4">Project Highlights</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.highlights.map((h: string) => (
                <li key={h} className="flex items-start gap-3 text-slate-secondary text-sm">
                  <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />{h}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {[{ icon: MapPin, label: 'Location', value: project.location }, { icon: Maximize2, label: 'Scale', value: project.area }, { icon: Calendar, label: 'Timeline', value: project.timeline }].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-slate-muted text-xs uppercase tracking-widest">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </div>
            ))}
            <Link href="/contact" className="btn-primary w-full text-center block">Enquire About This Project</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
