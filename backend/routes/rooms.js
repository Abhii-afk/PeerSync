const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

// GET /api/rooms/search?q= — search rooms by name
// Params: q (string) — search query
// Response: { data: Room[], count: number }
router.get("/search", (req, res, next) => {
  try {
    const query = String(req.query.q || "").trim().toLowerCase()
    const data = query
      ? store.rooms.filter((room) => room.name.toLowerCase().includes(query))
      : store.rooms

    res.status(200).json({ data, count: data.length })
  } catch (err) {
    next(err)
  }
})

// GET /api/rooms — list all rooms
// Response: { data: Room[], count: number }
router.get("/", (req, res, next) => {
  try {
    res.status(200).json({ data: store.rooms, count: store.rooms.length })
  } catch (err) {
    next(err)
  }
})

// GET /api/rooms/:id — get a room by ID
// Params: id (string) — room ID
// Response: { data: Room } | { error: string }
router.get("/:id", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    return res.status(200).json({ data: room })
  } catch (err) {
    next(err)
  }
})

// POST /api/rooms — create a room
// Body: { name, description?, created_by }
// Response: { data: Room, message: string }
router.post("/", (req, res, next) => {
  try {
    const { name, description = null, created_by } = req.body || {}

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Room name is required" })
    }

    const user = store.users.find((item) => item.id === created_by)
    if (!user) {
      return res.status(400).json({ error: "Invalid user" })
    }

    const room = {
      id: store.generateId(),
      name: name.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      created_by,
      room_code: store.generateRoomCode(),
      created_at: new Date().toISOString(),
    }

    store.rooms.push(room)
    return res.status(201).json({ data: room, message: "Created successfully" })
  } catch (err) {
    next(err)
  }
})

// PUT /api/rooms/:id — update a room
// Params: id (string) — room ID
// Body: { name?, description? }
// Response: { data: Room }
router.put("/:id", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    if (typeof req.body.name === "string" && req.body.name.trim()) {
      room.name = req.body.name.trim()
    }

    if (typeof req.body.description === "string") {
      room.description = req.body.description.trim() ? req.body.description.trim() : null
    }

    return res.status(200).json({ data: room })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/rooms/:id — delete room and cascade related data
// Params: id (string) — room ID
// Response: 204 No Content
router.delete("/:id", (req, res, next) => {
  try {
    const index = store.rooms.findIndex((room) => room.id === req.params.id)
    if (index === -1) {
      return res.status(404).json({ error: "Room not found" })
    }

    const roomId = store.rooms[index].id
    store.rooms.splice(index, 1)

    for (let memberIndex = store.room_members.length - 1; memberIndex >= 0; memberIndex -= 1) {
      if (store.room_members[memberIndex].room_id === roomId) {
        store.room_members.splice(memberIndex, 1)
      }
    }

    for (let messageIndex = store.messages.length - 1; messageIndex >= 0; messageIndex -= 1) {
      if (store.messages[messageIndex].room_id === roomId) {
        store.messages.splice(messageIndex, 1)
      }
    }

    for (let noteIndex = store.notes.length - 1; noteIndex >= 0; noteIndex -= 1) {
      if (store.notes[noteIndex].room_id === roomId) {
        store.notes.splice(noteIndex, 1)
      }
    }

    for (let codeIndex = store.code_sessions.length - 1; codeIndex >= 0; codeIndex -= 1) {
      if (store.code_sessions[codeIndex].room_id === roomId) {
        store.code_sessions.splice(codeIndex, 1)
      }
    }

    for (let pomodoroIndex = store.pomodoro_sessions.length - 1; pomodoroIndex >= 0; pomodoroIndex -= 1) {
      if (store.pomodoro_sessions[pomodoroIndex].room_id === roomId) {
        store.pomodoro_sessions.splice(pomodoroIndex, 1)
      }
    }

    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
