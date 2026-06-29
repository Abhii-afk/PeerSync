"use client"

import { toast } from "sonner"

export type ToastVariant = "default" | "destructive" | "success" | "error" | "info"

interface UseToastResult {
  showToast: (
    message: string,
    options?: { variant?: ToastVariant; description?: string; duration?: number },
  ) => string
}

export function useToast(): UseToastResult {
  return {
    showToast(message, options) {
      const variant = options?.variant ?? "default"

      const toastId = toast(message, {
        description: options?.description,
        duration: options?.duration ?? 3000,
        className:
          variant === "destructive" || variant === "error"
            ? "border border-[#ef4444]/40 bg-[#1a1d2e] text-[#f1f5f9]"
            : "border border-[#2d3150] bg-[#1a1d2e] text-[#f1f5f9]",
      })

      return String(toastId)
    },
  }
}
