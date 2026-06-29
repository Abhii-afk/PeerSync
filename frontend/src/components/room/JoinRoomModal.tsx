"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Loader } from "@/components/ui/Loader"
import { Modal } from "@/components/ui/Modal"
import { joinRoomAction } from "@/app/actions/rooms"
import { useToast } from "@/hooks/useToast"

interface JoinRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinRoomModal({ isOpen, onClose }: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { showToast } = useToast()

  const normalizedCode = useMemo(() => roomCode.toUpperCase().slice(0, 6), [roomCode])

  const handleSubmit = async () => {
    if (normalizedCode.length !== 6) {
      setError("Enter a valid 6-character room code")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await joinRoomAction({ roomCode: normalizedCode })

    setIsSubmitting(false)

    if (!result.success || !result.data) {
      setError(result.error ?? "Room not found or invalid code")
      showToast(result.error ?? "Room not found or invalid code", { variant: "destructive" })
      return
    }

    showToast("Joined room", { variant: "success" })
    onClose()
    router.push(`/room/${result.data.roomId}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Room">
      <div className="space-y-4">
        <Input
          label="Room Code"
          value={normalizedCode}
          onChange={(value) => setRoomCode(value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6))}
          placeholder="ABC123"
          error={error ?? undefined}
          maxLength={6}
        />
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? <Loader variant="inline" size="sm" label="Joining room" /> : "Join Room"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
