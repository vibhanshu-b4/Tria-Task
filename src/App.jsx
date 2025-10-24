import { useEffect, useMemo, useState } from 'react'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import AddContactForm from './components/AddContactForm'

const initialContacts = [
  // only the user-requested default contact remains here so any fresh run shows this one contact
  { id: 1000000001, name: 'Jon Snow', email: 'JonSnow@gmail.com' },
]

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return initial
      const parsed = JSON.parse(raw)

      // if initial is an array of default items (like contacts), ensure defaults exist
      if (Array.isArray(parsed) && Array.isArray(initial) && initial.length > 0) {
        // add any default items (by email) that are missing from stored list
        const missing = initial.filter(def => !parsed.some(p => p && p.email && p.email.toLowerCase() === def.email.toLowerCase()))
        if (missing.length > 0) {
          return [...missing, ...parsed]
        }
      }
      return parsed
    } catch (e) {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
      // ignore
    }
  }, [key, state])
  return [state, setState]
}

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts:v1', initialContacts)
  const [favs, setFavs] = useLocalStorage('favs:v1', [])
  const [query, setQuery] = useState('')
  const [showFavs, setShowFavs] = useState(true)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    // always sort contacts lexicographically by name, then filter
    const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name))
    if (!q) return sorted
    return sorted.filter(c => c.name.toLowerCase().includes(q))
  }, [contacts, query])

  // cached list of favourite contacts (only for display in the favourites area)
  const favContacts = filtered.filter(c => favs.includes(c.id))

  function addContact(payload) {
    setContacts(prev => [{ id: Date.now(), ...payload }, ...prev])
  }

  function removeContact(id) {
    setContacts(prev => prev.filter(c => c.id !== id))
    // also remove from favourites if present
    setFavs(prev => prev.filter(x => x !== id))
  }

  function toggleFavorite(id) {
    setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev])
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="app-max w-full mx-auto z-10">
        <div className="panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Contacts</h1>
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Favourites section (appears before all contacts) */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">Favourites ({favs.length})</h2>
                  <button onClick={() => setShowFavs(s => !s)} className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 btn-ripple">
                    {showFavs ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className={`fav-wrap ${showFavs ? '' : 'hidden'}`}>
                  {favContacts.length === 0 ? (
                    <div className="p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
                      No favourites yet — add favourites to see them here.
                    </div>
                  ) : (
                    <ContactList contacts={favContacts} onRemove={removeContact} onToggleFavorite={toggleFavorite} favIds={favs} isFavSection={true} onUnfavouriteAnimated={(id) => setFavs(prev => prev.filter(x => x !== id))} />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">All Contacts</h2>
                <ContactList contacts={filtered} onRemove={removeContact} onToggleFavorite={toggleFavorite} favIds={favs} />
              </div>
            </div>
            <div>
              <AddContactForm onAdd={addContact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
