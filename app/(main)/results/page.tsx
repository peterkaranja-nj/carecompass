'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, Stethoscope, Heart, MapPin, Phone, Share2, Download, ChevronRight } from 'lucide-react'
import { PLACEHOLDER_CLINICS } from '@/lib/data'
import { getUrgencyConfig, formatWaitTime } from '@/lib/utils'
import type { UrgencyLevel } from '@/types'

const MOCK_RESULTS: Record<UrgencyLevel, { title: string; description: string; actions: string[] }> = {
  emergency: {
    title: 'Seek emergency care immediately',
    description: 'Your symptoms suggest a potentially serious condition that requires immediate medical attention. Do not drive yourself — call 999 or ask someone to take you to the nearest emergency room now.',
    actions: ['Call 999 immediately', 'Do not eat or drink anything', 'Stay calm and keep someone with you', 'Bring your ID and any medication you take'],
  },
  urgent: {
    title: 'See a doctor within 2–4 hours',
    description: 'Your symptoms indicate you need professional medical care today, but this is not a life-threatening emergency. Visit an urgent care clinic or GP within the next few hours.',
    actions: ['Visit an urgent care clinic today', 'Monitor your symptoms closely', 'Take over-the-counter pain relief if appropriate', 'Return to the ER if symptoms worsen significantly'],
  },
  routine: {
    title: 'Self-care or scheduled appointment',
    description: 'Your symptoms appear manageable at home. Rest, stay hydrated, and monitor your condition. If symptoms persist beyond 5 days or worsen, schedule a GP appointment.',
    actions: ['Rest and stay well hydrated', 'Take paracetamol for pain or fever', 'Monitor symptoms daily', 'Book a GP appointment if no improvement in 5 days'],
  },
}

const URGENCY_ICONS = {
  emergency: AlertTriangle,
  urgent: Stethoscope,
  routine: Heart,
}

function ResultsPageInner() {
  const searchParams = useSearchParams()
  const urgency = (searchParams.get('urgency') as UrgencyLevel) || 'urgent'
  const config = getUrgencyConfig(urgency)
  const result = MOCK_RESULTS[urgency]
  const Icon = URGENCY_ICONS[urgency]
  const nearbyClinics = PLACEHOLDER_CLINICS.slice(0, 3)

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="section-container py-12">
        {/* Result header */}
        <div className={`${config.bg} rounded-2xl p-8 mb-10 border ${config.border}`}>
          <div className="flex items-start gap-5">
            <div className={`w-14 h-14 ${urgency === 'emergency' ? 'bg-error' : urgency === 'urgent' ? 'bg-primary' : 'bg-success-green'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={26} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={config.badge + ' text-label-sm'}>{config.label}</span>
                <span className="text-caption text-on-surface-variant">{config.timeframe}</span>
              </div>
              <h1 className={`text-display-md ${config.color} mb-3`}>{result.title}</h1>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">{result.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: actions + disclaimer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended actions */}
            <div className="card">
              <h2 className="text-headline-md text-ink-dark mb-5">What to do now</h2>
              <ol className="space-y-3">
                {result.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-bold flex-shrink-0 ${urgency === 'emergency' ? 'bg-error text-white' : urgency === 'urgent' ? 'bg-primary text-white' : 'bg-success-green text-white'}`}>
                      {i + 1}
                    </div>
                    <p className="text-body-md text-on-surface pt-0.5">{action}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Nearby clinics */}
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-headline-md text-ink-dark">Nearest facilities</h2>
                <Link href="/clinics" className="text-label-md text-primary hover:underline flex items-center gap-1">
                  See all <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {nearbyClinics.map((clinic) => (
                  <div key={clinic.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={clinic.isOpen ? 'badge-open' : 'badge-closed'}>
                          {clinic.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-body-md font-semibold text-ink-dark">{clinic.name}</p>
                      <div className="flex items-center gap-1 text-caption text-on-surface-variant mt-0.5">
                        <MapPin size={11} /> {clinic.area} · {clinic.distance}
                        {clinic.waitMinutes !== null && clinic.isOpen && (
                          <span className="ml-2">· {formatWaitTime(clinic.waitMinutes)} wait</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {clinic.phone && (
                        <a href={`tel:${clinic.phone}`} className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" aria-label="Call">
                          <Phone size={16} className="text-on-surface-variant" />
                        </a>
                      )}
                      <Link href={`/clinics/${clinic.id}`} className="btn-primary text-label-sm px-4 py-2 min-h-0">
                        Directions
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical disclaimer */}
            <div className="border border-outline-variant/30 rounded-xl p-5 bg-surface-container-low">
              <p className="text-caption text-on-surface-variant leading-relaxed">
                <span className="font-semibold text-on-surface">Medical disclaimer:</span> This assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions. In case of emergency, call 999 immediately.
              </p>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-headline-sm text-ink-dark mb-4">Save this result</h3>
              <div className="flex flex-col gap-3">
                <button className="btn-primary gap-2 w-full">
                  <Download size={16} /> Download PDF
                </button>
                <button className="btn-secondary gap-2 w-full">
                  <Share2 size={16} /> Share with doctor
                </button>
              </div>
              <p className="text-caption text-on-surface-variant mt-3 text-center">
                Sign in to save to your health history
              </p>
            </div>

            {urgency === 'emergency' && (
              <div className="bg-error-container border border-error/20 rounded-xl p-5">
                <h3 className="text-headline-sm text-error mb-2">Emergency contacts</h3>
                <div className="space-y-2">
                  {[['999', 'Emergency Services'], ['0800 720 021', 'Kenya Red Cross'], ['020 272 3000', 'Poison Control']].map(([num, label]) => (
                    <a key={num} href={`tel:${num}`} className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-sm transition-all">
                      <span className="text-body-sm text-on-surface-variant">{label}</span>
                      <span className="text-label-md text-error font-bold">{num}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="card">
              <h3 className="text-headline-sm text-ink-dark mb-3">Check again</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Symptoms changed? Run a new assessment.</p>
              <Link href="/check" className="btn-secondary w-full">New check</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsPageInner />
    </Suspense>
  )
}
