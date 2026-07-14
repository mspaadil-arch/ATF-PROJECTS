'use client'
import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionHeader({ eyebrow, title, description, center = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl lg:text-4xl text-white mb-4 section-heading ${center ? 'section-heading-center' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-slate-secondary leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
