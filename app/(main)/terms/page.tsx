import Link from 'next/link'

export const metadata = { title: 'Terms of Service — CareCompass' }

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the CareCompass platform (website, mobile application, or API), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the service.',
  },
  {
    title: '2. Description of Service',
    content: 'CareCompass provides an AI-assisted symptom-triage tool and a directory of healthcare facilities in Kenya. The service is designed to help users determine the appropriate level of care for their symptoms — not to diagnose, treat, or prescribe. All clinical guidance is reviewed by licensed medical professionals, but no output from CareCompass constitutes a doctor–patient relationship.',
  },
  {
    title: '3. Medical Disclaimer',
    content: 'THE INFORMATION PROVIDED BY CARECOMPASS IS FOR GENERAL INFORMATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE MEDICAL ADVICE. In a medical emergency, call 999 immediately. Do not delay seeking professional medical care because of information obtained from CareCompass.',
  },
  {
    title: '4. User Responsibilities',
    content: 'You agree to: (a) provide accurate symptom information to receive appropriate guidance; (b) not use the service to seek a clinical diagnosis; (c) not share your account credentials with third parties; (d) comply with all applicable Kenyan laws when using the service.',
  },
  {
    title: '5. Prohibited Uses',
    content: 'You may not: (a) use the service to provide medical advice to other people commercially; (b) scrape, reverse-engineer, or reproduce the service or its clinical content; (c) submit false or misleading symptom data; (d) use the service to harass, defame, or harm any clinic, clinician, or person.',
  },
  {
    title: '6. Clinic Listings',
    content: 'Clinic data is sourced from partner facilities and publicly available records. CareCompass does not guarantee the accuracy, availability, or quality of any listed clinic. Verified badges indicate that the clinic has undergone our onboarding process but do not constitute an endorsement of clinical outcomes.',
  },
  {
    title: '7. Intellectual Property',
    content: 'All content, trademarks, and software on CareCompass are the property of CareCompass Kenya Ltd. You may not copy, modify, or distribute any part of the service without our express written consent.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'To the maximum extent permitted by law, CareCompass shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you have paid to us in the preceding 12 months, or KES 5,000 — whichever is greater.',
  },
  {
    title: '9. Termination',
    content: 'We reserve the right to suspend or terminate your account at any time for breach of these terms. You may delete your account at any time from account settings.',
  },
  {
    title: '10. Governing Law',
    content: 'These terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi, Kenya.',
  },
  {
    title: '11. Changes',
    content: 'We may revise these terms at any time. Continued use of the service after changes take effect constitutes acceptance of the revised terms. We will provide at least 14 days\' notice of material changes.',
  },
]

export default function TermsPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-display-md text-ink-dark">Terms of Service</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Please read these terms carefully before using CareCompass. By using our service, you agree to the following conditions.
          </p>
          <p className="text-caption text-on-surface-variant mt-4">Last updated: 1 June 2026 · Effective: 1 June 2026</p>
        </div>
      </div>

      <div className="section-container py-14 max-w-3xl">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-headline-md text-ink-dark mb-3">{s.title}</h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/privacy" className="text-primary text-label-md font-semibold hover:underline">Privacy Policy →</Link>
          <Link href="/disclaimer" className="text-primary text-label-md font-semibold hover:underline">Medical Disclaimer →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact Us →</Link>
        </div>
      </div>
    </>
  )
}
