"use client"

import { useEffect, useRef, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Message, User } from "@/types"

interface UseChatResult {
  messages: Message[]
  typingUsers: string[]
  sendMessage: (message: string) => Promise<void>
  isLoading: boolean
  setTyping: (isTyping: boolean) => void
}

export function useChat(roomId: string, currentUser: User): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([])
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("id, room_id, user_id, message, created_at")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })
        .limit(50)

      setMessages((data ?? []) as Message[])
      setIsLoading(false)
    }

    void loadMessages()

    const channel = supabase.channel(`room:${roomId}:chat`)
    channel
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` }, (payload) => {
        setMessages((current) => [...current, payload.new as Message])
      })
      .on("broadcast", { event: "typing" }, (payload) => {
        const nextUser = payload.payload.userName as string
        const nextIsTyping = payload.payload.isTyping as boolean
        setTypingUsers((current) => {
          const next = new Set(current)
          if (nextIsTyping) {
            next.add(nextUser)
          } else {
            next.delete(nextUser)
          }
          return Array.from(next)
        })
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [roomId])

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.from("messages").insert({
      room_id: roomId,
      user_id: currentUser.id,
      message: trimmedMessage,
    })

    if (error) {
      throw error
    }
  }

  const setTyping = (isTyping: boolean) => {
    const supabase = createSupabaseBrowserClient()
    void supabase.channel(`room:${roomId}:chat`).send({
      type: "broadcast",
      event: "typing",
      payload: { userName: currentUser.name, isTyping },
    })

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        void supabase.channel(`room:${roomId}:chat`).send({
          type: "broadcast",
          event: "typing",
          payload: { userName: currentUser.name, isTyping: false },
        })
      }, 2000)
    }
  }

  return { messages, typingUsers, sendMessage, isLoading, setTyping }
}
