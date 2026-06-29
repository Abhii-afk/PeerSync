export const ROOM_CODE_PREFIX = "CODE:"

export function generateRoomCode(length: number = 6): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""

  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * alphabet.length)
    code += alphabet[randomIndex]
  }

  return code
}

export function packRoomDescription(description: string | null, roomCode: string): string {
  const normalizedDescription = description?.trim() ?? ""
  return `${ROOM_CODE_PREFIX}${roomCode}::${normalizedDescription}`
}

export function unpackRoomDescription(storedDescription: string | null): {
  roomCode: string
  description: string | null
} {
  if (!storedDescription?.startsWith(ROOM_CODE_PREFIX)) {
    return { roomCode: "", description: storedDescription }
  }

  const raw = storedDescription.slice(ROOM_CODE_PREFIX.length)
  const [roomCode, ...rest] = raw.split("::")

  return {
    roomCode,
    description: rest.join("::") || null,
  }
}
