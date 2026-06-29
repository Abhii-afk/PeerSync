import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import { DashboardClient } from "@/components/dashboard/DashboardClient"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Room, RoomWithMeta, User } from "@/types"

export const dynamic = "force-dynamic"

async function fetchDashboardData(): Promise<{ user: User | null; rooms: RoomWithMeta[] }> {
  const supabase = await createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    return { user: null, rooms: [] }
  }

  const currentUser: User = {
    id: userData.user.id,
    name: userData.user.user_metadata?.name ?? userData.user.email ?? "Student",
    email: userData.user.email ?? "",
    avatar_url: userData.user.user_metadata?.avatar_url ?? null,
    created_at: userData.user.created_at,
  }

  const { data: memberships } = await supabase
    .from("room_members")
    .select("room_id")
    .eq("user_id", currentUser.id)

  const roomIds = (memberships ?? []).map((membership) => membership.room_id)

  if (roomIds.length === 0) {
    return { user: currentUser, rooms: [] }
  }

  const { data: roomRows } = await supabase
    .from("rooms")
    .select("id, name, description, created_by, created_at")
    .in("id", roomIds)

  const { data: counts } = await supabase.from("room_members").select("room_id").in("room_id", roomIds)

  const countByRoom = new Map<string, number>()
  for (const row of counts ?? []) {
    countByRoom.set(row.room_id, (countByRoom.get(row.room_id) ?? 0) + 1)
  }

  const rooms = (roomRows ?? []).map((room) => ({
    ...(room as Room),
    memberCount: countByRoom.get(room.id) ?? 0,
    lastActivity: "just now",
  })) as RoomWithMeta[]

  return { user: currentUser, rooms }
}

export default async function DashboardPage() {
  const { user, rooms } = await fetchDashboardData()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <DashboardClient currentUser={user} rooms={rooms} isLoading={false} />
    </div>
  )
}
