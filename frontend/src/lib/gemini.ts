import { GoogleGenerativeAI } from "@google/generative-ai"

const modelName = "gemini-2.5-flash"

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY")
  }

  return apiKey
}

export async function generateGeminiJsonResponse(prompt: string): Promise<string> {
  const client = new GoogleGenerativeAI(getApiKey())
  const model = client.getGenerativeModel({ model: modelName })
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
    },
  })

  return result.response.text()
}

export function parseGeminiJson<T>(text: string): T {
  try {
    return JSON.parse(text) as T
  } catch {
    const fencedMatch = text.match(/```json\s*([\s\S]*?)\s*```/i)
    if (fencedMatch?.[1]) {
      return JSON.parse(fencedMatch[1].trim()) as T
    }

    throw new Error("Invalid JSON response from Gemini")
  }
}
