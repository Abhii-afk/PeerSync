interface CardProps {
  icon: string
  title: string
  description: string
}

export default function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center text-xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{title}</h3>
      <p className="text-base text-[#64748B] leading-relaxed">{description}</p>
    </div>
  )
}
