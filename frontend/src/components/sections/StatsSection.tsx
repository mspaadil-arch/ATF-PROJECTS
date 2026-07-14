'use client'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { end: 150, suffix: '+', label: 'Projects Completed' },
  { end: 10000, suffix: '+', label: 'Labourers Employed' },
  { end: 25, suffix: '', label: 'States Covered' },
  { end: 20, suffix: '+', label: 'Years of Excellence' },
]

export default function StatsSection() {
  return (
    <section className="bg-navy-light border-y border-slate-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              <AnimatedCounter {...stat} />
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
