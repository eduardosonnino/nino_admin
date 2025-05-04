export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          user_type: "student" | "parent" | "admin" | "teacher"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          user_type: "student" | "parent" | "admin" | "teacher"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          user_type?: "student" | "parent" | "admin" | "teacher"
          created_at?: string
          updated_at?: string
        }
      }
      grades: {
        Row: {
          id: number
          name: string
          description: string | null
          system_prompt: string | null
          complexity_level: number | null
          enable_citations: boolean | null
          enable_images: boolean | null
          max_response_length: number | null
          restricted_topics: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          system_prompt?: string | null
          complexity_level?: number | null
          enable_citations?: boolean | null
          enable_images?: boolean | null
          max_response_length?: number | null
          restricted_topics?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          system_prompt?: string | null
          complexity_level?: number | null
          enable_citations?: boolean | null
          enable_images?: boolean | null
          max_response_length?: number | null
          restricted_topics?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      classes: {
        Row: {
          id: number
          name: string
          grade_id: number | null
          teacher_id: string | null
          subjects: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          grade_id?: number | null
          teacher_id?: string | null
          subjects?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          grade_id?: number | null
          teacher_id?: string | null
          subjects?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: number
          profile_id: string
          class_id: number | null
          date_of_birth: string | null
          special_needs: string[] | null
          learning_style: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          profile_id: string
          class_id?: number | null
          date_of_birth?: string | null
          special_needs?: string[] | null
          learning_style?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          profile_id?: string
          class_id?: number | null
          date_of_birth?: string | null
          special_needs?: string[] | null
          learning_style?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: number
          student_id: number
          topic: string | null
          created_at: string
        }
        Insert: {
          id?: number
          student_id: number
          topic?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          student_id?: number
          topic?: string | null
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: number
          session_id: number
          sender: "student" | "ai"
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          session_id: number
          sender: "student" | "ai"
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          session_id?: number
          sender?: "student" | "ai"
          content?: string
          created_at?: string
        }
      }
      student_learning_preferences: {
        Row: {
          id: number
          student_id: number
          response_complexity: number | null
          response_length: number | null
          enable_visual_aids: boolean | null
          enable_audio_support: boolean | null
          special_accommodations: string | null
          advanced_topics: string[] | null
          restricted_topics: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          student_id: number
          response_complexity?: number | null
          response_length?: number | null
          enable_visual_aids?: boolean | null
          enable_audio_support?: boolean | null
          special_accommodations?: string | null
          advanced_topics?: string[] | null
          restricted_topics?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          student_id?: number
          response_complexity?: number | null
          response_length?: number | null
          enable_visual_aids?: boolean | null
          enable_audio_support?: boolean | null
          special_accommodations?: string | null
          advanced_topics?: string[] | null
          restricted_topics?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
