'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const BENEFITS = [
  { title: 'Increased patient flow', desc: 'Appear in real-time search results for patients who have been triaged and need your specific level of care.' },
  { title: 'Smart patient routing', desc: 'Receive pre-triaged patients whose symptoms match your facility capabilities — reducing inappropriate visits.' },
  { title: 'Digital check-in', desc: 'Accept CareCompass check-ins to reduce front-desk queues and capture structured intake data automatically.' },
  { title: 'Live wait time display', desc: 'Broadcast your current wait time to patients in the area — fill your capacity during off-peak hours.' },
  { title: 'Verified badge', desc: 'Display the CareCompass verified badge, signalling quality and transparency to prospective patients.' },
  { title: 'Analytics dashboard', desc: 'See referral volumes, patient demographics, and outcome data to inform clinical and business decisions.' },
]

const TIERS = [
  {
    name: 'Public Health',
    price: 'Free',
    desc: 'For county hospitals and government health centres.',
    features: ['Basic listing with address & contacts', 'Clinic type & services', 'Patient referrals from triage', 'CareCompass verified badge'],
  },
  {
    name: 'Partner Clinic',
    price: 'KES 4,500/mo',
    desc: 'For private clinics and specialist practices.',
    features: ['Everything in Public Health', 'Live wait time display', 'Digital check-in integration', 'Appointment booking widget', 'Analytics dashboard (30-day)'],
    highlighted: true,
  },
  {
    name: 'Health Network',
    price: 'Custom',
    desc: 'For hospital groups and multi-facility networks.',
    features: ['Everything in Partner Clinic', 'Unlimited facilities under one account', 'Priority patient routing', 'Full analytics + data export', 'Dedicated account manager', 'API access'],
  },
]

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ facility: '', type: '', contact: '', email: '', phone: '', tier: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Partnership</p>
          <h1 className="text-display-md text-ink-dark">Become a Partner</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Join 200+ healthcare facilities already using CareCompass to connect with patients who need exactly what you offer, right when they need it.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-5xl space-y-16">
        {/* Benefits */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Why partner with us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <h3 className="text-label-lg text-primary font-semibold mb-2">{b.title}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing tiers */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Partnership Plans</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 flex flex-col gap-4 ${
                  tier.highlighted
                    ? 'bg-primary text-white border-2 border-primary'
                    : 'bg-white border border-outline-variant/40'
                }`}
              >
                <div>
                  <p className={`text-label-sm font-bold uppercase tracking-wide mb-1 ${tier.highlighted ? 'text-white/70' : 'text-primary'}`}>{tier.name}</p>
                  <p className={`text-display-sm font-bold ${tier.highlighted ? 'text-white' : 'text-ink-dark'}`}>{tier.price}</p>
                  <p className={`text-body-sm mt-1 ${tier.highlighted ? 'text-white/75' : 'text-on-surface-variant'}`}>{tier.desc}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex gap-2.5 text-body-sm ${tier.highlighted ? 'text-white/90' : 'text-on-surface-variant'}`}>
                      <CheckCircle size={15} className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-white' : 'text-primary'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Sign-up form */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-2">Apply to Join</h2>
          <p className="text-body-md text-on-surface-variant mb-6">Fill in your details and our partnerships team will get back to you within 2 business days.</p>

          {submitted ? (
            <div className="text-center py-12 border border-outline-variant/40 rounded-2xl bg-white">
              <CheckCircle size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-headline-sm text-ink-dark mb-2">Application Received!</h3>
              <p className="text-body-md text-on-surface-variant">We&apos;ll reach out within 2 business days to get you onboarded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 border border-outline-variant/40 rounded-2xl p-6 sm:p-8 bg-white max-w-2xl">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-ink-dark font-semibold" htmlFor="facility">Facility Name *</label>
                  <input id="facility" name="facility" required value={form.facility} onChange={handleChange} placeholder="e.g. Nairobi West Hospital" className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-ink-dark font-semibold" htmlFor="type">Facility Type *</label>
                  <select id="type" name="type" required value={form.type} onChange={handleChange} className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white">
                    <option value="">Select type…</option>
                    {['County Hospital', 'Private Hospital', 'Specialist Clinic', 'General Practice', 'Pharmacy', 'Diagnostic Centre', 'Dental Clinic', 'Other'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-ink-dark font-semibold" htmlFor="contact">Contact Person *</label>
                <input id="contact" name="contact" required value={form.contact} onChange={handleChange} placeholder="Full name" className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-ink-dark font-semibold" htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@hospital.ke" className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-ink-dark font-semibold" htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-ink-dark font-semibold" htmlFor="tier">Interested Plan</label>
                <select id="tier" name="tier" value={form.tier} onChange={handleChange} className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white">
                  <option value="">Not sure yet</option>
                  {TIERS.map((t) => <option key={t.name} value={t.name}>{t.name} — {t.price}</option>)}
                </select>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full text-label-md font-bold hover:bg-primary/90 active:scale-[0.98] transition-all">
                Submit Application
              </button>
            </form>
          )}
        </section>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/docs" className="text-primary text-label-md font-semibold hover:underline">API Docs →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact →</Link>
        </div>
      </div>
    </>
  )
}
