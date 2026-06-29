import Navbar from "@/components/Navbar"
import { JoinRoomForm } from "@/components/join/JoinRoomForm"

interface JoinPageProps {
  searchParams: Promise<{ code?: string | string[] }>
}

function getInitialCode(code: string | string[] | undefined): string {
  const value = Array.isArray(code) ? code[0] ?? "" : code ?? ""
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
}

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <JoinRoomForm initialCode={getInitialCode(resolvedSearchParams.code)} />
      </main>
    </div>
  )
}
