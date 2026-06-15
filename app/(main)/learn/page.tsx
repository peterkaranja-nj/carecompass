import Link from 'next/link'
import { Search, ChevronRight, BookOpen } from 'lucide-react'

const CATEGORIES = [
  { name: 'Respiratory', icon: '🫁', count: 24, color: 'bg-medical-blue-muted text-primary' },
  { name: 'Cardiovascular', icon: '❤️', count: 18, color: 'bg-error-container text-error' },
  { name: 'Digestive', icon: '🫃', count: 21, color: 'bg-success-green-light text-success-green' },
  { name: 'Musculoskeletal', icon: '🦴', count: 16, color: 'bg-surface-container-high text-on-surface-variant' },
  { name: "Women's Health", icon: '🌸', count: 19, color: 'bg-pink-50 text-pink-700' },
  { name: 'Mental Health', icon: '🧠', count: 12, color: 'bg-secondary-fixed text-secondary' },
  { name: 'Skin & Dermatology', icon: '🩹', count: 20, color: 'bg-amber-50 text-amber-700' },
  { name: 'Paediatrics', icon: '👶', count: 15, color: 'bg-success-green-light text-success-green' },
]

const FEATURED_ARTICLES = [
  { title: 'When should chest pain send you to the ER?', category: 'Cardiovascular', readTime: '4 min', urgency: 'emergency' },
  { title: 'Managing fever at home: a step-by-step guide', category: 'General', readTime: '5 min', urgency: 'routine' },
  { title: 'Understanding your malaria test results', category: 'Infectious Disease', readTime: '6 min', urgency: 'urgent' },
  { title: 'High blood pressure: what the numbers mean', category: 'Cardiovascular', readTime: '7 min', urgency: 'routine' },
  { title: 'Signs of dehydration and how to treat it', category: 'General', readTime: '3 min', urgency: 'routine' },
  { title: "When a child's cough needs medical attention", category: 'Paediatrics', readTime: '5 min', urgency: 'urgent' },
]

const URGENCY_COLORS: Record<string, string> = {
  emergency: 'badge-emergency',
  urgent: 'badge-urgent',
  routine: 'badge-routine',
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-warm-surface border-b border-outline-variant/30 py-14">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-3">Evidence-based</p>
          <h1 className="text-display-md text-ink-dark mb-4">Health Library</h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mb-8">
            Plain-language articles written by clinicians. No jargon, no misinformation.
          </p>
          <div className="flex items-center gap-3 bg-white border border-outline-variant/40 rounded-full px-4 py-2 max-w-lg shadow-airy focus-within:ring-2 focus-within:ring-primary transition-all">
            <Search size={18} className="text-on-surface-variant flex-shrink-0" />
            <input
              type="text"
              placeholder="Search conditions, symptoms, or treatments…"
              className="flex-1 bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/60 py-1"
            />
          </div>
        </div>
      </div>

      <div className="section-container py-14">
        {/* Categories */}
        <div className="mb-14">
          <h2 className="text-headline-lg text-ink-dark mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-3 p-4 border border-outline-variant/20 rounded-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all text-left group"
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${cat.color}`}>{cat.icon}</span>
                <div>
                  <p className="text-body-sm font-semibold text-ink-dark group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-caption text-on-surface-variant">{cat.count} articles</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured articles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-headline-lg text-ink-dark">Featured articles</h2>
            <button className="text-primary text-label-md font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {FEATURED_ARTICLES.map((article) => (
              <div key={article.title} className="card hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <span className={URGENCY_COLORS[article.urgency]}>{article.urgency}</span>
                  <span className="text-caption text-on-surface-variant">{article.readTime} read</span>
                </div>
                <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <h3 className="text-body-md font-semibold text-ink-dark group-hover:text-primary transition-colors leading-snug mb-3">{article.title}</h3>
                <p className="text-caption text-on-surface-variant">{article.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary-fixed rounded-2xl p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="text-headline-lg text-primary mb-2">Not sure what's wrong?</h3>
            <p className="text-body-lg text-on-surface-variant">Use our AI-powered symptom checker to get personalised guidance.</p>
          </div>
          <Link href="/check" className="btn-primary whitespace-nowrap">Check my symptoms</Link>
        </div>
      </div>
    </div>
  )
}
