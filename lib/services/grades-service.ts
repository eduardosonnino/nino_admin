"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"

type Grade = Database["public"]["Tables"]["grades"]["Row"]
type GradeInsert = Database["public"]["Tables"]["grades"]["Insert"]
type GradeUpdate = Database["public"]["Tables"]["grades"]["Update"]

export async function getGrades(): Promise<Grade[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("grades").select("*").order("name")

  if (error) {
    console.error("Error fetching grades:", error)
    throw new Error("Failed to fetch grades")
  }

  return data || []
}

export async function getGradeById(id: number): Promise<Grade | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("grades").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching grade ${id}:`, error)
    throw new Error("Failed to fetch grade")
  }

  return data
}

export async function createGrade(grade: GradeInsert): Promise<Grade> {
  const supabase = createClient()

  const { data, error } = await supabase.from("grades").insert(grade).select().single()

  if (error) {
    console.error("Error creating grade:", error)
    throw new Error("Failed to create grade")
  }

  return data
}

export async function updateGrade(id: number, grade: GradeUpdate): Promise<Grade> {
  const supabase = createClient()

  const { data, error } = await supabase.from("grades").update(grade).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating grade ${id}:`, error)
    throw new Error("Failed to update grade")
  }

  return data
}

export async function deleteGrade(id: number): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from("grades").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting grade ${id}:`, error)
    throw new Error("Failed to delete grade")
  }
}
