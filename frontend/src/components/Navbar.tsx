"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-[#1E40AF] dark:text-blue-400 text-xl">
            PeerSync AI
          </Link>

          <button
            className="md:hidden p-2 text-[#64748B] hover:text-[#1E40AF] dark:text-gray-400 dark:hover:text-blue-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#64748B] hover:text-[#1E40AF] dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-[#64748B] hover:text-[#1E40AF] dark:text-gray-400 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
