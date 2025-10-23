export default function ContactCard({ contact, onRemove }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
      <div>
        <div className="text-lg font-medium">{contact.name}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{contact.phone}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onRemove} className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border border-red-100 hover:bg-red-100">Remove</button>
      </div>
    </div>
  )
}
