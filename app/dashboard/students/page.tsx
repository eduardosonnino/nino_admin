import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentTable } from "@/components/students/student-table"
import { StudentImport } from "@/components/students/student-import"
import { LucidePlus, LucideUpload } from "lucide-react"
import Link from "next/link"

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <LucideUpload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button asChild>
            <Link href="/dashboard/students/add">
              <LucidePlus className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="kindergarten">Kindergarten</TabsTrigger>
          <TabsTrigger value="elementary">Elementary</TabsTrigger>
          <TabsTrigger value="middle">Middle School</TabsTrigger>
          <TabsTrigger value="high">High School</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage all students and their AI learning permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Students</CardTitle>
              <CardDescription>Bulk import students from CSV or Excel files</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentImport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
