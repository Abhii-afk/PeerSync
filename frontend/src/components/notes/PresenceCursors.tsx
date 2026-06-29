"use client"

interface PresenceCursorsProps {
  users: Array<{ name: string; color: string }>
}

export function PresenceCursors({ users }: PresenceCursorsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {users.map((user) => (
        <span key={user.name} className="inline-flex items-center gap-2 rounded-full border border-[#2d3150] bg-[#0f1117] px-3 py-1 text-xs text-[#f1f5f9]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: user.color }} />
          {user.name}
        </span>
      ))}
    </div>
  )
}
