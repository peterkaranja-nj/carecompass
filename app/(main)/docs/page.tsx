import Link from 'next/link'

export const metadata = { title: 'API Docs — CareCompass' }

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/triage',
    desc: 'Submit symptom text and receive a triage recommendation (urgency level + care pathway).',
    params: ['symptoms: string (required)', 'age?: number', 'sex?: "male" | "female" | "other"', 'lang?: "en" | "sw"'],
  },
  {
    method: 'GET',
    path: '/v1/clinics',
    desc: 'Search for nearby healthcare facilities filtered by type, distance, and availability.',
    params: ['lat: number (required)', 'lng: number (required)', 'radius?: number (km, default 5)', 'type?: "hospital" | "clinic" | "pharmacy"', 'open_now?: boolean'],
  },
  {
    method: 'GET',
    path: '/v1/clinics/:id',
    desc: 'Get detailed information about a specific clinic including wait times and services.',
    params: ['id: string (required)'],
  },
  {
    method: 'GET',
    path: '/v1/symptoms',
    desc: 'Search and autocomplete symptom terms from our clinical ontology.',
    params: ['q: string (required)', 'lang?: "en" | "sw"', 'limit?: number (default 10)'],
  },
  {
    method: 'POST',
    path: '/v1/checkin',
    desc: 'Register a patient check-in at a partner clinic. Requires clinic API key.',
    params: ['clinic_id: string (required)', 'triage_id: string (required)', 'patient_token?: string'],
  },
]

const URGENCY_LEVELS = [
  { level: 'EMERGENCY', color: 'bg-red-100 text-red-700', desc: 'Life-threatening. Go to A&E or call 999 immediately.' },
  { level: 'URGENT', color: 'bg-orange-100 text-orange-700', desc: 'Needs care within 2–4 hours. Urgent care or clinic today.' },
  { level: 'SEMI_URGENT', color: 'bg-yellow-100 text-yellow-700', desc: 'See a doctor within 24–48 hours.' },
  { level: 'NON_URGENT', color: 'bg-green-100 text-green-700', desc: 'Routine GP appointment. May try pharmacy first.' },
  { level: 'SELF_CARE', color: 'bg-blue-100 text-blue-700', desc: 'Manageable at home with self-care guidance provided.' },
]

export default function DocsPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Developers</p>
          <h1 className="text-display-md text-ink-dark">API Documentation</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Integrate CareCompass triage and clinic-finder into your health application. Base URL:{' '}
            <code className="bg-ink-dark/8 text-ink-dark px-2 py-0.5 rounded text-body-sm font-mono">https://api.carecompass.ke</code>
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-4xl space-y-14">
        {/* Auth */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">Authentication</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
            All API requests require a Bearer token passed in the Authorization header. Request an API key from the Partners portal or by emailing <a href="mailto:api@carecompass.ke" className="text-primary font-semibold hover:underline">api@carecompass.ke</a>.
          </p>
          <pre className="bg-ink-dark text-green-400 rounded-2xl p-5 text-body-sm font-mono overflow-x-auto">
{`curl -X POST https://api.carecompass.ke/v1/triage \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"symptoms": "severe headache and stiff neck", "age": 34}'`}
          </pre>
        </section>

        {/* Rate limits */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-outline-variant/40 rounded-2xl overflow-hidden text-body-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  {['Plan', 'Requests / min', 'Requests / day', 'Cost'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-label-sm text-ink-dark font-semibold border-b border-outline-variant/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ['Free', '10', '500', 'Free'],
                  ['Starter', '60', '10,000', 'KES 2,500/mo'],
                  ['Growth', '300', '100,000', 'KES 12,000/mo'],
                  ['Enterprise', 'Unlimited', 'Unlimited', 'Custom'],
                ].map(([plan, rpm, rpd, cost]) => (
                  <tr key={plan} className="border-b border-outline-variant/20 last:border-0">
                    <td className="px-4 py-3 text-ink-dark font-medium">{plan}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{rpm}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{rpd}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Endpoints */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Endpoints</h2>
          <div className="space-y-5">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className="border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`text-label-sm font-bold px-3 py-1 rounded-full font-mono ${ep.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {ep.method}
                  </span>
                  <code className="text-body-sm font-mono text-ink-dark">{ep.path}</code>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-3 leading-relaxed">{ep.desc}</p>
                <div className="bg-surface-container-low rounded-xl p-3">
                  <p className="text-caption text-on-surface-variant font-semibold mb-2">Parameters</p>
                  <ul className="space-y-1">
                    {ep.params.map((p) => (
                      <li key={p} className="text-body-sm font-mono text-ink-dark/80">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Urgency levels */}
        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Triage Urgency Levels</h2>
          <p className="text-body-md text-on-surface-variant mb-4">The <code className="bg-ink-dark/8 px-1.5 py-0.5 rounded text-body-sm font-mono">/v1/triage</code> endpoint returns one of five urgency levels:</p>
          <div className="space-y-3">
            {URGENCY_LEVELS.map((u) => (
              <div key={u.level} className="flex items-start gap-4 border border-outline-variant/40 rounded-xl p-4 bg-white">
                <span className={`text-label-sm font-bold px-3 py-1 rounded-full font-mono flex-shrink-0 ${u.color}`}>{u.level}</span>
                <p className="text-body-sm text-on-surface-variant">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8">
          <h3 className="text-label-lg text-ink-dark font-semibold mb-2">Ready to integrate?</h3>
          <p className="text-body-sm text-on-surface-variant mb-5">Get your API key and start building in minutes. Enterprise plans include dedicated support and custom SLAs.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/partners" className="bg-primary text-white px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors">Get API Access</Link>
            <a href="mailto:api@carecompass.ke" className="border border-primary text-primary px-6 py-3 rounded-full text-label-md font-bold hover:bg-primary/5 transition-colors">Contact API Team</a>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/partners" className="text-primary text-label-md font-semibold hover:underline">Become a Partner →</Link>
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact →</Link>
        </div>
      </div>
    </>
  )
}
