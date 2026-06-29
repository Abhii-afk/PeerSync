"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@/types"

interface UsePresenceResult {
  onlineUsers: User[]
}

export function usePresence(roomId: string, currentUser: User): UsePresenceResult {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase.channel(`room:${roomId}:presence`)

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<{ id: string; name: string; email: string; avatar_url: string | null; created_at: string }>()
        const users = Object.values(state).flat().map((entry) => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          avatar_url: entry.avatar_url,
          created_at: entry.created_at,
        }))
        setOnlineUsers(users)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            avatar_url: currentUser.avatar_url,
            created_at: currentUser.created_at,
          })
        }
      })

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [roomId, currentUser])

  return { onlineUsers }
}
