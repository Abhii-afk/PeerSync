const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

const allowedLanguages = new Set(["cpp", "python", "java"])

// GET /api/rooms/:id/code — get the code session for a room
// Params: id (string) — room ID
// Response: { data: CodeSession | null }
router.get("/:id/code", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const codeSession = store.code_sessions.find((session) => session.room_id === room.id) || null
    return res.status(200).json({ data: codeSession })
  } catch (err) {
    next(err)
  }
})

// PUT /api/rooms/:id/code — upsert code session
// Params: id (string) — room ID
// Body: { code, language }
// Response: { data: CodeSession }
router.put("/:id/code", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const { code = null, language } = req.body || {}

    if (!allowedLanguages.has(language)) {
      return res.status(400).json({ error: "Invalid language. Must be one of: cpp, python, java" })
    }

    const existing = store.code_sessions.find((session) => session.room_id === room.id)
    if (existing) {
      existing.code = typeof code === "string" ? code : null
      existing.language = language
      existing.updated_at = new Date().toISOString()
      return res.status(200).json({ data: existing })
    }

    const session = {
      id: store.generateId(),
      room_id: room.id,
      language,
      code: typeof code === "string" ? code : null,
      updated_at: new Date().toISOString(),
    }

    store.code_sessions.push(session)
    return res.status(200).json({ data: session })
  } catch (err) {
    next(err)
  }
})

module.exports = router
