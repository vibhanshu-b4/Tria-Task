import { useEffect, useRef, useState } from 'react'

export default function ContactCard({ contact, onRemove, onToggleFavorite, isFav = false, isFavSection = false, onUnfavouriteAnimated }) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  // small entrance animation — flips mounted flag after a short delay
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

  // When unfavouriting from the favourites panel we play an exit animation
  // before calling the parent callback to remove the fav.
  function handleUnfavouriteWithExit() {
    if (ref.current) {
      ref.current.classList.add('fade-pop-exit')
      setTimeout(() => onUnfavouriteAnimated?.(contact.id), 220)
    } else {
      onUnfavouriteAnimated?.(contact.id)
    }
  }

  // Encapsulate the star toggle logic so it reads clearly.
  function handleStarClick(e) {
    const btn = e.currentTarget
    btn.classList.add('star-pulse')
    setTimeout(() => btn.classList.remove('star-pulse'), 300)
    if (isFavSection) handleUnfavouriteWithExit()
    else onToggleFavorite()
  }

  return (
    <div ref={ref} className={`flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 ${mounted ? 'fade-pop' : 'opacity-0'} contact-card card-shadow`}> 
      <div>
        <div className="text-lg font-medium">{contact.name}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</div>
        {contact.phone && <div className="text-sm text-slate-500 dark:text-slate-400">{contact.phone}</div>}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleStarClick} aria-label="Toggle favourite" title={isFav ? 'Remove from favourites' : 'Add to favourites'} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          {/* Filled star when fav, outline otherwise. */}
          {isFav ? (
            <svg className="w-6 h-6 star-filled" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 star-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </button>
        { !isFavSection && (
          <button onClick={onRemove} className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 btn-ripple">Remove</button>
        ) }
      </div>
    </div>
  )
}
