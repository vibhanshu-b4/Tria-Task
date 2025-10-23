import { useEffect, useMemo, useState } from 'react'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import AddContactForm from './components/AddContactForm'

const initialContacts = [
  { id: 1, name: 'Ava Johnson', email: 'ava.johnson@example.com', phone: '+1 555-0123' },
  { id: 2, name: 'Liam Smith', email: 'liam.smith@example.com', phone: '+1 555-0456' },
  { id: 3, name: 'Sophia Lee', email: 'sophia.lee@example.com', phone: '+1 555-0789' },
]

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
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
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter(c => c.name.toLowerCase().includes(q))
  }, [contacts, query])

  function addContact(payload) {
    setContacts(prev => [{ id: Date.now(), ...payload }, ...prev])
  }

  function removeContact(id) {
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="app-max w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContactList contacts={filtered} onRemove={removeContact} />
          </div>
          <div>
            <AddContactForm onAdd={addContact} />
          </div>
        </div>
      </div>
    </div>
  )
}
