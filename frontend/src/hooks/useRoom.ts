"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Room, RoomMember, User } from "@/types"

interface UseRoomResult {
  room: Room | null
  members: Array<RoomMember & { user: User }>
  isLoading: boolean
  error: string | null
}

export function useRoom(roomId: string): UseRoomResult {
  const [room, setRoom] = useState<Room | null>(null)
  const [members, setMembers] = useState<Array<RoomMember & { user: User }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    const loadRoom = async () => {
      setIsLoading(true)
      const [roomResult, memberResult] = await Promise.all([
        supabase.from("rooms").select("id, name, description, created_by, created_at").eq("id", roomId).single(),
        supabase
          .from("room_members")
          .select("id, room_id, user_id, role, joined_at, users (id, name, email, avatar_url, created_at)")
          .eq("room_id", roomId),
      ])

      if (roomResult.error) {
        setError(roomResult.error.message)
        setIsLoading(false)
        return
      }

      setRoom(roomResult.data as Room)

      if (memberResult.error) {
        setError(memberResult.error.message)
        setIsLoading(false)
        return
      }

      const mappedMembers = (memberResult.data ?? [])
        .map((row) => {
          const user = row.users as unknown as User | undefined
          if (!user) {
            return null
          }

          return {
            id: row.id,
            room_id: row.room_id,
            user_id: row.user_id,
            role: row.role,
            joined_at: row.joined_at,
            user,
          }
        })
        .filter((value): value is RoomMember & { user: User } => value !== null)

      setMembers(mappedMembers)
      setError(null)
      setIsLoading(false)
    }

    void loadRoom()
  }, [roomId])

  return { room, members, isLoading, error }
}
