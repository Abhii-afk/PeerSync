const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

// GET /api/rooms/:id/messages — list messages for a room
// Params: id (string) — room ID
// Response: { data: Message[], count: number }
router.get("/:id/messages", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const data = store.messages
      .filter((message) => message.room_id === room.id)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

    return res.status(200).json({ data, count: data.length })
  } catch (err) {
    next(err)
  }
})

// POST /api/rooms/:id/messages — send a message
// Params: id (string) — room ID
// Body: { user_id, message }
// Response: { data: Message, message: string }
router.post("/:id/messages", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const { user_id, message } = req.body || {}
    if (typeof user_id !== "string" || !user_id.trim()) {
      return res.status(400).json({ error: "user_id is required" })
    }

    if (!store.users.find((user) => user.id === user_id)) {
      return res.status(400).json({ error: "Invalid user" })
    }

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" })
    }

    const newMessage = {
      id: store.generateId(),
      room_id: room.id,
      user_id,
      message: message.trim(),
      created_at: new Date().toISOString(),
    }

    store.messages.push(newMessage)
    return res.status(201).json({ data: newMessage, message: "Created successfully" })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/rooms/:id/messages/:msgId — delete a message
// Params: id (string) — room ID, msgId (string) — message ID
// Response: 204 No Content
router.delete("/:id/messages/:msgId", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const index = store.messages.findIndex((message) => message.room_id === room.id && message.id === req.params.msgId)
    if (index === -1) {
      return res.status(404).json({ error: "Message not found" })
    }

    store.messages.splice(index, 1)
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
