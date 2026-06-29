# PeerSync AI

AI-powered collaborative study workspace for real-time notes, code collaboration, chat, Pomodoro, and contextual study assistance.

## Tech Stack
- Next.js 16.2.9
- TypeScript
- Supabase (Auth, PostgreSQL, Realtime)
- Yjs + TipTap + Monaco Editor
- Gemini 2.5 Flash
- Tailwind CSS + shadcn/ui

## Setup
### Frontend
1. Install dependencies in `frontend/`.
2. Create `frontend/.env.local` with the Supabase and Gemini keys.
3. Run `npm run dev` from `frontend/`.

### Week 4 Backend
1. Install dependencies in `backend/`.
2. Copy `backend/.env.example` to `backend/.env` if needed.
3. Run `npm run dev` from `backend/`.

The Express API runs on `http://localhost:5000` by default and exposes:
- `GET /api/health`
- `GET /api/rooms`, `POST /api/rooms`, `GET /api/rooms/:id`, `PUT /api/rooms/:id`, `DELETE /api/rooms/:id`
- `GET /api/rooms/search?q=`
- `GET /api/rooms/:id/members`, `POST /api/rooms/:id/members`, `DELETE /api/rooms/:id/members/:userId`
- `GET /api/rooms/:id/messages`, `POST /api/rooms/:id/messages`, `DELETE /api/rooms/:id/messages/:msgId`
- `GET /api/rooms/:id/notes`, `PUT /api/rooms/:id/notes`
- `GET /api/rooms/:id/code`, `PUT /api/rooms/:id/code`
- `GET /api/rooms/:id/pomodoro`, `PUT /api/rooms/:id/pomodoro`

### Postman
The Week 4 collection is in `backend/W4_APICollection_INTERN.json`. Regenerate it with `node generate-postman.js` from the `backend/` folder.