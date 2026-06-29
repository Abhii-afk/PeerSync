"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { joinRoomAction } from "@/app/actions/rooms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Loader } from "@/components/ui/Loader"
import { useToast } from "@/hooks/useToast"

interface JoinRoomFormProps {
  initialCode: string
}

export function JoinRoomForm({ initialCode }: JoinRoomFormProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [roomCode, setRoomCode] = useState(initialCode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleJoin = async () => {
    const normalizedCode = roomCode.toUpperCase().slice(0, 6)
    if (normalizedCode.length !== 6) {
      setError("Enter a valid 6-character room code")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await joinRoomAction({ roomCode: normalizedCode })

    setIsSubmitting(false)

    if (!result.success || !result.data) {
      const message = result.error ?? "Room not found or invalid code"
      setError(message)
      showToast(message, { variant: "destructive" })
      return
    }

    showToast("Joined room", { variant: "success" })
    router.push(`/room/${result.data.roomId}`)
  }

  return (
    <section className="w-full rounded-[1.75rem] border border-[#2d3150] bg-[#1a1d2e] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <p className="text-sm uppercase tracking-[0.24em] text-[#c4b5fd]">Join Room</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#f1f5f9]">Enter your invite code</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#94a3b8]">
        Paste the 6-character code from a study room invite link and jump straight into the shared workspace.
      </p>

      <div className="mt-8 space-y-4">
        <Input
          label="Room Code"
          value={roomCode}
          onChange={(value) => setRoomCode(value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6))}
          placeholder="ABC123"
          error={error ?? undefined}
          maxLength={6}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => void handleJoin()} isLoading={isSubmitting}>
            {isSubmitting ? <Loader variant="inline" size="sm" label="Joining room" /> : "Join Room"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/auth/login")}>
            Log In First
          </Button>
        </div>
      </div>
    </section>
  )
}
