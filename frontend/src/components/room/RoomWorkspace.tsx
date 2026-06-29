"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { type Room, type User } from "@/types"
import { MemberList } from "./MemberList"
import { InviteLink } from "./InviteLink"
import { NotesEditor } from "@/components/notes/NotesEditor"
import { CodeEditor } from "@/components/code-editor/CodeEditor"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { PomodoroTimer } from "@/components/pomodoro/PomodoroTimer"
import { AIPanel } from "@/components/ai/AIPanel"

interface RoomWorkspaceProps {
  room: Room
  roomCode: string
  currentUser: User
  memberCount: number
}

export function RoomWorkspace({ room, roomCode, currentUser, memberCount }: RoomWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "code" | "chat" | "pomodoro" | "ai">("notes")
  const [notesContent, setNotesContent] = useState("")
  const reducedMotion = useReducedMotion()

  const tabs = useMemo(
    () => [
      { key: "notes" as const, label: "Notes" },
      { key: "code" as const, label: "Code" },
      { key: "chat" as const, label: "Chat" },
      { key: "pomodoro" as const, label: "Pomodoro" },
      { key: "ai" as const, label: "AI" },
    ],
    [],
  )

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-6">
      <aside className="space-y-4">
        <div className="rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
          <p className="text-sm uppercase tracking-[0.16em] text-[#94a3b8]">Room</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#f1f5f9]">{room.name}</h1>
          <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{room.description ?? "No description yet."}</p>
          <p className="mt-3 text-xs text-[#94a3b8]">{memberCount} members</p>
        </div>
        <InviteLink roomCode={roomCode} />
        <MemberList roomId={room.id} />
      </aside>

      <section className="space-y-4">
        <div className="rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-3 shadow-[0_4px_24px_rgba(0,0,0,0.24)]">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
        >
          {activeTab === "notes" ? <NotesEditor roomId={room.id} currentUser={currentUser} onContentChange={setNotesContent} /> : null}
          {activeTab === "code" ? <CodeEditor roomId={room.id} currentUser={currentUser} /> : null}
          {activeTab === "chat" ? <ChatPanel roomId={room.id} currentUser={currentUser} /> : null}
          {activeTab === "pomodoro" ? <PomodoroTimer roomId={room.id} /> : null}
          {activeTab === "ai" ? <AIPanel roomId={room.id} getNotesContent={() => notesContent} /> : null}
        </motion.div>
      </section>
    </main>
  )
}
