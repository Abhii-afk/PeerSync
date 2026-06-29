"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Loader } from "@/components/ui/Loader"
import { Modal } from "@/components/ui/Modal"
import { createRoomAction } from "@/app/actions/rooms"
import { useToast } from "@/hooks/useToast"

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { showToast } = useToast()

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Room name is required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await createRoomAction({ name, description })

    setIsSubmitting(false)

    if (!result.success || !result.data) {
      setError(result.error ?? "Could not create room")
      showToast(result.error ?? "Could not create room", { variant: "destructive" })
      return
    }

    showToast("Room created successfully", { variant: "success" })
    onClose()
    router.push(`/room/${result.data.roomId}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Room">
      <div className="space-y-4">
        <Input label="Room Name" value={name} onChange={setName} placeholder="Data Structures Crew" error={error ?? undefined} />
        <Input label="Description" value={description} onChange={setDescription} placeholder="Weekly algorithm sprint and study sessions" />
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? <Loader variant="inline" size="sm" label="Creating room" /> : "Create Room"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
