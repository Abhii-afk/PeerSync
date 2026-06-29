"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/Loader"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@/types"
import { ExplainButton } from "@/components/ai/ExplainButton"
import { useToast } from "@/hooks/useToast"

interface NotesEditorProps {
  roomId: string
  currentUser: User
  onContentChange?: (content: string) => void
}

export function NotesEditor({ roomId, currentUser, onContentChange }: NotesEditorProps) {
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"saved" | "saving">("saved")
  const [selectedText, setSelectedText] = useState("")
  const [studentYear] = useState(2)
  const hasLoadedRef = useRef(false)
  const { showToast } = useToast()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    let isActive = true

    const loadNotes = async () => {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("content")
          .eq("room_id", roomId)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isActive) {
          return
        }

        const nextContent =
          data?.content && typeof data.content === "object"
            ? JSON.stringify(data.content, null, 2)
            : ""

        setContent(nextContent)
        onContentChange?.(nextContent)
        setStatus("saved")
        hasLoadedRef.current = true
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Could not load notes"
        showToast(message, { variant: "destructive" })
      }
    }

    void loadNotes()

    return () => {
      isActive = false
    }
  }, [onContentChange, roomId, showToast])

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return
    }

    const timeout = window.setTimeout(() => {
      const supabase = createSupabaseBrowserClient()
      void (async () => {
        try {
          const { error } = await supabase.from("notes").upsert({
            room_id: roomId,
            content: { text: content },
            updated_at: new Date().toISOString(),
          })

          if (error) {
            throw error
          }

          setStatus("saved")
        } catch (saveError) {
          const message = saveError instanceof Error ? saveError.message : "Could not save notes"
          showToast(message, { variant: "destructive" })
        }
      })()
    }, 2000)

    return () => window.clearTimeout(timeout)
  }, [content, roomId, showToast])

  const headerLabel = useMemo(() => {
    if (selectedText) {
      return `${currentUser.name} selected text`
    }

    return status === "saving" ? "Saving..." : "Saved"
  }, [currentUser.name, selectedText, status])

  const handleContentChange = (value: string) => {
    setContent(value)
    onContentChange?.(value)
    setStatus("saving")
  }

  return (
    <section className="space-y-4 rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Notes</h3>
          <p className="mt-1 text-xs text-[#94a3b8]">{headerLabel}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => handleContentChange("")}>
          Clear
        </Button>
      </div>
      <textarea
        className="min-h-[420px] w-full rounded-md border border-[#2d3150] bg-[#0f1117] p-4 text-sm leading-7 text-[#f1f5f9] outline-none placeholder:text-[#64748b] focus:border-[#7c3aed] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
        value={content}
        onChange={(event) => handleContentChange(event.target.value)}
        onMouseUp={() => setSelectedText(window.getSelection()?.toString() ?? "")}
        placeholder="Write your study notes here..."
      />
      <div className="flex items-center justify-between gap-4">
        <ExplainButton selectedText={selectedText} studentYear={studentYear} />
        <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
          {status === "saving" ? <Loader variant="inline" size="sm" label="Saving notes" /> : null}
          <span>{status === "saving" ? "Saving..." : "Saved"}</span>
        </div>
      </div>
    </section>
  )
}
