'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-gradient opacity-10" />
      <div className="absolute inset-0 bg-navy-light" style={{ zIndex: -1 }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-semibold text-sm tracking-widest uppercase block mb-4">
            Ready to Build?
          </span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-6">
            Let's Bring Your Vision to Life
          </h2>
          <p className="text-slate-secondary text-lg mb-10 max-w-2xl mx-auto">
            Whether it's a home, a commercial complex, or a national infrastructure project —
            ATF Projects has the scale and expertise to deliver.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary flex items-center gap-2">
              Start a Project <ArrowRight size={16} />
            </Link>
            <a href="tel:+919999999999" className="btn-outline flex items-center gap-2">
              <Phone size={16} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
