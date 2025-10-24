import { useEffect, useRef, useState } from 'react'

export default function ContactCard({ contact, onRemove, onToggleFavorite, isFav = false, isFavSection = false, onUnfavouriteAnimated }) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

  function handleUnfavouriteWithExit() {
    // play exit animation then call callback
    if (ref.current) {
      ref.current.classList.add('fade-pop-exit')
      // wait for animation then call parent callback
      setTimeout(() => {
        onUnfavouriteAnimated?.(contact.id)
      }, 220)
    } else {
      onUnfavouriteAnimated?.(contact.id)
    }
  }

  return (
    <div ref={ref} className={`flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 ${mounted ? 'fade-pop' : 'opacity-0'}`}>
      <div>
        <div className="text-lg font-medium">{contact.name}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{contact.phone}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={(e) => {
          // pulse star micro animation
          const btn = e.currentTarget
          btn.classList.add('star-pulse')
          setTimeout(() => btn.classList.remove('star-pulse'), 300)
          // handle action
          if (isFavSection) handleUnfavouriteWithExit()
          else onToggleFavorite()
        }} aria-label="Toggle favourite" title={isFav ? 'Remove from favourites' : 'Add to favourites'} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          {/* Filled star when fav, outline otherwise. Use tailwind color classes for easier theming. */}
          {isFav ? (
            <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </button>
        <button onClick={onRemove} className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border border-red-100 hover:bg-red-100">Remove</button>
      </div>
    </div>
  )
}
