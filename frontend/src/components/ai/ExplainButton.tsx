"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"

interface ExplainButtonProps {
  selectedText: string
  studentYear: number
}

export function ExplainButton({ selectedText, studentYear }: ExplainButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ explanation: string; example: string } | null>(null)
  const { showToast } = useToast()

  if (!selectedText) {
    return <p className="text-xs text-[#94a3b8]">Select text in the editor to ask AI for help.</p>
  }

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selectedText, studentYear }),
      })

      const data = (await response.json()) as { explanation?: string; example?: string; error?: string }
      if (!response.ok || !data.explanation || !data.example) {
        throw new Error(data.error ?? "Could not explain the selection")
      }

      setResult({ explanation: data.explanation, example: data.example })
      showToast("Explanation ready", { variant: "success" })
    } catch (explainError) {
      const message = explainError instanceof Error ? explainError.message : "Could not explain the selection"
      showToast(message, { variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" isLoading={isLoading} onClick={() => void handleClick()}>
        Explain Selection
      </Button>
      {result ? (
        <div className="rounded-[1rem] border border-[#2d3150] bg-[#0f1117] p-3 text-sm text-[#f1f5f9] shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
          <p className="font-semibold text-[#c4b5fd]">Explanation</p>
          <p className="mt-2 text-[#94a3b8]">{result.explanation}</p>
          <p className="mt-3 font-semibold text-[#c4b5fd]">Example</p>
          <p className="mt-2 text-[#94a3b8]">{result.example}</p>
        </div>
      ) : null}
    </div>
  )
}
