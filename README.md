# Tria Task - Contacts App

This is a small React + Vite contacts list demo built for the Tria assignment.

Features

- View list of contacts
- Search contacts by name
- Add new contact (saved to localStorage)

Notes

- Tailwind CSS is used via the Vite Tailwind plugin. No `tailwind.config` file was added per instructions.
- The app persists contacts to `localStorage` under `contacts:v1`.

Run locally

1. Install dependencies

   ```powershell
   npm install
   ```

2. Start dev server

   ```powershell
   npm run dev
   ```

Deployment

- Deploy using Vercel, Netlify or GitHub Pages. Build with `npm run build` and serve the `dist` folder.

Assumptions & choices

- Minimal, responsive UI using Tailwind utility classes.
- No backend; localStorage simulates persistence.
