import { useState } from 'react'

export default function AddContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), email: email.trim(), phone: phone.trim() })
    setName(''); setEmail(''); setPhone('')
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-800">
      <h2 className="text-lg font-semibold mb-3">Add Contact</h2>
      <div className="space-y-3">
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 rounded border border-slate-200 dark:border-slate-700" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700">Add</button>
        </div>
      </div>
    </form>
  )
}
