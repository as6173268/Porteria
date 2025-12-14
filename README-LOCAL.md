Local run instructions for `Porterias` project

Prereqs:
- Node.js 18+/npm
- Optional: Python3 for OG image prebuild (Pillow)

Quick start (from /Porterias):

1. Copy example env and edit credentials (for local admin):

   cp .env.example .env
   # Edit ADMIN_EMAIL and ADMIN_PASSWORD if desired

2. Install dependencies:

   npm install

3. Start the local API server that serves `public/` and handles uploads:

   npm run start:server

   The server runs at http://localhost:5174 and exposes:
     POST /api/login             -> { email, password }
     POST /api/upload-strip      -> multipart form (file, title, publishDate)
     POST /api/delete-strip      -> { id }

4. Start the frontend dev server (in another terminal):

   npm run dev

5. Open the Admin panel at:

   http://localhost:5173/admin  (vite dev)

Notes:
- To enable the local upload flow in the admin UI set `VITE_USE_LOCAL_UPLOAD=true` (default in `.env.example`).
- Uploaded files are stored in `public/strips` and `public/data/strips.json` is updated automatically by the local server.
- This setup is intended for local development only. For production, keep using the current GH Pages + manual deploy or integrate a storage backend (Supabase) and restore `VITE_SUPABASE_*` env vars.
