"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"
import { SummarizeButton } from "./SummarizeButton"
import { QuizDisplay } from "./QuizDisplay"

interface AIPanelProps {
  roomId: string
  getNotesContent: () => string
}

interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

export function AIPanel({ roomId, getNotesContent }: AIPanelProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleGenerateQuiz = async () => {
    const notes = getNotesContent().trim()
    if (!notes) {
      const message = "Add some notes before asking for a quiz."
      setError(message)
      showToast(message, { variant: "destructive" })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, roomId }),
      })

      const data = (await response.json()) as {
        questions?: QuizQuestion[]
        error?: string
      }

      if (!response.ok || !data.questions) {
        throw new Error(data.error ?? "Could not generate quiz")
      }

      setQuestions(data.questions)
      showToast("Quiz generated", { variant: "success" })
    } catch (quizError) {
      const message = quizError instanceof Error ? quizError.message : "Could not generate quiz"
      setError(message)
      showToast(message, { variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-4 rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
      <div className="grid gap-4 lg:grid-cols-2">
        <SummarizeButton notes={getNotesContent()} />
        <div className="space-y-3 rounded-[1rem] border border-[#2d3150] bg-[#0f1117] p-4">
          <Button isLoading={isLoading} onClick={() => void handleGenerateQuiz()}>
            Generate Quiz
          </Button>
          <p className="text-xs text-[#94a3b8]">Create five quick multiple choice questions from your notes.</p>
        </div>
      </div>

      {error ? <p className="text-sm text-[#ef4444]">{error}</p> : null}
      {questions.length > 0 ? <QuizDisplay questions={questions} /> : null}
    </section>
  )
}
