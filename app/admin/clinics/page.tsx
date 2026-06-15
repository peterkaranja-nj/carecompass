import { PLACEHOLDER_CLINICS } from '@/lib/data'
import { Plus, Search, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react'

export default function AdminClinicsPage() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-display-md text-ink-dark mb-1">Clinics</h1>
          <p className="text-body-lg text-on-surface-variant">Manage partner facilities and their information.</p>
        </div>
        <button className="btn-primary gap-2">
          <Plus size={16} /> Add Clinic
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white border border-outline-variant/30 rounded-xl px-4 py-2 mb-6 max-w-lg shadow-airy focus-within:ring-2 focus-within:ring-primary transition-all">
        <Search size={16} className="text-on-surface-variant" />
        <input type="text" placeholder="Search clinics…" className="flex-1 bg-transparent border-none outline-none text-body-md py-1" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-airy overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant">Name</th>
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-28">Area</th>
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-28">Type</th>
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-20">Status</th>
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-24">Verified</th>
                <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-28">Rating</th>
                <th className="px-5 py-3 w-24" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {PLACEHOLDER_CLINICS.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-body-sm font-semibold text-ink-dark">{clinic.name}</p>
                    <p className="text-caption text-on-surface-variant">{clinic.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-body-sm text-on-surface">{clinic.area}</td>
                  <td className="px-5 py-4 text-body-sm text-on-surface capitalize">{clinic.type.replace('-', ' ')}</td>
                  <td className="px-5 py-4">
                    <span className={`text-label-sm px-2.5 py-1 rounded-full ${clinic.isOpen ? 'badge-open' : 'badge-closed'}`}>
                      {clinic.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {clinic.verified
                      ? <CheckCircle size={18} className="text-success-green" />
                      : <XCircle size={18} className="text-outline-variant" />}
                  </td>
                  <td className="px-5 py-4 text-body-sm text-on-surface">
                    ⭐ {clinic.rating} <span className="text-on-surface-variant">({clinic.reviewCount})</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="p-2 hover:bg-surface-container rounded-lg transition-colors" aria-label="Edit">
                        <Edit size={15} className="text-on-surface-variant" />
                      </button>
                      <button className="p-2 hover:bg-error-container rounded-lg transition-colors" aria-label="Delete">
                        <Trash2 size={15} className="text-on-surface-variant hover:text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
