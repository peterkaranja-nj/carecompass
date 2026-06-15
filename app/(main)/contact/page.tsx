'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 20 000 1234',
    href: 'tel:+254200001234',
    description: 'Mon–Fri, 8 am – 6 pm EAT',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@carecompass.ke',
    href: 'mailto:hello@carecompass.ke',
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nairobi, Kenya',
    href: null,
    description: 'Upper Hill, Nairobi CBD',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: 'Mon–Fri 8am–6pm',
    href: null,
    description: 'Emergency line available 24/7',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-transparent pointer-events-none" />
        <div className="section-container relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <motion.div variants={item} className="flex items-center justify-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-label-md uppercase tracking-widest">Get In Touch</span>
            </motion.div>
            <motion.h1 variants={item} className="text-display-md text-ink-dark">
              We're here to help
            </motion.h1>
            <motion.p variants={item} className="text-body-lg text-on-surface-variant leading-relaxed">
              Questions about CareCompass, partnership opportunities, or just want to say hello — reach out, we'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              <div className="card border border-outline-variant/20 shadow-airy-md p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center">
                    <MessageCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-headline-md text-ink-dark">Send a Message</h2>
                    <p className="text-caption text-on-surface-variant">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 bg-success-green-light rounded-full flex items-center justify-center mx-auto">
                      <Send size={28} className="text-success-green" />
                    </div>
                    <h3 className="text-headline-sm text-ink-dark">Message sent!</h3>
                    <p className="text-body-md text-on-surface-variant max-w-xs mx-auto">
                      Thanks for reaching out. A member of our team will reply within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="btn-secondary mt-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-label-md text-ink-dark mb-1.5" htmlFor="name">
                          Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md text-ink-dark mb-1.5" htmlFor="email">
                          Email Address <span className="text-error">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-label-md text-ink-dark mb-1.5" htmlFor="subject">
                        Subject <span className="text-error">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select a topic…</option>
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership / Clinic Listing</option>
                        <option value="technical">Technical Support</option>
                        <option value="media">Media & Press</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-label-md text-ink-dark mb-1.5" htmlFor="message">
                        Message <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help…"
                        className="input-field resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full gap-2">
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              <h2 className="text-headline-md text-ink-dark mb-6">Contact Details</h2>

              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon
                const content = (
                  <div className="card border border-outline-variant/20 hover:border-primary/25 hover:shadow-airy transition-all duration-200 flex items-start gap-4 cursor-default">
                    <div className="w-11 h-11 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">{info.label}</p>
                      <p className="text-body-md font-semibold text-ink-dark">{info.value}</p>
                      <p className="text-caption text-on-surface-variant mt-0.5">{info.description}</p>
                    </div>
                  </div>
                )

                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                  >
                    {info.href ? (
                      <a href={info.href}>{content}</a>
                    ) : (
                      content
                    )}
                  </motion.div>
                )
              })}

              {/* Emergency callout */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="bg-error-container border border-error/20 rounded-xl p-5 mt-6"
              >
                <p className="text-error font-semibold text-label-md mb-1">Medical Emergency?</p>
                <p className="text-on-error-container text-caption leading-relaxed mb-3">
                  Do not use this form. Call emergency services immediately.
                </p>
                <a
                  href="tel:999"
                  className="inline-flex items-center gap-2 bg-error text-white px-5 py-2.5 rounded-full font-bold text-label-md hover:bg-red-700 transition-colors"
                >
                  <Phone size={14} /> Call 999
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
