import Link from "next/link"
import Navbar from "@/components/Navbar"
import { AuthForm } from "@/components/auth/AuthForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="w-full max-w-md rounded-[1.75rem] border border-[#2d3150] bg-[#1a1d2e] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3 text-[#f1f5f9]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed] font-semibold text-white">P</span>
              <span className="text-xl font-semibold">PeerSync AI</span>
            </Link>
            <h1 className="mt-6 text-3xl font-semibold text-[#f1f5f9]">Create your account</h1>
            <p className="mt-3 text-sm leading-6 text-[#94a3b8]">Start your own collaborative study room in a few clicks.</p>
          </div>
          <AuthForm mode="signup" />
        </section>
      </main>
    </div>
  )
}