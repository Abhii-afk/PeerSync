"use client"

import { useSyncExternalStore, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"

interface InviteLinkProps {
  roomCode: string
}

export function InviteLink({ roomCode }: InviteLinkProps) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()
  const origin = useSyncExternalStore(() => () => {}, () => window.location.origin, () => "")
  const inviteUrl = `${origin || ""}/join?code=${roomCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      showToast("Invite link copied", { variant: "success" })
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast("Could not copy invite link", { variant: "destructive" })
    }
  }

  return (
    <div className="rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
      <p className="text-xs uppercase tracking-[0.16em] text-[#94a3b8]">Invite Link</p>
      <div className="mt-3 rounded-md border border-[#2d3150] bg-[#0f1117] px-3 py-2 text-sm text-[#f1f5f9] break-all">
        {inviteUrl || `/join?code=${roomCode}`}
      </div>
      <Button className="mt-3 w-full" variant="outline" onClick={() => void handleCopy()} disabled={!roomCode}>
        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
        {copied ? "Copied!" : "Copy Invite Link"}
      </Button>
    </div>
  )
}
