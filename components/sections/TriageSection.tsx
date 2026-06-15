'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, Stethoscope, Heart, ChevronRight } from 'lucide-react'

const TRIAGE_CARDS = [
  {
    icon: AlertTriangle,
    iconBg: 'bg-error-container',
    iconColor: 'text-error',
    accentBg: 'bg-error',
    title: 'Immediate Emergency',
    description: 'Chest pain, severe bleeding, difficulty breathing, or loss of consciousness. Seek emergency help immediately.',
    action: 'Locate Nearest ER',
    href: '/clinics?type=hospital&filter=emergency',
    color: 'text-error',
    hoverBorder: 'hover:border-error/30',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(186,26,26,0.12)]',
  },
  {
    icon: Stethoscope,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    accentBg: 'bg-primary',
    title: 'Urgent Care Needed',
    description: 'Minor fractures, high fevers, or deep cuts. Professional care required for non-life-threatening issues.',
    action: 'See Wait Times',
    href: '/clinics?type=urgent-care',
    color: 'text-primary',
    hoverBorder: 'hover:border-primary/30',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(0,71,141,0.12)]',
  },
  {
    icon: Heart,
    iconBg: 'bg-success-green-light',
    iconColor: 'text-success-green',
    accentBg: 'bg-success-green',
    title: 'Routine & Self-Care',
    description: 'Sore throats, mild rashes, or minor pains. Home remedies or a scheduled appointment.',
    action: 'View Care Guide',
    href: '/learn',
    color: 'text-success-green',
    hoverBorder: 'hover:border-success-green/30',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(45,138,78,0.12)]',
  },
]

export function TriageSection() {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="section-container">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-label-md text-primary uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
            Triage Guide
          </span>
          <h2 className="text-display-md text-ink-dark mt-4">What kind of care do you need?</h2>
          <p className="text-body-lg text-on-surface-variant mt-4 max-w-xl mx-auto">
            Not sure where to start? Use our symptom checker or pick the level of care that matches your situation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRIAGE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group card border border-outline-variant/20 ${card.hoverBorder} ${card.hoverShadow} transition-all duration-300 flex flex-col relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${card.accentBg}`} />
                <div className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 mt-2`}>
                  <Icon size={24} className={card.iconColor} />
                </div>
                <h3 className={`text-headline-sm ${card.color} mb-3`}>{card.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed flex-1">{card.description}</p>
                <Link
                  href={card.href}
                  className={`mt-6 flex items-center gap-2 ${card.color} text-label-md font-semibold group-hover:gap-3 transition-all`}
                >
                  {card.action}
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
