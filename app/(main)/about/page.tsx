'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Shield, Users, Zap, ArrowRight, Star, CheckCircle } from 'lucide-react'

const VALUES = [
  {
    icon: Heart,
    title: 'Patient First',
    description: 'Every decision we make starts with one question: how does this help the patient? We put human wellbeing at the center of every feature.',
    color: 'text-error',
    bg: 'bg-error-container',
  },
  {
    icon: Shield,
    title: 'Clinical Integrity',
    description: 'Our AI recommendations are built on evidence-based protocols and reviewed by certified clinicians — accuracy you can trust in moments that matter.',
    color: 'text-primary',
    bg: 'bg-primary-fixed',
  },
  {
    icon: Users,
    title: 'Universal Access',
    description: 'Quality healthcare guidance should not be a privilege. We partner with NHIF and NGOs to reach under-served communities across Kenya.',
    color: 'text-success-green',
    bg: 'bg-success-green-light',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description: 'In a health crisis, every second counts. Our system delivers triage guidance in under 12 seconds, so you spend less time confused and more time getting help.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
]

const TEAM = [
  { name: 'Dr. Amina Odhiambo', role: 'Chief Medical Officer', initials: 'AO' },
  { name: 'Peter Njau', role: 'Founder & CEO', initials: 'PN' },
  { name: 'Grace Wangari', role: 'Head of Clinical Partnerships', initials: 'GW' },
  { name: 'Brian Kamau', role: 'Lead AI Engineer', initials: 'BK' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/HeroCare bg.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-dark/85 via-ink-dark/60 to-ink-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 section-container w-full py-20 pt-28 sm:pt-32 md:py-28 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl mx-auto space-y-5 sm:space-y-6"
          >
            <motion.div variants={item} className="flex items-center justify-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse" />
              <span className="text-white/80 text-label-md uppercase tracking-widest text-[11px] sm:text-[12px]">Our Story</span>
            </motion.div>
            <motion.h1 variants={item} className="text-[32px] sm:text-[44px] md:text-[60px] font-bold leading-[1.05] tracking-tight text-white">
              Built for the moments
              <span className="block text-primary-fixed-dim">that matter most.</span>
            </motion.h1>
            <motion.p variants={item} className="text-white/70 text-body-md sm:text-body-lg max-w-xl mx-auto leading-relaxed">
              CareCompass was founded on a simple belief — no one should face a health crisis without knowing where to turn.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              className="lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-block text-label-md text-primary uppercase tracking-widest px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
                How We Started
              </span>
              <h2 className="text-display-md text-ink-dark mt-4">
                A problem we lived through.
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                In 2022, our founder watched a family member wait hours in the wrong ward — not because care was unavailable, but because they didn't know which facility was equipped for their situation. That moment became the seed of CareCompass.
              </p>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                We partnered with emergency physicians, nurses, and data scientists to build an AI triage engine that speaks plain language, works on low-bandwidth connections, and integrates with Kenya's real healthcare network.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {[
                  'Clinician-reviewed decision trees',
                  'Real-time facility availability',
                  'NHIF & insurance integration',
                  'Swahili & English support',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-success-green flex-shrink-0" />
                    <span className="text-body-md text-on-surface-variant">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <div className="rounded-[28px] overflow-hidden shadow-airy-xl">
                <img
                  src="https://images.unsplash.com/photo-1666886573531-48d2e3c2b684?auto=format&fit=crop&w=900&q=80"
                  alt="Doctor consulting patient with tablet"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface-container-low">
        <div className="section-container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-label-md text-primary uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
              What Drives Us
            </span>
            <h2 className="text-display-md text-ink-dark mt-4">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="card border border-outline-variant/20 hover:border-primary/20 hover:shadow-airy-md transition-all duration-300 flex gap-5"
                >
                  <div className={`${val.bg} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={24} className={val.color} />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-ink-dark mb-2">{val.title}</h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">{val.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-label-md text-primary uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-primary/6 border border-primary/10">
              The People
            </span>
            <h2 className="text-display-md text-ink-dark mt-4">Meet the Team</h2>
            <p className="text-body-lg text-on-surface-variant mt-4 max-w-lg mx-auto">
              Clinicians, engineers, and designers working together to make healthcare navigation effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-headline-md mx-auto mb-4 group-hover:scale-105 transition-transform shadow-airy-md">
                  {member.initials}
                </div>
                <p className="text-label-lg text-ink-dark font-semibold">{member.name}</p>
                <p className="text-caption text-on-surface-variant mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-80" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="section-container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <h2 className="text-display-md text-white">Ready to find the right care?</h2>
            <p className="text-white/80 text-body-lg max-w-lg mx-auto">
              Try our AI-powered symptom checker — it takes under 60 seconds and is completely free.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/check"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-primary-fixed transition-all shadow-airy-xl active:scale-95"
              >
                Check Symptoms <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
