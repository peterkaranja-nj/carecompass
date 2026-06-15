import Link from 'next/link'

export const metadata = { title: 'Privacy Policy — CareCompass' }

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal Identifiers: When you create an account or use our symptom checker, we may collect your name, email address, phone number, and date of birth.',
      'Health Information: Symptoms, conditions, and triage responses you submit are stored to provide personalised care recommendations. This data is treated as sensitive health information.',
      'Location Data: With your permission, we collect approximate location to surface nearby clinics. Precise GPS data is never stored on our servers.',
      'Device & Usage Data: IP address, browser type, operating system, pages visited, and session duration — used solely to improve performance and security.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To operate and improve the CareCompass triage and clinic-finder service.',
      'To match you with appropriate nearby healthcare facilities based on your symptoms and location.',
      'To send appointment reminders or follow-up check-ins if you opt in.',
      'For anonymised, aggregated research to improve clinical protocols — your data is never sold or shared in an identifiable form.',
    ],
  },
  {
    title: '3. Sharing of Information',
    content: [
      'Partner Clinics: If you initiate a check-in through CareCompass, relevant health information is shared securely with the receiving clinic for care continuity.',
      'Service Providers: We use vetted third-party processors (cloud hosting, analytics) under strict data processing agreements that prohibit secondary use.',
      'Legal Requirements: We may disclose information if required by Kenyan law, court order, or to protect the safety of our users.',
      'We never sell personal or health data to advertisers or data brokers.',
    ],
  },
  {
    title: '4. Data Security',
    content: [
      'All data is encrypted in transit (TLS 1.3) and at rest (AES-256).',
      'Access to health records is restricted to authorised staff under strict need-to-know policies.',
      'We conduct regular security audits and penetration tests.',
      'In the event of a data breach, we will notify affected users and the relevant authorities within 72 hours as required by law.',
    ],
  },
  {
    title: '5. Your Rights',
    content: [
      'Access: You may request a copy of all personal data we hold about you.',
      'Correction: You may update or correct inaccurate information at any time from your account settings.',
      'Deletion: You may request deletion of your account and associated data. Certain records may be retained for legal compliance.',
      'Portability: You may request your health history in a machine-readable format.',
      'To exercise any of these rights, email privacy@carecompass.ke.',
    ],
  },
  {
    title: '6. Cookies & Tracking',
    content: [
      'We use essential cookies to maintain session state and security. These cannot be disabled.',
      'Analytics cookies (anonymised) help us understand how the app is used. You may opt out via our cookie banner.',
      'We do not use advertising or cross-site tracking cookies.',
    ],
  },
  {
    title: '7. Data Retention',
    content: [
      'Active account data is retained for as long as your account is open.',
      'Health records linked to clinic check-ins are retained for seven (7) years as required under Kenyan medical records regulations.',
      'Anonymous usage logs are deleted after 24 months.',
    ],
  },
  {
    title: '8. Children\'s Privacy',
    content: [
      'CareCompass is intended for users aged 18 and above. We do not knowingly collect personal information from minors. If you believe a child has submitted information, contact us and we will delete it promptly.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    content: [
      'We may update this policy periodically. Material changes will be communicated via email or a prominent in-app notice at least 14 days before taking effect.',
    ],
  },
  {
    title: '10. Contact',
    content: [
      'CareCompass Kenya Ltd, Upper Hill, Nairobi.',
      'Email: privacy@carecompass.ke | Phone: +254 20 000 1234',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-display-md text-ink-dark">Privacy Policy</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            We take your privacy seriously — especially when it comes to health information. This policy explains what we collect, why, and how you can control it.
          </p>
          <p className="text-caption text-on-surface-variant mt-4">Last updated: 1 June 2026</p>
        </div>
      </div>

      <div className="section-container py-14 max-w-3xl">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-headline-md text-ink-dark mb-4">{s.title}</h2>
              <ul className="space-y-3">
                {s.content.map((c, i) => (
                  <li key={i} className="text-body-md text-on-surface-variant leading-relaxed flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/terms" className="text-primary text-label-md font-semibold hover:underline">Terms of Service →</Link>
          <Link href="/disclaimer" className="text-primary text-label-md font-semibold hover:underline">Medical Disclaimer →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact Us →</Link>
        </div>
      </div>
    </>
  )
}
