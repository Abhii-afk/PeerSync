const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

// GET /api/rooms/:id/notes — get notes for a room
// Params: id (string) — room ID
// Response: { data: Note | null }
router.get("/:id/notes", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const note = store.notes.find((item) => item.room_id === room.id) || null
    return res.status(200).json({ data: note })
  } catch (err) {
    next(err)
  }
})

// PUT /api/rooms/:id/notes — create or update notes
// Params: id (string) — room ID
// Body: { content }
// Response: { data: Note }
router.put("/:id/notes", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const { content } = req.body || {}
    if (content === undefined) {
      return res.status(400).json({ error: "content is required" })
    }

    const existing = store.notes.find((item) => item.room_id === room.id)
    if (existing) {
      existing.content = content
      existing.updated_at = new Date().toISOString()
      return res.status(200).json({ data: existing })
    }

    const note = {
      id: store.generateId(),
      room_id: room.id,
      content,
      updated_at: new Date().toISOString(),
    }

    store.notes.push(note)
    return res.status(200).json({ data: note })
  } catch (err) {
    next(err)
  }
})

module.exports = router
