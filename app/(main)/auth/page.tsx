'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, ArrowRight, Shield, Lock } from 'lucide-react'

type AuthStep = 'phone' | 'otp' | 'profile'

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isGuest, setIsGuest] = useState(false)

  const handleOtpChange = (val: string, i: number) => {
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) {
      const nextInput = document.getElementById(`otp-${i + 1}`)
      nextInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-10">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L9 16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-display-md text-ink-dark mb-2">
            {step === 'phone' ? 'Sign in to CareCompass' : step === 'otp' ? 'Enter your code' : 'Complete your profile'}
          </h1>
          <p className="text-body-md text-on-surface-variant">
            {step === 'phone' ? 'Save your health history and get personalised care.' : step === 'otp' ? `We sent a 6-digit code to ${phone}` : 'This helps us give you accurate guidance.'}
          </p>
        </div>

        {/* Step: Phone */}
        {step === 'phone' && (
          <div className="space-y-4">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Phone number</label>
              <div className="flex items-center gap-2">
                <div className="bg-surface-container-low border border-outline-variant rounded-lg px-3 h-12 flex items-center text-body-md text-on-surface font-semibold flex-shrink-0">
                  🇰🇪 +254
                </div>
                <input
                  type="tel"
                  placeholder="700 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field flex-1"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('otp')}
              disabled={phone.length < 9}
              className="btn-primary w-full gap-2 disabled:opacity-40"
            >
              <Phone size={16} /> Send verification code
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-outline-variant/30" />
              <span className="text-caption text-on-surface-variant">or</span>
              <div className="flex-1 h-px bg-outline-variant/30" />
            </div>

            <Link href="/" className="btn-secondary w-full text-center">
              Continue as guest (no account)
            </Link>

            <div className="flex items-start gap-2 mt-4 p-3 bg-medical-blue-muted rounded-xl">
              <Shield size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-caption text-on-surface-variant">
                Your phone number is only used for authentication. We never share or sell your health data.
              </p>
            </div>
          </div>
        )}

        {/* Step: OTP */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-label-md text-on-surface mb-4">Verification code</label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-12 h-14 text-center text-headline-md font-bold border border-outline-variant rounded-xl bg-surface-container-low focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep('profile')}
              className="btn-primary w-full gap-2"
            >
              Verify <ArrowRight size={16} />
            </button>
            <button onClick={() => setStep('phone')} className="w-full text-center text-label-md text-on-surface-variant hover:text-primary transition-colors">
              ← Back / Resend code
            </button>
          </div>
        )}

        {/* Step: Profile completion */}
        {step === 'profile' && (
          <div className="space-y-5">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Full name <span className="text-on-surface-variant font-normal">(optional)</span></label>
              <input type="text" placeholder="Jane Wanjiku" className="input-field" />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2">Age</label>
              <input type="number" placeholder="34" className="input-field max-w-[140px]" />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-3">Language preference</label>
              <div className="flex gap-3">
                {['English', 'Kiswahili'].map((lang) => (
                  <button key={lang} className="px-5 py-2.5 rounded-full border border-outline-variant text-body-sm font-medium text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <Link href="/" className="btn-primary w-full gap-2 mt-2">
              Get started <ArrowRight size={16} />
            </Link>
            <p className="text-caption text-center text-on-surface-variant">
              By signing up you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
