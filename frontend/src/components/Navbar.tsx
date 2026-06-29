"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LogOut, User as UserIcon } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Button } from "@/components/ui/button"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@/types"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUser({
          id: data.user.id,
          name: data.user.user_metadata?.name ?? data.user.email ?? "Student",
          email: data.user.email ?? "",
          avatar_url: data.user.user_metadata?.avatar_url ?? null,
          created_at: data.user.created_at,
        })
      }
    })
  }, [])

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2d3150] bg-[#0f1117]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-[#f1f5f9]">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed] font-semibold text-white shadow-[0_4px_24px_rgba(124,58,237,0.22)]">
            P
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">PeerSync AI</p>
            <p className="text-xs text-[#94a3b8]">Study together, code together</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${pathname === link.href ? "text-[#f1f5f9]" : "text-[#94a3b8] hover:text-[#f1f5f9]"}`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2d3150] bg-[#1a1d2e] text-sm font-medium text-[#f1f5f9]">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-md border border-[#2d3150] bg-transparent px-4 py-2 text-sm font-medium text-[#f1f5f9] transition-colors hover:bg-[#1f2438]"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d28d9]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="rounded-md border border-[#2d3150] p-2 text-[#94a3b8] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[#2d3150] bg-[#0f1117] px-4 py-4 md:hidden">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-[#f1f5f9] hover:bg-[#1a1d2e]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between rounded-md border border-[#2d3150] bg-[#1a1d2e] px-3 py-2">
              <span className="text-sm text-[#94a3b8]">Theme</span>
              <ThemeToggle />
            </div>
            {currentUser ? (
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#2d3150] bg-transparent px-4 py-2 text-sm font-medium text-[#f1f5f9] transition-colors hover:bg-[#1f2438]"
                >
                  <UserIcon className="h-4 w-4" />
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d28d9]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
