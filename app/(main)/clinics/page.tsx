'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Phone, Star, Filter, Search, Navigation } from 'lucide-react'
import { PLACEHOLDER_CLINICS, COST_LABELS } from '@/lib/data'
import { formatWaitTime } from '@/lib/utils'
import type { Clinic } from '@/types'

const TYPE_FILTERS = ['All', 'Hospital', 'Urgent Care', 'Clinic', 'Pharmacy']
const COST_FILTERS = ['All costs', 'Free / NHIF', 'Under KES 1,000', 'KES 1,000–5,000']

export default function ClinicsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [openOnly, setOpenOnly] = useState(false)
  const [view, setView] = useState<'list' | 'map'>('list')

  const filtered = useMemo(() => {
    return PLACEHOLDER_CLINICS.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.area.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter !== 'All' && !c.type.toLowerCase().replace('-', ' ').includes(typeFilter.toLowerCase())) return false
      if (openOnly && !c.isOpen) return false
      return true
    })
  }, [search, typeFilter, openOnly])

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Page header */}
      <div className="bg-warm-surface border-b border-outline-variant/30 py-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-3">Near You</p>
          <h1 className="text-display-md text-ink-dark mb-4">Find Care</h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl">
            Verified clinics, hospitals, and pharmacies across Nairobi. Live availability and wait times.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex items-center gap-3 bg-white border border-outline-variant/40 rounded-full px-4 py-2 max-w-lg shadow-airy focus-within:ring-2 focus-within:ring-primary transition-all">
            <Search size={18} className="text-on-surface-variant flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or area…"
              className="flex-1 bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/60 py-1"
            />
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-on-surface-variant" />
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-4 py-2 rounded-full border text-body-sm font-medium transition-all ${typeFilter === f ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`}
              >
                {f}
              </button>
            ))}
            <label className="flex items-center gap-2 cursor-pointer ml-2">
              <div
                onClick={() => setOpenOnly(!openOnly)}
                className={`w-10 h-5 rounded-full transition-colors relative ${openOnly ? 'bg-success-green' : 'bg-outline-variant'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${openOnly ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-body-sm text-on-surface-variant">Open now</span>
            </label>
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low rounded-xl p-1">
            {(['list', 'map'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all capitalize ${view === v ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {v === 'list' ? '≡ List' : '⊕ Map'}
              </button>
            ))}
          </div>
        </div>

        <p className="text-caption text-on-surface-variant mb-6">{filtered.length} facilities found</p>

        {view === 'map' && (
          <div className="rounded-2xl bg-medical-blue-muted border border-outline-variant/20 h-80 flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin size={32} className="text-primary mx-auto mb-3 opacity-50" />
              <p className="text-body-md font-semibold text-primary">Interactive Map</p>
              <p className="text-caption text-on-surface-variant mt-1">Add <code className="bg-primary/10 px-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable</p>
            </div>
          </div>
        )}

        {/* Clinic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-headline-md text-on-surface-variant mb-2">No clinics found</p>
            <p className="text-body-md text-on-surface-variant/60">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="card flex flex-col hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={clinic.isOpen ? 'badge-open' : 'badge-closed'}>
              {clinic.isOpen ? 'Open Now' : 'Closed'}
            </span>
            {clinic.verified && (
              <span className="text-label-sm text-primary bg-primary/8 px-2 py-0.5 rounded-full">Verified</span>
            )}
          </div>
          <h3 className="text-body-md font-bold text-ink-dark leading-snug">{clinic.name}</h3>
          <div className="flex items-center gap-1 text-caption text-on-surface-variant mt-1">
            <MapPin size={11} /> {clinic.area} · {clinic.distance}
          </div>
        </div>
        {clinic.waitMinutes !== null && clinic.isOpen && (
          <div className="text-right flex-shrink-0 ml-2">
            <div className="text-display-md font-bold text-ink-dark/30 leading-none">{clinic.waitMinutes}</div>
            <div className="text-label-sm text-on-surface-variant">min wait</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-caption text-on-surface-variant mb-3">
        <Clock size={12} /> {clinic.hours}
      </div>

      <div className="flex items-center gap-1 mb-4">
        <Star size={12} className="text-amber-400 fill-amber-400" />
        <span className="text-caption font-semibold text-on-surface">{clinic.rating}</span>
        <span className="text-caption text-on-surface-variant">({clinic.reviewCount})</span>
        <span className="text-caption text-on-surface-variant ml-auto">{COST_LABELS[clinic.costRange]}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-5">
        {clinic.services.slice(0, 3).map((s) => (
          <span key={s} className="text-caption bg-medical-blue-muted text-primary px-2.5 py-1 rounded-full">{s}</span>
        ))}
        {clinic.services.length > 3 && (
          <span className="text-caption bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full">+{clinic.services.length - 3}</span>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <Link href={`/clinics/${clinic.id}`} className="flex-1 btn-primary text-label-sm py-2.5 min-h-0">
          View Details
        </Link>
        {clinic.phone && (
          <a href={`tel:${clinic.phone}`} className="p-2.5 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" aria-label="Call clinic">
            <Phone size={16} className="text-on-surface-variant" />
          </a>
        )}
        <button className="p-2.5 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors" aria-label="Get directions">
          <Navigation size={16} className="text-on-surface-variant" />
        </button>
      </div>
    </div>
  )
}
