"use client"

import Editor from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@/types"
import { Loader } from "@/components/ui/Loader"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useToast } from "@/hooks/useToast"

interface CodeEditorProps {
  roomId: string
  currentUser: User
}

const starterCode: Record<"cpp" | "python" | "java", string> = {
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  cout << \"Hello, PeerSync!\" << endl;\n  return 0;\n}",
  python: "print('Hello, PeerSync!')",
  java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, PeerSync!\");\n  }\n}",
}

function isSupportedLanguage(value: string): value is keyof typeof starterCode {
  return value === "cpp" || value === "python" || value === "java"
}

export function CodeEditor({ roomId, currentUser }: CodeEditorProps) {
  const [language, setLanguage] = useState<"cpp" | "python" | "java">("cpp")
  const [code, setCode] = useState(starterCode.cpp)
  const [isSaving, setIsSaving] = useState(false)
  const hasLoadedRef = useRef(false)
  const { showToast } = useToast()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    let isActive = true

    const loadSession = async () => {
      try {
        const { data, error } = await supabase
          .from("code_sessions")
          .select("language, code")
          .eq("room_id", roomId)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isActive) {
          return
        }

        if (data && isSupportedLanguage(data.language)) {
          setLanguage(data.language)
          setCode(data.code ?? starterCode[data.language])
        }

        hasLoadedRef.current = true
        setIsSaving(false)
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Could not load code session"
        showToast(message, { variant: "destructive" })
      }
    }

    void loadSession()

    return () => {
      isActive = false
    }
  }, [roomId, showToast])

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return
    }

    const timeout = window.setTimeout(() => {
      const supabase = createSupabaseBrowserClient()
      void (async () => {
        try {
          const { error } = await supabase.from("code_sessions").upsert({
            room_id: roomId,
            language,
            code,
            updated_at: new Date().toISOString(),
          })

          if (error) {
            throw error
          }

          setIsSaving(false)
        } catch (saveError) {
          const message = saveError instanceof Error ? saveError.message : "Could not save code"
          showToast(message, { variant: "destructive" })
        }
      })()
    }, 1200)

    return () => window.clearTimeout(timeout)
  }, [code, language, roomId, showToast])

  const handleCodeChange = (value: string) => {
    setCode(value)
    setIsSaving(true)
  }

  const handleLanguageChange = (nextLanguage: "cpp" | "python" | "java") => {
    setLanguage(nextLanguage)
    setCode((currentCode) => (currentCode.trim().length > 0 ? currentCode : starterCode[nextLanguage]))
    setIsSaving(true)
  }

  return (
    <section className="space-y-4 rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Code</h3>
          <p className="mt-1 text-xs text-[#94a3b8]">{isSaving ? "Saving..." : "Saved"} | Editing as {currentUser.name}</p>
        </div>
        <LanguageSwitcher language={language} onChange={handleLanguageChange} />
      </div>
      <div className="overflow-hidden rounded-[1rem] border border-[#2d3150] bg-[#0f1117]">
        <Editor
          height="420px"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => handleCodeChange(value ?? "")}
          loading={<Loader variant="page" label="Loading editor" />}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontLigatures: true,
            automaticLayout: true,
            scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
          }}
        />
      </div>
    </section>
  )
}
