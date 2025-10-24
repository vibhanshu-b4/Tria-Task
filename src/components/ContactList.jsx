import ContactCard from './ContactCard'
import { useLayoutEffect, useRef } from 'react'

/**
 * ContactList
 * - Renders a vertical list of contacts
 * - Applies a lightweight FLIP animation for reflow when the list changes
 * Props:
 * - contacts: array of contact objects
 * - onRemove: function(id)
 * - onToggleFavorite: function(id)
 * - favIds: array of favorite ids
 * - isFavSection: boolean (changes behaviour of contact card)
 * - onUnfavouriteAnimated: optional callback used when unfavouriting with exit animation
 */
export default function ContactList({ contacts, onRemove, onToggleFavorite, favIds = [], isFavSection = false, onUnfavouriteAnimated }) {
  const refs = useRef(new Map())

  // Return a ref setter for a given item id. Keeps a Map(id -> DOM node).
  const setItemElementRef = (id) => (el) => {
    if (el) refs.current.set(id, el)
    else refs.current.delete(id)
  }

  // FLIP-style animation: capture previous positions, then on cleanup compute
  // next positions and animate transforms so items smoothly reflow.
  useLayoutEffect(() => {
    const snapshot = Array.from(refs.current.entries()).map(([id, el]) => ({ id, el, rect: el.getBoundingClientRect() }))
    return () => {
      requestAnimationFrame(() => {
        snapshot.forEach(({ id, el, rect: prev }) => {
          const next = el.getBoundingClientRect()
          const dx = prev.left - next.left
          const dy = prev.top - next.top
          if (dx || dy) {
            // jump the element back to its old position, then let CSS transition it
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
        <div key={c.id} ref={setItemElementRef(c.id)}>
          <ContactCard
            contact={c}
            isFav={favIds.includes(c.id)}
            isFavSection={isFavSection}
            onRemove={() => onRemove(c.id)}
            onToggleFavorite={() => onToggleFavorite?.(c.id)}
            onUnfavouriteAnimated={onUnfavouriteAnimated}
          />
        </div>
      ))}
    </div>
  )
}
