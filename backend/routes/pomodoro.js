const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

// GET /api/rooms/:id/pomodoro — get the pomodoro session for a room
// Params: id (string) — room ID
// Response: { data: PomodoroSession | null }
router.get("/:id/pomodoro", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const session = store.pomodoro_sessions.find((item) => item.room_id === room.id) || null
    return res.status(200).json({ data: session })
  } catch (err) {
    next(err)
  }
})

// PUT /api/rooms/:id/pomodoro — update pomodoro session
// Params: id (string) — room ID
// Body: { duration, status }
// Response: { data: PomodoroSession }
router.put("/:id/pomodoro", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const { duration, status } = req.body || {}
    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: "duration must be a positive integer" })
    }

    if (typeof status !== "string" || !status.trim()) {
      return res.status(400).json({ error: "status is required" })
    }

    const existing = store.pomodoro_sessions.find((item) => item.room_id === room.id)
    if (existing) {
      existing.duration = duration
      existing.status = status.trim()
      existing.updated_at = new Date().toISOString()
      return res.status(200).json({ data: existing })
    }

    const session = {
      id: store.generateId(),
      room_id: room.id,
      duration,
      status: status.trim(),
      updated_at: new Date().toISOString(),
    }

    store.pomodoro_sessions.push(session)
    return res.status(200).json({ data: session })
  } catch (err) {
    next(err)
  }
})

module.exports = router
