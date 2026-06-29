"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Loader } from "./Loader"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-[0_4px_24px_rgba(124,58,237,0.22)]",
  secondary:
    "bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-[0_4px_24px_rgba(79,70,229,0.2)]",
  outline:
    "border border-[#2d3150] bg-transparent text-[#f1f5f9] hover:bg-[#1f2438]",
  ghost: "bg-transparent text-[#f1f5f9] hover:bg-[#1f2438]",
  destructive: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", isLoading = false, disabled, className, children, ...props },
  ref,
) {
  const isDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/70 focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader variant="inline" size="sm" label="Loading" /> : children}
    </button>
  )
})
