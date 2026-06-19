"use client"

import { cn } from "@/lib/utils"

interface LoaderProps {
  /** Visual style: spinning ring or skeleton block. Defaults to 'spinner'. */
  variant?: "spinner" | "skeleton"
  /** Size of the spinner (ignored for skeleton). Defaults to 'md'. */
  size?: "sm" | "md" | "lg"
  /** For skeleton variant: additional Tailwind classes (e.g. "h-6 w-48"). */
  className?: string
  /** Accessible label describing what is loading. Defaults to 'Loading'. */
  label?: string
}

const spinnerSizes: Record<string, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
}

export function Loader({
  variant = "spinner",
  size = "md",
  className,
  label = "Loading",
}: LoaderProps) {
  if (variant === "skeleton") {
    return (
      <div role="status" aria-label={label}>
        <div
          className={cn(
            "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
            className,
          )}
        />
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  return (
    <div role="status" aria-label={label}>
      <div
        className={cn(
          "animate-spin rounded-full border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400",
          spinnerSizes[size],
          className,
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
