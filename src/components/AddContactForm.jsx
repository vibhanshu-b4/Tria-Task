import { useState } from 'react'

/**
 * Simple Add Contact form.
 * Keeps local state for the three fields and calls onAdd with the trimmed payload.
 */

export default function AddContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function submit(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onAdd({ name: trimmedName, email: email.trim(), phone: phone.trim() })
    setName(''); setEmail(''); setPhone('')
  }

  return (
    <form onSubmit={submit} className="rounded-lg p-6 panel card-shadow">
      <h2 className="text-lg font-semibold mb-3">Add Contact</h2>
      <div className="space-y-3">
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded btn-accent btn-ripple">Add</button>
        </div>
      </div>
    </form>
  )
}
