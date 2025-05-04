"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"

type Student = Database["public"]["Tables"]["students"]["Row"]
type StudentInsert = Database["public"]["Tables"]["students"]["Insert"]
type StudentUpdate = Database["public"]["Tables"]["students"]["Update"]

export async function getStudents() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      profiles:profile_id (id, full_name, email:id, avatar_url),
      classes:class_id (id, name, grade_id, grades:grade_id (id, name)),
      parent:parent_id (id, full_name, email:id)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching students:", error)
    throw new Error("Failed to fetch students")
  }

  return data || []
}

export async function getStudentById(id: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      profiles:profile_id (id, full_name, email:id, avatar_url),
      classes:class_id (id, name, grade_id, grades:grade_id (id, name)),
      parent:parent_id (id, full_name, email:id),
      student_learning_preferences!student_id (*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching student ${id}:`, error)
    throw new Error("Failed to fetch student")
  }

  return data
}

export async function getStudentsByClassId(classId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      profiles:profile_id (id, full_name, email:id, avatar_url)
    `)
    .eq("class_id", classId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching students for class ${classId}:`, error)
    throw new Error("Failed to fetch students")
  }

  return data || []
}

export async function createStudent(student: StudentInsert) {
  const supabase = createClient()

  const { data, error } = await supabase.from("students").insert(student).select().single()

  if (error) {
    console.error("Error creating student:", error)
    throw new Error("Failed to create student")
  }

  return data
}

export async function updateStudent(id: number, student: StudentUpdate) {
  const supabase = createClient()

  const { data, error } = await supabase.from("students").update(student).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating student ${id}:`, error)
    throw new Error("Failed to update student")
  }

  return data
}

export async function deleteStudent(id: number) {
  const supabase = createClient()

  const { error } = await supabase.from("students").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting student ${id}:`, error)
    throw new Error("Failed to delete student")
  }
}
