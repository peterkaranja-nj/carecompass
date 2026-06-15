'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertTriangle } from 'lucide-react'

const ISSUE_TYPES = [
  'Incorrect clinic information (address, phone, hours)',
  'Clinic no longer operating / closed permanently',
  'Inaccurate wait time estimates',
  'Inappropriate or misleading clinic description',
  'Unethical or unsafe care experience',
  'Incorrect verification badge',
  'Duplicate listing',
  'Other',
]

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    clinicName: '',
    clinicAddress: '',
    issueType: '',
    description: '',
    name: '',
    email: '',
    anonymous: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value
    setForm((prev) => ({ ...prev, [target.name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={52} className="text-primary mx-auto mb-4" />
          <h2 className="text-headline-md text-ink-dark mb-3">Report Received</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
            Thank you for helping keep CareCompass accurate. Our team will review your report within 3 business days. If we need more information, we will reach out via the email you provided.
          </p>
          <Link href="/" className="bg-primary text-white px-7 py-3 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Support</p>
          <h1 className="text-display-md text-ink-dark">Report a Clinic</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Spotted an error in our clinic data or had a poor experience? Help us keep CareCompass accurate and trustworthy for everyone.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-2xl">
        {/* Info note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 mb-8">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-label-sm text-amber-800 font-semibold mb-0.5">For medical emergencies</p>
            <p className="text-body-sm text-amber-700 leading-relaxed">
              If you or someone else is in danger, call 999 immediately. Do not use this form for emergencies.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm text-ink-dark font-semibold" htmlFor="clinicName">Clinic Name *</label>
              <input
                id="clinicName"
                name="clinicName"
                required
                value={form.clinicName}
                onChange={handleChange}
                placeholder="e.g. Aga Khan Hospital Nairobi"
                className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm text-ink-dark font-semibold" htmlFor="clinicAddress">Clinic Address / Location</label>
              <input
                id="clinicAddress"
                name="clinicAddress"
                value={form.clinicAddress}
                onChange={handleChange}
                placeholder="e.g. 3rd Parklands Ave, Nairobi"
                className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm text-ink-dark font-semibold" htmlFor="issueType">Type of Issue *</label>
            <select
              id="issueType"
              name="issueType"
              required
              value={form.issueType}
              onChange={handleChange}
              className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="">Select an issue type…</option>
              {ISSUE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm text-ink-dark font-semibold" htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Please describe the issue in as much detail as possible. What did you expect? What did you find?"
              className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"
            />
          </div>

          <div className="border-t border-outline-variant/30 pt-6">
            <p className="text-label-sm text-ink-dark font-semibold mb-4">Your Contact Details (optional)</p>
            <div className="grid sm:grid-cols-2 gap-5 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-on-surface-variant" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={form.anonymous}
                  placeholder="Your name"
                  className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-40"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-on-surface-variant" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={form.anonymous}
                  placeholder="you@example.com"
                  className="border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-40"
                />
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-body-sm text-on-surface-variant">Submit anonymously (we won&apos;t be able to follow up)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-full text-label-md font-bold hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Submit Report
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/help" className="text-primary text-label-md font-semibold hover:underline">Help Center →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact Us →</Link>
        </div>
      </div>
    </>
  )
}
