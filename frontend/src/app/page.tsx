"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, BrainCircuit, CalendarClock, Code2, MessageSquare, NotebookPen, Users } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Users,
    title: "Study Rooms",
    description: "Create invite-only rooms with a six-character code and keep everyone in the same workspace.",
  },
  {
    icon: NotebookPen,
    title: "Collaborative Notes",
    description: "Edit shared notes with live cursors, autosave, and Yjs-backed document syncing.",
  },
  {
    icon: Code2,
    title: "Code Editor",
    description: "Pair on C++, Python, or Java in a Monaco workspace with multi-cursor collaboration.",
  },
  {
    icon: BrainCircuit,
    title: "AI Assistant",
    description: "Explain selections, summarize notes, and generate quick quizzes without leaving the room.",
  },
  {
    icon: MessageSquare,
    title: "Group Chat",
    description: "Keep context flowing with real-time chat, typing signals, and room presence indicators.",
  },
  {
    icon: CalendarClock,
    title: "Pomodoro Timer",
    description: "Coordinate focus blocks with a shared timer that stays in sync for the full room.",
  },
]

const steps = [
  {
    number: "01",
    title: "Create Room",
    description: "Start a study space, name it, and generate a shareable invite code in seconds.",
  },
  {
    number: "02",
    title: "Invite Friends",
    description: "Share the room link or code so classmates can join the workspace immediately.",
  },
  {
    number: "03",
    title: "Study Together",
    description: "Write notes, edit code, chat, and run synchronized focus sessions without switching tabs.",
  },
]

export default function HomePage() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-transparent text-[#f1f5f9]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
              >
                <span className="inline-flex rounded-full border border-[#2d3150] bg-[#1a1d2e] px-4 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[#c4b5fd]">
                  One room for notes, code, chat, AI, and focus
                </span>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                  Study together, code together, <span className="bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#4f46e5] bg-clip-text text-transparent">learn together.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94a3b8] sm:text-xl">
                  PeerSync AI collapses five disconnected student tools into one collaborative browser workspace built for shared progress.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/auth/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#how-it-works" className="inline-flex items-center justify-center rounded-md border border-[#2d3150] bg-transparent px-6 py-3 text-sm font-medium text-[#f1f5f9] transition-colors hover:bg-[#1f2438] sm:w-auto">
                    See How It Works
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.1 }}
                className="relative [perspective:1200px]"
              >
                <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.18),transparent_38%)] blur-3xl" />
                <motion.div
                  whileHover={reducedMotion ? undefined : { rotateX: 4, rotateY: -5, y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="rounded-[1.75rem] border border-[#2d3150] bg-[#1a1d2e]/90 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur [transform-style:preserve-3d]"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {features.slice(0, 4).map((feature) => {
                      const Icon = feature.icon
                      return (
                        <div
                          key={feature.title}
                          className="rounded-2xl border border-[#2d3150] bg-[#0f1117] p-4 transition-transform duration-300 hover:[transform:translateY(-4px)_translateZ(14px)]"
                        >
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#7c3aed]/15 text-[#c4b5fd]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-sm font-semibold text-[#f1f5f9]">{feature.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{feature.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c4b5fd]">Feature Grid</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#f1f5f9] sm:text-4xl">Everything your study group needs</h2>
              </div>
            </div>

            <motion.div
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.article
                    key={feature.title}
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={reducedMotion ? undefined : { y: -8, rotateX: 4, rotateY: -4, scale: 1.01 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                    className="rounded-2xl border border-[#2d3150] bg-[#1a1d2e] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] [transform-style:preserve-3d]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7c3aed]/15 text-[#c4b5fd]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#f1f5f9]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#94a3b8]">{feature.description}</p>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#2d3150] bg-[#1a1d2e] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c4b5fd]">How It Works</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-[#2d3150] bg-[#0f1117] p-6">
                  <p className="text-sm font-semibold tracking-[0.24em] text-[#7c3aed]">{step.number}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[#f1f5f9]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#94a3b8]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
