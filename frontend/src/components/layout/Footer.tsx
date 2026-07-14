'use client'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react'

const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Construction', href: '/services#construction' },
    { label: 'Real Estate Development', href: '/services#real-estate' },
    { label: 'Project Consulting', href: '/services#consulting' },
    { label: 'Interior Finishing', href: '/services#interior' },
    { label: 'Labour Supply', href: '/services#labour' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                <span className="font-heading font-bold text-navy text-lg">ATF</span>
              </div>
              <span className="font-heading font-bold text-white text-xl">
                ATF <span className="text-gold">Projects</span>
              </span>
            </div>
            <p className="text-slate-secondary text-sm leading-relaxed mb-6">
              Building India's future — one project at a time. Trusted construction &
              real estate across 25 states for over 20 years.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Facebook, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-slate-border flex items-center justify-center text-slate-secondary hover:text-gold hover:border-gold transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-secondary text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-secondary text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-slate-secondary text-sm">
                  ATF Projects HQ,<br />Mumbai, Maharashtra — 400001
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <a href="tel:+919999999999" className="text-slate-secondary text-sm hover:text-gold transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <a href="mailto:info@atfprojects.in" className="text-slate-secondary text-sm hover:text-gold transition-colors">
                  info@atfprojects.in
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {['RERA Registered', 'GST Compliant', 'ISO 9001:2015'].map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-muted text-sm">
            © {new Date().getFullYear()} ATF Projects. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-muted text-sm hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-muted text-sm hover:text-gold transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
