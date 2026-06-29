"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"

interface SummarizeButtonProps {
  notes: string
}

export function SummarizeButton({ notes }: SummarizeButtonProps) {
  const [bullets, setBullets] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleClick = async () => {
    const trimmedNotes = notes.trim()
    if (!trimmedNotes) {
      const message = "Add notes before summarizing."
      setError(message)
      showToast(message, { variant: "destructive" })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: trimmedNotes }),
      })

      const data = (await response.json()) as { bullets?: string[]; error?: string }
      if (!response.ok || !data.bullets) {
        throw new Error(data.error ?? "Could not summarize notes")
      }

      setBullets(data.bullets)
      showToast("Notes summarized", { variant: "success" })
    } catch (summaryError) {
      const message = summaryError instanceof Error ? summaryError.message : "Could not summarize notes"
      setError(message)
      showToast(message, { variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3 rounded-[1rem] border border-[#2d3150] bg-[#0f1117] p-4">
      <Button variant="outline" isLoading={isLoading} onClick={() => void handleClick()}>
        <Sparkles className="mr-2 h-4 w-4" />
        Summarize Notes
      </Button>
      {error ? <p className="text-sm text-[#ef4444]">{error}</p> : null}
      {bullets.length > 0 ? (
        <ul className="space-y-2 text-sm text-[#94a3b8]">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
