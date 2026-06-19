"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Label text displayed above the input. */
  label?: string
  /** Current value (controlled component). */
  value: string
  /** Change handler — receives the new string value, not the raw event. */
  onChange: (value: string) => void
  /** Error message to display below the input. When present, input shows error styling. */
  error?: string
  /** Unique id — auto-generated via useId() if not provided. */
  id?: string
}

export function Input({
  label,
  value,
  onChange,
  error,
  id,
  className,
  type = "text",
  placeholder,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={cn(
          "rounded-lg border px-3 py-2 text-sm transition-colors",
          "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
          error
            ? "border-red-500 dark:border-red-400 focus-visible:ring-red-500"
            : "border-gray-300 dark:border-gray-600",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
