'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Target, Eye, Award } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/sections/CTABanner'

const leadership = [
  { name: 'Aadil Ansari', role: 'Founder & CEO', photo: '/images/team/ceo.jpg' },
  { name: 'Rahul Singh', role: 'Chief Operations Officer', photo: '/images/team/coo.jpg' },
  { name: 'Sneha Verma', role: 'Head of Projects', photo: '/images/team/head-projects.jpg' },
  { name: 'Arjun Patel', role: 'CFO', photo: '/images/team/cfo.jpg' },
]

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Transparent dealings with clients, workers, and regulators — always.' },
  { icon: Target, title: 'Precision', desc: 'On-time, on-budget delivery. No surprises, no shortcuts.' },
  { icon: Eye, title: 'Vision', desc: 'Building not just structures but communities and futures.' },
  { icon: Award, title: 'Excellence', desc: 'ISO-certified processes and RERA compliance across all projects.' },
]

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                eyebrow="Our Story"
                title="20+ Years of Building India"
                description="ATF Projects was founded with a single purpose: to deliver construction and real estate projects that stand the test of time. From humble beginnings in Maharashtra to a pan-India presence across 25 states, our journey is one of relentless commitment to quality, transparency, and scale."
              />
              <div className="mt-8 space-y-4">
                {['RERA Registered', 'GST Compliant', 'ISO 9001:2015 Certified', 'Labour Law Compliant'].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 text-slate-secondary">
                    <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[420px] rounded-2xl overflow-hidden"
            >
              <Image src="/images/about/office.jpg" alt="ATF Projects office" fill className="object-cover" />
              <div className="absolute inset-0 bg-navy/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Foundation" title="Mission, Vision & Values" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-slate-secondary text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="The Team" title="Our Leadership" center />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 border-2 border-slate-border group-hover:border-gold transition-colors">
                  <Image src={person.photo} alt={person.name} fill className="object-cover" />
                </div>
                <p className="font-heading font-semibold text-white">{person.name}</p>
                <p className="text-gold text-sm mt-1">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  )
}
