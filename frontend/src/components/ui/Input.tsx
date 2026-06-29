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
          className="text-sm font-medium text-[#f1f5f9]"
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
          "h-11 rounded-md border bg-[#1a1d2e] px-3 py-2 text-sm text-[#f1f5f9] shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-colors",
          "placeholder:text-[#94a3b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/70",
          error ? "border-[#ef4444]" : "border-[#2d3150]",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-[#ef4444]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
