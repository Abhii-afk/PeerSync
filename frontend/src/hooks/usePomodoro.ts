"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { PomodoroSession } from "@/types"

export interface UsePomodoroResult {
  status: PomodoroSession["status"]
  timeRemaining: number
  phase: "focus" | "break"
  start: () => void
  pause: () => void
  reset: () => void
}

const FOCUS_SECONDS = 25 * 60
const BREAK_SECONDS = 5 * 60

export function usePomodoro(roomId: string): UsePomodoroResult {
  const [status, setStatus] = useState<PomodoroSession["status"]>("idle")
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_SECONDS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phase = useMemo(() => (timeRemaining > BREAK_SECONDS ? "focus" : "break"), [timeRemaining])

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    const loadSession = async () => {
      const { data } = await supabase
        .from("pomodoro_sessions")
        .select("id, room_id, status, time_remaining, updated_at")
        .eq("room_id", roomId)
        .maybeSingle()

      if (data) {
        setStatus(data.status)
        setTimeRemaining(data.time_remaining)
      }
    }

    void loadSession()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [roomId])

  useEffect(() => {
    if (status !== "running") {
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((current) => {
        if (current <= 1) {
          setStatus("paused")
          return phase === "focus" ? BREAK_SECONDS : FOCUS_SECONDS
        }

        return current - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [phase, status])

  const persist = async (nextStatus: PomodoroSession["status"], nextTimeRemaining: number) => {
    const supabase = createSupabaseBrowserClient()
    await supabase.from("pomodoro_sessions").upsert({
      room_id: roomId,
      status: nextStatus,
      time_remaining: nextTimeRemaining,
      updated_at: new Date().toISOString(),
    })

    await supabase.channel(`room:${roomId}:pomodoro`).send({
      type: "broadcast",
      event: "pomodoro-update",
      payload: { status: nextStatus, timeRemaining: nextTimeRemaining },
    })
  }

  const start = () => {
    setStatus("running")
    void persist("running", timeRemaining)
  }

  const pause = () => {
    setStatus("paused")
    void persist("paused", timeRemaining)
  }

  const reset = () => {
    const nextTime = FOCUS_SECONDS
    setStatus("idle")
    setTimeRemaining(nextTime)
    void persist("idle", nextTime)
  }

  return { status, timeRemaining, phase, start, pause, reset }
}
