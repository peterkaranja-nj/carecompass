import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'

export const metadata = { title: 'Careers — CareCompass' }

const OPEN_ROLES = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    type: 'Full-time',
    location: 'Nairobi / Remote',
    desc: 'Build the core patient-facing web and mobile experience. Strong Next.js, TypeScript, and PostgreSQL background required.',
  },
  {
    title: 'Clinical Informatics Specialist',
    team: 'Clinical',
    type: 'Full-time',
    location: 'Nairobi',
    desc: 'Translate clinical decision logic into AI training pipelines. MBChB + data skills preferred.',
  },
  {
    title: 'Product Designer (Health UX)',
    team: 'Design',
    type: 'Full-time',
    location: 'Nairobi / Hybrid',
    desc: 'Design intuitive healthcare experiences for first-time smartphone users through medical professionals. Figma expert.',
  },
  {
    title: 'ML Engineer — Symptom Triage',
    team: 'AI',
    type: 'Full-time',
    location: 'Remote',
    desc: 'Improve triage accuracy using NLP, RAG, and clinical ontologies (ICD-10, SNOMED CT). Python + LLM fine-tuning experience required.',
  },
  {
    title: 'Clinic Partnerships Manager',
    team: 'Growth',
    type: 'Full-time',
    location: 'Nairobi',
    desc: 'Onboard private clinics and county health facilities. Medical sales or health management background preferred.',
  },
  {
    title: 'Trust & Safety Analyst',
    team: 'Operations',
    type: 'Full-time',
    location: 'Nairobi',
    desc: 'Monitor platform misuse, investigate reported clinics, and ensure health information integrity.',
  },
]

const VALUES = [
  { title: 'Health equity first', desc: 'We build for the person in a rural village as much as the person in Upper Hill.' },
  { title: 'Radical transparency', desc: 'We share context widely so everyone can make good decisions fast.' },
  { title: 'Clinician-in-the-loop', desc: 'Every AI output is backed by human clinical oversight. We don\'t ship guesses.' },
  { title: 'Move with care', desc: 'We ship fast, but not so fast that we harm patients. Speed and safety are not opposites.' },
]

export default function CareersPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Join Us</p>
          <h1 className="text-display-md text-ink-dark">Careers at CareCompass</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            We are a small, ambitious team building the infrastructure layer for healthcare access in Africa. If you want your work to directly improve health outcomes, you will fit right in.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-4xl space-y-16">
        {/* Values */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">How we work</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <h3 className="text-label-lg text-primary font-semibold mb-2">{v.title}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-5">Benefits</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              'Competitive KES salary + equity',
              'Flexible remote or hybrid work',
              'Full medical cover for you and family',
              'KES 150k annual learning budget',
              'Monthly wellness allowance',
              '21 days annual leave + unlimited sick days',
              'Home office setup budget (new hires)',
              'Regular team retreats in beautiful Kenya',
            ].map((b) => (
              <li key={b} className="flex gap-3 text-body-md text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Open roles */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-2">Open Positions</h2>
          <p className="text-body-md text-on-surface-variant mb-6">{OPEN_ROLES.length} roles · Updated June 2026</p>
          <div className="space-y-4">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="border border-outline-variant/40 rounded-2xl p-5 sm:p-6 bg-white hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-caption bg-primary/8 text-primary px-3 py-0.5 rounded-full font-medium">{role.team}</span>
                    </div>
                    <h3 className="text-label-lg text-ink-dark font-semibold">{role.title}</h3>
                    <p className="text-body-sm text-on-surface-variant mt-2 leading-relaxed">{role.desc}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-caption text-on-surface-variant">
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{role.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{role.type}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@carecompass.ke?subject=Application: ${role.title}`}
                    className="bg-primary text-white px-5 py-2.5 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors whitespace-nowrap self-start"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
          <h3 className="text-label-lg text-ink-dark font-semibold mb-2">Don&apos;t see your role?</h3>
          <p className="text-body-sm text-on-surface-variant mb-4">We review speculative applications. Send your CV and a short note on how you could contribute.</p>
          <a href="mailto:careers@carecompass.ke" className="text-primary font-bold text-label-md hover:underline">careers@carecompass.ke →</a>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/about" className="text-primary text-label-md font-semibold hover:underline">About Us →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact →</Link>
        </div>
      </div>
    </>
  )
}
