import ContactCard from './ContactCard'
import { useLayoutEffect, useRef } from 'react'

export default function ContactList({ contacts, onRemove, onToggleFavorite, favIds = [], isFavSection = false, onUnfavouriteAnimated }) {
  const refs = useRef(new Map())

  // ensure we have a ref element for each contact
  const setItemRef = (id) => (el) => {
    if (el) refs.current.set(id, el)
    else refs.current.delete(id)
  }

  useLayoutEffect(() => {
    const nodes = Array.from(refs.current.entries()).map(([id, el]) => ({ id, el, rect: el.getBoundingClientRect() }))
    return () => {
      // after DOM updates, compute new rects and animate
      requestAnimationFrame(() => {
        nodes.forEach(({ id, el, rect: prev }) => {
          const next = el.getBoundingClientRect()
          const dx = prev.left - next.left
          const dy = prev.top - next.top
          if (dx || dy) {
            el.style.transform = `translate(${dx}px, ${dy}px)`
            el.style.transition = 'transform 0s'
            requestAnimationFrame(() => {
              el.classList.add('flip-anim')
              el.style.transform = ''
            })
          }
        })
      })
    }
  }, [contacts])

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
        <div key={c.id} ref={setItemRef(c.id)}>
          <ContactCard contact={c} isFav={favIds.includes(c.id)} isFavSection={isFavSection} onRemove={() => onRemove(c.id)} onToggleFavorite={() => onToggleFavorite?.(c.id)} onUnfavouriteAnimated={onUnfavouriteAnimated} />
        </div>
      ))}
    </div>
  )
}
