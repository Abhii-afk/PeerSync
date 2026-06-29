import { NextResponse } from "next/server"
import { generateGeminiJsonResponse, parseGeminiJson } from "@/lib/gemini"

interface SummarizeRequestBody {
  notes?: string
}

interface SummarizeResponseBody {
  bullets: string[]
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as SummarizeRequestBody

    if (!body.notes) {
      return NextResponse.json({ error: "Missing notes" }, { status: 400 })
    }

    const prompt = `You are a study assistant. Summarize the following study notes into 5–8 concise revision bullet points. Respond ONLY with JSON: { bullets: string[] }
Notes: ${body.notes}`

    const result = await generateGeminiJsonResponse(prompt)
    const parsed = parseGeminiJson<SummarizeResponseBody>(result)

    return NextResponse.json(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to summarize notes"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
