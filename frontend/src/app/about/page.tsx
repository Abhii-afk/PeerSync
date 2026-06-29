import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const pillars = [
  {
    title: "One room, many tools",
    description: "Notes, code, chat, AI, and a shared timer live together so students stay in one context window.",
  },
  {
    title: "Realtime by default",
    description: "Presence, collaboration, and broadcast updates keep teammates in sync without extra toggles.",
  },
  {
    title: "Built for momentum",
    description: "The interface favors fast invites, quick study sessions, and focused work instead of clutter.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c4b5fd]">About PeerSync AI</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#f1f5f9] sm:text-5xl">
              A collaborative study workspace designed to keep teams moving.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94a3b8]">
              PeerSync AI brings study rooms, shared notes, collaborative coding, group chat, AI help, and a
              synced Pomodoro flow into one browser app so students can spend less time switching tabs and more
              time learning together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/signup" className="inline-flex items-center justify-center rounded-md bg-[#7c3aed] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6d28d9]">
                Get Started Free
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md border border-[#2d3150] bg-transparent px-5 py-3 text-sm font-medium text-[#f1f5f9] transition-colors hover:bg-[#1f2438]">
                Open Dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-[#2d3150] bg-[#1a1d2e] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] [transform-style:preserve-3d] [perspective:1200px]">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="rounded-[1.25rem] border border-[#2d3150] bg-[#0f1117] p-5 transition-transform duration-300 hover:[transform:translateY(-4px)_rotateX(3deg)_rotateY(-4deg)]"
                style={{ transform: `translateZ(${index * 10}px)` }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7c3aed]">0{index + 1}</p>
                <h2 className="mt-2 text-lg font-semibold text-[#f1f5f9]">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
