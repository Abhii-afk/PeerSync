export interface User {
  id: string
  name: string
  email: string
  avatar_url: string | null
  created_at: string
}

export interface Room {
  id: string
  name: string
  description: string | null
  created_by: string
  created_at: string
}

export interface RoomMember {
  id: string
  room_id: string
  user_id: string
  role: "owner" | "member"
  joined_at: string
}

export interface Note {
  id: string
  room_id: string
  content: Record<string, unknown> | null
  updated_at: string
}

export interface CodeSession {
  id: string
  room_id: string
  language: "cpp" | "python" | "java"
  code: string | null
  updated_at: string
}

export interface Message {
  id: string
  room_id: string
  user_id: string
  message: string
  created_at: string
}

export interface PomodoroSession {
  id: string
  room_id: string
  status: "running" | "paused" | "idle"
  time_remaining: number
  updated_at: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

export interface GeneratedQuiz {
  id: string
  room_id: string
  questions: QuizQuestion[]
  created_by: string
  created_at: string
}

export interface TypingUser {
  id: string
  name: string
  avatar_url: string | null
}

export interface AuthFormValues {
  email: string
  password: string
  name?: string
}

export interface RoomWithMeta extends Room {
  memberCount: number
  lastActivity: string
}
