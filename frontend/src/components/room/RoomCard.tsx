import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import type { Room } from "@/types"
import { unpackRoomDescription } from "@/lib/room-metadata"
import { Button } from "@/components/ui/button"

interface RoomCardProps {
  room: Room
  memberCount: number
  lastActivity: string
}

export function RoomCard({ room, memberCount, lastActivity }: RoomCardProps) {
  const parsed = unpackRoomDescription(room.description)
  const description = parsed.description ?? "No description provided yet."
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -8,
              rotateX: 5,
              rotateY: -5,
              scale: 1.01,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group h-full rounded-[1.25rem] border border-[#2d3150] bg-[#1a1d2e] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] [transform-style:preserve-3d]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#94a3b8]">Room</p>
          <h3 className="mt-1 text-xl font-semibold text-[#f1f5f9]">{room.name}</h3>
        </div>
        <span className="rounded-full border border-[#2d3150] bg-[#0f1117] px-3 py-1 text-xs font-medium text-[#c4b5fd]">
          {memberCount} members
        </span>
      </div>

      <p className="line-clamp-3 min-h-[3rem] text-sm leading-6 text-[#94a3b8]">{description.slice(0, 80)}</p>

      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[#94a3b8]">
        <span>Last active {lastActivity}</span>
        <Link href={`/room/${room.id}`}>
          <Button size="sm" variant="primary">
            Open Room
          </Button>
        </Link>
      </div>
    </motion.article>
  )
}
