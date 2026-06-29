"use client"

import { Button } from "@/components/ui/button"

interface SocialButtonProps {
  provider: "google" | "github"
  onClick: () => void
  isLoading?: boolean
}

export function SocialButton({ provider, onClick, isLoading = false }: SocialButtonProps) {
  const label = provider === "google" ? "Continue with Google" : "Continue with GitHub"
  const badge = provider === "google" ? "G" : "GH"

  return (
    <Button variant="outline" className="w-full" isLoading={isLoading} onClick={onClick}>
      <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#2d3150] bg-[#0f1117] text-[10px] font-semibold text-[#c4b5fd]">
        {badge}
      </span>
      {label}
    </Button>
  )
}