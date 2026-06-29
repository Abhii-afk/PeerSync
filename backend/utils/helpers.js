function createHttpError(message, status = 500) {
  const error = new Error(message)
  error.status = status
  return error
}

function getRoomIndex(store, roomId) {
  return store.rooms.findIndex((room) => room.id === roomId)
}

function getRoom(store, roomId) {
  return store.rooms.find((room) => room.id === roomId) || null
}

function getUser(store, userId) {
  return store.users.find((user) => user.id === userId) || null
}

function getRoomMemberIndex(store, roomId, userId) {
  return store.room_members.findIndex((member) => member.room_id === roomId && member.user_id === userId)
}

function getMessageIndex(store, roomId, messageId) {
  return store.messages.findIndex((message) => message.room_id === roomId && message.id === messageId)
}

function getNote(store, roomId) {
  return store.notes.find((note) => note.room_id === roomId) || null
}

function getCodeSession(store, roomId) {
  return store.code_sessions.find((session) => session.room_id === roomId) || null
}

function getPomodoroSession(store, roomId) {
  return store.pomodoro_sessions.find((session) => session.room_id === roomId) || null
}

module.exports = {
  createHttpError,
  getRoomIndex,
  getRoom,
  getUser,
  getRoomMemberIndex,
  getMessageIndex,
  getNote,
  getCodeSession,
  getPomodoroSession,
}
