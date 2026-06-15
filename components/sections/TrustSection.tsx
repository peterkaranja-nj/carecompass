'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Users, Clock, Star } from 'lucide-react'

const STATS = [
  { value: '15k+', label: 'Daily Assessments', icon: Users },
  { value: '240+', label: 'Verified Partners', icon: Shield },
  { value: '< 12s', label: 'Avg Response Time', icon: Clock },
  { value: '98%', label: 'Patient Satisfaction', icon: Star },
]

export function TrustSection() {
  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/4 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="section-container relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            className="lg:w-1/2 space-y-8 w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div>
              <span className="inline-block text-label-md text-primary uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
                Our Mission
              </span>
              <h2 className="text-display-md text-ink-dark mt-4">Care for Everyone</h2>
              <p className="text-body-lg text-on-surface-variant mt-5 leading-relaxed">
                At CareCompass, we believe clinical precision should be accessible to all. Whether you have insurance or need sliding-scale options, our network ensures you never face a health crisis alone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 py-8 border-y border-outline-variant/30">
              {STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-display-md text-ink-dark leading-none font-bold">{stat.value}</div>
                      <div className="text-label-sm sm:text-label-md text-on-surface-variant mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/about" className="btn-primary text-sm sm:text-base">Learn about accessibility</Link>
              <Link href="/partners" className="btn-secondary text-sm sm:text-base">Become a Partner</Link>
            </div>
          </motion.div>

          {/* Right: image + floating badges */}
          <motion.div
            className="lg:w-1/2 relative w-full max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="glass-panel p-3 sm:p-4 rounded-[28px] sm:rounded-[32px] rotate-1 sm:rotate-2 shadow-airy-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare professionals collaborating"
                className="rounded-[20px] sm:rounded-[24px] w-full h-56 sm:h-72 object-cover"
              />
            </div>

            {/* Floating badges — hidden on very small screens */}
            <motion.div
              className="hidden sm:block absolute -bottom-6 -left-6 glass-panel p-4 sm:p-5 rounded-2xl shadow-airy-lg max-w-[180px] sm:max-w-[200px]"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-0.5 mb-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-label-md text-primary font-bold mb-1">98% Satisfaction</p>
              <p className="text-caption text-on-surface-variant">Average rating from patients using our triage system.</p>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute -top-4 -right-4 glass-panel p-3 sm:p-4 rounded-2xl shadow-airy-lg"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <p className="text-label-sm text-success-green font-bold">NHIF Accepted</p>
              <p className="text-caption text-on-surface-variant mt-0.5">All partner clinics</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div
          className="mt-16 sm:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-6 sm:mb-8">Trusted by leading healthcare providers</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-35 grayscale">
            {['Aga Khan', 'Nairobi Hospital', 'AAR Healthcare', 'Gertrudes', 'MP Shah'].map((name) => (
              <span key={name} className="text-body-md sm:text-headline-sm font-bold text-on-surface-variant">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
