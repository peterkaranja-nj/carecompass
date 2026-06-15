import Link from 'next/link'

export const metadata = { title: 'Press — CareCompass' }

const COVERAGE = [
  {
    outlet: 'Business Daily Africa',
    date: 'May 2026',
    headline: 'CareCompass raises $3M seed to bring AI triage to underserved Kenyan counties',
    href: '#',
  },
  {
    outlet: 'TechCabal',
    date: 'April 2026',
    headline: 'How CareCompass is routing patients to the right care — before they leave home',
    href: '#',
  },
  {
    outlet: 'The Standard Health',
    date: 'March 2026',
    headline: 'Nairobi startup cuts ER wait times with AI symptom checker',
    href: '#',
  },
  {
    outlet: 'Quartz Africa',
    date: 'February 2026',
    headline: 'Africa\'s healthcare navigation problem has a new solution',
    href: '#',
  },
  {
    outlet: 'Disrupt Africa',
    date: 'January 2026',
    headline: 'CareCompass launches public beta with 200 partner clinics',
    href: '#',
  },
]

const FACTS = [
  { value: '$3M', label: 'Seed round raised' },
  { value: '200+', label: 'Partner clinics' },
  { value: '15k+', label: 'Daily assessments' },
  { value: '2025', label: 'Founded in Nairobi' },
]

export default function PressPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Media</p>
          <h1 className="text-display-md text-ink-dark">Press & Media</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Resources for journalists, analysts, and media partners. For press enquiries contact{' '}
            <a href="mailto:press@carecompass.ke" className="text-primary font-semibold hover:underline">press@carecompass.ke</a>.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-4xl space-y-16">
        {/* Fast facts */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">CareCompass at a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-white border border-outline-variant/40 rounded-2xl p-5 text-center">
                <p className="text-display-sm text-primary font-bold">{f.value}</p>
                <p className="text-caption text-on-surface-variant mt-1">{f.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">About CareCompass</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
            CareCompass is a Nairobi-based health technology company building AI-powered triage and care navigation tools for the African healthcare market. Founded in 2025, the company helps patients quickly determine the appropriate level of care for their symptoms — whether a pharmacy, clinic, or emergency room — and connects them with the nearest suitable facility.
          </p>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            The platform serves over 15,000 patients daily across Nairobi and is expanding to Mombasa, Kisumu, and Nakuru in 2026. CareCompass is backed by leading African health-tech investors and has partnerships with 200+ clinics including Aga Khan, MP Shah, and over 180 county health facilities.
          </p>
        </section>

        {/* Media coverage */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Recent Coverage</h2>
          <div className="space-y-3">
            {COVERAGE.map((item) => (
              <a
                key={item.headline}
                href={item.href}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/40 rounded-2xl p-5 bg-white hover:border-primary/40 transition-colors group"
              >
                <div>
                  <p className="text-caption text-primary font-semibold uppercase tracking-wide mb-1">{item.outlet} · {item.date}</p>
                  <p className="text-label-md text-ink-dark group-hover:text-primary transition-colors">{item.headline}</p>
                </div>
                <span className="text-primary text-label-sm font-bold whitespace-nowrap">Read →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Press kit */}
        <section className="bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8">
          <h2 className="text-headline-sm text-ink-dark mb-3">Press Kit</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-5">
            Download our official press kit including logos, founder photos, product screenshots, and company fact sheet.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="bg-primary text-white px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors"
            >
              Download Press Kit (.zip)
            </a>
            <a
              href="mailto:press@carecompass.ke"
              className="border border-primary text-primary px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/5 transition-colors"
            >
              Email Press Team
            </a>
          </div>
        </section>

        {/* Media contacts */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-5">Media Contacts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Amina Odhiambo', role: 'Head of Communications', email: 'amina@carecompass.ke', phone: '+254 711 000 101' },
              { name: 'Press Office', role: 'General media enquiries', email: 'press@carecompass.ke', phone: '+254 20 000 1234' },
            ].map((c) => (
              <div key={c.name} className="border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <p className="text-label-md text-ink-dark font-semibold">{c.name}</p>
                <p className="text-body-sm text-on-surface-variant mt-0.5 mb-3">{c.role}</p>
                <a href={`mailto:${c.email}`} className="block text-primary text-body-sm font-semibold hover:underline">{c.email}</a>
                <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="block text-on-surface-variant text-body-sm mt-1 hover:text-primary transition-colors">{c.phone}</a>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/about" className="text-primary text-label-md font-semibold hover:underline">About Us →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact →</Link>
        </div>
      </div>
    </>
  )
}
