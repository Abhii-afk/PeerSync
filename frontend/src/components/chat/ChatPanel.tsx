"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import type { User } from "@/types"
import { useChat } from "@/hooks/useChat"
import { ChatMessage } from "./ChatMessage"
import { TypingIndicator } from "./TypingIndicator"
import { useToast } from "@/hooks/useToast"

interface ChatPanelProps {
  roomId: string
  currentUser: User
}

export function ChatPanel({ roomId, currentUser }: ChatPanelProps) {
  const { messages, typingUsers, sendMessage, isLoading, setTyping } = useChat(roomId, currentUser)
  const [message, setMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    try {
      await sendMessage(message)
      setMessage("")
      setTyping(false)
    } catch {
      showToast("Could not send message", { variant: "destructive" })
    }
  }

  return (
    <section className="flex h-[620px] flex-col rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Chat</h3>
        <TypingIndicator typingUsers={typingUsers} />
      </div>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
        {isLoading ? <p className="text-sm text-[#94a3b8]">Loading messages...</p> : null}
        {messages.map((item) => (
          <ChatMessage key={item.id} message={item} isMine={item.user_id === currentUser.id} />
        ))}
      </div>
      <div className="mt-4 space-y-3 border-t border-[#2d3150] pt-4">
        <textarea
          className="min-h-24 w-full rounded-md border border-[#2d3150] bg-[#0f1117] p-3 text-sm text-[#f1f5f9] outline-none placeholder:text-[#64748b] focus:border-[#7c3aed]"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            setTyping(event.target.value.trim().length > 0)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              void handleSend()
            }
          }}
          placeholder="Write a message..."
        />
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={() => setMessage("")}>
            Clear
          </Button>
          <Button onClick={() => void handleSend()}>Send</Button>
        </div>
      </div>
    </section>
  )
}
