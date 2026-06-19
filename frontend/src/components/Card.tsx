interface CardProps {
  icon: string
  title: string
  description: string
}

export default function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all">
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
