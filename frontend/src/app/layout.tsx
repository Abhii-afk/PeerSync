import type { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ToastContainer } from "@/components/ui/Toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "PeerSync AI - Study together, code together, learn together.",
  description:
    "An AI-powered collaborative study workspace. One room for notes, code, chat, AI help, and focus timers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
