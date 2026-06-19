import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-24 md:py-32 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <span className="inline-block text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 rounded-full mb-6">
          ✦ AI-Powered Study Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 dark:text-white whitespace-pre-line">
          Study Together.
          {"\n"}Learn Together.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          One room for notes, code, chat, AI help, and focus timers. Stop switching tabs.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-800 dark:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Get Started &rarr;
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  )
}
