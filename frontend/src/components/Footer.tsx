import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-[#2d3150] bg-[#0f1117] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-[#f1f5f9]">PeerSync AI</p>
          <p className="text-sm text-[#94a3b8]">&copy; 2026 PeerSync AI. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#94a3b8]">
          <Link href="/about" className="transition-colors hover:text-[#f1f5f9]">
            About
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-[#f1f5f9]">
            Dashboard
          </Link>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f1f5f9]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
