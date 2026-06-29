"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { TypingUser, User } from "@/types"

interface MemberListProps {
  roomId: string
}

export function MemberList({ roomId }: MemberListProps) {
  const [members, setMembers] = useState<User[]>([])
  const [onlineUsers, setOnlineUsers] = useState<TypingUser[]>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase.channel(`room:${roomId}:presence`)

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<TypingUser>()
        setOnlineUsers(Object.values(state).flat())
      })
      .on("presence", { event: "join" }, () => {
        const state = channel.presenceState<TypingUser>()
        setOnlineUsers(Object.values(state).flat())
      })
      .on("presence", { event: "leave" }, () => {
        const state = channel.presenceState<TypingUser>()
        setOnlineUsers(Object.values(state).flat())
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [roomId])

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    supabase
      .from("room_members")
      .select("user_id, users (id, name, email, avatar_url, created_at)")
      .eq("room_id", roomId)
      .then(({ data }) => {
        const mapped =
          data
            ?.map((row) => row.users as unknown as User | null)
            .filter((value): value is User => Boolean(value)) ?? []
        setMembers(mapped)
      })
  }, [roomId])

  const onlineIds = useMemo(() => new Set(onlineUsers.map((member) => member.id)), [onlineUsers])

  return (
    <aside className="rounded-lg border border-[#2d3150] bg-[#1a1d2e] p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Members</h3>
      <div className="mt-4 space-y-2">
        {members.map((member) => (
          <motion.div
            key={member.id}
            layout
            initial={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            className="flex items-center gap-3 rounded-md border border-[#2d3150] bg-[#0f1117] px-3 py-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-semibold text-white">
              {member.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#f1f5f9]">{member.name}</p>
              <p className="truncate text-xs text-[#94a3b8]">{member.email}</p>
            </div>
            <span
              className={`h-2.5 w-2.5 rounded-full ${onlineIds.has(member.id) ? "bg-[#10b981]" : "bg-[#64748b]"}`}
            />
          </motion.div>
        ))}
      </div>
    </aside>
  )
}
