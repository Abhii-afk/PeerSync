import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-24 md:py-32 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <span className="inline-block text-sm font-medium text-[#1E40AF] bg-[#DBEAFE] px-4 py-1.5 rounded-full mb-6">
          ✦ AI-Powered Study Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1E293B] whitespace-pre-line">
          Study Together.
          {"\n"}Learn Together.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto">
          One room for notes, code, chat, AI help, and focus timers. Stop switching tabs.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#1E40AF] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#3B82F6] transition-colors"
          >
            Get Started &rarr;
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#1E40AF] transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  )
}
