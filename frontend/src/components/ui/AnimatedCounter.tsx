'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface Props {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, duration = 2.5 }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-bold text-4xl lg:text-5xl text-gold mb-2">
        {prefix}
        {inView ? (
          <CountUp end={end} duration={duration} separator="," />
        ) : (
          <span>0</span>
        )}
        {suffix}
      </div>
      <p className="text-slate-secondary text-sm lg:text-base">{label}</p>
    </div>
  )
}
