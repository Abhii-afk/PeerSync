import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1E293B] mb-6">
            Dashboard
          </h1>
          <p className="text-base text-[#64748B] leading-relaxed">
            Your study rooms will appear here. This feature is coming in Week 2
            of development once authentication and room creation are complete.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
