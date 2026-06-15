'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Navigation, ExternalLink } from 'lucide-react'
import { PLACEHOLDER_CLINICS } from '@/lib/data'
import { MapPlaceholder } from '@/components/ui/MapPlaceholder'

export function NearbySection() {
  const [activeClinic, setActiveClinic] = useState(PLACEHOLDER_CLINICS[0].id)
  const featured = PLACEHOLDER_CLINICS.slice(0, 3)

  return (
    <section className="py-16 sm:py-24 bg-surface-container-low relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-label-md text-primary uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
              Live Availability
            </span>
            <h2 className="text-display-md text-ink-dark mt-3">Nearby Facilities</h2>
            <p className="text-body-lg text-on-surface-variant mt-2">Updated in real time near your location.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              href="/clinics"
              className="flex items-center gap-2 text-primary text-label-md font-semibold hover:gap-3 transition-all"
            >
              <ExternalLink size={16} />
              View Interactive Map
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map */}
          <motion.div
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-airy min-h-[300px] sm:min-h-[380px] relative bg-[#f2ede9]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <MapPlaceholder
              clinics={featured}
              activeId={activeClinic}
              onSelect={setActiveClinic}
            />

            {/* "Open full map" button overlaid */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
              <Link
                href="/clinics"
                className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary text-label-sm font-semibold px-4 py-2 rounded-full shadow-airy border border-white/60 hover:bg-white transition-all whitespace-nowrap"
              >
                <ExternalLink size={13} />
                Open full map
              </Link>
            </div>
          </motion.div>

          {/* Clinic cards */}
          <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4">
            {featured.map((clinic, i) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveClinic(clinic.id)}
                className={`card cursor-pointer transition-all duration-200 ${activeClinic === clinic.id ? 'border-primary/40 shadow-airy-md' : 'hover:border-outline-variant/60'}`}
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-label-sm font-bold px-2 py-0.5 rounded-full ${clinic.isOpen ? 'badge-open' : 'badge-closed'}`}>
                        {clinic.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                      {clinic.verified && (
                        <span className="text-label-sm text-primary bg-primary/8 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                    <h4 className="text-headline-sm text-ink-dark truncate">{clinic.name}</h4>
                    <div className="flex items-center gap-1 text-caption text-on-surface-variant mt-1">
                      <MapPin size={12} />
                      <span>{clinic.area} · {clinic.distance}</span>
                    </div>
                  </div>

                  {clinic.waitMinutes !== null && clinic.isOpen && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-display-md text-ink-dark/40 leading-none font-bold">{clinic.waitMinutes}</div>
                      <div className="text-label-sm text-on-surface-variant">min wait</div>
                    </div>
                  )}
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-caption text-on-surface-variant">
                    <Clock size={12} />
                    <span>{clinic.hours}</span>
                  </div>
                  <div className="flex gap-2">
                    {clinic.isOpen && (
                      <button className="flex items-center gap-1.5 bg-primary text-white text-label-sm px-3 sm:px-4 py-2 rounded-full hover:bg-primary-container active:scale-95 transition-all font-semibold">
                        Start Check-in
                      </button>
                    )}
                    <Link
                      href={`/clinics/${clinic.id}`}
                      className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors"
                      aria-label="Get directions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Navigation size={16} className="text-on-surface-variant" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
