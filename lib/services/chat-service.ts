"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"

type ChatSession = Database["public"]["Tables"]["chat_sessions"]["Row"]
type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"]

export async function getChatSessionsByStudentId(studentId: number): Promise<ChatSession[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching chat sessions for student ${studentId}:`, error)
    throw new Error("Failed to fetch chat sessions")
  }

  return data || []
}

export async function getChatSessionById(sessionId: number): Promise<ChatSession | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("chat_sessions").select("*").eq("id", sessionId).single()

  if (error) {
    console.error(`Error fetching chat session ${sessionId}:`, error)
    throw new Error("Failed to fetch chat session")
  }

  return data
}

export async function getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error(`Error fetching chat messages for session ${sessionId}:`, error)
    throw new Error("Failed to fetch chat messages")
  }

  return data || []
}

export async function createChatSession(studentId: number, topic: string): Promise<ChatSession> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({
      student_id: studentId,
      topic,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating chat session:", error)
    throw new Error("Failed to create chat session")
  }

  return data
}

export async function createChatMessage(
  sessionId: number,
  sender: "student" | "ai",
  content: string,
): Promise<ChatMessage> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      session_id: sessionId,
      sender,
      content,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating chat message:", error)
    throw new Error("Failed to create chat message")
  }

  return data
}
