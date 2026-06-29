const express = require("express")
const store = require("../data/store")

const router = express.Router()

function findRoomById(id) {
  return store.rooms.find((room) => room.id === id)
}

// GET /api/rooms/:id/members — list room members with user details
// Params: id (string) — room ID
// Response: { data: Array<MemberWithUser> }
router.get("/:id/members", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const data = store.room_members
      .filter((member) => member.room_id === room.id)
      .map((member) => ({
        ...member,
        user: store.users.find((user) => user.id === member.user_id) || null,
      }))

    return res.status(200).json({ data, count: data.length })
  } catch (err) {
    next(err)
  }
})

// POST /api/rooms/:id/members — add a member to a room
// Params: id (string) — room ID
// Body: { user_id, role? }
// Response: { data: RoomMember, message: string }
router.post("/:id/members", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const { user_id, role = "member" } = req.body || {}
    if (typeof user_id !== "string" || !user_id.trim()) {
      return res.status(400).json({ error: "user_id is required" })
    }

    if (!store.users.find((user) => user.id === user_id)) {
      return res.status(400).json({ error: "Invalid user" })
    }

    const alreadyMember = store.room_members.some((member) => member.room_id === room.id && member.user_id === user_id)
    if (alreadyMember) {
      return res.status(400).json({ error: "User is already a member" })
    }

    const member = {
      id: store.generateId(),
      room_id: room.id,
      user_id,
      role: role === "owner" ? "owner" : "member",
      joined_at: new Date().toISOString(),
    }

    store.room_members.push(member)
    return res.status(201).json({ data: member, message: "Created successfully" })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/rooms/:id/members/:userId — remove a member from a room
// Params: id (string) — room ID, userId (string) — user ID
// Response: 204 No Content
router.delete("/:id/members/:userId", (req, res, next) => {
  try {
    const room = findRoomById(req.params.id)
    if (!room) {
      return res.status(404).json({ error: "Room not found" })
    }

    const index = store.room_members.findIndex((member) => member.room_id === room.id && member.user_id === req.params.userId)
    if (index === -1) {
      return res.status(404).json({ error: "Member not found" })
    }

    store.room_members.splice(index, 1)
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
