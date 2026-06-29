const fs = require("fs")
const path = require("path")

const baseUrl = "{{baseUrl}}"

const collection = {
  info: {
    name: "PeerSync AI Week 4 API",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    _postman_id: "b9e2b4a9-6a5f-4ce4-87ca-d3e8c1cf5a6d",
    description: "In-memory Express API for the PeerSync AI Week 4 deliverable.",
  },
  item: [
    {
      name: "Health",
      item: [
        {
          name: "GET Health",
          request: {
            method: "GET",
            header: [],
            url: `${baseUrl}/health`,
          },
        },
      ],
    },
    {
      name: "Rooms",
      item: [
        {
          name: "GET Rooms",
          request: { method: "GET", header: [], url: `${baseUrl}/rooms` },
        },
        {
          name: "GET Rooms Search",
          request: {
            method: "GET",
            header: [],
            url: `${baseUrl}/rooms/search?q=Study`,
          },
        },
        {
          name: "GET Room By ID",
          request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1` },
        },
        {
          name: "POST Room",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify(
                { name: "Algorithms Lab", description: "Practice problems", created_by: "u1" },
                null,
                2,
              ),
            },
            url: `${baseUrl}/rooms`,
          },
        },
        {
          name: "PUT Room",
          request: {
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ name: "Algorithms Lab - Updated" }, null, 2),
            },
            url: `${baseUrl}/rooms/r1`,
          },
        },
        {
          name: "DELETE Room",
          request: { method: "DELETE", header: [], url: `${baseUrl}/rooms/r1` },
        },
      ],
    },
    {
      name: "Members",
      item: [
        { name: "GET Members", request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1/members` } },
        {
          name: "POST Member",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: { mode: "raw", raw: JSON.stringify({ user_id: "u2", role: "member" }, null, 2) },
            url: `${baseUrl}/rooms/r1/members`,
          },
        },
        {
          name: "DELETE Member",
          request: { method: "DELETE", header: [], url: `${baseUrl}/rooms/r1/members/u2` },
        },
      ],
    },
    {
      name: "Messages",
      item: [
        { name: "GET Messages", request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1/messages` } },
        {
          name: "POST Message",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: { mode: "raw", raw: JSON.stringify({ user_id: "u1", message: "Let's review recursion." }, null, 2) },
            url: `${baseUrl}/rooms/r1/messages`,
          },
        },
        {
          name: "DELETE Message",
          request: { method: "DELETE", header: [], url: `${baseUrl}/rooms/r1/messages/m1` },
        },
      ],
    },
    {
      name: "Notes",
      item: [
        { name: "GET Notes", request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1/notes` } },
        {
          name: "PUT Notes",
          request: {
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: { mode: "raw", raw: JSON.stringify({ content: "Updated shared notes" }, null, 2) },
            url: `${baseUrl}/rooms/r1/notes`,
          },
        },
      ],
    },
    {
      name: "Code",
      item: [
        { name: "GET Code", request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1/code` } },
        {
          name: "PUT Code",
          request: {
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: { mode: "raw", raw: JSON.stringify({ language: "python", code: "print('Hello, PeerSync!')" }, null, 2) },
            url: `${baseUrl}/rooms/r1/code`,
          },
        },
      ],
    },
    {
      name: "Pomodoro",
      item: [
        { name: "GET Pomodoro", request: { method: "GET", header: [], url: `${baseUrl}/rooms/r1/pomodoro` } },
        {
          name: "PUT Pomodoro",
          request: {
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: { mode: "raw", raw: JSON.stringify({ duration: 1500, status: "running" }, null, 2) },
            url: `${baseUrl}/rooms/r1/pomodoro`,
          },
        },
      ],
    },
  ],
  variable: [
    {
      key: "baseUrl",
      value: "http://localhost:5000/api",
    },
  ],
}

const outputPath = path.join(__dirname, "W4_APICollection_INTERN.json")
fs.writeFileSync(outputPath, `${JSON.stringify(collection, null, 2)}\n`, "utf8")

console.log(`Wrote ${outputPath}`)