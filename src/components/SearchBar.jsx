import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'recentSearches:v1'

function formatTimestamp(ts) {
  try { return new Date(ts).toLocaleString() } catch { return '' }
}

/**
 * SearchBar
 * - Small, reusable search input with a recent-searches dropdown.
 * - Persists up to 5 recent terms in localStorage.
 */
export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)
  const [recents, setRecents] = useState([])
  const wrapperRef = useRef(null)

  // Load persisted recent searches once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      const normalized = parsed.map(p => typeof p === 'string' ? { term: p, ts: Date.now() } : p)
      setRecents(normalized.slice(0,5))
    } catch (e) {
      setRecents([])
    }
  }, [])

  // Save a term to recents (dedupe by term, keep latest 5)
  function saveRecent(next) {
    try {
      const term = next.trim()
      if (!term) return
      const existing = recents.filter(r => r.term.toLowerCase() !== term.toLowerCase())
      const updated = [{ term, ts: Date.now() }, ...existing].slice(0, 5)
      setRecents(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      // ignore storage errors
    }
  }

  function clearRecents() {
    setRecents([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const q = (value || '').trim()
      if (q) saveRecent(q)
    }
  }

  function handleSelectRecent(item) {
    onChange(item.term)
    saveRecent(item.term)
    setFocused(false)
  }

  // hide dropdown on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-64">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search by name..."
        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
      />

      {focused && recents && recents.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-700">
            <div className="text-sm text-slate-500">Recent searches</div>
            <button onMouseDown={(e) => { e.preventDefault(); clearRecents() }} className="text-xs text-slate-500 hover:underline">Clear</button>
          </div>
          {recents.map((r) => (
            <button
              key={r.term + r.ts}
              onMouseDown={(e) => { e.preventDefault(); handleSelectRecent(r) }}
              className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{r.term}</span>
              </div>
              <div className="text-xs text-slate-400">{formatTimestamp(r.ts)}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
