import { ADMIN_STATS, TOP_SYMPTOMS_TODAY, PLACEHOLDER_CLINICS } from '@/lib/data'
import { TrendingUp, Users, Building2, AlertTriangle, Activity, Clock } from 'lucide-react'

const STAT_CARDS = [
  { label: 'Total checks', value: '15,842', sub: '+312 today', icon: Activity, color: 'text-primary', bg: 'bg-primary/8' },
  { label: 'Active clinics', value: '248', sub: '6 pending review', icon: Building2, color: 'text-success-green', bg: 'bg-success-green-light' },
  { label: 'New users (7d)', value: '1,240', sub: '+18% vs last week', icon: Users, color: 'text-secondary', bg: 'bg-secondary-fixed' },
  { label: 'Emergency rate', value: '8.4%', sub: '↓ 1.2% vs last week', icon: AlertTriangle, color: 'text-error', bg: 'bg-error-container' },
]

const TRIAGE_BREAKDOWN = [
  { label: 'Routine / Self-care', pct: 60.4, color: 'bg-success-green' },
  { label: 'Urgent care', pct: 31.2, color: 'bg-primary' },
  { label: 'Emergency', pct: 8.4, color: 'bg-error' },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-display-md text-ink-dark mb-1">Dashboard</h1>
        <p className="text-body-lg text-on-surface-variant">Overview for today, Wednesday 3 June 2026.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-xl border border-outline-variant/20 p-5 shadow-airy">
              <div className="flex items-center justify-between mb-4">
                <p className="text-label-md text-on-surface-variant">{card.label}</p>
                <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className={card.color} />
                </div>
              </div>
              <p className="text-display-md text-ink-dark font-bold mb-1">{card.value}</p>
              <p className="text-caption text-on-surface-variant">{card.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Triage breakdown */}
        <div className="bg-white rounded-xl border border-outline-variant/20 p-6 shadow-airy">
          <h2 className="text-headline-md text-ink-dark mb-6">Triage breakdown (today)</h2>
          <div className="space-y-5">
            {TRIAGE_BREAKDOWN.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-body-sm text-on-surface">{item.label}</p>
                  <p className="text-label-md font-bold text-ink-dark">{item.pct}%</p>
                </div>
                <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top symptoms */}
        <div className="bg-white rounded-xl border border-outline-variant/20 p-6 shadow-airy">
          <h2 className="text-headline-md text-ink-dark mb-6">Top symptoms today</h2>
          <div className="space-y-3">
            {TOP_SYMPTOMS_TODAY.map((item, i) => (
              <div key={item.symptom} className="flex items-center gap-3">
                <span className="text-label-sm text-on-surface-variant w-5 text-right">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm text-on-surface">{item.symptom}</span>
                    <span className="text-label-sm text-on-surface-variant">{item.count}</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-low rounded-full">
                    <div
                      className="h-full bg-primary/60 rounded-full"
                      style={{ width: `${(item.count / TOP_SYMPTOMS_TODAY[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent clinic activity */}
        <div className="bg-white rounded-xl border border-outline-variant/20 p-6 shadow-airy">
          <h2 className="text-headline-md text-ink-dark mb-6">Clinic status</h2>
          <div className="space-y-3">
            {PLACEHOLDER_CLINICS.slice(0, 5).map((clinic) => (
              <div key={clinic.id} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-ink-dark truncate">{clinic.name}</p>
                  <p className="text-caption text-on-surface-variant">{clinic.area}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {clinic.waitMinutes !== null && (
                    <span className="text-caption text-on-surface-variant flex items-center gap-1">
                      <Clock size={11} /> {clinic.waitMinutes}m
                    </span>
                  )}
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${clinic.isOpen ? 'bg-success-green' : 'bg-error'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avg response time */}
      <div className="mt-6 bg-primary-fixed rounded-xl p-6 flex items-center gap-6">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
          <TrendingUp size={24} className="text-white" />
        </div>
        <div>
          <p className="text-label-md text-primary uppercase tracking-wider mb-1">System performance</p>
          <p className="text-display-md text-primary font-bold leading-none">12s</p>
          <p className="text-body-sm text-on-surface-variant mt-1">Average triage response time — well within 30s target</p>
        </div>
      </div>
    </div>
  )
}
