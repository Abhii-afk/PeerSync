"use client"

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react"

interface Toast {
  id: string
  message: string
  variant: "success" | "error" | "info"
}

interface ToastContextValue {
  toasts: Toast[]
  showToast: (message: string, options?: { variant?: Toast["variant"]; duration?: number }) => string
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const showToast = useCallback(
    (message: string, options?: { variant?: Toast["variant"]; duration?: number }) => {
      const id = `toast-${++toastCounter}`
      const variant = options?.variant ?? "info"
      const duration = options?.duration ?? 3000

      setToasts((prev) => [...prev, { id, message, variant }])

      const timer = setTimeout(() => {
        dismissToast(id)
      }, duration)
      timersRef.current.set(id, timer)

      return id
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return ctx
}
