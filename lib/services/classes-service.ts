"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"

type Class = Database["public"]["Tables"]["classes"]["Row"]
type ClassInsert = Database["public"]["Tables"]["classes"]["Insert"]
type ClassUpdate = Database["public"]["Tables"]["classes"]["Update"]

export async function getClasses(): Promise<Class[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("classes").select("*, grades(name)").order("name")

  if (error) {
    console.error("Error fetching classes:", error)
    throw new Error("Failed to fetch classes")
  }

  return data || []
}

export async function getClassesByGradeId(gradeId: number): Promise<Class[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("classes").select("*").eq("grade_id", gradeId).order("name")

  if (error) {
    console.error(`Error fetching classes for grade ${gradeId}:`, error)
    throw new Error("Failed to fetch classes")
  }

  return data || []
}

export async function getClassById(id: number): Promise<Class | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("classes").select("*, grades(name)").eq("id", id).single()

  if (error) {
    console.error(`Error fetching class ${id}:`, error)
    throw new Error("Failed to fetch class")
  }

  return data
}

export async function createClass(classData: ClassInsert): Promise<Class> {
  const supabase = createClient()

  const { data, error } = await supabase.from("classes").insert(classData).select().single()

  if (error) {
    console.error("Error creating class:", error)
    throw new Error("Failed to create class")
  }

  return data
}

export async function updateClass(id: number, classData: ClassUpdate): Promise<Class> {
  const supabase = createClient()

  const { data, error } = await supabase.from("classes").update(classData).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating class ${id}:`, error)
    throw new Error("Failed to update class")
  }

  return data
}

export async function deleteClass(id: number): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from("classes").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting class ${id}:`, error)
    throw new Error("Failed to delete class")
  }
}
