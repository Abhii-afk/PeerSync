import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Card from "@/components/Card"
import Footer from "@/components/Footer"

const cards = [
  {
    icon: "🚪",
    title: "Study Rooms",
    description:
      "Create a room and invite your study group. Everyone joins one link — no setup required.",
  },
  {
    icon: "📝",
    title: "Collaborative Notes",
    description:
      "Write together in real time. See your teammates' cursors as they type. Auto-saves every 2 seconds.",
  },
  {
    icon: "💻",
    title: "Code Editor",
    description:
      "A shared Monaco editor for C++, Python, and Java. Code together like you're in the same room.",
  },
  {
    icon: "🤖",
    title: "AI Study Assistant",
    description:
      "Highlight any text and get an instant AI explanation. Summarise notes or generate a quiz in one click.",
  },
  {
    icon: "💬",
    title: "Collaboration Layer",
    description:
      "Group chat, live presence, and a Pomodoro timer synced for your whole group. Stay focused together.",
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="pb-24 bg-slate-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-12">
            Everything you need in one room
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
