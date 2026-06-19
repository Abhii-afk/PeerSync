"use client"

import { cn } from "@/lib/utils"
import { Loader } from "./Loader"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to 'primary'. */
  variant?: "primary" | "secondary" | "outline"
  /** Size of the button. Defaults to 'md'. */
  size?: "sm" | "md" | "lg"
  /** Shows a loading spinner inside the button and disables interaction. */
  isLoading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
  outline:
    "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
}

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {isLoading && <Loader variant="spinner" size="sm" label="" />}
      <span className={cn(isLoading && "opacity-0 absolute")}>{children}</span>
      {isLoading && <span className="sr-only">Loading</span>}
    </button>
  )
}
