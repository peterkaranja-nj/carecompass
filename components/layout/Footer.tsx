import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Press', href: '/press' },
  ],
  Resources: [
    { label: 'Symptoms A–Z', href: '/learn' },
    { label: 'Health Blog', href: '/blog' },
    { label: 'Find a Clinic', href: '/clinics' },
    { label: 'API Docs', href: '/docs' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Medical Disclaimer', href: '/disclaimer' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Report a Clinic', href: '/report' },
    { label: 'Become a Partner', href: '/partners' },
    { label: 'Emergency Info', href: '/emergency' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 mt-auto relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="section-container py-10 sm:py-16">
        {/* Emergency Banner */}
        <div className="bg-error-container rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-error font-semibold text-body-md">Medical Emergency?</p>
            <p className="text-error/80 text-body-sm mt-0.5">Do not use this app. Call emergency services immediately.</p>
          </div>
          <a
            href="tel:999"
            className="flex items-center gap-2 bg-error text-white px-6 py-3 rounded-full font-bold text-label-md hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            <Phone size={16} />
            Call 999
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L9 16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-headline-sm font-bold text-primary">CareCompass</span>
            </Link>
            <p className="text-caption text-on-surface-variant leading-relaxed mb-5">
              Connecting patients to the right care at the right time — powered by AI, verified by clinicians.
            </p>
            <div className="flex flex-col gap-2 text-caption text-on-surface-variant">
              <a href="tel:+254200001234" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={13} /> +254 20 000 1234
              </a>
              <a href="mailto:hello@carecompass.ke" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={13} /> hello@carecompass.ke
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={13} /> Nairobi, Kenya
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h5 className="text-label-sm text-primary font-bold uppercase tracking-widest mb-4">{category}</h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-caption text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-on-surface-variant">
            © {new Date().getFullYear()} CareCompass. For medical emergencies, call 999 immediately.
          </p>
          <p className="text-caption text-on-surface-variant/70">
            Not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
