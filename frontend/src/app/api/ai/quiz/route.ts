import { NextResponse } from "next/server"
import { generateGeminiJsonResponse, parseGeminiJson } from "@/lib/gemini"

interface QuizRequestBody {
  notes?: string
}

interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

interface QuizResponseBody {
  questions: QuizQuestion[]
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as QuizRequestBody

    if (!body.notes) {
      return NextResponse.json({ error: "Missing notes" }, { status: 400 })
    }

    const prompt = `Generate 5 multiple-choice questions based on these study notes.
Each question must have exactly 4 options and 1 correct answer.
Respond ONLY with JSON: { questions: [{ question: string, options: string[4], answer: string }] }
Notes: ${body.notes}`

    const result = await generateGeminiJsonResponse(prompt)
    const parsed = parseGeminiJson<QuizResponseBody>(result)

    return NextResponse.json(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate quiz"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
