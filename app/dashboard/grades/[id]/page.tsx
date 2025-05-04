import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradeConfigForm } from "@/components/grades/grade-config-form"
import { ClassList } from "@/components/grades/class-list"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"

export default function GradeDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the grade data based on the ID
  const grade = {
    id: Number.parseInt(params.id),
    name: "5th Grade",
    students: 105,
    classes: 4,
    promptConfig: "Pre-algebra, research papers, U.S. history, advanced science",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/grades">
            <LucideArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{grade.name} Configuration</h1>
      </div>
      <Tabs defaultValue="system-prompt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system-prompt">System Prompt</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Topics</TabsTrigger>
        </TabsList>
        <TabsContent value="system-prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt Configuration</CardTitle>
              <CardDescription>Customize how Nino responds to students in this grade level</CardDescription>
            </CardHeader>
            <CardContent>
              <GradeConfigForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Manage classes and their specific configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <ClassList gradeId={grade.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
              <CardDescription>Configure what information and features are available to this grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Content Access</h3>
                    <p className="text-sm text-muted-foreground">Control what types of content students can access</p>
                  </div>
                  <div className="grid gap-2">
                    {/* Permission settings would go here */}
                    <p className="text-sm text-muted-foreground">Permission settings form would be implemented here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
