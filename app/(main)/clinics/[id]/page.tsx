import Link from 'next/link'
import { MapPin, Clock, Phone, Star, Shield, ChevronLeft, Navigation, MessageCircle, CheckCircle } from 'lucide-react'
import { PLACEHOLDER_CLINICS, COST_LABELS } from '@/lib/data'
import { formatWaitTime } from '@/lib/utils'

export default function ClinicDetailPage({ params }: { params: { id: string } }) {
  const clinic = PLACEHOLDER_CLINICS.find((c) => c.id === params.id) ?? PLACEHOLDER_CLINICS[0]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back */}
      <div className="section-container pt-6">
        <Link href="/clinics" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium mb-6">
          <ChevronLeft size={16} /> Back to Find Care
        </Link>
      </div>

      {/* Hero banner — replace with real clinic photo */}
      <div className="w-full h-56 bg-gradient-to-r from-primary to-secondary-container overflow-hidden relative">
        <div className="absolute inset-0 flex items-end">
          <div className="section-container pb-6">
            <div className="flex items-center gap-3">
              {clinic.verified && (
                <span className="flex items-center gap-1.5 bg-white/20 text-white text-label-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Shield size={12} /> Verified Partner
                </span>
              )}
              <span className={`text-label-sm px-3 py-1.5 rounded-full font-bold ${clinic.isOpen ? 'bg-success-green text-white' : 'bg-error text-white'}`}>
                {clinic.isOpen ? 'Open Now' : 'Currently Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-display-md text-ink-dark mb-2">{clinic.name}</h1>
              <div className="flex items-center gap-4 text-body-md text-on-surface-variant flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {clinic.address}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {clinic.hours}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={14} className={i <= Math.floor(clinic.rating) ? 'text-amber-400 fill-amber-400' : 'text-outline-variant'} />
                  ))}
                </div>
                <span className="text-body-sm font-semibold text-on-surface">{clinic.rating}</span>
                <span className="text-caption text-on-surface-variant">({clinic.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Services */}
            <div className="card">
              <h2 className="text-headline-md text-ink-dark mb-4">Services offered</h2>
              <div className="grid grid-cols-2 gap-3">
                {clinic.services.map((service) => (
                  <div key={service} className="flex items-center gap-2.5 text-body-md text-on-surface">
                    <CheckCircle size={16} className="text-success-green flex-shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Cost & Insurance */}
            <div className="card">
              <h2 className="text-headline-md text-ink-dark mb-4">Cost & insurance</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low rounded-xl p-4">
                  <p className="text-label-sm text-on-surface-variant mb-1">Price range</p>
                  <p className="text-body-md font-semibold text-on-surface">{COST_LABELS[clinic.costRange]}</p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-4">
                  <p className="text-label-sm text-on-surface-variant mb-1">Uninsured patients</p>
                  <p className={`text-body-md font-semibold ${clinic.acceptsUninsured ? 'text-success-green' : 'text-error'}`}>
                    {clinic.acceptsUninsured ? 'Accepted' : 'Insurance required'}
                  </p>
                </div>
              </div>
              <p className="text-caption text-on-surface-variant mt-4">NHIF, SHA, and major private insurers accepted. Call to confirm before visiting.</p>
            </div>

            {/* Map placeholder */}
            <div className="card">
              <h2 className="text-headline-md text-ink-dark mb-4">Location</h2>
              <div className="bg-medical-blue-muted rounded-xl h-52 flex items-center justify-center border border-outline-variant/20">
                <div className="text-center">
                  <MapPin size={28} className="text-primary mx-auto mb-2 opacity-50" />
                  <p className="text-body-sm text-on-surface-variant">Map requires Mapbox token</p>
                  <p className="text-caption text-on-surface-variant/60">{clinic.address}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary text-label-md font-semibold mt-4 hover:gap-3 transition-all"
              >
                <Navigation size={16} /> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Wait time */}
            {clinic.isOpen && clinic.waitMinutes !== null && (
              <div className="card bg-primary-fixed border-primary/10">
                <p className="text-label-sm text-primary uppercase tracking-wider mb-1">Current wait time</p>
                <div className="text-display-lg text-primary font-bold leading-none">{clinic.waitMinutes}</div>
                <p className="text-body-sm text-primary/70 mt-1">minutes</p>
                <button className="btn-primary w-full mt-4">Start Virtual Check-in</button>
              </div>
            )}

            {/* Contact actions */}
            <div className="card">
              <h3 className="text-headline-sm text-ink-dark mb-4">Contact</h3>
              <div className="flex flex-col gap-3">
                <a href={`tel:${clinic.phone}`} className="flex items-center gap-3 p-3 border border-outline-variant/30 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Phone</p>
                    <p className="text-body-sm font-semibold text-on-surface">{clinic.phone}</p>
                  </div>
                </a>
                {clinic.whatsapp && (
                  <a
                    href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-success-green/20 bg-success-green-light rounded-xl hover:bg-success-green/10 transition-all"
                  >
                    <div className="w-9 h-9 bg-success-green/10 rounded-lg flex items-center justify-center">
                      <MessageCircle size={16} className="text-success-green" />
                    </div>
                    <div>
                      <p className="text-label-sm text-on-surface-variant">WhatsApp</p>
                      <p className="text-body-sm font-semibold text-success-green">Message on WhatsApp</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 className="text-headline-sm text-ink-dark mb-4">Quick actions</h3>
              <div className="flex flex-col gap-2">
                <Link href="/check" className="btn-secondary w-full text-body-sm">Check my symptoms first</Link>
                <button className="btn-ghost w-full text-on-surface-variant text-body-sm">Report an issue</button>
              </div>
            </div>

            {/* Distance */}
            <div className="bg-warm-surface rounded-xl p-4 flex items-center gap-3">
              <Navigation size={18} className="text-primary" />
              <div>
                <p className="text-label-sm text-on-surface-variant">From your location</p>
                <p className="text-body-md font-semibold text-ink-dark">{clinic.distance} away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
