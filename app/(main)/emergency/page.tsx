import Link from 'next/link'
import { Phone, AlertTriangle } from 'lucide-react'

export const metadata = { title: 'Emergency Information — CareCompass' }

const EMERGENCY_CONTACTS = [
  { service: 'Police', number: '999', alt: '0800 722 203', desc: 'Criminal emergencies, accidents, security threats' },
  { service: 'Ambulance (NAIROBI)', number: '0709 857 000', alt: '0723 253 333', desc: 'Kenya Red Cross ambulance service' },
  { service: 'Fire Brigade', number: '999', alt: '020 222 2181', desc: 'Fire and rescue services' },
  { service: 'Kenyatta National Hospital', number: '020 272 6300', alt: null, desc: '24-hour casualty / A&E — Upper Hill, Nairobi' },
  { service: 'Aga Khan University Hospital', number: '020 366 2000', alt: null, desc: '24-hour emergency — 3rd Parklands Ave' },
  { service: 'MP Shah Hospital', number: '020 428 8000', alt: null, desc: '24-hour A&E — Shivachi Road, Parklands' },
  { service: 'Nairobi Hospital', number: '020 284 5000', alt: null, desc: '24-hour emergency — Argwings Kodhek Rd' },
  { service: 'Poison Control', number: '020 272 6300', alt: null, desc: 'KNH toxicology unit — ask for Poison Control' },
  { service: 'Mental Health Helpline', number: '0800 720 535', alt: null, desc: 'Befrienders Kenya — free, confidential, 24/7' },
]

const WARNING_SIGNS = [
  'Chest pain or pressure, especially spreading to arm or jaw',
  'Difficulty breathing, shortness of breath at rest',
  'Sudden severe headache unlike any you have had before',
  'Sudden confusion, trouble speaking, or understanding speech',
  'Sudden weakness or numbness on one side of the face or body',
  'Coughing or vomiting blood',
  'Severe abdominal pain',
  'Loss of consciousness or unresponsiveness',
  'Severe allergic reaction (throat swelling, hives, tongue swelling)',
  'Uncontrolled or severe bleeding',
  'Seizure (first-time or prolonged)',
  'High fever (above 40 °C / 104 °F) with stiff neck or rash',
]

export default function EmergencyPage() {
  return (
    <>
      {/* Urgent top banner */}
      <div className="bg-error pt-16 pb-8 text-white">
        <div className="section-container">
          <div className="flex items-start gap-4">
            <AlertTriangle size={32} className="flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-display-sm font-bold leading-tight">Emergency Information</h1>
              <p className="text-white/85 text-body-lg mt-2 max-w-2xl">
                If you are experiencing a medical emergency, stop and call 999 now. This page provides reference information — do not use CareCompass for emergencies.
              </p>
              <a
                href="tel:999"
                className="inline-flex items-center gap-2.5 mt-5 bg-white text-error font-bold px-7 py-3.5 rounded-full text-label-lg hover:bg-red-50 transition-colors"
              >
                <Phone size={18} /> Call 999 Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-14 max-w-4xl space-y-14">
        {/* Warning signs */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-2">Signs You Need Emergency Care</h2>
          <p className="text-body-md text-on-surface-variant mb-5">Call 999 or go to the nearest A&amp;E immediately if you experience any of the following:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {WARNING_SIGNS.map((sign) => (
              <div key={sign} className="flex gap-3 items-start bg-error-container/40 rounded-xl p-3.5">
                <span className="w-2 h-2 rounded-full bg-error mt-1.5 flex-shrink-0" />
                <p className="text-body-sm text-on-surface leading-snug">{sign}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency contacts */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Emergency Contacts — Nairobi</h2>
          <div className="space-y-3">
            {EMERGENCY_CONTACTS.map((c) => (
              <div key={c.service} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <div className="flex-1">
                  <p className="text-label-lg text-ink-dark font-semibold">{c.service}</p>
                  <p className="text-body-sm text-on-surface-variant mt-0.5">{c.desc}</p>
                </div>
                <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
                  <a href={`tel:${c.number.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors">
                    <Phone size={13} /> {c.number}
                  </a>
                  {c.alt && (
                    <a href={`tel:${c.alt.replace(/\s/g, '')}`} className="text-primary text-caption font-semibold hover:underline self-center sm:self-end">
                      Alt: {c.alt}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to do */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-5">While Waiting for Help</h2>
          <ol className="space-y-4">
            {[
              { n: '1', step: 'Stay calm', detail: 'Keep the patient as calm and still as possible. Reassure them help is on the way.' },
              { n: '2', step: 'Do not leave them alone', detail: 'Stay with the person unless you need to call for help.' },
              { n: '3', step: 'Keep airway clear', detail: 'If they are unconscious, place in the recovery position (on their side) unless a spinal injury is suspected.' },
              { n: '4', step: 'Control bleeding', detail: 'Apply firm, continuous pressure to wounds with a clean cloth. Do not remove embedded objects.' },
              { n: '5', step: 'Note the time', detail: 'Record when symptoms started — this is critical information for paramedics and A&E staff.' },
              { n: '6', step: 'Meet the ambulance', detail: 'Send someone to the road to flag down the ambulance and guide them to the patient.' },
            ].map(({ n, step, detail }) => (
              <li key={n} className="flex gap-4">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-bold text-body-md flex items-center justify-center flex-shrink-0">{n}</span>
                <div>
                  <p className="text-label-md text-ink-dark font-semibold">{step}</p>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/disclaimer" className="text-primary text-label-md font-semibold hover:underline">Medical Disclaimer →</Link>
          <Link href="/help" className="text-primary text-label-md font-semibold hover:underline">Help Center →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact Us →</Link>
        </div>
      </div>
    </>
  )
}
