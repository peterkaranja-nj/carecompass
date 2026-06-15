import Link from 'next/link'

export const metadata = { title: 'Health Blog — CareCompass' }

const ARTICLES = [
  {
    slug: '#',
    category: 'Triage Guide',
    title: 'When to go to the ER vs. urgent care vs. your GP',
    excerpt: 'One of the most common questions we see: "Is this an emergency?" Here is a practical guide to help you decide before you leave home.',
    author: 'Dr. Wanjiku Muthoni',
    authorRole: 'Clinical Lead, CareCompass',
    date: 'June 10, 2026',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: '#',
    category: 'Malaria',
    title: 'Malaria symptoms vs. flu: how to tell the difference in Kenya',
    excerpt: 'Both cause fever and chills — but the difference matters enormously. This guide explains the key distinctions and what to do next.',
    author: 'Dr. Abubakar Hassan',
    authorRole: 'Infectious Disease Specialist',
    date: 'June 3, 2026',
    readTime: '4 min read',
    featured: false,
  },
  {
    slug: '#',
    category: 'Mental Health',
    title: 'Understanding anxiety: symptoms, triggers, and where to get help in Nairobi',
    excerpt: 'Mental health care is often overlooked in healthcare navigation. Here is what to look for and how to access support locally.',
    author: 'Njeri Kamau',
    authorRole: 'Counselling Psychologist',
    date: 'May 28, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: '#',
    category: 'Child Health',
    title: 'Fever in children: when parents should worry',
    excerpt: 'A fever in a child can be frightening. This guide covers temperature thresholds, danger signs, and the safest next steps.',
    author: 'Dr. Grace Njoroge',
    authorRole: 'Paediatrician',
    date: 'May 20, 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: '#',
    category: 'Chronic Conditions',
    title: 'Living with Type 2 diabetes in Kenya: managing care between clinic visits',
    excerpt: 'Practical strategies — diet, monitoring, and when to escalate — for the 3.5 million Kenyans living with diabetes.',
    author: 'Dr. Peter Kamau',
    authorRole: 'Endocrinologist, KNH',
    date: 'May 12, 2026',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: '#',
    category: 'Women\'s Health',
    title: 'Maternal health in Kenya: navigating antenatal care with CareCompass',
    excerpt: 'A guide to the WHO-recommended ANC visits, red flags in pregnancy, and how to find the right facility for your needs.',
    author: 'Dr. Faith Otieno',
    authorRole: 'Obstetrician & Gynaecologist',
    date: 'May 5, 2026',
    readTime: '6 min read',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Triage Guide', 'Malaria', 'Mental Health', 'Child Health', 'Chronic Conditions', "Women's Health"]

export default function BlogPage() {
  const featured = ARTICLES.find((a) => a.featured)!
  const rest = ARTICLES.filter((a) => !a.featured)

  return (
    <>
      <div className="bg-surface-container-low border-b border-outline-variant/30 pt-28 pb-12">
        <div className="section-container">
          <p className="text-label-md text-primary uppercase tracking-widest mb-2">Resources</p>
          <h1 className="text-display-md text-ink-dark">Health Blog</h1>
          <p className="text-body-lg text-on-surface-variant mt-3 max-w-2xl">
            Evidence-based health information written by Kenyan clinicians. Know your symptoms, know your options.
          </p>
        </div>
      </div>

      <div className="section-container py-14 max-w-5xl">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={`px-4 py-1.5 rounded-full text-label-sm cursor-pointer transition-colors ${
                i === 0
                  ? 'bg-primary text-white'
                  : 'bg-white border border-outline-variant/50 text-on-surface-variant hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Featured article */}
        <a href={featured.slug} className="block mb-10 group">
          <div className="bg-white border border-outline-variant/40 rounded-3xl overflow-hidden hover:border-primary/40 transition-colors">
            <div className="h-48 sm:h-64 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-end p-6 sm:p-8">
              <span className="text-caption bg-primary text-white px-3 py-1 rounded-full font-semibold">{featured.category} · Featured</span>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-headline-md text-ink-dark group-hover:text-primary transition-colors mb-3">{featured.title}</h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-label-sm text-ink-dark font-semibold">{featured.author}</p>
                  <p className="text-caption text-on-surface-variant">{featured.authorRole}</p>
                </div>
                <div className="text-caption text-on-surface-variant">{featured.date} · {featured.readTime}</div>
              </div>
            </div>
          </div>
        </a>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <a href={article.slug} key={article.title} className="bg-white border border-outline-variant/40 rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors group">
              <span className="text-caption bg-primary/8 text-primary px-3 py-0.5 rounded-full font-medium w-fit">{article.category}</span>
              <h3 className="text-label-lg text-ink-dark font-semibold group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed flex-1">{article.excerpt}</p>
              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <p className="text-caption text-ink-dark font-medium">{article.author}</p>
                <p className="text-caption text-on-surface-variant">{article.readTime}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-body-md text-on-surface-variant mb-4">More articles coming every week. Subscribe to stay informed.</p>
          <Link href="/contact" className="bg-primary text-white px-7 py-3 rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors">Subscribe to Updates</Link>
        </div>
      </div>
    </>
  )
}
