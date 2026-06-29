interface TypingIndicatorProps {
  typingUsers: string[]
}

export function TypingIndicator({ typingUsers }: TypingIndicatorProps) {
  if (typingUsers.length === 0) {
    return null
  }

  const label =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing...`
      : `${typingUsers.slice(0, -1).join(", ")} and ${typingUsers[typingUsers.length - 1]} are typing...`

  return (
    <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
      <span>{label}</span>
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c4b5fd] [animation-delay:-0.2s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c4b5fd] [animation-delay:-0.1s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c4b5fd]" />
      </span>
    </div>
  )
}
