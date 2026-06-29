interface ProgressRingProps {
  timeRemaining: number
  totalTime: number
  phase: "focus" | "break"
}

export function ProgressRing({ timeRemaining, totalTime, phase }: ProgressRingProps) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const progress = timeRemaining / totalTime
  const offset = circumference * (1 - progress)
  const color = phase === "focus" ? "#7c3aed" : "#10b981"

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <svg viewBox="0 0 180 180" className="h-56 w-56 -rotate-90">
      <circle cx="90" cy="90" r={radius} fill="none" stroke="#2d3150" strokeWidth="12" />
      <circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-1000 linear"
      />
      <text x="90" y="96" textAnchor="middle" className="fill-[#f1f5f9] text-3xl font-semibold" transform="rotate(90 90 90)">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </text>
    </svg>
  )
}
