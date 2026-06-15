'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Send, Loader2, User, Bot,
  Minus, Plus, Check, X, Stethoscope, Shield, Sparkles,
} from 'lucide-react'
import { SYMPTOM_SUGGESTIONS } from '@/lib/data'
import type { Message } from '@/types'

type Step = 'profile' | 'symptoms' | 'chat'

interface Profile {
  age: number | ''
  sex: string
  conditions: string[]
}

const CHRONIC_CONDITIONS = [
  { label: 'Diabetes', emoji: '🩸' },
  { label: 'Hypertension', emoji: '❤️' },
  { label: 'Asthma', emoji: '🫁' },
  { label: 'Heart disease', emoji: '🫀' },
  { label: 'HIV', emoji: '💊' },
  { label: 'None', emoji: '✅' },
]

const SYMPTOM_GROUPS = [
  {
    label: 'Chest & Breathing',
    emoji: '🫁',
    items: ['Chest pain', 'Difficulty breathing', 'Persistent cough'],
  },
  {
    label: 'Head & Neuro',
    emoji: '🧠',
    items: ['Severe headache', 'Dizziness or fainting'],
  },
  {
    label: 'Stomach & Gut',
    emoji: '🫃',
    items: ['Abdominal pain', 'Nausea or vomiting'],
  },
  {
    label: 'Body & Skin',
    emoji: '🩹',
    items: ['High fever', 'Skin rash', 'Fatigue', 'Joint pain', 'Back pain'],
  },
  {
    label: 'ENT & Eyes',
    emoji: '👁',
    items: ['Sore throat', 'Eye redness', 'Toothache'],
  },
]

const QUICK_REPLIES = [
  'Just started today',
  '2–3 days ago',
  'About a week',
  'Severe pain (8–10/10)',
  'Moderate (5–7/10)',
  'Mild (1–4/10)',
]

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

