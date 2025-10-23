import ContactCard from './ContactCard'

export default function ContactList({ contacts, onRemove }) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-800"> 
        <p className="text-slate-600 dark:text-slate-300">No contacts found. Add one using the form.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {contacts.map(c => (
        <ContactCard key={c.id} contact={c} onRemove={() => onRemove(c.id)} />
      ))}
    </div>
  )
}
