'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search } from 'lucide-react'

const FAQS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What is CareCompass?',
        a: 'CareCompass is an AI-powered healthcare triage tool that helps you understand your symptoms and find the right level of care — from a pharmacy to an emergency room — quickly and accurately.',
      },
      {
        q: 'Is CareCompass free to use?',
        a: 'Yes, the basic symptom checker and clinic finder are completely free. We offer a premium tier for faster response times, appointment booking, and health record storage.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is required for a basic triage. Creating a free account lets you save your health history, get personalised recommendations, and receive follow-up reminders.',
      },
    ],
  },
  {
    category: 'Symptom Checker',
    items: [
      {
        q: 'How accurate is the AI triage?',
        a: 'Our model has been validated on 500,000+ clinical cases and achieves >92% concordance with physician triage decisions. However, it is a navigational aid, not a diagnosis — always follow up with a clinician for medical decisions.',
      },
      {
        q: 'What languages does the symptom checker support?',
        a: 'Currently English and Swahili. French and Somali support is coming in Q3 2026.',
      },
      {
        q: 'Can I use CareCompass for my child?',
        a: 'You can use it for children over 2 years old. Select "Child" when prompted for patient age so the AI applies paediatric clinical pathways. For infants under 2, go directly to a paediatrician or A&E.',
      },
    ],
  },
  {
    category: 'Clinics & Facilities',
    items: [
      {
        q: 'How current is the clinic data?',
        a: 'Partner clinics update their information in real time. Non-partner facility data is verified quarterly. Wait time estimates are updated every 10 minutes during operating hours.',
      },
      {
        q: 'Can I book an appointment through CareCompass?',
        a: 'Appointment booking is available at verified partner clinics (marked with the blue tick). For other facilities, we provide their direct contact number.',
      },
      {
        q: 'My clinic is not listed. How do I add it?',
        a: 'Clinic owners can apply via the Partners page. Listing is free for public health facilities. Private clinics go through a verification process.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    items: [
      {
        q: 'Is my health data safe?',
        a: 'Yes. All health data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell health data and do not share it with insurers or employers. See our Privacy Policy for full details.',
      },
      {
        q: 'Can I delete my data?',
        a: 'Yes. Go to Account Settings → Privacy → Delete Account. Clinical records may be retained for 7 years under Kenyan medical records regulations, but will be inaccessible to you and our staff.',
      },
      {
        q: 'Does CareCompass share data with the government?',
        a: 'Only if compelled by a valid court order under Kenyan law. We will notify you if legally permitted to do so.',
      },
    ],
  },
  {
    category: 'Account & Technical',
    items: [
      {
        q: 'I forgot my password. How do I reset it?',
        a: 'Click "Forgot password" on the sign-in page. You will receive a reset link to your registered email within 2 minutes.',
      },
      {
        q: 'The app is not working. What should I do?',
        a: 'Try refreshing the page. If the problem persists, clear your browser cache or try a different browser. You can also report technical issues via the Report a Clinic page or by emailing support@carecompass.ke.',
      },
      {
        q: 'Is there a mobile app?',
        a: 'The web app is fully optimised for mobile browsers. Native Android and iOS apps are in development and expected in Q4 2026.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-outline-variant/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-4 hover:text-primary transition-colors"
      >
        <span className="text-label-md text-ink-dark font-medium">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 mt-0.5 text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="text-body-md text-on-surface-variant leading-relaxed pb-5">{a}</p>
      )}
    </div>
  )
}

export default function HelpPage() {
  const [search, setSearch] = useState('')

  const filtered = FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        search === '' ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((cat) => cat.items.length > 0)

  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Support</p>
          <h1 className="text-display-md text-ink-dark">Help Center</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Frequently asked questions about CareCompass. Can&apos;t find what you need?{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">Contact us</Link>.
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs…"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-outline-variant/50 bg-white text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="section-container py-14 max-w-3xl">
        {filtered.length === 0 ? (
          <p className="text-body-md text-on-surface-variant text-center py-12">No results for &ldquo;{search}&rdquo;</p>
        ) : (
          <div className="space-y-10">
            {filtered.map((cat) => (
              <section key={cat.category}>
                <h2 className="text-headline-sm text-ink-dark mb-2">{cat.category}</h2>
                <div className="border border-outline-variant/40 rounded-2xl px-5 bg-white">
                  {cat.items.map((item) => (
                    <FAQItem key={item.q} {...item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-outline-variant/30">
          <p className="text-body-md text-on-surface-variant mb-4">Still need help?</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors">Contact Support</Link>
            <Link href="/report" className="border border-primary text-primary px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/5 transition-colors">Report a Clinic</Link>
          </div>
        </div>
      </div>
    </>
  )
}
