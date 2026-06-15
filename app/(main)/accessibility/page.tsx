import Link from 'next/link'

export const metadata = { title: 'Accessibility — CareCompass' }

const FEATURES = [
  { title: 'Keyboard Navigation', desc: 'Every interactive element — buttons, links, forms — is fully reachable and operable using a keyboard alone.' },
  { title: 'Screen Reader Support', desc: 'Pages use semantic HTML and ARIA labels so assistive technologies like JAWS, NVDA, and VoiceOver can convey content accurately.' },
  { title: 'Colour Contrast', desc: 'Text and interactive elements meet WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text).' },
  { title: 'Resizable Text', desc: 'The interface remains fully functional when browser text is scaled up to 200% without loss of content or functionality.' },
  { title: 'Focus Indicators', desc: 'Visible focus rings are present on all focusable elements so keyboard-only users can always see where they are.' },
  { title: 'Captions & Transcripts', desc: 'All video content includes closed captions. Audio-only content has text transcripts available upon request.' },
  { title: 'Error Identification', desc: 'Form validation errors are communicated both visually and to screen readers, with clear instructions on how to correct them.' },
  { title: 'Skip Navigation', desc: 'A skip-to-content link is available at the top of each page for keyboard and screen reader users to bypass repeated navigation.' },
]

export default function AccessibilityPage() {
  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Commitment</p>
          <h1 className="text-display-md text-ink-dark">Accessibility</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Healthcare information must be accessible to everyone. We are committed to ensuring CareCompass meets and exceeds WCAG 2.1 Level AA.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-4xl space-y-14">
        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">Our Commitment</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
            CareCompass is committed to making our platform accessible to all people, including those with visual, auditory, cognitive, and motor impairments. We believe that access to healthcare navigation should not be limited by disability.
          </p>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. Where we fall short of this standard, we want to know — please report any issue using the contact details below.
          </p>
        </section>

        <section>
          <h2 className="text-headline-md text-ink-dark mb-6">Accessibility Features</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="border border-outline-variant/40 rounded-2xl p-5 bg-white">
                <h3 className="text-label-lg text-ink-dark font-semibold mb-2">{f.title}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">Known Limitations</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
            While we strive for full compliance, some areas are still being improved:
          </p>
          <ul className="space-y-2">
            {[
              'The interactive clinic map (SVG-based) currently has limited screen reader support. Text-based clinic listings are available as an alternative.',
              'Some older embedded third-party content may not meet our accessibility standards. We are working to replace or exclude these.',
              'PDF documents linked from the API docs section have not yet been fully tagged for accessibility.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-body-md text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-headline-md text-ink-dark mb-4">Report an Issue</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            If you encounter any accessibility barrier on CareCompass, we want to hear from you. Contact our accessibility team at{' '}
            <a href="mailto:access@carecompass.ke" className="text-primary font-semibold hover:underline">access@carecompass.ke</a>{' '}
            or call{' '}
            <a href="tel:+254200001234" className="text-primary font-semibold hover:underline">+254 20 000 1234</a>.
          </p>
          <p className="text-body-md text-on-surface-variant leading-relaxed mt-3">
            We aim to respond to all accessibility reports within 3 business days and to resolve critical barriers within 14 days.
          </p>
        </section>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
          <Link href="/contact" className="text-primary text-label-md font-semibold hover:underline">Contact Us →</Link>
          <Link href="/help" className="text-primary text-label-md font-semibold hover:underline">Help Center →</Link>
        </div>
      </div>
    </>
  )
}
