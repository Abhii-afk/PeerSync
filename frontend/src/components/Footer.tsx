import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-800 dark:bg-gray-950 text-white py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-semibold">PeerSync AI</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">&copy; 2026 All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-300 dark:text-slate-400">
          <Link href="/about" className="hover:text-white dark:hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-white dark:hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <a href="#" className="hover:text-white dark:hover:text-blue-400 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