export default function CheckPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [step, setStep] = useState<Step>('profile')
  const [profile, setProfile] = useState<Profile>({ age: '', sex: '', conditions: [] })
  const [selected, setSelected] = useState<string[]>(initialQuery ? [initialQuery] : [])
  const [custom, setCustom] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  useEffect(() => {
    if (step === 'chat') inputRef.current?.focus()
  }, [step, isStreaming])

  const toggleCondition = (c: string) => {
    if (c === 'None') {
      setProfile((p) => ({ ...p, conditions: p.conditions.includes('None') ? [] : ['None'] }))
      return
    }
    setProfile((p) => ({
      ...p,
      conditions: p.conditions.includes(c)
        ? p.conditions.filter((x) => x !== c)
        : [...p.conditions.filter((x) => x !== 'None'), c],
    }))
  }

  const toggleSymptom = (s: string) => {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const addCustom = () => {
    const t = custom.trim()
    if (t && !selected.includes(t)) {
      setSelected((p) => [...p, t])
      setCustom('')
    }
  }

  const startChat = () => {
    const greeting: Message = {
      role: 'assistant',
      content: `Hi there. I'm CareCompass's AI triage assistant — clinician-reviewed and HIPAA-aligned.\n\nBased on your profile (${profile.age} years old, ${profile.sex}) and what you've shared — **${selected.join(', ')}** — I have a few focused follow-up questions to recommend the right level of care.\n\nFirst: **how long have you been experiencing these symptoms?**`,
    }
    setMessages([greeting])
    setStep('chat')
  }

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || isStreaming) return
    setMessages((m) => [...m, { role: 'user', content }])
    setInput('')
    setIsStreaming(true)

    await new Promise((r) => setTimeout(r, 1300))

    const replies = [
      'Thank you. Are you experiencing any of the following alongside your symptoms?\n\n• Shortness of breath or chest tightness\n• Pain radiating to your arm or jaw\n• Sudden confusion or difficulty speaking\n\nPlease answer yes or no for each.',
      'Got it. On a scale of **1 to 10**, how would you rate the intensity of your discomfort right now?\n\n*(1 = barely noticeable, 10 = worst pain imaginable)*',
      'Thank you for that detail. Based on everything you\'ve described, I\'d recommend you seek care **within the next 2–4 hours**.\n\nI\'m now preparing your personalised triage summary with nearby clinics and current wait times.',
    ]

    const idx = Math.min(messages.length, replies.length - 1)
    setMessages((m) => [...m, { role: 'assistant', content: replies[idx] }])
    setIsStreaming(false)

    if (messages.length >= 4) {
      setTimeout(() => router.push('/results?urgency=urgent&from=check'), 1800)
    }
  }

  const stepIndex = step === 'profile' ? 0 : step === 'symptoms' ? 1 : 2
  const canProceedProfile = profile.age !== '' && Number(profile.age) > 0 && profile.sex !== ''

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-surface-container-low via-white to-blue-50/30">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-outline-variant/25 shadow-sm">
        <div className="section-container h-16 flex items-center justify-between">
          {/* Back */}
          <button
            onClick={() =>
              step === 'profile'
                ? router.push('/')
                : step === 'symptoms'
                ? setStep('profile')
                : setStep('symptoms')
            }
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-label-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Steps */}
          <div className="flex items-center gap-2 sm:gap-4">
            {['Profile', 'Symptoms', 'Assessment'].map((label, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                      i < stepIndex
                        ? 'bg-primary text-white'
                        : i === stepIndex
                        ? 'bg-primary text-white ring-4 ring-primary/20'
                        : 'bg-outline-variant/30 text-on-surface-variant/50'
                    }`}
                  >
                    {i < stepIndex ? <Check size={12} /> : i + 1}
                  </div>
                  <span
                    className={`hidden sm:inline text-label-sm font-medium transition-colors ${
                      i <= stepIndex ? 'text-ink-dark' : 'text-on-surface-variant/40'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 sm:w-14 h-0.5 rounded-full transition-all duration-500 ${
                      i < stepIndex ? 'bg-primary' : 'bg-outline-variant/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Emergency pill */}
          <a
            href="tel:999"
            className="hidden sm:flex items-center gap-1.5 bg-error/10 text-error border border-error/20 px-3 py-1.5 rounded-full text-label-sm font-bold hover:bg-error hover:text-white transition-all"
          >
            999 · Emergency
          </a>
          <div className="sm:hidden w-16" />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10 sm:py-16">
        <AnimatePresence mode="wait">
          {/* ── STEP 1: PROFILE ── */}
          {step === 'profile' && (
            <motion.div
              key="profile"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              className="w-full max-w-lg"
            >
              {/* Header */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-4">
                  <Shield size={13} className="text-primary" />
                  <span className="text-label-sm text-primary font-semibold">Private &amp; secure</span>
                </div>
                <h1 className="text-[28px] sm:text-[36px] font-bold text-ink-dark leading-tight mb-2">
                  Let&apos;s start with you
                </h1>
                <p className="text-body-md text-on-surface-variant">
                  A little context helps us give you accurate, personalised guidance.
                </p>
              </div>

              <div className="space-y-8">
                {/* Age */}
                <div>
                  <label className="block text-label-md text-ink-dark font-semibold mb-3">Your age</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, age: Math.max(0, Number(p.age || 0) - 1) }))}
                      className="w-11 h-11 rounded-full border border-outline-variant/50 bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      placeholder="—"
                      value={profile.age}
                      onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value === '' ? '' : Number(e.target.value) }))}
                      className="w-24 text-center text-[28px] font-bold text-ink-dark border-b-2 border-primary/40 focus:border-primary outline-none bg-transparent transition-colors pb-1"
                    />
                    <button
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, age: Math.min(120, Number(p.age || 0) + 1) }))}
                      className="w-11 h-11 rounded-full border border-outline-variant/50 bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="text-on-surface-variant text-body-md">years old</span>
                  </div>
                </div>

                {/* Sex */}
                <div>
                  <label className="block text-label-md text-ink-dark font-semibold mb-3">Biological sex</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'Male', emoji: '♂', desc: 'Male' },
                      { value: 'Female', emoji: '♀', desc: 'Female' },
                      { value: 'Other', emoji: '⊕', desc: 'Other / Prefer not to say' },
                    ].map(({ value, emoji, desc }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setProfile((p) => ({ ...p, sex: value }))}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-medium ${
                          profile.sex === value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-outline-variant/40 bg-white text-on-surface-variant hover:border-primary/40 hover:text-ink-dark'
                        }`}
                      >
                        {profile.sex === value && (
                          <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </span>
                        )}
                        <span className="text-2xl">{emoji}</span>
                        <span className="text-label-sm text-center leading-tight">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <label className="block text-label-md text-ink-dark font-semibold mb-1">Pre-existing conditions</label>
                  <p className="text-caption text-on-surface-variant mb-3">Optional — helps us flag relevant risks</p>
                  <div className="flex flex-wrap gap-2">
                    {CHRONIC_CONDITIONS.map(({ label, emoji }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleCondition(label)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-label-sm font-medium transition-all ${
                          profile.conditions.includes(label)
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white border-outline-variant/50 text-on-surface-variant hover:border-primary/40 hover:text-ink-dark'
                        }`}
                      >
                        <span>{emoji}</span> {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep('symptoms')}
                  disabled={!canProceedProfile}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl text-label-md font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-35 disabled:cursor-not-allowed shadow-sm"
                >
                  Continue to Symptoms <ArrowRight size={17} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: SYMPTOMS ── */}
          {step === 'symptoms' && (
            <motion.div
              key="symptoms"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              className="w-full max-w-2xl"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-4">
                  <Stethoscope size={13} className="text-primary" />
                  <span className="text-label-sm text-primary font-semibold">Select all that apply</span>
                </div>
                <h1 className="text-[28px] sm:text-[36px] font-bold text-ink-dark leading-tight mb-2">
                  What are you experiencing?
                </h1>
                <p className="text-body-md text-on-surface-variant">
                  Choose from the categories below or describe in your own words.
                </p>
              </div>

              {/* Grouped symptoms */}
              <div className="space-y-5 mb-6">
                {SYMPTOM_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="text-label-sm text-on-surface-variant font-semibold uppercase tracking-wide mb-2.5 flex items-center gap-2">
                      <span>{group.emoji}</span> {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSymptom(s)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-label-sm font-medium transition-all ${
                            selected.includes(s)
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white border-outline-variant/50 text-on-surface-variant hover:border-primary/40 hover:text-ink-dark'
                          }`}
                        >
                          {selected.includes(s) && <Check size={12} />}
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Describe another symptom…"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                  className="flex-1 border border-outline-variant/50 rounded-2xl px-4 py-3 text-body-md text-on-surface bg-white outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={addCustom}
                  disabled={!custom.trim()}
                  className="px-5 py-3 bg-primary/8 border border-primary/20 text-primary rounded-2xl text-label-sm font-bold hover:bg-primary/15 transition-all disabled:opacity-40"
                >
                  Add
                </button>
              </div>

              {/* Selected chips */}
              <AnimatePresence>
                {selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mb-6 p-4 bg-white border border-primary/15 rounded-2xl"
                  >
                    <p className="text-label-sm text-primary font-semibold mb-2.5">
                      {selected.length} symptom{selected.length > 1 ? 's' : ''} selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1.5 bg-primary/8 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-label-sm font-medium"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => toggleSymptom(s)}
                            className="hover:text-error transition-colors ml-0.5"
                            aria-label={`Remove ${s}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={startChat}
                disabled={selected.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl text-label-md font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-35 disabled:cursor-not-allowed shadow-sm"
              >
                <Sparkles size={17} /> Start AI Assessment
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: CHAT ── */}
          {step === 'chat' && (
            <motion.div
              key="chat"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              className="w-full max-w-2xl flex flex-col"
              style={{ height: 'calc(100vh - 120px)', maxHeight: 700 }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 bg-white border border-outline-variant/30 rounded-t-2xl px-5 py-4 shadow-sm">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="text-label-md text-ink-dark font-semibold leading-none">CareCompass AI</p>
                  <p className="text-caption text-on-surface-variant mt-0.5">Clinician-reviewed · Secure session</p>
                </div>
                <div className="flex items-center gap-1.5 text-caption text-on-surface-variant bg-surface-container-low border border-outline-variant/30 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </div>
              </div>

              {/* Context bar */}
              <div className="bg-primary/5 border-x border-primary/15 px-4 py-2.5 flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-caption text-primary">
                  <span className="font-semibold">Age:</span> {profile.age}
                </span>
                <span className="text-caption text-primary">
                  <span className="font-semibold">Sex:</span> {profile.sex}
                </span>
                <span className="text-caption text-primary">
                  <span className="font-semibold">Symptoms:</span> {selected.join(', ')}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-surface-container-low border-x border-outline-variant/25 px-4 py-5 space-y-5">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'assistant' ? 'bg-primary' : 'bg-ink-dark/10'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <Bot size={15} className="text-white" />
                      ) : (
                        <User size={15} className="text-ink-dark/60" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] text-body-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'assistant'
                          ? 'bg-white border border-outline-variant/25 text-on-surface shadow-sm rounded-tl-sm'
                          : 'bg-primary text-white shadow-sm rounded-tr-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isStreaming && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 items-end"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot size={15} className="text-white" />
                    </div>
                    <div className="bg-white border border-outline-variant/25 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              {!isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
                <div className="bg-white border-x border-outline-variant/25 px-4 pt-3 pb-1 flex gap-2 overflow-x-auto scrollbar-hide">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="flex-shrink-0 text-caption text-primary border border-primary/25 bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all font-medium"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {/* Input bar */}
              <div className="bg-white border border-outline-variant/25 rounded-b-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-3 items-end">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type your response…"
                    disabled={isStreaming}
                    className="flex-1 border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md text-on-surface bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:opacity-50 resize-none"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isStreaming}
                    className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-35 flex-shrink-0"
                    aria-label="Send"
                  >
                    {isStreaming ? (
                      <Loader2 size={18} className="text-white animate-spin" />
                    ) : (
                      <Send size={17} className="text-white" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant/50 mt-2 text-center">
                  Not a substitute for professional medical advice · Emergency? Call 999
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
