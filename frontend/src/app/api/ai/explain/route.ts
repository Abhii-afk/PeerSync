import { NextResponse } from "next/server"
import { generateGeminiJsonResponse, parseGeminiJson } from "@/lib/gemini"

interface ExplainRequestBody {
  text?: string
  studentYear?: number
}

interface ExplainResponseBody {
  explanation: string
  example: string
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ExplainRequestBody

    if (!body.text || typeof body.studentYear !== "number") {
      return NextResponse.json({ error: "Missing text or studentYear" }, { status: 400 })
    }

    const prompt = `You are a study assistant for a Year ${body.studentYear} BTech student.
Explain the following concept clearly with a real-world example.
Respond ONLY with JSON: { explanation: string, example: string }
Concept: ${body.text}`

    const result = await generateGeminiJsonResponse(prompt)
    const parsed = parseGeminiJson<ExplainResponseBody>(result)

    return NextResponse.json(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to explain text"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
