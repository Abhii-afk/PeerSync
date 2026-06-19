"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/useToast"
import { X } from "lucide-react"

const variantStyles: Record<string, string> = {
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/40 dark:border-green-700 dark:text-green-300",
  error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-700 dark:text-red-300",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-300",
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg transition-all",
            variantStyles[toast.variant],
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 rounded p-0.5 hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}
