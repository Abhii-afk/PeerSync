"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * Button that toggles between light and dark theme.
 * The icon pair uses CSS-only visibility so hydration stays stable.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 text-[#94a3b8] hover:bg-[#1f2438] hover:text-[#f1f5f9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/70 transition-colors"
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
