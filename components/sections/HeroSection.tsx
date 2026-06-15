'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Stethoscope } from 'lucide-react'
import { SYMPTOM_SUGGESTIONS } from '@/lib/data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/check?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/check')
    }
  }

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HeroCare bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-dark/85 via-ink-dark/60 to-ink-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/55 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full py-20 sm:py-24 md:py-28 pt-28 sm:pt-32">
        <motion.div
          className="max-w-2xl space-y-6 sm:space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse" />
            <span className="text-white/80 text-label-md uppercase tracking-widest text-[11px] sm:text-[12px]">
              AI-powered triage · Clinician verified
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="font-bold leading-tight">
            <span className="block text-[36px] sm:text-[48px] md:text-[64px] leading-[1.05] tracking-tight text-blue-400">
              Know where to go,
            </span>
            <span className="block text-[36px] sm:text-[48px] md:text-[64px] leading-[1.05] tracking-tight text-white">
              right now.
            </span>
          </motion.h1>

          {/* Search bar */}
          <motion.form variants={item} onSubmit={handleSubmit} className="relative max-w-xl w-full">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-glass rounded-full px-3 sm:px-4 py-2 shadow-airy-xl border border-white/60 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
              <Stethoscope size={18} className="text-primary flex-shrink-0 ml-1" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tell us how you're feeling…"
                className="flex-1 bg-transparent border-none outline-none text-body-md sm:text-body-lg text-on-surface placeholder:text-on-surface-variant/60 py-2 min-w-0"
                aria-label="Describe your symptoms"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2.5 sm:p-3 rounded-full hover:bg-primary-container active:scale-95 transition-all flex-shrink-0"
                aria-label="Check symptoms"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {SYMPTOM_SUGGESTIONS.slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="text-white/80 text-caption bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/20 hover:text-white transition-all text-[11px] sm:text-[12px]"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.form>

          {/* Subtext */}
          <motion.p variants={item} className="text-white/70 text-body-md sm:text-body-lg max-w-lg leading-relaxed">
            Immediate medical guidance powered by AI and verified by clinicians. Find the right level of care in seconds.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={item} className="flex flex-wrap gap-5 sm:gap-8 pt-4 border-t border-white/10">
            {[
              { value: '15k+', label: 'Daily assessments' },
              { value: '< 12s', label: 'Avg response time' },
              { value: '98%', label: 'Satisfaction rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-white font-bold text-lg sm:text-xl">{stat.value}</div>
                <div className="text-white/50 text-caption mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
