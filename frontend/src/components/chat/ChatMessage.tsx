import type { Message } from "@/types"

interface ChatMessageProps {
  message: Message
  isMine: boolean
}

export function ChatMessage({ message, isMine }: ChatMessageProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isMine ? "bg-[#7c3aed] text-white" : "bg-[#1a1d2e] text-[#f1f5f9]"
        }`}
      >
        <p>{message.message}</p>
        <p className={`mt-2 text-right text-[11px] ${isMine ? "text-white/70" : "text-[#94a3b8]"}`}>
          {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
