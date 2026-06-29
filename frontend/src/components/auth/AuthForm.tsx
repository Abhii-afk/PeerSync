"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Loader } from "@/components/ui/Loader"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { SocialButton } from "./SocialButton"
import { useToast } from "@/hooks/useToast"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { showToast } = useToast()

  const handleOAuth = async (provider: "google" | "github") => {
    setIsLoading(true)
    const supabase = createSupabaseBrowserClient()

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })

    setIsLoading(false)

    if (oauthError) {
      setError(oauthError.message)
      showToast(oauthError.message, { variant: "destructive" })
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    const supabase = createSupabaseBrowserClient()

    const authResult =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
          })

    setIsLoading(false)

    if (authResult.error) {
      setError(authResult.error.message)
      showToast(authResult.error.message, { variant: "destructive" })
      return
    }

    showToast(mode === "login" ? "Welcome back" : "Account created", { variant: "success" })
    router.push("/dashboard")
  }

  return (
    <div className="space-y-5">
      <SocialButton provider="google" onClick={() => void handleOAuth("google")} isLoading={isLoading} />
      <SocialButton provider="github" onClick={() => void handleOAuth("github")} isLoading={isLoading} />

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[#2d3150]" />
        <span className="text-xs uppercase tracking-[0.24em] text-[#94a3b8]">or continue with email</span>
        <div className="h-px flex-1 bg-[#2d3150]" />
      </div>

      {mode === "signup" ? <Input label="Name" value={name} onChange={setName} placeholder="Priya Sharma" /> : null}
      <Input label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" error={error ?? undefined} />
      <Input label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" error={error ?? undefined} />

      <Button className="w-full" isLoading={isLoading} onClick={() => void handleSubmit()}>
        {isLoading ? <Loader variant="inline" size="sm" label="Submitting" /> : mode === "login" ? "Log In" : "Create Account"}
      </Button>

      <p className="text-center text-sm text-[#94a3b8]">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"} {" "}
        <Link className="text-[#c4b5fd] hover:text-white" href={mode === "login" ? "/auth/signup" : "/auth/login"}>
          {mode === "login" ? "Sign up" : "Log in"}
        </Link>
      </p>
    </div>
  )
}