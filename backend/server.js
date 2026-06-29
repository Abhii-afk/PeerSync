require("dotenv").config()
const express = require("express")
const cors = require("cors")

const roomsRouter = require("./routes/rooms")
const membersRouter = require("./routes/members")
const messagesRouter = require("./routes/messages")
const notesRouter = require("./routes/notes")
const codeRouter = require("./routes/code")
const pomodoroRouter = require("./routes/pomodoro")
const errorHandler = require("./middleware/errorHandler")

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
)
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use("/api/rooms", roomsRouter)
app.use("/api/rooms", membersRouter)
app.use("/api/rooms", messagesRouter)
app.use("/api/rooms", notesRouter)
app.use("/api/rooms", codeRouter)
app.use("/api/rooms", pomodoroRouter)

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`PeerSync AI backend running on http://localhost:${PORT}`)
})
