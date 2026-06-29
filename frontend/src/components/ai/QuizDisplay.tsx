"use client"

import { useState } from "react"

interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

interface QuizDisplayProps {
  questions: QuizQuestion[]
}

export function QuizDisplay({ questions }: QuizDisplayProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const selected = selectedAnswers[index]
        const isAnswered = Boolean(selected)

        return (
          <div key={question.question} className="rounded-lg border border-[#2d3150] bg-[#1a1d2e] p-4">
            <p className="text-sm font-semibold text-[#f1f5f9]">{index + 1}. {question.question}</p>
            <div className="mt-3 space-y-2">
              {question.options.map((option) => {
                const isCorrect = option === question.answer
                const isSelected = selected === option

                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm ${
                      isAnswered && isCorrect
                        ? "border-[#10b981] bg-[#10b981]/10 text-[#d1fae5]"
                        : isAnswered && isSelected
                          ? "border-[#ef4444] bg-[#ef4444]/10 text-[#fecaca]"
                          : "border-[#2d3150] bg-[#0f1117] text-[#f1f5f9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={isSelected}
                      onChange={() => setSelectedAnswers((current) => ({ ...current, [index]: option }))}
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
