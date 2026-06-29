"use client"

import { Toaster } from "sonner"

export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: "!bg-[#1a1d2e] !text-[#f1f5f9] !border !border-[#2d3150] !shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          description: "!text-[#94a3b8]",
        },
      }}
    />
  )
}
