import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-semibold">PeerSync AI</p>
          <p className="text-sm text-slate-400">&copy; 2026 All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <a href="#" className="hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
