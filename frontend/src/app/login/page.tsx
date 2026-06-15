import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1E293B] mb-6">
            Sign In
          </h1>
          <p className="text-base text-[#64748B] leading-relaxed">
            Authentication is coming soon. You will be able to sign in with your
            Google or GitHub account, or use an email and password.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
