export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-64">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name..."
        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
      />
    </div>
  )
}
