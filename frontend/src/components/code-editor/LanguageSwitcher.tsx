"use client"

import { Button } from "@/components/ui/button"

interface LanguageSwitcherProps {
  language: "cpp" | "python" | "java"
  onChange: (language: "cpp" | "python" | "java") => void
}

export function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  const languages: Array<{ key: "cpp" | "python" | "java"; label: string }> = [
    { key: "cpp", label: "C++" },
    { key: "python", label: "Python" },
    { key: "java", label: "Java" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((option) => (
        <Button
          key={option.key}
          size="sm"
          variant={language === option.key ? "primary" : "outline"}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
