import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 dark:bg-gray-950 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Sign In
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Authentication is coming soon. You will be able to sign in with your
            Google or GitHub account, or use an email and password.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
