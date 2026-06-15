# PeerSync AI — Product Requirements Document

> **Version:** 2.0 — Phase 1 Scope  
> **Program:** TBI-GEU 9-Week Internship 2026  
> **Status:** Approved  
> **Tagline:** Study together, code together, learn together.

---

## ⚠️ Phase 1 Scope Notice

This PRD covers **only Phase 1**. The following are **explicitly deferred** to Phase 2 and must not be built now:

- Code execution (Judge0)
- Quiz Battles / Leaderboard
- Flashcard Generator
- Code Debugger AI
- Multiple room types
- Video / audio calling
- File attachments
- Mobile app

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Core Features](#4-core-features)
5. [Tech Stack](#5-tech-stack)
6. [Database Schema](#6-database-schema)
7. [Project Structure](#7-project-structure)
8. [9-Week Roadmap](#8-9-week-roadmap)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Scope Definition](#10-scope-definition)
11. [Environment Variables](#11-environment-variables)
12. [Key Engineering Concepts](#12-key-engineering-concepts)

---

## 1. Overview

**PeerSync AI** is a browser-based collaborative study workspace where small groups of students can:

- Take notes together in real time
- Write and edit code side-by-side
- Chat inside a shared room
- Stay focused with a synced Pomodoro timer
- Get contextual AI help without switching tabs

It does **not** try to replace LeetCode, Notion, or a quiz platform. It solves one problem well: **fragmented collaborative learning**.

---

## 2. Problem Statement

Every student study session requires juggling 5+ disconnected tools:

| Tool | Used For | Pain Point |
|------|----------|------------|
| Google Meet / Discord | Communication | No integrated workspace; context lost on every switch |
| Google Docs | Shared notes | No code support, no AI, poor for technical content |
| ChatGPT | Doubt solving | No session context — must copy-paste everything |
| VS Code | Coding practice | No real-time collaboration, no shared view |
| Pomodoro App | Focus timer | Separate tab, not synced with the group |

**PeerSync AI collapses all five into one shared room.** No tab-switching. Full context always available.

---

## 3. Target Users

### Primary

- **BTech / MCA students (Year 1–4)** — exam prep, assignment solving in groups of 2–5
- **Placement aspirants** — DSA practice with shared code + AI explanations
- **Study group leaders** — students who organise regular sessions for their batch

### Personas

**Arjun — 3rd Year BTech CSE**
- Goal: Crack placements. Studies DSA with 3 friends daily.
- Pain: Opens 6 tabs per session. ChatGPT has no context of their current code.
- Needs: Shared code editor + AI explainer + chat — no copy-pasting.

**Priya — 2nd Year BTech IT**
- Goal: Study Data Structures with her hostel group for mid-sems.
- Pain: Notes split across 3 Google Docs. Group chat buried in WhatsApp.
- Needs: Collaborative notes + AI summary + shared timer in one place.

---

## 4. Core Features

| # | Feature | Summary |
|---|---------|---------|
| 1 | **Study Rooms** | Create / join rooms, invite members, view who is online |
| 2 | **Collaborative Notes** | TipTap rich-text editor with Yjs sync and presence cursors |
| 3 | **Collaborative Code Editor** | Monaco Editor with Yjs sync, C++ / Python / Java |
| 4 | **AI Study Assistant** | Explain Selection, Summarize Notes, Generate Quiz |
| 5 | **Collaboration Layer** | Realtime chat, presence indicators, shared Pomodoro timer |

---

### 4.1 Study Rooms

Every room automatically contains: Notes, Code Editor, Chat, Pomodoro, and AI Assistant.

**There are no room types.** Every room is identical in structure.

**Behaviours:**
- Create a named room with an optional description
- Join via shareable invite link or 6-character room code
- Dashboard lists all joined rooms with last-activity timestamp
- Online members panel shows who is currently in the room
- Any member can leave; creator can remove other members

**Tech:** Supabase PostgreSQL (`rooms` + `room_members` tables) + Next.js Server Actions + Supabase Realtime Presence.

---

### 4.2 Collaborative Notes

**Behaviours:**
- Rich-text editing: headings, bold / italic / underline, bullet lists, code blocks, inline code
- Real-time multi-cursor sync — named presence cursors for each active member
- Conflict-free simultaneous editing via **Yjs CRDT** (no merge conflicts)
- Auto-save every 2 seconds to Supabase `notes` table (JSONB content)
- Typing indicator: "Priya is typing..." shown in the editor header

**Tech:** TipTap Editor + Yjs + Supabase Realtime (as Yjs provider transport).

---

### 4.3 Collaborative Code Editor

**Behaviours:**
- Shared Monaco Editor (same engine as VS Code)
- Multi-cursor editing with named presence: see teammates' cursors and selections in real time
- Language switcher: **C++, Python, Java** — syntax highlighting and bracket matching per language
- Code state persisted to `code_sessions` table on every change
- **No code execution in Phase 1** — the collaborative editing experience is the feature

**Tech:** Monaco Editor + Yjs + Supabase Realtime.

---

### 4.4 AI Study Assistant

Powered by **Gemini 2.5 Flash** via a Next.js API route. The API key is **never exposed to the client**.

| Action | Input | Output | Trigger |
|--------|-------|--------|---------|
| **Explain Selection** | Text highlighted in Notes editor | Definition + real-world example (difficulty-aware — student year included in prompt) | Right-click → Explain |
| **Summarize Notes** | Full current room notes | 5–8 concise revision bullet points | AI panel → Summarize |
| **Generate Quiz** | Full current room notes | 5 MCQs with 4 options each, stored in `generated_quizzes` | AI panel → Quiz |

> **Phase 2 only (do not build):** Flashcard Generator, Code Debugger

---

### 4.5 Collaboration Layer

Group Chat, Presence, and Pomodoro share the same Supabase Realtime channel.

#### Group Chat
- Room-scoped — messages visible only to room members
- Real-time delivery via Supabase Realtime Broadcast
- Typing indicators: "Rahul is typing..."
- Timestamps and sender avatars on every message
- Messages persisted in `messages` table

#### Presence
- Online member list: green dot next to each currently active member
- Typing presence: broadcast when a member begins typing in chat
- Editor presence: cursor labels inside Notes and Code Editor
- Powered by Supabase Realtime **Presence** channel (`track` / `untrack`)

#### Shared Pomodoro Timer
- 25-minute focus / 5-minute break cycle, **synced for all room members**
- Start, pause, and reset — any member can control the timer
- State changes broadcast instantly via Realtime Broadcast
- Visual countdown with animated progress ring
- Timer state stored in `pomodoro_sessions` table

---

## 5. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 + TypeScript | Full-stack in one codebase, App Router, SSR, type safety |
| Styling | Tailwind CSS + shadcn/ui | Fast development, accessible production-grade components |
| Animation | Framer Motion | Page transitions, presence effects |
| Database | Supabase PostgreSQL | Managed DB, free tier, built-in Realtime + Auth |
| Authentication | Supabase Auth | Google, GitHub, Email login — RLS enforced at DB layer |
| Realtime | Supabase Realtime | Presence (online), Broadcast (timer, chat), CRDT transport |
| Collab Editing | Yjs + TipTap + Monaco | CRDT algorithm — conflict-free simultaneous editing |
| AI | Gemini 2.5 Flash | Fast, cost-efficient, large context window for long notes |
| Deployment | Vercel | Zero-config Next.js deploy, edge functions, free tier |

---

## 6. Database Schema

> 8 tables total. `flashcards` and `quizzes` tables do not exist in Phase 1. `generated_quizzes` handles AI quiz output.

### `users`
```sql
id           UUID         PRIMARY KEY  -- from Supabase Auth
name         TEXT         NOT NULL
email        TEXT         NOT NULL UNIQUE
avatar_url   TEXT
created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `rooms`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
name         TEXT         NOT NULL
description  TEXT
created_by   UUID         NOT NULL REFERENCES users(id)
created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `room_members`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id      UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE
user_id      UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE
role         TEXT         NOT NULL CHECK (role IN ('owner', 'member'))
joined_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
UNIQUE(room_id, user_id)
```

### `notes`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id      UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE UNIQUE
content      JSONB        -- TipTap document state
updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `code_sessions`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id      UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE UNIQUE
language     TEXT         NOT NULL CHECK (language IN ('cpp', 'python', 'java'))
code         TEXT
updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `messages`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id      UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE
user_id      UUID         NOT NULL REFERENCES users(id)
message      TEXT         NOT NULL
created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `pomodoro_sessions`
```sql
id             UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id        UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE UNIQUE
status         TEXT         NOT NULL CHECK (status IN ('running', 'paused', 'idle'))
time_remaining INTEGER      NOT NULL  -- seconds
updated_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### `generated_quizzes`
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
room_id      UUID         NOT NULL REFERENCES rooms(id) ON DELETE CASCADE
questions    JSONB        NOT NULL  -- Array of { question, options[4], answer }
created_by   UUID         NOT NULL REFERENCES users(id)
created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
```

### RLS Policies (apply to all tables)

Every table must have RLS enabled. The core policy pattern:

```sql
-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Only room members can read/write
CREATE POLICY "room_members_only" ON messages
  USING (
    room_id IN (
      SELECT room_id FROM room_members WHERE user_id = auth.uid()
    )
  );
```

Apply equivalent policies to: `notes`, `code_sessions`, `messages`, `pomodoro_sessions`, `generated_quizzes`, `room_members`.

---

## 7. Project Structure

```
peersync-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Marketing / landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Post-login: lists all joined rooms
│   │   ├── room/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Room workspace (all 5 panels)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/route.ts       # OAuth callback handler
│   │   └── api/
│   │       └── ai/
│   │           ├── explain/route.ts    # POST: explain selected text
│   │           ├── summarize/route.ts  # POST: summarize room notes
│   │           └── quiz/route.ts       # POST: generate quiz from notes
│   │
│   ├── components/
│   │   ├── room/
│   │   │   ├── RoomCard.tsx            # Room preview card on dashboard
│   │   │   ├── CreateRoomModal.tsx
│   │   │   ├── JoinRoomModal.tsx
│   │   │   ├── MemberList.tsx          # Online members panel
│   │   │   └── InviteLink.tsx
│   │   ├── notes/
│   │   │   ├── NotesEditor.tsx         # TipTap + Yjs integration
│   │   │   └── PresenceCursors.tsx
│   │   ├── code-editor/
│   │   │   ├── CodeEditor.tsx          # Monaco + Yjs
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── chat/
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── pomodoro/
│   │   │   ├── PomodoroTimer.tsx
│   │   │   └── ProgressRing.tsx
│   │   ├── ai/
│   │   │   ├── AIPanel.tsx             # Container for all AI actions
│   │   │   ├── ExplainButton.tsx
│   │   │   ├── SummarizeButton.tsx
│   │   │   └── QuizDisplay.tsx
│   │   └── ui/                         # shadcn/ui generated components
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser-side Supabase client
│   │   │   └── server.ts               # Server-side Supabase client (cookies)
│   │   ├── gemini/
│   │   │   ├── client.ts               # Gemini SDK init
│   │   │   └── prompts.ts              # All prompt templates
│   │   └── yjs/
│   │       └── provider.ts             # Yjs provider using Supabase Realtime
│   │
│   ├── hooks/
│   │   ├── useRoom.ts                  # Room data + member list
│   │   ├── usePresence.ts              # Who is online in the room
│   │   ├── usePomodoro.ts              # Timer state + controls
│   │   └── useChat.ts                  # Chat messages + typing
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces for all DB tables
│   │
│   └── utils/
│       ├── formatDate.ts
│       ├── generateRoomCode.ts         # 6-char alphanumeric room code
│       └── truncate.ts
│
├── docs/
│   └── PRD.md                          # This file
│
├── public/
├── .env.local                          # Never commit this
├── .env.example                        # Commit this (empty values)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 8. 9-Week Roadmap

| Week | Focus | Deliverables |
|------|-------|-------------|
| W1 | Auth + Database | Next.js 15 init, Supabase schema (all 8 tables), Auth (Email + Google + GitHub), RLS policies, GitHub repo + README |
| W2 | Frontend Skeleton | Navbar, Hero, Card, Footer components; Home + About + Dashboard + Login pages; responsive layout |
| W3 | Room Management | Create/join room UI, dashboard, room_members logic, shareable invite link, Server Actions |
| W4 | Collaborative Notes | TipTap + Yjs + Supabase Realtime provider, presence cursors, auto-save every 2 seconds |
| W5 | Yjs Presence + Sync | Stabilise Yjs edge cases, awareness protocol for cursor labels, multi-tab conflict tests |
| W6 | Collaborative Code Editor | Monaco + Yjs multi-cursor, language switcher (C++ / Python / Java), code state persistence |
| W7 | Chat + Online Presence | Realtime chat via Supabase Broadcast, typing indicators, online member list |
| W8 | Gemini AI + Pomodoro | Explain / Summarize / Quiz API routes, prompt engineering, AI panel UI, Shared Pomodoro sync |
| W9 | Testing + Deploy + Docs | E2E testing, responsive audit, Vercel deployment, README, demo video |

---

## 9. Non-Functional Requirements

### Performance
- Page load under **2 seconds** on average college Wi-Fi
- Realtime sync latency under **300ms** (Yjs + Supabase Realtime)
- AI response returned within **3–5 seconds** for all Gemini calls

### Security
- All tables protected by **Supabase Row Level Security** — enforced at DB layer, not app layer
- Room data (notes, code, messages) readable only by verified `room_members`
- Gemini API key stored **server-side only** in Next.js API Routes — never in client code
- Input sanitisation on all user text to prevent XSS
- Auth tokens fully managed by Supabase — no custom JWT

### Reliability
- Yjs CRDT guarantees eventual consistency — no manual conflict resolution needed
- Auto-save every 2 seconds — maximum 2 seconds of work can ever be lost
- Supabase Realtime auto-reconnects on network interruption

### Accessibility
- shadcn/ui components are ARIA-compliant by default
- Full keyboard navigation for all core interactions
- Color contrast meets WCAG AA minimum

---

## 10. Scope Definition

### In Scope — Phase 1

- [ ] Authentication: Email + Google + GitHub via Supabase Auth
- [ ] Study Rooms: create, join, invite, member management
- [ ] Collaborative Notes: TipTap + Yjs + presence cursors + auto-save
- [ ] Collaborative Code Editor: Monaco + Yjs + multi-cursor (C++ / Python / Java)
- [ ] AI Study Assistant: Explain Selection, Summarize Notes, Generate Quiz
- [ ] Group Chat with typing indicators
- [ ] Online presence (who is in the room, who is typing)
- [ ] Shared Pomodoro timer synced for all members
- [ ] Vercel deployment with public URL

### Out of Scope — Phase 1

| Feature | Reason | Target |
|---------|--------|--------|
| Code Execution (Judge0) | Extra infrastructure, not core to collaboration | Phase 2 |
| Quiz Battles + Leaderboard | Multiplayer game logic adds significant complexity | Phase 2 |
| Flashcard Generator | Separate data model — scope creep | Phase 2 |
| Code Debugger AI | Overlaps with Explain; keep AI section tight | Phase 2 |
| Multiple Room Types | Uniform room structure is simpler UX and code | Removed |
| Video / Audio calling | WebRTC complexity is out of 9-week scope | Phase 2 |
| Mobile app | Web-responsive only | Phase 2 |
| File attachments | Out of scope for notes + code workspace | Phase 2 |

---

## 11. Environment Variables

Create `.env.local` (never commit). Use `.env.example` with empty values as the committed template.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # Server-side only — never expose to client

# Google AI (Gemini)
GEMINI_API_KEY=                  # Server-side only — never expose to client

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Rules:**
- Any variable prefixed `NEXT_PUBLIC_` is exposed to the browser — never put secrets here
- `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are server-side only — used in API Routes and Server Actions only
- Add all variable names (with empty values) to `.env.example` and commit it

---

## 12. Key Engineering Concepts

These are the concepts interviewers will ask about. Every team member should be able to explain them.

### Yjs CRDT
Yjs uses a Conflict-free Replicated Data Type (CRDT) algorithm. Unlike Operational Transforms (used in older collaborative editors), CRDTs resolve concurrent edits deterministically without a central server deciding the correct order. Two users can type simultaneously offline and their changes will always merge correctly when they reconnect. This is the same mechanism behind Google Docs (though Google uses OT; Notion uses a CRDT variant).

**In this codebase:** `src/lib/yjs/provider.ts` sets up a Yjs Doc and connects it to Supabase Realtime as the transport layer. Both TipTap and Monaco are bound to the same Yjs Doc for their respective rooms.

### Supabase Row Level Security (RLS)
RLS is a PostgreSQL feature that enforces access control at the database level — not in application code. Even if there is a bug in the Next.js app that accidentally queries another room's data, Supabase will block it because the RLS policy checks `auth.uid()` against the `room_members` table on every query.

**Pattern used:** Every table that contains room-scoped data has a policy that checks `room_id IN (SELECT room_id FROM room_members WHERE user_id = auth.uid())`.

### Supabase Realtime: Two Distinct Channels
This project uses two different Realtime primitives for different purposes:

- **Presence channel** — tracks who is currently online in a room. Used for: online member list, cursor awareness in the editor. Presence state is automatically cleaned up when a user disconnects.
- **Broadcast channel** — fire-and-forget messages with no persistence. Used for: Pomodoro timer sync, chat typing indicators, quiz start events.

These are deliberately separate because Presence has ordering guarantees needed for cursor sync, while Broadcast is lower latency and suitable for ephemeral events.

### Gemini Prompt Engineering
All three AI prompts in `src/lib/gemini/prompts.ts` follow the same structure:
1. **Role** — "You are a study assistant helping a 2nd-year BTech student..."
2. **Context** — current room notes or selected text passed as input
3. **Output format** — explicit JSON schema so the response is always parseable
4. **Constraints** — max length, language, difficulty level

Returning structured JSON (not free-form text) means the frontend can render quiz options, bullet points, and explanations in separate UI components without brittle string parsing.

### Next.js Full-Stack Pattern
- **Server Components** (default) — fetch data directly from Supabase server client; no API round-trip
- **Client Components** (`"use client"`) — anything that uses React state, browser APIs, or Realtime subscriptions
- **API Routes** (`app/api/`) — used exclusively for operations that need secret keys (Gemini, Supabase service role). These never run in the browser.
- **Server Actions** — used for mutations (create room, join room, update profile) that need server-side auth validation

---

*PeerSync AI — PRD v2.0 — Phase 1 — June 2026*  
*TBI-GEU 9-Week Internship*
