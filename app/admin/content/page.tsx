export default function AdminContentPage() {
  const articles = [
    { title: 'When should chest pain send you to the ER?', category: 'Cardiovascular', status: 'published', updated: '2024-06-01' },
    { title: 'Managing fever at home', category: 'General', status: 'published', updated: '2024-05-28' },
    { title: 'Understanding malaria test results', category: 'Infectious Disease', status: 'draft', updated: '2024-05-25' },
    { title: 'High blood pressure: what the numbers mean', category: 'Cardiovascular', status: 'published', updated: '2024-05-20' },
  ]

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-display-md text-ink-dark mb-1">Content</h1>
          <p className="text-body-lg text-on-surface-variant">Manage health library articles and triage logic.</p>
        </div>
        <button className="btn-primary gap-2">+ New Article</button>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-airy overflow-hidden">
        <div className="border-b border-outline-variant/20 bg-surface-container-low px-5 py-3 flex items-center gap-4">
          {['All', 'Published', 'Draft', 'Under Review'].map((f) => (
            <button key={f} className={`text-label-sm px-3 py-1.5 rounded-full transition-all ${f === 'All' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-primary'}`}>{f}</button>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/20">
              <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant">Title</th>
              <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-36">Category</th>
              <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-28">Status</th>
              <th className="text-left px-5 py-3 text-label-sm text-on-surface-variant w-28">Updated</th>
              <th className="w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {articles.map((a) => (
              <tr key={a.title} className="hover:bg-surface-container-low transition-colors">
                <td className="px-5 py-4 text-body-sm font-medium text-ink-dark">{a.title}</td>
                <td className="px-5 py-4 text-body-sm text-on-surface-variant">{a.category}</td>
                <td className="px-5 py-4">
                  <span className={`text-label-sm px-2.5 py-1 rounded-full ${a.status === 'published' ? 'badge-open' : 'bg-amber-50 text-amber-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-caption text-on-surface-variant">{a.updated}</td>
                <td className="px-5 py-4">
                  <button className="text-primary text-label-sm hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
