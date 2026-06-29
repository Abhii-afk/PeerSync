"use client"

import { cn } from "@/lib/utils"

interface LoaderProps {
  variant?: "page" | "inline" | "skeleton" | "spinner"
  size?: "sm" | "md" | "lg"
  className?: string
  label?: string
}

const spinnerSizes: Record<NonNullable<LoaderProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-[3px]",
  lg: "h-8 w-8 border-4",
}

export function Loader({
  variant = "inline",
  size = "md",
  className,
  label = "Loading",
}: LoaderProps) {
  if (variant === "skeleton") {
    return (
      <div role="status" aria-label={label}>
        <div
          className={cn(
              "animate-pulse rounded-md bg-[#1f2438]",
            className,
          )}
        />
        <span className="sr-only">{label}</span>
      </div>
    )
  }

    if (variant === "page") {
      return (
        <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label={label}>
          <div className="flex flex-col items-center gap-4">
            <div className={cn("animate-spin rounded-full border-[#2d3150] border-t-[#7c3aed]", spinnerSizes.lg)} />
            <p className="text-sm text-[#94a3b8]">{label}</p>
          </div>
        </div>
      )
    }

  return (
    <div role="status" aria-label={label}>
      <div
        className={cn(
            "animate-spin rounded-full border-[#2d3150] border-t-[#7c3aed]",
          spinnerSizes[size],
          className,
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
