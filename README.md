# Tria Assignment — Contacts App

I built a single-page Contacts app with React and Vite to satisfy the Tria assignment requirements. The app focuses on a clean, responsive UI and small, reusable components. It uses Tailwind CSS for styling and stores data in browser localStorage so it runs without a backend.

## Live demo

https://contacts-smoky-theta.vercel.app/

## What I implemented

- View the list of contacts (main screen)
- Search contacts by name using the search bar (client-side filter)
- Add a new contact using the form (saved to localStorage)
- Favourites: star a contact to pin it in the Favourites area
- Recent searches dropdown (persists 5 most recent terms)
- Micro-interactions & animations: entry/exit pop, star pulse, and smooth list reflow (FLIP-like)

## Tech stack

- React (Vite)
- Vite (dev server & build)
- Tailwind CSS (styling)

## Project structure (important files)

- `src/App.jsx` — top-level layout and state management
- `src/components/ContactList.jsx` — list rendering and lightweight FLIP reflow
- `src/components/ContactCard.jsx` — single contact card, star/remove actions
- `src/components/AddContactForm.jsx` — form to add a contact
- `src/components/SearchBar.jsx` — search input + recent searches dropdown
- `src/index.css` — Tailwind directives and small custom CSS helpers

## Data & persistence

- Contacts are persisted in localStorage under the key: `contacts:v1`
- Favourite IDs are persisted under: `favs:v1`
- Recent search terms are persisted under: `recentSearches:v1`

Contacts are simple objects with the fields `{ id, name, email, phone? }`.

## How to run (Windows PowerShell)

1. Install dependencies

   ```powershell
   npm install
   ```

2. Start the dev server

   ```powershell
   npm run dev
   ```

3. Build for production

   ```powershell
   npm run build
   ```

4. Preview the production build locally

   ```powershell
   npm run preview
   ```

## Developer notes

- If you see previously stored contacts in the app while developing, clear them from the browser DevTools (Application → Local Storage → `contacts:v1`) or run:

   ```js
   localStorage.removeItem('contacts:v1')
   location.reload()
   ```

- The Remove button is hidden inside the favourites section to avoid accidental deletions — you can unfavourite a contact from there instead.

- The project intentionally uses localStorage to keep the app self-contained for the assignment. Swapping to a real API would be straightforward: replace the storage helpers with fetch/axios calls and a small adapter layer.

## Decisions & assumptions

- No backend: localStorage simulates persistence as allowed by the assignment.
- The UI is intentionally compact and component-driven so it can be extended (tests, API integration, authentication).
- I prioritized readability and reusability in the components.

## Possible next steps (optional)

- Deploy to Vercel and add the public link here.
- Replace custom animation code with Framer Motion for more robust animations.
- Add unit tests for critical components (ContactCard, ContactList).
- Add import/export (JSON) to allow manual syncing between devices.

---

If you'd like, I can deploy the app now and paste the live URL into this README.
