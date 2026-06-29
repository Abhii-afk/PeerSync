function generateId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

const store = {
  users: [
    {
      id: "u1",
      name: "Arjun Sharma",
      email: "arjun@example.com",
      avatar_url: null,
      created_at: "2026-06-01T10:00:00Z",
    },
    {
      id: "u2",
      name: "Priya Verma",
      email: "priya@example.com",
      avatar_url: null,
      created_at: "2026-06-01T11:00:00Z",
    },
  ],
  rooms: [
    {
      id: "r1",
      name: "DSA Study Group",
      description: "Daily DSA practice",
      created_by: "u1",
      room_code: "DSA001",
      created_at: "2026-06-10T09:00:00Z",
    },
    {
      id: "r2",
      name: "Data Structures Mid-Sem",
      description: "Mid semester prep",
      created_by: "u2",
      room_code: "MID002",
      created_at: "2026-06-12T14:00:00Z",
    },
    {
      id: "r3",
      name: "Web Dev Project",
      description: "PeerSync AI internship",
      created_by: "u1",
      room_code: "WEB003",
      created_at: "2026-06-15T10:00:00Z",
    },
  ],
  room_members: [
    {
      id: "rm1",
      room_id: "r1",
      user_id: "u1",
      role: "owner",
      joined_at: "2026-06-10T09:00:00Z",
    },
    {
      id: "rm2",
      room_id: "r1",
      user_id: "u2",
      role: "member",
      joined_at: "2026-06-10T09:30:00Z",
    },
    {
      id: "rm3",
      room_id: "r2",
      user_id: "u2",
      role: "owner",
      joined_at: "2026-06-12T14:00:00Z",
    },
  ],
  messages: [
    {
      id: "m1",
      room_id: "r1",
      user_id: "u1",
      message: "Let's start with binary search today!",
      created_at: "2026-06-10T09:05:00Z",
    },
    {
      id: "m2",
      room_id: "r1",
      user_id: "u2",
      message: "Great idea! I'll share my notes.",
      created_at: "2026-06-10T09:06:00Z",
    },
  ],
  notes: [
    {
      id: "n1",
      room_id: "r1",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Binary Search: O(log n) time complexity",
              },
            ],
          },
        ],
      },
      updated_at: "2026-06-10T10:00:00Z",
    },
  ],
  code_sessions: [
    {
      id: "cs1",
      room_id: "r1",
      language: "cpp",
      code: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, PeerSync!" << endl;\n  return 0;\n}',
      updated_at: "2026-06-10T10:30:00Z",
    },
  ],
  pomodoro_sessions: [
    {
      id: "ps1",
      room_id: "r1",
      status: "idle",
      time_remaining: 1500,
      updated_at: "2026-06-10T09:00:00Z",
    },
  ],
}

store.generateId = generateId
store.generateRoomCode = generateRoomCode

module.exports = store
