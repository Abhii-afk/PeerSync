"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { generateRoomCode, packRoomDescription } from "@/lib/room-metadata"
import type { Room } from "@/types"

export interface ActionResult<T> {
  success: boolean
  data?: T
  error?: string
}

export async function createRoomAction(input: {
  name: string
  description: string
}): Promise<ActionResult<{ roomId: string; roomCode: string }>> {
  const supabase = await createSupabaseServerClient()
  const { data: sessionData } = await supabase.auth.getUser()

  if (!sessionData.user) {
    return { success: false, error: "Unauthorized" }
  }

  const roomCode = generateRoomCode()
  const storedDescription = packRoomDescription(input.description, roomCode)

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name: input.name.trim(),
      description: storedDescription,
      created_by: sessionData.user.id,
    })
    .select("id")
    .single<{ id: string }>()

  if (error || !data) {
    return { success: false, error: error?.message ?? "Could not create room" }
  }

  const roomId = data.id

  const membershipError = await supabase.from("room_members").insert({
    room_id: roomId,
    user_id: sessionData.user.id,
    role: "owner",
  })

  if (membershipError.error) {
    return { success: false, error: membershipError.error.message }
  }

  revalidatePath("/dashboard")

  return {
    success: true,
    data: {
      roomId,
      roomCode,
    },
  }
}

export async function joinRoomAction(input: { roomCode: string }): Promise<
  ActionResult<{ roomId: string }>
> {
  const supabase = await createSupabaseServerClient()
  const { data: sessionData } = await supabase.auth.getUser()

  if (!sessionData.user) {
    return { success: false, error: "Unauthorized" }
  }

  const { data: rooms, error: roomQueryError } = await supabase
    .from("rooms")
    .select("id, description")
    .ilike("description", `CODE:${input.roomCode.toUpperCase()}%`)
    .limit(1)

  if (roomQueryError) {
    return { success: false, error: roomQueryError.message }
  }

  const room = rooms?.[0] as Pick<Room, "id" | "description"> | undefined
  if (!room) {
    return { success: false, error: "Room not found or invalid code" }
  }

  const { error: membershipError } = await supabase.from("room_members").insert({
    room_id: room.id,
    user_id: sessionData.user.id,
    role: "member",
  })

  if (membershipError) {
    return { success: false, error: membershipError.message }
  }

  revalidatePath("/dashboard")

  return { success: true, data: { roomId: room.id } }
}
