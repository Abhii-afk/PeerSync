"use client"

import { useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { usePomodoro } from "@/hooks/usePomodoro"
import { ProgressRing } from "./ProgressRing"

interface PomodoroTimerProps {
  roomId: string
}

export function PomodoroTimer({ roomId }: PomodoroTimerProps) {
  const { status, timeRemaining, phase, start, pause, reset } = usePomodoro(roomId)

  useEffect(() => {
    document.title = `PeerSync AI · ${phase === "focus" ? "Focus Session" : "Short Break"}`
  }, [phase])

  const phaseLabel = useMemo(() => (phase === "focus" ? "Focus Session" : "Short Break"), [phase])

  return (
    <section className="flex flex-col items-center gap-6 rounded-lg border border-[#2d3150] bg-[#1a1d2e] p-6">
      <div className="text-center">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Pomodoro</h3>
        <p className="mt-1 text-lg font-semibold text-[#f1f5f9]">{phaseLabel}</p>
      </div>
      <ProgressRing timeRemaining={timeRemaining} totalTime={phase === "focus" ? 25 * 60 : 5 * 60} phase={phase} />
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={start} disabled={status === "running"}>Start</Button>
        <Button variant="outline" onClick={pause}>Pause</Button>
        <Button variant="secondary" onClick={reset}>Reset</Button>
      </div>
    </section>
  )
}
