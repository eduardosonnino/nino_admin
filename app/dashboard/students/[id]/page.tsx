import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfile } from "@/components/students/student-profile"
import { StudentLearningPreferences } from "@/components/students/student-learning-preferences"
import { StudentChatHistory } from "@/components/students/student-chat-history"
import Link from "next/link"
import { LucideArrowLeft, LucidePencil } from "lucide-react"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the student data based on the ID
  const student = {
    id: params.id,
    name: "Emma Johnson",
    email: "emma.j@school.edu",
    grade: "5th Grade",
    class: "5A",
    specialNeeds: ["Dyslexia"],
    learningStyle: "Visual",
    status: "active",
    avatar: "/placeholder.svg?height=128&width=128",
    dateOfBirth: "2014-05-12",
    parentName: "Sarah Johnson",
    parentEmail: "sarah.johnson@example.com",
    parentPhone: "(555) 123-4567",
    address: "123 School Lane, Anytown, USA",
    joinDate: "2020-09-01",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/students">
            <LucideArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{student.name}</h1>
        <Button variant="outline" size="icon" className="ml-auto" asChild>
          <Link href={`/dashboard/students/${student.id}/edit`}>
            <LucidePencil className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="learning-preferences">Learning Preferences</TabsTrigger>
          <TabsTrigger value="chat-history">Chat History</TabsTrigger>
          <TabsTrigger value="permissions">AI Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
              <CardDescription>View and manage student information</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentProfile student={student} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="learning-preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize how Nino interacts with this student</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentLearningPreferences student={student} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>View this student's interactions with Nino</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentChatHistory studentId={student.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
