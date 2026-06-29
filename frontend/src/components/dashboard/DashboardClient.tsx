"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { RoomWithMeta, User } from "@/types"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/Loader"
import { CreateRoomModal } from "@/components/room/CreateRoomModal"
import { JoinRoomModal } from "@/components/room/JoinRoomModal"
import { RoomCard } from "@/components/room/RoomCard"

interface DashboardClientProps {
  currentUser: User
  rooms: RoomWithMeta[]
  isLoading: boolean
}

export function DashboardClient({ currentUser, rooms, isLoading }: DashboardClientProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#c4b5fd]">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f1f5f9] sm:text-4xl">
            Welcome back, {currentUser.name}
          </h1>
          <p className="mt-3 text-sm text-[#94a3b8]">Your rooms, notes, code, and focus sessions live here.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setIsCreateOpen(true)}>Create Room</Button>
          <Button variant="outline" onClick={() => setIsJoinOpen(true)}>
            Join Room
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-5">
              <Loader variant="skeleton" className="h-40 w-full rounded-lg" label="Loading room" />
            </div>
          ))}
        </div>
      ) : rooms.length > 0 ? (
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
            >
              <RoomCard room={room} memberCount={room.memberCount} lastActivity={room.lastActivity} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[#2d3150] bg-[#1a1d2e] px-6 py-16 text-center shadow-[0_4px_24px_rgba(0,0,0,0.22)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7c3aed]/15 text-[#c4b5fd]">
            <span className="text-2xl">*</span>
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-[#f1f5f9]">No rooms yet. Create one to get started.</h2>
          <p className="mt-3 text-sm text-[#94a3b8]">Invite your study group and keep notes, code, chat, and AI in one place.</p>
        </div>
      )}

      <CreateRoomModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <JoinRoomModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
    </main>
  )
}
