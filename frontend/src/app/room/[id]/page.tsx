import { notFound, redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import { RoomWorkspace } from "@/components/room/RoomWorkspace"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { unpackRoomDescription } from "@/lib/room-metadata"
import type { Room, User } from "@/types"

export const dynamic = "force-dynamic"

interface RoomPageProps {
  params: Promise<{ id: string }>
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    redirect("/auth/login")
  }

  const currentUser: User = {
    id: userData.user.id,
    name: userData.user.user_metadata?.name ?? userData.user.email ?? "Student",
    email: userData.user.email ?? "",
    avatar_url: userData.user.user_metadata?.avatar_url ?? null,
    created_at: userData.user.created_at,
  }

  const [{ data: roomData }, { data: membershipData }, { count: memberCount }] = await Promise.all([
    supabase.from("rooms").select("id, name, description, created_by, created_at").eq("id", id).maybeSingle(),
    supabase.from("room_members").select("id").eq("room_id", id).eq("user_id", currentUser.id).maybeSingle(),
    supabase.from("room_members").select("*", { count: "exact", head: true }).eq("room_id", id),
  ])

  if (!roomData) {
    notFound()
  }

  if (!membershipData) {
    redirect("/dashboard")
  }

  const room = roomData as Room
  const parsed = unpackRoomDescription(room.description)

  return (
    <div className="min-h-screen">
      <Navbar />
      <RoomWorkspace
        room={room}
        roomCode={parsed.roomCode}
        currentUser={currentUser}
        memberCount={memberCount ?? 0}
      />
    </div>
  )
}
