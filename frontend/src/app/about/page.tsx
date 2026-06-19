import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 dark:bg-gray-950 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            About PeerSync AI
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            PeerSync AI is being built as part of the TBI-GEU 9-week internship
            programme. This page will contain the full product story, team
            information, and mission statement.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
